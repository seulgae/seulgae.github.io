---
title: Java 17 기준을 바로잡고 IntelliJ 로컬 실행 구성 만들기
date: 2026-11-15
createdAt: 2026-11-15T15:45:18+09:00
tags: Java, IntelliJ, Maven, Spring Boot, Docker, 개발 환경
summary: 잘못 적용한 Java 21 기준을 17로 수정하고 IntelliJ에서 백엔드 실행과 개발 DB 연결을 확인한 뒤, 코드·CI·운영 배포의 현재 상태를 구분한 기록.
category: seulgae-tech-lab
---

연구 기록 스키마와 API, React 패널 연결까지 개발환경에서 검증했다. 하지만 백엔드는 셸에서 직접 실행하고 있었고, IntelliJ에서 실행·중지할 수 있는 구성이 필요했다.

이 작업 중 중요한 기준 오류를 바로잡았다. 프로젝트에서 사용하기로 한 버전은 **Java 17**이었는데, 앞선 인프라 작업에서는 Java 21을 빌드·컨테이너·CI 기준으로 적용하고 로컬 검증까지 진행했다. 사용자가 합의한 기준을 다시 확인해 준 뒤 17로 수정했다. 이전 글에 남긴 Java 21 실행 결과는 당시 실제 작업 기록이며, 현재 프로젝트 기준을 뜻하지 않는다.

## 로컬 실행 버튼을 만들기 전에 실제 설정을 확인했다

프로젝트의 `backend/pom.xml`, `backend/Dockerfile`, `.github/workflows/ci.yml`과 IntelliJ 프로젝트 설정을 확인했다. Maven·Docker·CI 설정에는 21이 남아 있었고, IntelliJ 프로젝트 설정은 기존 Java 17 기준이었다. 개발 PC에는 Java 17도 설치되어 있었다.

다음과 같이 기준을 맞췄다.

| 파일 | 수정한 내용 |
| --- | --- |
| `backend/pom.xml` | Java 컴파일 기준을 17로 변경 |
| `backend/Dockerfile` | Maven 빌드 이미지와 JRE 실행 이미지를 17 계열로 변경 |
| `.github/workflows/ci.yml` | CI의 Java 설정을 17로 변경 |
| `README.md` | 백엔드 실행 기준 설명 수정 |
| `docs/infrastructure.md` | 인프라 구성과 로컬 JDK 안내 수정 |
| `docs/research-records.md` | 마이그레이션·로컬 실행의 JDK 안내 수정 |

현재 `backend/pom.xml`의 실제 설정이다.

```xml
<properties><java.version>17</java.version></properties>
```

다음은 `backend/Dockerfile`의 베이스 이미지 선언만 발췌한 것이다. 두 줄 사이에는 실제 빌드 단계가 있으며 전체 Dockerfile은 아니다.

```dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
# 중간 빌드 단계 생략
FROM eclipse-temurin:17-jre-alpine
```

이번에 컨테이너 이미지를 새로 빌드하거나 운영 서버에 적용한 것은 아니다. Dockerfile 변경과 컨테이너 런타임 변경은 구분했다. 기존 Java 21 설치 파일도 임의로 삭제하지 않았다.

## 백엔드와 프론트엔드 실행 구성을 분리했다

IntelliJ의 로컬 실행 구성 두 개를 만들었다.

| 구성 이름 | 종류와 목적 |
| --- | --- |
| Tech Lab Backend (Local) | Maven으로 `spring-boot:run` 실행 |
| Tech Lab Frontend (Local) | 프론트엔드의 npm dev 스크립트 실행 |

파일은 각각 `.idea/runConfigurations/Tech_Lab_Backend_Local.xml`과 `.idea/runConfigurations/Tech_Lab_Frontend_Local.xml`이다. `.idea`가 Git 제외 대상인 것을 확인했으므로 개인 실행 구성을 공유 저장소에 올리지 않는다.

백엔드는 이미 만들어 둔 JAR만 실행하는 대신 Maven 목표를 실행하도록 했다. 이렇게 하면 실행 시 Maven의 컴파일 과정을 거치므로 소스를 바꿨는데 이전 JAR를 실행하는 혼동을 줄일 수 있다.

다음은 백엔드 구성의 실제 Maven 실행 파라미터 발췌이다. 환경변수·접속 대상·개인 경로 부분은 제외했다.

```xml
<option name="myRunnerParameters">
  <MavenRunnerParameters>
    <option name="workingDirPath" value="$PROJECT_DIR$/backend" />
    <option name="pomFileName" value="pom.xml" />
    <option name="goals"><list><option value="spring-boot:run" /></list></option>
  </MavenRunnerParameters>
</option>
```

