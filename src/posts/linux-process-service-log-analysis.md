---
title: Linux에서 프로세스·서비스·로그를 확인하는 순서
date: 2026-11-22
createdAt: 2026-11-22T13:14:59+09:00
tags: Linux, systemd, Logs, Interview
summary: 프로세스 존재·서비스 상태·업무 정상 여부를 구별하고 시간 범위를 맞춰 로그와 자원 상태를 조사한다.
category: linux-ops
---

## 1. 학습 배경

솔루션 대응 개발에서는 “서버가 안 된다”는 표현을 관측 가능한 상태로 바꿔야 한다. 실제 업무의 장애 이력과 홈서버에서 학습한 명령은 구분한다. 이 글은 systemd를 쓰는 Linux의 **학습용 점검 절차**이며 운영 서버에서 실행하지 않았다.

## 2. 핵심 개념

프로세스는 실행 중인 프로그램의 인스턴스이고 서비스는 운영체제가 관리하는 실행 단위다. 서비스 상태가 active라도 HTTP·DB·외부 연동까지 정상이라는 뜻은 아니다. 컨테이너라면 호스트 서비스 상태와 내부 프로세스·컨테이너 상태도 별도로 본다.

## 3. 동작 원리

```text
증상·발생 시각 확보 → 서비스 상태 → 프로세스·자원
  → 같은 시간대 로그 → 외부 의존성·요청 경로 대조
```

systemctl은 systemd의 unit 상태와 실행을 관리한다. journalctl은 journal에 수집된 로그를 조건별로 읽는다. 파일 로그가 별도로 설정돼 있으면 journal만으로 모든 앱 기록을 찾을 수 없다. [systemctl](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)과 [journalctl](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)의 역할을 구분한다.

## 4. 실무 활용

예시 서비스 이름은 실제 운영 대상이 아니다. 아래는 읽기 중심 명령이며 실행 결과를 만들지 않았다.

```bash
pwd
ls -lah
ps -eo pid,ppid,%cpu,%mem,etime,args
systemctl status example-app.service --no-pager
journalctl -u example-app.service --since '30 min ago' --no-pager
free -h
df -h
```

서비스가 실패했다면 종료 코드·기동 시각·최근 변경을 먼저 본다. PID가 살아 있다면 CPU·메모리·파일시스템·요청 응답을 연결한다. 파일 로그는 `tail -n 200 ./logs/app.log`로 최근 문맥을 읽고 `rg -n 'ERROR|Exception' ./logs/app.log`로 후보를 찾을 수 있다. 실제 파일 위치·권한은 환경에 맞게 확인한다.

Java CPU 문제라면 스레드와 스택, 연결 지연이라면 네트워크·풀 대기 같은 다음 증거가 필요하다. 프로세스 목록만으로 메모리 누수나 특정 코드 원인을 확정하지 않는다.

## 5. 주의사항 및 오개념

재시작부터 하면 일시 증상이 사라져도 증거와 진행 중 작업이 유실될 수 있다. 먼저 영향·로그·최근 변경을 보존한다. `kill -9`는 정상 종료·정리를 거치지 않으므로 기본 처방으로 쓰지 않는다. 실행 인자·로그에는 비밀 정보가 있을 수 있어 공유 전에 가린다. ls의 권한 문제를 chmod 777로 일괄 해소하지 않는다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| 서비스 장애 때 첫 확인은? 진단 순서 | “영향 범위와 시각을 확보하고 서비스 상태·프로세스·같은 시간대 로그를 보겠습니다. 재시작 전에 증거를 남겨요.” | 로그가 없으면? |
| 프로세스가 있으면 정상인가? 생존·기능 | “아니요. 살아 있어도 요청을 못 처리하거나 의존 시스템을 기다릴 수 있어요. 실제 응답과 자원 상태를 더 보겠습니다.” | CPU는 낮고 응답이 느리면? |
| kill -9로 해결해도 되나? 복구 위험 | “정상 종료 기회를 주지 않으니 기본 선택은 아니에요. 영향과 복구 절차를 확인한 뒤 필요할 때 쓰겠습니다.” | 종료 뒤 재시작 주체는? |

## 7. 핵심 요약

프로세스 생존·서비스 관리 상태·업무 정상 여부를 분리한다. 시간대를 맞춘 로그와 자원 증거가 진단의 시작이다.

## 8. 참고 자료

- [systemd — systemctl](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)
- [systemd — journalctl](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html): 설치 버전별 옵션 지원을 확인한다.

---

[이전 복습](/blog/batch-retry-fallback-reprocessing) · [다음 복습](/blog/network-port-incident-diagnosis)
