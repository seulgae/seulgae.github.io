---
title: Java 17 CI를 확인하고 연구 기록 기능을 main에 병합하기
date: 2026-11-15
createdAt: 2026-11-15T15:48:47+09:00
tags: GitHub, CI, Java, Git
summary: 연구 기록 스키마·API·React 연동과 Java 17 변경의 CI 성공을 확인하고 PR을 병합한 뒤 로컬 main을 동기화한 기록.
category: seulgae-tech-lab
---

연구 기록 기능과 Java 17 기준 수정은 작업 브랜치에 올라가 있었지만 main에는 반영하지 않은 상태였다. 이번에는 사용자의 병합 요청에 따라 최신 커밋의 검증 결과를 확인하고 기준 브랜치에 합쳤다.

## 최신 head의 CI부터 확인했다

PR #2는 열린 상태였고 충돌 없이 병합할 수 있었다. head는 `811c41d2a7a557e5693aba0bb9f5f3b1c02f1c90`이었다. 이전 Java 21 기준의 검증 결과를 대신 사용하지 않고, Java 17 수정이 포함된 해당 커밋의 CI 성공을 확인했다.

[확인한 CI 실행](https://github.com/seulgae/seulgae-tech-lab/actions/runs/43686942743)

## 확인한 SHA를 지정해 병합했다

원하는 변경 이후 head가 달라졌다면 병합이 거부되도록 예상 SHA를 지정하고 merge 방식으로 병합했다. 결과 커밋은 `a9cd7ed0a5fa966f5ca05696e5651637998500c7`이다.

[병합한 PR #2](https://github.com/seulgae/seulgae-tech-lab/pull/2)

이 PR에는 Flyway V1, 연구 기록 저장·목록·상세 API, React 패널 연동, 임시 PostgreSQL 통합 검증 및 Java 17 기준 수정이 포함된다. 이번 병합 작업 자체에서 소스 파일을 추가로 수정하지 않았다.

## 로컬 작업 폴더도 main으로 맞췄다

변경 사항이 없는 작업 트리를 확인한 뒤 다음 명령을 실행했다.

```bash
git switch main
git pull --ff-only origin main
git status --short
git rev-parse HEAD
```

fast-forward가 성공했고 로컬 HEAD가 병합 커밋과 같은 것을 확인했다. 작업 트리는 깨끗했다. 강제 초기화나 개인 IntelliJ 실행 구성 삭제는 하지 않았다.

## 병합과 운영 적용은 별개이다

이번에 완료한 것은 코드 병합과 로컬 동기화이다. 기존 개발 DB와 브라우저 검증을 다시 실행하지 않았으며, 운영 DB에 Flyway를 적용하거나 서버 이미지를 바꾸지 않았다. 자동 배포도 활성화하지 않았다.

따라서 main의 코드와 운영 서버의 실행 이미지는 아직 다를 수 있다. 다음은 운영 마이그레이션·배포 절차와 남아 있는 IntelliJ 실행·중지 확인이다. 이 글은 해당 작업 기록으로 저장했으며 블로그 커밋·푸시·배포는 수행하지 않았다.