프론트엔드는 `frontend/package.json`의 `dev` 스크립트를 선택한다. 백엔드와 프론트엔드의 시작·종료를 각각 제어하기 위해 별도 구성으로 두었다. SSH 터널까지 자동으로 시작하거나 중지하는 통합 구성은 만들지 않았다.

## 비밀번호 값은 실행 구성에 복사하지 않았다

개발 DB 비밀번호는 기존의 소스 밖 비밀 파일을 사용한다. 백엔드 구성은 Spring config tree로 해당 로컬 설정 디렉터리를 읽고, 비밀번호 속성은 파일에서 만들어진 설정 키를 참조한다. XML에 실제 비밀번호를 복사해 넣지 않았다.

따라서 소스와 실행 구성에 비밀번호 값이 없다는 점과 로컬 비밀 파일 자체가 필요하다는 점을 구분해야 한다. 파일이나 개발 DB 터널이 준비되지 않으면 DB 연결은 실패할 수 있다. 이를 새 인증 체계나 암호화된 비밀 저장소를 구현한 것으로 표현하지 않았다.

실행 구성은 개발 DB와 루프백 실행을 대상으로 하고, 개발용 저장 API도 기존 로컬 개발 설정에 따라 활성화한다. 운영 배포에서는 인증이 구현되기 전까지 쓰기 경로를 활성화하지 않는 원칙을 유지한다. 실제 역할 이름, 접속 값과 비밀 파일의 개인 절대 경로는 이 글에서 제외했다.

## 두 번의 실행 문제를 실제 원인에 맞춰 수정했다

### 실행 중인 JAR가 빌드 결과물을 잠그고 있었다

Java 17로 `clean verify`를 실행한 첫 시도는 실패했다. 앞선 챕터에서 실행한 로컬 Java 프로세스가 JAR를 사용하고 있어 Windows에서 해당 파일을 삭제할 수 없었다.

실행 파일과 명령을 확인해 내가 시작한 연구소 로컬 백엔드임을 확인하고 그 프로세스만 종료했다. 운영 서버의 컨테이너나 다른 프로젝트의 Java 프로세스는 종료하지 않았다.

그 뒤 Java 17을 선택한 프로세스 환경에서 다음 Maven 목표를 다시 실행했다. 실제 실행 시에는 설치된 Maven의 경로를 지정했으며 아래는 목표를 일반 명령 형태로 나타낸 것이다.

```bash
mvn -B -f backend/pom.xml clean verify
```

결과는 BUILD SUCCESS였고, 백엔드 테스트 1개가 실패·오류·건너뜀 없이 통과했다. 이 테스트는 연구 기록 입력의 정상값·공백·최대 길이 조건을 검사한다. Java 버전 변경 후 모든 브라우저 흐름을 다시 확인했다는 의미는 아니다.

### Maven 실행 구성은 JDK 경로를 SDK 이름으로 인식하지 못했다

처음 실행 구성에는 JDK 설치 경로를 JRE 이름 항목에 넣었다. IntelliJ에서 구성을 선택하고 실행했지만 JRE를 찾을 수 없다는 오류가 발생했다.

해당 항목을 IntelliJ에 이미 등록된 Java 17 SDK 이름으로 바꿨다. 다시 실행한 뒤 실제 백엔드 프로세스의 실행 파일이 설치된 Java 17을 가리키는지 확인했다. 프로젝트 SDK, Maven 실행용 JDK, IDE 자체를 구동하는 JBR은 서로 다른 설정이라는 점을 놓치면 안 됐다.

## 실제 확인한 결과와 확인하지 못한 범위

| 항목 | 확인 결과 |
| --- | --- |
| Java 17 Maven clean verify | 성공 |
| 백엔드 단위 테스트 | 1개 통과 |
| IntelliJ 구성 목록 | 백엔드·프론트엔드 두 구성 표시 |
| IntelliJ 백엔드 실행 | Maven 구성으로 기동 성공 |
| 실제 로컬 런타임 | Java 17 실행 파일 확인 |
| 개발 DB 연결 | 상태 확인 응답 UP, 연구 기록 목록 응답 정상 |
| 프론트엔드 실행 구성 | 파일 생성과 목록 표시까지만 확인 |
| IntelliJ 중지·재시작 | 실제 동작 미검증 |
| Java 17 Docker 이미지 | 설정만 변경, 재빌드 미수행 |
| Java 17 GitHub CI | 아직 해당 수정 커밋·실행 없음 |

