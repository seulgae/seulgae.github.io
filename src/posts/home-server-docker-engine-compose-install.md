---
title: 홈서버 구축 5 — Ubuntu에 Docker Engine과 Compose를 설치하고 검증하기
date: 2026-11-21
createdAt: 2026-11-21T23:21:56+09:00
tags: Docker, Docker Compose, Ubuntu, Linux, Containers, Security
summary: 공식 APT 저장소 설치와 hello-world 검증을 클라이언트·데몬·권한·컨테이너 수명으로 나눠 설명했다.
category: home-server
---

## 1. 들어가며

[4편](/blog/home-server-ssh-keys-ufw)까지 서버에 관리 접속할 경로를 만들었다. 이제 PostgreSQL과 Spring Boot의 실행 환경을 컨테이너로 구성한다. 실제 기록에는 Docker 설치와 hello-world 테스트, 이미지·컨테이너·로그 확인이 있다. 정확한 최초 설치 명령 전체는 없어 아래 절차는 공식 문서와 대조한 재현용 예시로 제시한다.

## 2. 구현 목표

Docker CLI가 데몬에 접속하고 이미지를 받아 컨테이너를 실행할 수 있어야 한다. Compose 플러그인도 따로 확인한다. 버전 문자열이 출력된 것과 실제 컨테이너가 실행된 것은 다른 완료 조건이다.

## 3. 사전 지식

Docker CLI는 명령을 전달하고 Docker 데몬은 이미지·컨테이너·네트워크·볼륨을 관리한다. VM 안에서 실행하는 Linux 컨테이너는 Ubuntu 게스트의 커널을 공유한다. 앱마다 게스트 OS를 새로 부팅하지 않는 점이 VM과 다르지만, 자원 사용이 없거나 완전히 격리된 하드웨어라는 뜻은 아니다.

