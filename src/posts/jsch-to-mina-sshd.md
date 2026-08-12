---
title: JSch가 WEB 서버 앞에서 멈춘 날 — Apache MINA SSHD로 서버 용량 모니터링 만들기
date: 2026-01-05
tags: Java, SSH, Infra, Spring
summary: 월말마다 수기로 정리하던 서버 메모리·디스크 현황을 SSH 기반 실시간 화면으로 자동화한 과정 — JSch의 암호화 협상 실패, MINA SSHD 교체, 그리고 함수 하나하나의 선택 이유
---

운영 업무 중에 매달 반복되는 일이 있었다. **월말이 되면 서버마다 접속해서
메모리와 디스크 사용량을 확인하고, 표로 정리해 보고하는 것.** 서버는 인터넷망과
업무망에 WEB/WAS가 각각 있어서, 사람이 일일이 터미널로 들어가 `free`와 `df`를
치고 결과를 옮겨 적는 구조였다. 이걸 관리자 화면에서 실시간으로 보이게 만들고,
월말 정리도 쌓인 데이터로 하자는 게 시작이었다.

## 설계 — WAS가 각 서버에 SSH로 물어본다

에이전트를 서버마다 설치하는 방식은 공공 인프라 특성상 승인 비용이 크다.
대신 **WAS 애플리케이션이 SSH 클라이언트가 되어 각 서버에 접속해 명령을 실행**하고,
결과를 파싱해 DB에 쌓는 구조로 갔다.

```text
[관리자 화면] ← [Controller] ← [DB (수집 이력)]
                                   ↑
[Quartz 스케줄러(4시간 주기)] → [SSH 클라이언트] → 각 서버 (WEB/WAS × 인터넷망/업무망)
                                → free -h / top / df -h 실행 → 파싱 → 저장
```

접속 정보(호스트/계정/비밀번호)는 properties 하드코딩 대신 **DB 테이블로
관리**하고 비밀번호 컬럼은 DB 암호화 솔루션으로 암호화했다. 운영 중 서버가
추가돼도 재배포 없이 row 하나만 넣으면 수집 대상에 포함된다.

## 첫 시도 — JSch, 그리고 암호화 협상 실패

Java에서 SSH라면 가장 먼저 나오는 라이브러리가 JSch라서 그걸로 시작했다.
로컬에서 개발 서버로는 잘 붙었다. 그런데 **운영 WAS에서 WEB 서버를 찌르는 순간
인증 단계도 못 가고 접속이 실패했다.**

원인은 코드가 아니라 **암호화 알고리즘 협상(negotiation)** 이었다. SSH는 접속
시점에 클라이언트와 서버가 지원하는 키 교환(kex)·호스트 키·암호화 알고리즘
목록을 교환해 공통분모를 고르는데, WEB 서버의 sshd는 보안 정책상 구형 알고리즘이
비활성화된 상태였고 JSch가 제시하는 목록과 **교집합이 없었다.** 최신 OpenSSH가
`ssh-rsa`(SHA-1 기반) 같은 구형 방식을 기본 비활성화하는 흐름과, 오래된 JSch가
최신 알고리즘을 모르는 상황이 정확히 충돌한 것이다.

이걸 파악하는 과정에서 코드 바깥을 봐야 했다. WEB 서버의 `/etc/ssh/sshd_config`
허용 알고리즘을 확인하고 `ssh -vvv` 협상 로그로 양쪽 목록을 비교했다.
**WAS에서 WEB으로 가는 길은 애플리케이션 코드가 아니라 인프라 설정이 결정한다.**
서버 설정을 낮춰(구형 알고리즘 허용) 맞출 수도 있었지만, 보안 점검을 받는
시스템에서 서버 보안 수준을 낮추는 건 답이 아니라고 판단해 클라이언트를 바꿨다.

## 교체 — Apache MINA SSHD 2.16.0

기준은 하나 — **어떤 운영체제, 어떤 sshd 정책과도 협상이 되는 라이브러리.**
MINA SSHD는 활발히 관리되어 최신 키 교환·호스트 키 알고리즘을 지원하고,
서버가 무엇을 요구하든 협상이 성립했다.

```xml
<dependency>
    <groupId>org.apache.sshd</groupId>
    <artifactId>sshd-core</artifactId>
    <version>2.16.0</version>
</dependency>
```

## 구현 디테일 — 함수 하나하나의 선택 이유

### 접속: 모든 비동기 단계에 verify(timeout)

