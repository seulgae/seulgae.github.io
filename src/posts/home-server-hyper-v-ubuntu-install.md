---
title: 홈서버 구축 2 — Windows Hyper-V에 Ubuntu Server 설치하기
date: 2026-11-21
createdAt: 2026-11-21T23:18:24+09:00
tags: Ubuntu, Hyper-V, Windows, Linux, Virtualization, APT
summary: Windows Pro에서 Ubuntu VM을 준비하는 순서와 설치 옵션의 의미, OS·커널·패키지 상태를 구분하는 검증 방법을 정리했다.
category: linux-ops
---

## 1. 들어가며

[1편](/blog/home-server-architecture-hyper-v-ubuntu-docker)에서 개발 PC와 서버의 역할을 나눴다. 다음은 Windows를 개발 환경으로 유지하면서 별도의 Linux 서버를 만드는 단계다. 나는 Hyper-V에 Ubuntu Server를 설치했고 초기화와 재설치도 경험했다. 다만 당시 모든 설치 화면과 자원 지정값은 자료에 없으므로, 실제 경험과 지금 다시 설치할 때의 예시를 구분한다.

## 2. 구현 목표

Ubuntu가 ISO 없이 가상 디스크에서 부팅되고, OS·커널·디스크·네트워크 상태를 확인할 수 있으면 이 단계의 기준을 충족한다. 웹 앱이나 Docker 실행은 아직 완료 조건이 아니다. 원격 접속이 안 돼도 Hyper-V 콘솔에서 복구할 수 있도록 콘솔 경로를 유지한다.

## 3. 사전 지식 — 가상머신에도 부팅 장치가 필요하다

Hyper-V의 가상 CPU·메모리·디스크는 게스트 OS가 사용할 자원이다. 호스트 RAM이 32GB라는 기록이 곧 VM에 32GB를 줬다는 뜻은 아니다. 실제 생성 당시 할당량은 확인되지 않았다.

