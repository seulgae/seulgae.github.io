---
title: 홈서버 구축 4 — SSH 공개키와 UFW를 접속이 끊기지 않는 순서로 설정하기
date: 2026-11-21
createdAt: 2026-11-21T23:20:40+09:00
tags: SSH, OpenSSH, Ubuntu, UFW, Windows, Security
summary: ed25519 공개키와 Windows 에이전트, SSH 접근 제한을 인증·방화벽·검증 순서로 나눠 정리했다.
category: linux-ops
---

## 1. 들어가며

[3편](/blog/home-server-hyper-v-nat-static-ip)에서 서버에 도달할 네트워크를 만들었다. 이번에는 누가 서버를 관리할 수 있는지 정한다. 실제 구축에서는 ed25519 키와 패스프레이즈, UFW의 원본 주소 제한을 사용했다. 접속을 허용하는 설정과 실제 로그인이 가능한지는 새 연결로 확인해야 했다.

## 2. 구현 목표

내 관리 계정이 공개키로 접속하고 필요한 원본에서만 SSH가 허용되는 상태를 만든다. 방화벽을 먼저 켜거나 비밀번호 인증을 먼저 끄는 순서로 자신을 차단하지 않는다. 변경 전 세션과 Hyper-V 콘솔은 복구 경로로 유지한다.

## 3. 사전 지식

SSH 서버의 호스트 키는 접속 대상의 신원을 확인한다. 사용자의 공개키·비공개 키는 로그인 주체를 증명한다. 두 키의 목적을 혼동하지 않는다. 공개키 인증은 서버에 비공개 키를 보내는 방식이 아니다.