```java
SshClient client = SshClient.setUpDefaultClient();
client.start();

ClientSession session = client.connect(user, host, port)
        .verify(10, TimeUnit.SECONDS)      // 연결 완료를 10초까지만 기다림
        .getSession();
session.addPasswordIdentity(password);
session.auth().verify(10, TimeUnit.SECONDS); // 인증도 동일
```

MINA SSHD의 API는 대부분 **비동기 Future를 반환**한다. `connect()`도 `auth()`도
즉시 리턴되고, `verify(timeout)`을 호출해야 완료를 대기한다. 모니터링 대상
서버 중 한 대가 죽어 있거나 방화벽에 막혀 있으면 그 지점에서 무한 대기가
발생하므로, **연결·인증·채널 오픈·명령 종료까지 모든 단계에 10초 타임아웃**을
걸었다. 한 대의 장애가 전체 수집을 멈추면 안 되는 게 모니터링 코드의 제1 요건이다.

### 명령 실행: 셸 채널이 아니라 EXEC 채널

```java
ClientChannel channel = session.createChannel(ClientChannel.CHANNEL_EXEC, command);
channel.setOut(outputStream);   // 표준출력
channel.setErr(errorStream);    // 표준에러 — 반드시 분리
channel.open().verify(10, TimeUnit.SECONDS);
channel.waitFor(Collections.singletonList(ClientChannelEvent.CLOSED),
        TimeUnit.SECONDS.toMillis(10));
```

- **`CHANNEL_EXEC`를 선택한 이유**: 셸 채널(`CHANNEL_SHELL`)은 대화형 세션이라
  프롬프트 파싱, 명령 종료 판별을 직접 해야 한다. EXEC 채널은 명령 하나를 던지면
  실행 후 채널이 닫히므로 "닫힘 이벤트 = 명령 종료"로 판별이 명확하다.
- **`setOut`/`setErr` 분리**: 처음엔 출력만 받았는데, 명령이 실패하면 "결과가
  비어 있다"는 것만 알 수 있었다. stderr를 분리 수집하니 "명령을 찾을 수 없음"
  같은 실패 원인이 로그에 남는다.
- **`waitFor(CLOSED, timeout)`**: 채널이 닫힐 때까지 대기하되 역시 상한 10초.

### 종료: finally에서 채널 → 세션 → 클라이언트 순서로

SSH 연결 정리도 비동기라서, 그냥 close만 호출하고 나가면 커넥션이 누수될 수
있다. finally 블록에서 **채널 → 세션 → 클라이언트 순으로 명시적으로 닫고**,
비동기 정리가 끝날 시간을 짧게 대기한 뒤 진행한다. 이때 한 가지 함정이 있는데 —
finally 안에서 close 예외를 그대로 던지면 **try에서 난 원본 예외가 덮여 사라진다.**
그래서 원본 예외를 변수에 보관하고, 원본이 있으면 close 예외는 로깅만 하도록 했다.

```java
} catch (Exception e) {
    originalException = ...;  // 원본 보관
    throw originalException;
} finally {
    try { session.close(); ... }
    catch (Exception e) {
        LOGGER.warn("세션 종료 중 오류", e);
        if (originalException == null) {   // 원본이 없을 때만 던짐
            throw new RuntimeException("세션 종료 중 오류 발생", e);
        }
    }
}
```

### 수집 명령과 파싱 — 왜 이 명령이었나

**메모리: `free -h`** — 사람이 읽는 단위(G/M)로 나와 파싱 후 화면에 그대로
쓸 수 있다. 단, `-h`는 `Gi`/`Mi`(binary 단위)로 출력하므로 보고서 표기에 맞게
정규식으로 접미사를 정리했다.

```java
// "2Gi" → "2G", "512Mi" → "512M"
value.trim().replaceAll("(?i)(\\d+)([KMGT])i", "$1$2");
```

**CPU: `top` 우선, `vmstat` 폴백** — 서버마다 설치된 도구와 출력 포맷이 미묘하게
달라서 단일 명령에 걸 수 없었다.

```bash
# 1차: top 배치 모드 1회 실행에서 user CPU 추출
top -bn1 | grep 'Cpu(s)' | awk '{print $2}' | sed 's/%us,//'
# 1차가 빈 값이면 2차: vmstat의 idle(15번째 컬럼)을 100에서 빼서 사용률 계산
vmstat 1 2 | tail -1 | awk '{print 100-$15}'
```