2세대 VM은 UEFI 기반이다. Ubuntu ISO로 재현할 때는 Secure Boot의 Linux용 인증서 템플릿을 확인한다. 부팅 실패를 보고 곧바로 보안 부팅 전체를 끄기보다 ISO·부팅 순서·템플릿을 먼저 대조한다. [Ubuntu의 Hyper-V 설치 안내](https://ubuntu.com/server/docs/how-to/virtualisation/ubuntu-on-hyper-v/)는 `Microsoft UEFI Certificate Authority` 설정을 설명한다.

## 4. 현재 환경과 확인할 조건

확인된 초기 환경은 Windows Pro, Hyper-V, Ubuntu Server 24.04 LTS 계열이다. 제공 메모에는 24.04.5가 기재돼 있다. CPU 모델, 초기 vCPU 수, 디스크 크기와 VM 세대의 실제 선택은 확인 필요다.

Windows에서 다음은 **재현 전 조회 예시**다.

```powershell
systeminfo.exe
Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
```

`systeminfo`에서 가상화 관련 상태를 확인하고, UEFI/BIOS의 Intel VT-x·AMD-V와 필요한 하드웨어 지원을 점검한다. 이미 하이퍼바이저가 실행 중이면 요구 사항 표시가 달라질 수 있다. Windows 버전과 하드웨어 지원을 함께 봐야 한다. [Microsoft 설치 문서](https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/get-started/install-hyper-v)를 기준으로 확인했다.

## 5. 구축 과정

### Hyper-V 활성화

관리자 PowerShell에서 실행하는 **설치 예시**다. 이미 활성화돼 있다면 다시 설정할 필요는 없다.

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

`-Online`은 실행 중인 Windows 이미지, `-FeatureName`은 활성화할 기능, `-All`은 필요한 상위 기능까지 포함한다. 재부팅이 요구되면 작업을 저장한 뒤 진행한다. 명령 성공과 VM 부팅 성공은 별개의 확인이다.

### ISO와 VM 생성

[Ubuntu 공식 릴리스 페이지](https://releases.ubuntu.com/releases/24.04/)에서 서버용 이미지와 체크섬 자료를 확인한다. 내려받은 ISO의 SHA-256은 다음처럼 계산할 수 있다.

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath '<내려받은 Ubuntu Server ISO 경로>'
```

경로는 본인이 받은 파일로 바꾼다. 계산값을 공식 SHA256SUMS와 비교한다. 출처 확인과 다운로드 손상 확인을 생략하고 파일 이름만 믿지는 않는다.

Hyper-V 관리자에서 새 VM을 만들 때의 재현 기준은 다음과 같다.

| 항목 | 판단 기준 |
| --- | --- |
| VM 이름 | 실제 호스트명과 분리한 관리용 이름 |
| 세대 | Ubuntu와 호환되는 2세대 UEFI 구성을 우선 검토 |
| 메모리·CPU | Windows·IDE 자원을 남기고 필요량을 할당; 실제 당시 값으로 단정하지 않음 |
| 디스크 | OS·이미지·로그·DB 증가를 고려한 VHDX; 동적 확장도 물리 디스크 공간을 소비함 |
| 네트워크 | 다음 편의 Internal Switch·NAT와 연결 관계를 확인 |
| DVD | 서버 ISO를 연결하고 설치 시 부팅 장치로 선택 |

Secure Boot 템플릿은 Ubuntu 안내에 맞춰 선택한다. VM 세대는 생성 뒤 바꾸기 어려운 설정이므로 설치 전에 확인한다.

### Ubuntu 설치 화면에서 결정할 것

언어·키보드·네트워크·미러·디스크·사용자·OpenSSH 옵션을 차례로 확인한다. 사용자명과 서버 이름은 공개 글의 예시값을 그대로 운영 식별자로 쓰지 않는다.

디스크를 사용하는 자동 설치 옵션은 **대상 VM의 가상 디스크**가 맞는지 확인한 뒤 선택한다. 재설치는 그 디스크의 데이터에 영향을 주므로 기존 DB가 있는 VM에 최초 설치 절차를 반복하지 않는다. LVM·암호화·추가 패키지의 당시 선택은 확인되지 않아 임의로 채우지 않았다.

설치가 끝나면 설치 매체를 분리하거나 부팅 순서를 조정해 VHDX에서 다시 부팅한다. 세부 화면은 [Ubuntu 기본 설치 안내](https://ubuntu.com/server/docs/tutorial/basic-installation/)와 대조한다.

### OS 정보와 패키지 상태 확인

아래는 설치 뒤 실행할 **검증·갱신 예시**이며 이번 작성에서 실행한 서버 로그가 아니다.

```bash
lsb_release -a
cat /etc/os-release
uname -a
sudo apt update
sudo apt upgrade
```

`lsb_release`와 `os-release`는 배포판 정보를, `uname`은 커널과 시스템 정보를 보여 준다. `lsb_release`가 없다면 `os-release`부터 확인하고 필요한 패키지를 검토한다.

`apt update`는 저장소의 패키지 목록을 새로 받는다. 설치된 소프트웨어를 바꾸는 명령은 `apt upgrade`다. 먼저 목록 갱신 성공 여부를 보고, 업그레이드할 패키지와 재시작 영향을 확인한다. 이것은 다음 Ubuntu 배포판으로의 릴리스 업그레이드와 다르다. [Ubuntu 패키지 관리 문서](https://ubuntu.com/server/docs/package-management/)를 기준으로 구분했다.

## 6. 트러블슈팅 — 재설치의 원인을 만들지 않기

설치 중 시행착오와 재설치 사실은 있지만 정확한 최초 오류 메시지는 없다. 따라서 Secure Boot나 디스크 옵션이 당시 원인이었다고 쓸 수 없다.

다시 문제가 생기면 증상별로 증거를 남긴다. ISO가 뜨지 않으면 매체·부팅 순서·템플릿, 설치 후 다시 설치 화면이면 ISO 연결과 디스크 부팅, 패키지 목록을 못 받으면 IP·경로·DNS를 확인한다. 이는 일반 진단 순서이며 내가 겪은 모든 장애의 확정 원인이 아니다.

## 7. 기술적 이해

서버 설치의 결과물은 터미널 화면 하나가 아니다. 부팅 가능한 디스크와 네트워크 설정, 사용자·관리 권한, 이후 패키지를 설치할 수 있는 경로가 함께 필요하다. 설치가 끝났다는 기준을 명확히 해야 다음 단계의 실패를 OS 재설치로 되돌리는 일을 줄일 수 있다.

## 8. 최종 검증

- [ ] ISO를 분리한 뒤 가상 디스크로 부팅한다.
- [ ] 배포판과 커널 버전을 따로 기록한다.
- [ ] `free -h`, `lsblk`, `df -h /`로 게스트가 보는 자원을 확인한다.
- [ ] `ip -br address`, `ip route`로 주소와 기본 경로를 확인한다.
- [ ] 패키지 목록 갱신과 업그레이드 결과를 구분해 남긴다.
- [ ] 재부팅 뒤 콘솔 로그인이 가능하다.

이 항목은 재현용 완료 기준이다. 이번에는 설치를 다시 실행하지 않았고 최초 설치 출력의 전체 대조는 **확인하지 못함**이다.

## 9. 회고

VM의 자원과 호스트의 자원을 같은 값으로 기록하지 않는 것이 먼저였다. 설치 옵션도 선택 결과뿐 아니라 복구 경로와 데이터 영향을 함께 남겨야 했다. 다음에는 재설치 전에 마지막 정상 상태와 오류 화면을 보관하겠다.

## 10. 다음 편

[3편](/blog/home-server-hyper-v-nat-static-ip)에서는 Internal Switch·Windows NAT·Ubuntu 고정 IP를 연결한다. 주소가 있다는 사실과 인터넷·SSH가 동작한다는 사실을 단계별로 나눈다.

---

[전체 목차](/blog/home-server-architecture-hyper-v-ubuntu-docker) · [이전 글](/blog/home-server-architecture-hyper-v-ubuntu-docker) · [다음 글](/blog/home-server-hyper-v-nat-static-ip)