화면 조작 중 사용자가 Escape로 중단해 이후 GUI 조작은 진행하지 않았다. 따라서 실행 구성이 있다는 이유만으로 프론트엔드의 기동이나 IntelliJ 중지·재시작까지 검증했다고 기록하지 않았다.

글 작성 시점에는 로컬 파일·Git 상태·기존 빌드 로그를 다시 읽었다. 새로 빌드하거나 화면을 조작하지 않았으며, 읽기 전용 HTTP 요청으로 로컬 백엔드의 UP 및 빈 목록 응답을 다시 확인했다. 현재 개발 DB가 비어 있는 것은 앞선 통합 검증에서 생성한 검증용 기록 한 건을 정리했기 때문이다.

## 현재 프로젝트는 어디까지 진행됐는가

현재까지의 완료 범위와 적용 위치를 함께 정리했다.

| 영역 | 완료한 작업 | 적용·검증 범위 |
| --- | --- | --- |
| 게임 | 로비·플레이어 이동·충돌·E 상호작용·패널 개폐 | 개발환경 구현과 기존 검증 기록 |
| 서버 인프라 | 기존 Ubuntu 재활용, 연구소 전용 Compose와 DB 분리 | 서버에서 초기 인프라 컨테이너 운영 |
| 개발 접속 | SSH 터널과 IntelliJ PostgreSQL 접속 | 실제 개발 DB 조회 및 운영 DB 접근 차단 확인 |
| 스키마 | 연구 기록 테이블·인덱스, Flyway V1 | 개발 DB에 적용·validate·재실행 무변경 확인 |
| API | 목록·상세·개발 전용 생성, 입력 검증 | 개발 DB에서 HTTP 검증 |
| React 연동 | 임시 데이터를 목록·상세 API로 교체 | 로딩·빈 목록·오류·재시도와 실제 화면 확인 |
| 통합 검증 | 저장 결과가 게임 패널에 표시되는 흐름 | 개발환경 실검증과 임시 PostgreSQL CI |
| 로컬 실행 | Java 17 기준 수정과 IntelliJ 실행 구성 | 백엔드 기동·DB 조회 확인, 나머지 GUI 검증은 남음 |

인프라 PR #1은 main에 병합돼 있다. 연구 기록 구현은 `53c72dc91520df1a232ec6c1e45f2dea34d947d0`으로 커밋·푸시했고 [PR #2](https://github.com/seulgae/seulgae-tech-lab/pull/2)는 글 작성 시점에도 열린 상태이다.

해당 커밋의 [GitHub Actions 실행](https://github.com/seulgae/seulgae-tech-lab/actions/runs/43685857735)은 성공했다. 다만 이것은 **Java 17 수정 전 커밋의 결과**이다. 현재 Java 17 수정 6개 파일은 로컬 작업 트리에만 있고, 아직 커밋·푸시하지 않았다. 이전 CI 성공을 수정 후 CI 성공으로 대체해서 설명하지 않았다.

서버의 연구소 컨테이너는 아직 초기 인프라 커밋 `c4b8156`의 이미지이다. 연구 기록 기능이나 Java 17 런타임을 서버에 배포한 상태는 아니다. 글 작성 중 서버의 기존 서비스 감사 결과를 다시 확인했으며, 컨테이너 ID·시작 시각·재시작 횟수와 읽기 가능한 설정 해시는 기존 기준과 같고 InvenCore 상태 API도 UP이었다.

## 배운 점과 남은 작업

이미 설치된 최신 JDK가 있다는 이유로 프로젝트의 합의된 버전을 바꾸면 안 된다. 코드의 컴파일 기준, 로컬 실행 JDK, Docker 이미지와 CI를 함께 확인해야 하며, 각각의 설정을 바꾼 사실과 실제 실행한 결과도 구분해야 한다.

가장 가까운 남은 작업은 IntelliJ 프론트엔드 실행과 백엔드 중지·재시작을 확인하고, Java 17 수정을 커밋·푸시해 새 CI를 통과시키는 것이다. 이후 PR #2 병합과 운영 마이그레이션·배포 절차를 진행해야 한다.

자동 배포 전용 자격증명과 권한 설정, 배포 실패 시 이미지 복원 실검증, 신규 HTTPS 공개도 아직 남아 있다. 인증·관리용 작성 화면·편집·삭제·검색은 구현하지 않았다. 공개 환경에서는 저장 API를 계속 비활성으로 유지한다.

이 글은 로컬 실행 구성을 만드는 챕터와 현재 진행 상황을 기록한 것이다. 블로그 글 자체는 저장만 했으며 커밋·푸시·공개 배포는 수행하지 않았다.