`top -bn1`의 `-b`(배치 모드)가 핵심이다 — 화면 제어 문자 없이 텍스트로만 출력돼
파싱이 가능해진다. `vmstat 1 2`에서 `2`인 이유는 첫 샘플이 부팅 이후 누적
평균이라 부정확하기 때문에 두 번째 샘플(직전 1초 실측)을 `tail -1`로 집는 것이다.
파싱된 사용률이 90% 이상이면 화면에 "경고" 상태를 표시한다.

**디스크: `df -h`** — 전체 파일시스템이 아니라 **마운트 포인트 기준으로 필요한
볼륨만** 골라 담았다. 애플리케이션 볼륨은 전 서버 공통으로 수집하고, 공유
스토리지 볼륨은 WAS에만 마운트되어 있어 WEB 서버는 파싱에서 제외했다 —
서버 역할에 따라 봐야 할 디스크가 다르다는 인프라 지식이 파싱 조건으로
들어간 부분이다. 로컬 개발 환경에는 운영과 같은 마운트가 없어서, 같은 코드가
로컬에서는 다른 마운트 포인트를 대신 읽도록 분기해 파싱 로직 자체를 테스트할
수 있게 했다.

### 스케줄러: Quartz와 "Spring Bean이 아닌 클래스"의 함정

수집은 Quartz cron(`0 0 */4 * * ?`, 4시간 주기)으로 돈다. 여기서 두 가지
비자명한 문제를 만났다.

1. **Quartz Job은 Spring Bean이 아니다.** `@Resource`, `@Value` 주입이 동작하지
   않는다. 서비스는 `JobDataMap`을 통해 넘겨받고, 환경 값은 properties 유틸로
   직접 읽는 방식으로 우회했다.
2. **이중 수집 방지.** WAS가 2대라 스케줄러도 2곳에서 뜬다. 같은 데이터가 두 번
   쌓이지 않도록 properties의 스케줄 활성화 플래그로 **대표 1대만 수집**하게
   하고, local/dev 환경은 Spring profile(`!dev`)과 서버 타입 검사로 이중 차단했다
   — 개발 PC가 운영 서버에 SSH를 날리는 사고를 막는 안전장치다.

### 화면 조회: Collectors.toMap이 버그 검출기가 되도록

화면은 서버별 최신 1건만 보여주면 되므로, 쿼리가 서버별 최신 데이터만 내려주고
Controller는 이를 `"WAS_1"`, `"WEB_2"` 형태의 키로 Map에 담아 JSP에 넘긴다.

```java
serverList.stream()
    .filter(vo -> vo != null && vo.getServerType() != null && vo.getServerNo() != null)
    .collect(Collectors.toMap(
        vo -> vo.getServerType() + "_" + vo.getServerNo(),
        vo -> vo
    ));
```

`Collectors.toMap`은 **키가 중복되면 IllegalStateException을 던진다.** 보통은
merge 함수를 넣어 무마하지만 일부러 넣지 않았다 — 중복이 왔다는 건 "서버별
최신 1건" 쿼리가 깨졌다는 뜻이라, 조용히 덮는 것보다 크게 실패해서 로그에
드러나는 편이 낫다. 조회가 실패해도 화면은 떠야 하므로 model 속성 주입은
finally에서 빈 Map으로라도 보장했다.

## 결과

관리자 화면에서 메모리 탭 / 시스템(디스크) 탭으로 전 서버 현황을 실시간 조회할
수 있게 됐고, 4시간마다 수집된 데이터가 DB에 쌓이면서 월말 용량 보고는
"서버 들어가서 적어 오기"에서 "쌓인 데이터 정리"로 바뀌었다.

## 배운 점

- **라이브러리 선택 기준은 인지도가 아니라 대상 환경과의 호환성이다.** JSch는
  훌륭하지만 접속할 서버의 보안 정책과 맞지 않으면 소용이 없다. "무엇에
  붙는가"를 먼저 확인해야 한다.
- **개발자도 자기 코드가 지나가는 인프라 구간은 읽을 줄 알아야 한다.**
  sshd_config, 알고리즘 협상 로그, 마운트 구성, 망 분리 — 이번 기능의 실패
  원인과 파싱 조건은 전부 애플리케이션 코드 바깥에 있었다.
- **모니터링 코드는 감시 대상보다 튼튼해야 한다.** 전 단계 타임아웃, 명령 폴백,
  한 대 실패 시 계속 진행, 원본 예외 보존 — 장애 상황에 동작해야 하는 코드라서
  정상 경로보다 실패 경로에 더 많은 코드를 썼다.