Dockerfile은 이미지를 만드는 절차, Compose는 여러 서비스의 실행 구성을 정의한다. `docker compose`는 플러그인 기반 명령이며 과거 `docker-compose` 단독 실행 파일과 구분한다. [Docker 컨테이너 설명](https://docs.docker.com/learn/content/what-is-a-container/)과 [Compose 모델](https://docs.docker.com/compose/intro/compose-application-model/)을 기준으로 읽었다.

## 4. 현재 환경

대상은 Ubuntu Server 24.04 LTS 계열이다. 이후 물리 서버 기록의 Engine 29.9.3·Compose v5.7.1은 당시 확인값이다. 아래 설치가 그 버전으로 고정된다는 뜻은 아니다. 재현하려면 OS·아키텍처·설치 패키지 버전을 함께 기록한다.

기존 Docker와 앱이 실행 중이라면 새 설치 절차를 바로 반복하지 않는다. 기존 패키지 출처·컨테이너·볼륨을 조사한 뒤 충돌을 조정한다. 아래는 **새 실습 서버**를 전제로 한다.

## 5. 구축 과정

### 공식 저장소의 키와 출처 연결

현재 [Docker Ubuntu 설치 문서](https://docs.docker.com/engine/install/ubuntu/)는 공식 APT 저장소 방식을 안내한다. 아래 키는 저장소 서명을 확인하기 위한 공개키다.

```bash
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

`ca-certificates`는 HTTPS 인증서 검증, `curl`은 키 다운로드에 사용한다. `-f`는 HTTP 오류를 실패로 처리하고 `-L`은 리다이렉트를 따른다. 키를 받는 것만으로 저장소가 등록되지는 않는다.

```bash
sudo tee /etc/apt/sources.list.d/docker.sources >/dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```

코드명과 CPU 아키텍처를 현재 Ubuntu에서 읽고, 해당 저장소의 서명 키를 `Signed-By`로 연결한다. 예전 sources 항목과 같은 저장소를 중복 등록하지 않는다. 최초 설치 때 이 형식을 썼다는 기록은 없으며 현재 공식 방식의 예시다.

### Engine·CLI·Compose 설치

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl status docker --no-pager
```

Engine·명령 도구·컨테이너 런타임과 빌드·Compose 플러그인을 설치한다. 서비스가 실행되지 않았다면 로그를 확인한 뒤 시작한다. 패키지 충돌이나 DNS 오류를 서비스 재시작으로 덮지 않는다.

### 버전과 실행을 각각 검증

```bash
docker --version
sudo docker version
docker compose version
sudo docker run --name hello-lab hello-world
```

`--version`은 CLI, `docker version`은 Client와 Server, Compose 명령은 플러그인을 확인한다. hello-world는 이미지를 받아 짧게 실행한 뒤 종료한다. 따라서 `docker ps`에 남지 않는 것이 곧 실패는 아니다.

```bash
sudo docker ps
sudo docker ps -a
sudo docker images
sudo docker logs hello-lab
sudo docker inspect --format '{{.State.ExitCode}}' hello-lab
```

`ps`는 실행 중, `ps -a`는 종료된 컨테이너까지 보여 준다. `images`는 컨테이너 목록이 아닌 로컬 이미지 목록이다. `logs`는 표준 출력·오류, `inspect`는 상태와 설정을 조회한다. 위 예시는 같은 이름이 없을 때 사용하고 재시험 시 이름 충돌을 구별한다. 비밀 환경변수가 있는 서비스의 전체 inspect 출력은 공개하지 않는다.

## 6. 트러블슈팅 — Docker 소켓 접근 거부

기존 운영 기록에는 SSH 로그인 뒤 Docker 소켓 접근이 거부된 사례가 있다. 로그인 계정의 Docker 그룹 권한을 추가하고 새 SSH 연결에서 명령을 확인했다. SSH 공개키 성공과 Docker 관리 권한은 다른 단계였다.

그룹에 추가하는 일반적인 예시는 다음과 같다.

```bash
sudo usermod -aG docker "$USER"
```

`-aG`는 기존 보조 그룹을 보존하며 추가한다. 기존 세션의 그룹 정보는 즉시 바뀌지 않을 수 있어 로그아웃 후 새로 로그인하고 `id -nG`로 확인한다. 소켓을 누구나 쓰도록 `chmod 666`으로 푸는 방식은 사용하지 않는다.

**docker 그룹은 관리자 수준 권한을 준다.** 단순히 sudo 입력을 줄이는 편의 설정으로 취급할 수 없다. 권한을 줄 계정을 제한하고 rootless 등 다른 운영 방식은 별도 검토한다. [Docker 설치 후 권한 안내](https://docs.docker.com/engine/install/linux-postinstall/)의 중요한 전제다.

이미지 pull 실패는 소켓 권한과 다를 수 있다. DNS·외부 HTTPS·저장소 인증·디스크 용량을 나누어 확인한다. hello-world가 된다고 Compose의 DB 연결까지 검증된 것은 아니다.

## 7. 기술적 이해 — UFW와 게시 포트

Docker가 컨테이너 포트를 게시하면 패킷 전달 규칙이 추가된다. 호스트 UFW 인바운드 차단만으로 게시 포트도 모두 보호된다고 가정할 수 없다. 필요한 서비스만 루프백에 게시하거나 내부 네트워크에 두고 실제 외부 경로에서 검사한다. 이 제약은 [Docker 방화벽 안내](https://docs.docker.com/engine/network/packet-filtering-firewalls/)와 함께 확인한다.

컨테이너는 종료 후에도 메타데이터가 남을 수 있다. 이미지·컨테이너·볼륨은 별도 객체라 이미지 삭제와 데이터 보존은 같은 문제가 아니다. 볼륨 삭제를 포함한 일괄 정리 명령을 초기 문제 해결책으로 쓰지 않는다.

## 8. 최종 검증

- [ ] CLI와 데몬 버전을 따로 확인한다.
- [ ] Compose 플러그인 명령이 실행된다.
- [ ] hello-world의 로그·종료 상태를 확인한다.
- [ ] 실행 중/종료된 컨테이너와 이미지 목록을 구분한다.
- [ ] 재로그인 후 소켓 권한을 확인한다.
- [ ] Docker 네트워크·볼륨과 포트 공개 범위를 조사한다.

실제 hello-world 테스트 경험은 제공 기록에 있지만 원문 전체는 없다. 이번 작성에서는 Docker를 설치하거나 서버 컨테이너를 실행하지 않았다. 현재 서버 버전·서비스 상태는 **확인하지 못함**이다.

## 9. 회고

Docker가 설치됐다는 말에는 도구 설치·데몬 실행·권한·이미지 다운로드·프로세스 실행이 섞여 있었다. 이를 나눠 보면 실패 지점이 분명해진다. 권한 오류를 해결할 때도 편의성과 관리자 권한 부여를 함께 생각해야 했다.

## 10. 다음 편

[6편](/blog/home-server-postgresql-compose-volumes-roles)에서는 PostgreSQL 18을 Compose로 실행하고 데이터 저장·DB 권한·SSH 터널을 연결한다. 특히 18 계열 공식 이미지의 데이터 경로를 오래된 예제와 구분한다.

---

[전체 목차](/blog/home-server-architecture-hyper-v-ubuntu-docker) · [이전 글](/blog/home-server-ssh-keys-ufw) · [다음 글](/blog/home-server-postgresql-compose-volumes-roles)