`authorized_keys`에는 허용할 공개키를 넣고 비공개 키는 클라이언트에 보관한다. 패스프레이즈는 개인키 파일을 보호하는 값이며 Ubuntu 계정 비밀번호나 DB 비밀번호와 다르다. 알고리즘·파일 옵션은 [OpenSSH ssh-keygen 매뉴얼](https://man.openbsd.org/ssh-keygen)을 대조했다.

## 4. 현재 환경

클라이언트는 Windows, 서버는 초기 Hyper-V Ubuntu다. 아래 주소 `10.77.0.10`과 사용자 `example_admin`은 공개용 예시다. 실제 접속 계정·IP·개인키 경로는 본인 환경에 맞게 바꾼다. 이후 Tailscale 경로에서 서버가 보는 원본 주소도 초기 내부망 주소와 다를 수 있다.

## 5. 구축 과정

### SSH 서버를 준비하고 리스닝 상태 확인하기

아래는 Ubuntu에서의 **재현용 예시**다.

```bash
sudo apt update
sudo apt install openssh-server
systemctl status ssh.socket ssh.service --no-pager
sudo ss -lntp
```

Ubuntu 버전과 설정에 따라 socket activation을 사용할 수 있으므로 서비스 한 항목만 보고 장애라고 결론 내리지 않는다. 실제 리스너와 로그를 함께 본다. [Ubuntu OpenSSH 안내](https://ubuntu.com/server/docs/how-to/security/openssh-server/)가 설정·진단의 기준이다.

### Windows에서 키를 만들고 공개키만 등록하기

일반 PowerShell에서 새 키 파일 이름을 정한다. 이미 있는 키를 덮어쓰지 않는다.

```powershell
ssh-keygen -t ed25519 -f "$env:USERPROFILE\.ssh\homelab_ed25519"
```

프롬프트에서 패스프레이즈를 입력한다. 명령줄에 평문 비밀번호를 넣지 않는다. `.pub` 파일이 공개키이며 확장자가 없는 짝이 비공개 키다. 서버에는 공개키 한 줄만 전달한다.

기존에 신뢰할 수 있는 세션이나 콘솔에서 서버 계정의 `~/.ssh/authorized_keys`에 공개키를 추가한다. 디렉터리는 700, 파일은 600 권한과 해당 계정 소유를 확인한다. 기존 공개키를 덮어쓰지 않고 한 줄로 추가한다.

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

이 명령만으로 키가 등록되지는 않는다. 공개키를 편집기로 추가한 뒤 클라이언트에서 지정한 키로 로그인해야 한다. 첫 연결의 호스트 키 지문은 콘솔 등 신뢰 가능한 경로와 비교한다. 호스트 키 검증을 끄는 우회는 사용하지 않는다.

```powershell
ssh -i "$env:USERPROFILE\.ssh\homelab_ed25519" example_admin@10.77.0.10
```

### 패스프레이즈가 있는 키는 에이전트로 관리하기

기존 운영 기록에서는 서버가 공개키를 수락했지만 비대화형 연결이 개인키를 열지 못한 일이 있었다. Windows ssh-agent를 활성화하고 키를 등록한 뒤 접속했다. 서비스 변경에는 관리자 권한이 필요했고 패스프레이즈는 사용자가 직접 입력했다.

관리자 PowerShell의 설정 예시와 사용자 세션의 키 등록을 나눈다.

```powershell
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
```

```powershell
ssh-add "$env:USERPROFILE\.ssh\homelab_ed25519"
ssh-add -l
```

에이전트에 키를 등록했다고 서버 권한이 생기는 것은 아니다. 서버의 공개키 등록과 계정 정책은 여전히 필요하다. [Windows OpenSSH 키 관리](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement)를 기준으로 확인했다.

### UFW는 허용 규칙을 만든 뒤 활성화하기

아래는 **현재 SSH 원본이 예시 게이트웨이 주소로 보이는 새 실습 환경**의 예시다. 실제 원본은 로그인 기록과 연결 정보로 먼저 확인해야 한다. 기존 규칙도 `sudo ufw status numbered`로 검토한다.

```bash
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow proto tcp from 10.77.0.1 to any port 22
sudo ufw enable
sudo ufw status verbose
```

원본을 틀리게 지정하면 접속이 막힌다. 현재 세션이 살아 있다는 것만으로 통과했다고 판단하지 말고 별도 터미널에서 새 SSH 연결을 연다. 관리 경로가 여러 개라면 검증한 원본을 각각 고려한다. [Ubuntu UFW 안내](https://ubuntu.com/server/docs/how-to/security/firewalls/)처럼 인바운드와 아웃바운드 정책을 구별한다.

### 비밀번호 인증 제한은 키 접속 확인 후 검토하기

공개키로 새 세션과 sudo 사용을 확인한 뒤 SSH 설정 제한을 검토한다. 예를 들어 공개키 허용, root 직접 로그인 금지, 비밀번호·키보드 대화형 인증 제한이다. 기존 include 파일과 Match 조건에 따라 유효값이 달라지므로 줄을 추가한 것만으로 적용됐다고 보지 않는다.

```bash
sudo sshd -t
sudo sshd -T
```

`-t`는 설정 검사, `-T`는 유효 설정 확인이다. 출력에는 운영 설정이 포함되므로 공개하지 않는다. 검사가 통과한 뒤에만 설치 방식에 맞게 서비스 설정을 반영하고 새 세션으로 확인한다. 포트·리스닝 주소 변경은 socket 단위 재설정까지 필요한지 별도로 확인한다.

## 6. 트러블슈팅

| 증상 | 구분할 원인과 증거 |
| --- | --- |
| TCP 연결 시간 초과 | 주소·라우팅·리스너·방화벽; 인증 이전 단계 |
| Permission denied | 계정·공개키 등록·파일 권한·허용 인증 방식 |
| 키 수락 뒤 비대화형 실패 | 패스프레이즈 입력·에이전트 상태 |
| 에이전트 서비스 변경 거부 | Windows 관리자 권한 여부 |
| 로그인 뒤 Docker 접근 거부 | SSH와 별개인 Unix 소켓 권한 |

실제 확인된 에이전트 사례를 모든 초기 SSH 실패의 원인으로 확대하지 않았다. `ssh -v`와 `journalctl -u ssh.service`는 원인을 좁히는 도구지만 원문에는 주소·사용자·키 식별 정보가 들어갈 수 있어 공개 시 제거한다.

## 7. 기술적 이해

UFW는 Linux 패킷 필터를 관리하는 도구이고 SSH는 연결 이후의 인증을 담당한다. 네트워크 허용은 로그인 허용과 다르다. Docker의 게시 포트는 UFW와 별도 경로를 만들 수 있으므로 다음 편에서 다시 다룬다.

## 8. 최종 검증

- [ ] 콘솔 복구 경로를 확보한다.
- [ ] 키를 지정한 새 SSH 세션이 열린다.
- [ ] 호스트 키와 계정 권한을 확인한다.
- [ ] 허용한 원본에서 접속하고 허용하지 않은 원본은 별도로 시험한다.
- [ ] UFW와 SSH의 유효 설정을 확인한다.
- [ ] 재접속 뒤 에이전트·키 사용이 정상인지 확인한다.

이번에는 설정을 실제 서버에 적용하지 않았다. 당시 모든 원본 주소별 거부 결과는 **확인하지 못함**이다.

## 9. 회고

원격 보안 설정에는 적용 순서와 복구 경로가 포함돼야 했다. 개인키 암호 문제를 네트워크 문제로 오해하면 보안 규칙을 불필요하게 풀게 된다. 다음에는 연결·인증·권한을 나눠 증거를 남기겠다.

## 10. 다음 편

[5편](/blog/home-server-docker-engine-compose-install)에서는 Docker Engine과 Compose를 설치한다. Docker 그룹이 단순 조회 권한이 아닌 이유와 데몬 연결·컨테이너 실행 검증을 다룬다.

---

[전체 목차](/blog/home-server-architecture-hyper-v-ubuntu-docker) · [이전 글](/blog/home-server-hyper-v-nat-static-ip) · [다음 글](/blog/home-server-docker-engine-compose-install)

