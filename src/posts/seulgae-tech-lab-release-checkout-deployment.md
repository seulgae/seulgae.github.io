---
title: 슬개기술연구소 — 최신 이미지에 옛 Compose 설정이 붙었던 이유
date: 2026-11-17
createdAt: 2026-11-17T09:29:39+09:00
tags: Docker Compose, GitHub Actions, Python, Git
summary: 이미지와 서버 저장소의 버전 불일치를 릴리스 커밋 동기화와 배포 코드 재실행으로 고친 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

카카오 로그인 설정을 병합하고 배포했는데 로그인 버튼이 없었다. 백엔드 이미지는 최신이었지만 인증 상태 API는 로그인이 꺼져 있다고 응답했다. PR #32의 `bcf205b`는 이미지 배포 성공과 설정 반영 성공이 다를 수 있음을 보여 준 수정이다.

## 배포 대상은 이미지 하나가 아니었다

기록을 따라가면 컨테이너에는 새 로그인 환경변수와 비밀값 연결이 없었다. 이미지 선택은 릴리스 manifest를 사용했지만 Compose와 배포 스크립트는 서버 저장소의 이전 커밋을 읽고 있었다. 옛 사전 점검에는 새 준비물을 검사하는 코드도 없었다.

해결은 무조건 최신 main을 사용하는 방식보다 엄격했다. 이미지가 만들어진 **정확한 릴리스 커밋**으로 설정 파일도 맞췄다. main이 더 앞서 있어도 아직 검증되지 않은 설정을 섞지 않기 위해서다.

`deploy/ops.py`의 `sync_checkout()`에서 발췌했다.

```python
    git(['git', '-C', root, 'fetch', '--quiet', 'origin', 'main'])
    git(['git', '-C', root, 'merge-base', '--is-ancestor', candidate['sha'], 'origin/main'])
    if git(['git', '-C', root, 'rev-parse', 'HEAD'], capture=True) == candidate['sha']:
        return False
    if git(['git', '-C', root, 'status', '--porcelain', '--untracked-files=no'], capture=True):
        raise OpsError('Server checkout has local changes to tracked files; discard them before deploying')
    git(['git', '-C', root, 'checkout', '--quiet', '--detach', candidate['sha']])
    return True
```

먼저 릴리스 SHA가 원격 main의 이력에 속하는지 확인한다. 추적 파일에 로컬 변경이 있으면 덮어쓰지 않고 멈춘다. 서버의 저장소는 개발 브랜치를 계속 따라가는 용도보다 검증된 릴리스의 실행 자료를 제공하는 용도로 다룬다.

## 파일을 바꾼 프로세스는 여전히 옛 코드다

파일만 새 버전으로 바꿔도 이미 시작한 Python 프로세스는 옛 로직을 실행한다. 따라서 저장소가 이동했다면 새 커밋의 배포 코드를 다시 실행해야 했다.

같은 파일의 재실행 구문이다.

```python
                os.execv(sys.executable, [sys.executable, str(ROOT / 'deploy' / 'ops.py'), 'deploy'])
```

환경 표식으로 반복 동기화를 막고 새 프로세스가 사전 점검부터 수행한다. 파일 잠금의 상속 여부도 고려했다. 기존 실행의 잠금이 재실행 뒤 그대로 남아 새 실행을 막지 않아야 한다.

또한 이미지가 같으면 바로 끝내던 처리를 바꿨다. 같은 이미지로도 Compose 환경변수나 secret 연결이 달라질 수 있어 설정 적용을 다시 수행한다. ‘이미지 동일’은 ‘배포할 변경 없음’의 충분한 조건이 아니었다.

## 자동 수정에도 최초 진입점이 필요하다

이 수정이 병합돼도 서버가 옛 배포 스크립트를 실행하면 새 동기화 로직을 알 수 없다. 기록에는 서버 저장소를 처음 한 번 직접 맞춰야 했다고 남아 있다. 자동화가 자신을 갱신하도록 만들 때도 최초 전환 절차는 별도로 필요했다.

테스트에는 이미 일치한 SHA, 실제 이동, 로컬 변경 거부, main 이력 외 커밋 거부, 재실행과 중복 방지가 포함돼 있다. Windows에서 Linux 전용 잠금 모듈을 바로 쓰지 못했던 제약도 기록됐다. 이번 글에서는 테스트를 재실행하거나 서버에 접속하지 않았다. 현재 운영 적용 여부는 **확인하지 못함**이다.

## 배운 점

이미지와 Compose·배포 코드가 같은 릴리스를 가리켜야 했다.
실행 중인 배포 도구는 파일 교체 뒤에도 명시적으로 새 코드로 전환해야 했다.
설정만 달라진 배포와 자동화의 최초 전환 절차를 따로 다뤄야 했다.
