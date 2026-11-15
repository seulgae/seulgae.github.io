---
title: 인프라 PR을 병합하고 개발 PC에서 Spring Boot 실행하기
date: 2026-11-15
createdAt: 2026-11-15T15:20:29+09:00
tags: GitHub, Java, Spring Boot, Maven, PostgreSQL, SSH
summary: CI를 통과한 인프라 PR을 main에 병합하고, 개발 폴더 동기화와 JDK 21 기반 로컬 백엔드의 개발 DB 연결을 확인한 기록.
category: seulgae-tech-lab
---

서버의 독립 실행 환경과 IntelliJ DB 연결은 준비했지만, 개발 PC의 프로젝트에는 아직 인프라 코드가 없었다. 다음 기능을 구현하기 전에 **서버에서 확인한 코드와 실제 개발할 코드의 기준을 맞추는 작업**이 필요했다.

## 기존 작업 폴더와 PR부터 확인했다

개발용 작업 폴더는 이전 프론트엔드 커밋에 머물러 있었고 변경 사항은 없었다. PR #1은 열린 상태였으며 충돌 없이 병합할 수 있었다. PR의 head는 `c4b8156`이었고, 해당 커밋의 프론트엔드·백엔드 CI 성공을 다시 확인했다.

원하는 커밋과 다른 변경이 병합되는 것을 막기 위해 확인한 head SHA를 지정해 PR을 병합했다. 결과 커밋은 `3073be6a0f13a2307d4a2f8309348f502c98c28b`이다.

[PR #1](https://github.com/seulgae/seulgae-tech-lab/pull/1)

## 강제 초기화 대신 fast-forward로 동기화했다

로컬 main에서 다음 명령을 실행했다.

```bash
git pull --ff-only origin main
```

백엔드, Compose, 개발 접속 스크립트, 운영 안내서와 GitHub Actions 설정이 반영됐다. 동기화 후 로컬 HEAD와 원격 main의 SHA가 같고 작업 트리가 깨끗한 것을 확인했다. 기존 작업을 버리는 reset이나 프로젝트 복제는 필요하지 않았다.

## JDK와 Maven은 실행 환경을 확인해서 선택했다

일반 셸에는 Java와 Maven 실행 명령이 등록돼 있지 않았다. 설치된 개발용 JDK는 11과 17이었고 IntelliJ 실행용 JBR은 25였다. 프로젝트의 `backend/pom.xml`은 Java 21을 기준으로 하므로, 공식 Temurin 21 배포본을 내려받아 제공된 SHA-256과 비교한 뒤 사용자 영역에 압축을 풀었다.

확인한 버전은 Temurin `21.0.13+9`이다. Maven은 IntelliJ에 포함된 배포본을 사용했다. 시스템 전체의 Java 설정이나 기존 프로젝트의 SDK를 바꾼 작업은 아니다.

이 환경에서 다음 Maven 목표를 실행했다. 아래 명령은 실제 실행한 목표를 일반 명령 형태로 표시한 것으로, 당시에는 준비한 JDK와 번들 Maven의 경로를 지정했다.

```bash
mvn -B -f backend/pom.xml verify
```

결과는 `BUILD SUCCESS`였다. 이 시점에는 업무 API 테스트가 없었으므로 이를 연구 기록 기능 검증이라고 해석하지 않았다.

## 실행 계정으로 개발 DB에 연결했다

`deploy/dev-env.ps1`은 소스 밖의 비밀번호 파일을 읽어 개발 환경을 현재 프로세스에 로드한다. 비밀번호를 터미널에 출력하거나 실행 인자에 직접 쓰지 않았다. 개발 DB용 SSH 터널을 유지한 상태에서 빌드된 JAR를 Java 21로 실행했다.

`TechLabApplication`은 로컬 루프백에서 시작했고, `/actuator/health` 조회 결과는 `UP`이었다. PostgreSQL의 세션 목록에서도 IntelliJ 연결과 별도로 로컬 백엔드의 개발 DB 연결이 생긴 것을 확인했다. 운영 DB에 연결한 실행이 아니다.

| 검증 | 당시 결과 |
| --- | --- |
| PR 병합 | 성공, 확인한 head SHA와 일치 |
| 로컬 main 동기화 | 원격 main과 같은 SHA |
| Maven verify | BUILD SUCCESS |
| Spring Boot 실행 | Java 21, 정상 기동 |
| 개발 DB 연결 | 실제 DB 세션 확인 |
| 상태 확인 | UP |
| 기존 InvenCore | 컨테이너 기준값과 실제 상태 API 정상 |

## CI와 배포 범위는 구분했다

병합 후 [main의 GitHub Actions 실행](https://github.com/seulgae/seulgae-tech-lab/actions/runs/43684508768)에서도 프론트엔드·백엔드 작업이 성공했다. 배포 작업은 `skipped`였다. 전용 자격증명을 설정하거나 자동 배포를 활성화하지 않았고, 운영 컨테이너나 Funnel도 변경하지 않았다.

이번 챕터에서 프로젝트 소스 파일을 추가로 수정하지는 않았다. 기존 코드의 역할은 다음과 같다.

- `backend/pom.xml`: Java 버전과 빌드·의존성 기준이다.
- `backend/src/main/java/kr/seulgae/techlab/TechLabApplication.java`: 로컬에서 실행한 Spring Boot 진입점이다.
- `deploy/dev-env.ps1`: 개발용 연결정보를 현재 프로세스에 제공한다.
- `.github/workflows/ci.yml`: 병합 전후 빌드 검증과 조건부 배포를 구분한다.

## 남은 범위

이 글은 당시 실행 기록과 파일 확인을 바탕으로 작성했으며, 글 작성을 위해 다시 빌드하거나 DB를 변경하지 않았다. 로컬 실행은 셸에서 검증했고, IntelliJ의 Application 실행 구성과 SDK 등록을 GUI로 완료한 것은 아니다.

실행 기준을 main으로 맞췄으므로 다음에는 연구 기록 스키마와 Flyway 마이그레이션을 설계할 수 있다. 자동 배포, 신규 HTTPS 공개, 연구 기록 API와 React 연동은 이 챕터의 완료 범위에 포함하지 않았다.
