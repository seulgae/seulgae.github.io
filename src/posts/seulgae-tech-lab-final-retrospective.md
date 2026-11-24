---
title: 슬개기술연구소 최종 회고 — 화면에서 데이터와 운영까지
date: 2026-11-24
createdAt: 2026-11-24T19:26:40+09:00
tags: Retrospective, Phaser, Spring Boot, PostgreSQL, WebSocket, CI/CD
summary: 연구소 개발을 마치며 사용한 기술과 주요 장애, 설계 판단의 변화를 정리하고 이전 글 85편을 주제별로 묶었다.
category: seulgae-tech-lab
---

호숫가에서 정문을 지나 로비에 들어오면, 연구소에서 무엇을 할 수 있는지 안내받는다. 마지막에는 야외 표지판에서 엔딩을 볼 수 있다. 그 사이에 만든 것은 방과 미니게임뿐만이 아니다. 한 번의 입력이 어느 화면에 전달되는지, 여러 요청이 겹쳤을 때 누가 잔액을 바꿀 수 있는지, 새 앱과 기존 DB가 어느 순서로 바뀌어야 하는지까지 다뤘다.

이번 글로 슬개기술연구소 개발을 마무리한다. 앞서 쓴 연구소 글 85편과 개발 로그를 바탕으로 사용한 기술, 오류를 좁힌 과정, 개발하면서 판단이 바뀐 지점을 정리했다. 같은 기능을 여러 시기에 다룬 글은 당시 구현을 기록한다. 연구 기록과 채용 기능처럼 이후에 제거한 사례도 이 회고에 포함했다.

## 화면과 게임 입력 · 무엇이 화면을 제어하는가

Windows에서 Git으로 저장소를 준비하고 Vite, React, TypeScript로 프런트엔드를 구성했다. Phaser는 장면과 Arcade Physics를 맡고 React는 패널과 입력 폼을 맡았다. Phaser 3.90.0을 고정한 뒤 React의 생성·정리 흐름에 게임을 연결했다. StrictMode에서 마운트가 다시 일어나는 상황을 고려해 생성 예약을 취소하고 게임과 이벤트 구독을 정리했다. 이때부터 화면이 한 번 열리는 것과 열고 닫기를 반복해도 정상인지를 따로 보게 됐다.

캐릭터 이동은 프레임 간 경과 시간과 정규화한 방향을 사용했다. 발밑 충돌 영역과 스프라이트 크기를 분리해 그림이 벽에 닿는 모양과 실제 통과 여부를 조정했다. 방에는 공유 맵의 문·충돌·상호작용 좌표를 사용했다. 낚시터를 옮겼을 때 데크 그림과 함께 발소리 영역, 상호작용 지점, NPC 산책 경로도 바꿔야 했던 이유다. 방의 문 좌표를 재사용한 폰 지도 역시 같은 공간을 여러 화면에서 설명할 때 기준 데이터를 공유한 사례다.

키보드 입력은 화면의 경계를 그대로 따르지 않았다. 게시판 입력창을 열어도 Phaser가 전역 키를 가로채 띄어쓰기가 입력되지 않았다. 포커스가 입력창으로 넘어가는 동안 키 캡처를 풀고 닫거나 장면을 종료할 때 되돌렸다. 모바일 조이스틱도 손가락을 떼는 경우에 더해 포인터 취소, 화면 전환, 패널 열기에서 입력을 해제해야 했다. 겹치는 의자와 NPC는 무조건 한쪽을 우선하기보다 실제로 가까운 대상이 무엇인지 판단하도록 바꿨다.

픽셀아트와 한글에는 다른 표시 요구가 있었다. 글자의 가는 획이 손실될 때는 표시 크기와 기기 픽셀 비율, 정수 캔버스의 반올림 결과를 함께 확인했다. 합성 음원을 붙인 뒤에는 물리와 렌더링이 서로 다른 주기로 갱신되는 문제도 만났다. 120Hz 재현에서 물리 갱신 사이에 위치가 그대로인 프레임을 정지로 판단해 첫 발 소리가 반복됐다. 좌표가 얼마나 오래 유지됐는지로 정지를 판단하도록 바꾼 뒤 60·90·120Hz 모사 테스트에서 발소리 횟수를 비교했다. 실제 고주사율 휴대폰 청취와 음질은 별도 확인이 필요한 범위로 남겼다.

정보를 보여 주는 방법도 고쳤다. 2초 안내는 문구가 사라져도 조작할 수 있어야 했고, 커피 회복은 첫 구매 전 상태를 못 읽으면 변화량이 보이지 않았다. 뒤에는 카페 배너에서 구매 정보만 보여 주도록 문구를 다시 줄였다. 첫 출근 로봇은 지금 갈 곳을 알려 주고, 로비의 선임과 내 자리의 인수인계서는 뒤에 필요한 정보를 맡았다. 튜토리얼 선택은 브라우저 단위로 보존했다. 사용자가 그 순간 알아야 하는 정보와 나중에 다시 찾아볼 정보를 나누는 쪽으로 화면이 바뀌었다.

## 실시간 통신 · 서버 판정과 화면 표시의 시간을 구분하다

Spring WebSocket으로 로비 이동과 채팅을 연결했다. 서버는 좌표를 통째로 받아들이는 대신 이동 입력과 순번을 검증하고 충돌을 판정했다. 클라이언트는 내 캐릭터를 먼저 움직여 조작감을 유지했다. 채팅과 이동은 연결 하나를 공유하고 화면은 상태를 구독하도록 했다. 방을 옮길 때는 입력과 스냅샷을 어느 방문에 적용할지 구분했고, 이후 실시간 연결을 회의실 중심으로 좁히면서 일반 방 이동과 아이템 변경에 필요한 통신을 다시 나눴다.

연결이 끊기는 문제와 캐릭터가 튕기는 문제에는 서로 다른 조치가 필요했다. 내 캐릭터가 흔들릴 때는 지연된 서버 좌표를 현재 좌표와 바로 비교하던 흐름과 `body.reset()`이 속도와 충돌 상태까지 바꾸는 경로를 확인했다. 서버가 처리했다고 알려 준 입력 번호의 예측 위치를 찾아 비교하고, 물리 갱신이 끝난 뒤 보정하도록 바꿨다. 상대 캐릭터의 움직임은 서버 시각으로 스냅샷 사이를 보간했다.

정상 입력도 네트워크에서 지연됐다가 몰리면 수신 시점의 이동 예산을 초과할 수 있었다. 검증을 거친 입력은 한도 내에서 대기시키고 서버가 받은 순번과 처리를 끝낸 순번을 분리했다. 격리 재현에서는 같은 시각에 도착한 이동 스텝 180개를 수정 전에는 120개까지 받아들였고 수정 뒤에는 180개를 끝까지 처리했다. 이 재현은 운영에서 관찰한 모든 종료의 원인을 확정한 결과와 범위가 다르다.

협동 연구실의 유즈맵은 다른 선택을 했다. 플랫폼 서버가 방·준비·채팅과 메시지 중계를 맡고, 맵은 sandbox iframe에서 실행하며 방장 브라우저가 게임 결과를 계산한다. 결과를 서버 경제에 연결하지 않은 이유는 브라우저가 결정한 값을 신뢰할 수 있는 범위가 제한되기 때문이다. 또 운영에서 방 이동이 끝나기 전에 대기실을 한 번 열려다 실패하자, 열기 성공 여부를 받아 제한 시간 동안만 재시도하도록 바꿨다. 로컬 두 연결로 방 생성과 채팅, 시작까지 확인했고 내장 미리보기에서 차단된 iframe 실행은 별도 검증 범위로 남겼다.

## 백엔드와 데이터 · 잔액, 소유권, 한 번의 지급

Java 17, Spring Boot, Maven, PostgreSQL, JdbcClient와 Flyway를 사용했다. 기능 안에서 컨트롤러, 서비스, 저장소와 DTO의 역할을 나눴다. SQL을 직접 작성하면서 서비스 코드의 판단과 DB가 최종으로 보장할 조건을 구별할 수 있었다. 인터페이스와 구현을 나눈 뒤에는 의존 방향이 명시적으로 보였지만 작은 기능에서도 파일 수와 이동 경로는 늘었다.

동전 장부에서 가장 많이 반복된 원칙은 읽은 뒤 판단한 값을 그대로 믿을 수 없다는 것이었다. 잔액을 읽고 충분하다고 판단한 뒤 무조건 빼면 두 요청이 같은 잔액을 기준으로 통과할 수 있다. 잔액 조건을 UPDATE에 넣고, 가구 구매에서는 차감과 보유 가구 생성을 같은 트랜잭션으로 묶었다. 송금은 출금과 입금 장부를 함께 남기고, 회의실 교환은 신청 뒤 실제 변경 순간에 양쪽 소유권을 검사했다. UI에서 초록색으로 표시된 가구 위치도 서버에서 다시 확인했다.

한 번만 처리할 조건은 기능마다 달랐다. 적금은 아직 닫히지 않은 행, 급여와 침대 휴식은 마지막 처리 시각, QA는 직전 상태, 가상 시세는 읽었던 갱신 시각을 UPDATE 조건으로 사용했다. 엔딩은 마지막 대화에서 인벤토리 행을 잠그고 직급과 잔액을 다시 확인한 뒤 환생 여부를 기록했다. 이 사례들을 거치며 트랜잭션의 범위와 어떤 요청이 변경할 자격이 있는지는 둘 다 명시해야 한다는 점을 배웠다.

초기에는 비용, 간식, 직급 값이 서버와 화면에 흩어져 있었다. V23·V24에서 규칙을 DB로 옮기고 API로 같은 값을 내려 주면서 화면의 가격과 서버의 차감 기준을 맞췄다. 규칙 캐시는 시간이 지난 뒤 들어온 조회에서 새 값을 읽으며, 읽기 실패 시 이전 값이나 초기 기본값을 사용한다. 주석에 '1분마다 읽는다'고 적어 두면 백그라운드 갱신처럼 읽히므로 실제 갱신 시점에 맞게 고쳤다. 여전히 코드에 남아 있던 한도도 있었고, 데이터로 옮긴 규칙에는 변경 시점과 fallback을 설명하는 문서가 필요했다.

## 인증과 운영 권한 · 화면이 아는 상태와 서버가 허용한 상태

초기 게시판의 수정 키를 유지하면서 카카오 로그인과 서명 쿠키를 추가했다. 회원별 API는 소유권을 확인하고, 등급 신청과 승인에는 DB 제약과 조건부 갱신을 사용했다. 기존 관리자 계정이 잠기지 않도록 잠시 설정 ID 예외를 뒀다가, 새 등급 체계로 옮긴 뒤 제거했다. 관리자실 문은 이용 가능한 기능을 알려 주고, SQL 콘솔과 승인 API의 권한은 서버가 요청마다 확인한다.

서버가 관리자로 판단해도 관리자실 문이 열리지 않는 일도 있었다. 로그인 조회가 게임 클라이언트보다 먼저 끝나면 화면에 권한 상태를 전달할 대상이 없었다. 문을 열 때 현재 인증 상태를 조회하도록 바꿨다. 권한 부여, 권한을 보여 주는 화면, 화면이 생성되는 시점이 서로 다른 문제임을 보여 준 사례다. SQL 콘솔은 DB 계정 권한과 실행 시간·응답 크기 제한을 함께 두었다. JDBC 대역의 테스트 기록과 운영 PostgreSQL 권한을 직접 확인한 기록은 구별했다.

## 배포와 운영 · 실패한 위치를 분리해서 찾기

개발·운영 DB와 실행·마이그레이션 권한을 분리했다. 홈 서버에는 Docker Compose, nginx와 Tailscale을 연결했고 GitHub Actions와 GHCR로 빌드·게시·배포 흐름을 만들었다. 검증된 이미지 digest와 릴리스 커밋을 함께 보는 이유도 운영 과정에서 드러났다. 새 이미지를 받아도 서버 저장소가 오래된 커밋이면 이전 Compose 설정으로 실행할 수 있었다. 서버 체크아웃을 릴리스 커밋에 맞추고 배포 도구를 새 코드로 이어서 실행하도록 정리했다.

DB 변경의 핵심은 운영 중인 앱과 다음 앱이 함께 사용할 수 있는 중간 상태였다. 새 기능은 스키마를 먼저 확장하고, 제거는 코드에서 의존을 떼고 난 뒤 DB를 축소했다. 테이블 이름 변경에는 V17 호환 뷰를 두고 새 이름을 쓰는 앱이 배포된 뒤 V18에서 뷰를 정리하는 순서를 잡았다. 연구 기록을 제거할 때는 공통 예외 처리기·패널 CSS와 배포 확인 경로를 먼저 찾아 옮겼다. 채용 기능도 검색과 접수 중심 설계를 모두 경험한 뒤 제거했다. 기능을 덜어내는 결정에도 남겨야 할 데이터와 공유 의존성을 파악하는 작업이 필요했다.

| 장애 또는 오류 | 확인한 원인과 대응 |
| --- | --- |
| 서버 이전 뒤 HTTPS는 열리는데 WebSocket이 1006으로 끝남 | 사이트 주소 변경이 WebSocket Origin 허용 목록에 반영되지 않았다. 업그레이드 전 판정 경로를 확인하고 허용·거부를 실제 핸드셰이크로 검사했다. |
| 첫 화면과 방 전환이 함께 느림 | 정적 파일도 API처럼 늦게 응답해 네트워크 경로부터 살폈다. nginx 압축, 해시 에셋 캐시, Vite 청크 분리와 연결 대기 시간을 조정했다. 당시 측정값은 현재 성능으로 일반화하지 않았다. |
| 운영 DB는 V14인데 배포가 중단됨 | 사전 검사 목록이 V13까지만 허용했다. V14를 추가하고 지원 목록이 마이그레이션 파일과 어긋나면 테스트가 실패하도록 했다. |
| V17 적용 전에 사용 코드가 병합돼 배포와 마이그레이션이 모두 막힘 | 최신 앱은 V17 이상을 요구하고 체크아웃된 도구는 V18을 목표로 삼았다. 실행 중인 앱도 V18을 허용하지 않았다. 사용 코드 PR을 되돌려 중간 릴리스로 돌아간 뒤 V17을 적용하고 다시 올렸다. 기록상 기존 서비스와 DB는 유지됐다. |
| 서버 용량 수집에서 SSH 연결·인증이 순차적으로 실패함 | 호스트 키 종류, Java 17에서 Ed25519 개인키를 읽는 의존성, 서버 공개키 등록을 차례로 확인했다. 기존 RSA 테스트가 놓친 키 형식으로 회귀 검증을 추가했다. 공개키 등록 뒤 운영 수집 성공이 후속 PR에 기록됐다. |
| 배포 도구 테스트 도중 로컬 작업 트리가 바뀜 | 테스트가 실제 배포 경로의 Git 체크아웃을 실행했다. 남아 있던 변경을 확인해 복구했으며, 테스트가 파일·Git 상태에 미치는 영향도 검증 환경을 고르는 기준이 됐다. |

MINA SSHD로 읽은 호스트 CPU·메모리·가동시간과 JVM 내부 MXBean에서 읽은 힙·GC 지표도 구분했다. 네 개의 랙에 지표를 나눴고, 수집에 실패하면 마지막 성공 값과 시각을 남겼다. 운영을 보며 배운 것은 상태가 정상인지 표시하는 일만큼 그 숫자가 언제, 어디에서 수집됐는지 알 수 있게 하는 일이 중요하다는 점이다.

## 개발을 마치며

처음에는 방과 기능을 하나씩 연결하는 데 집중했다. 규모가 커지면서 내가 더 자주 돌아보게 된 질문은 세 가지였다. **누가 최종 상태를 결정하는가. 어느 시점의 상태로 판단하는가. 실패하면 어느 기록으로 원인을 확인하는가.** 이 질문은 키보드 포커스부터 서버 이동 판정, 재화 지급, DB 마이그레이션에 이르기까지 반복됐다.

검증도 같은 방식으로 나눠 보게 됐다. 순수 함수와 서비스 테스트에서는 규칙을 확인하고, 일회용 PostgreSQL에서는 SQL과 스키마를 확인했다. 로컬 두 창과 지연 재현은 움직임을 비교하는 데 썼고, 로그인 대체 응답은 화면 흐름을 확인하는 데 썼다. PR 병합, CI 통과, 실제 운영 적용은 각각 별도의 근거로 기록했다. 이 글은 당시 남긴 검증을 모은 회고이며 전체 운영 기능을 다시 시험한 결과는 아니다.

이 프로젝트 개발은 여기서 마친다. 연구소를 하나의 게임 화면에서 시작해 다른 사람과 연결되는 공간으로 만들면서, 기능을 추가하는 결정과 유지할 범위를 줄이는 결정까지 경험했다. 이후 다른 프로젝트에서도 기능이 화면에 보이는 순간부터 데이터가 남고 배포가 끝나는 순간까지, 각 단계에서 무엇을 확인해야 하는지 생각할 수 있게 됐다.

## 전체 글 찾아보기

기존 85편을 아래 여섯 주제로 묶었다. 여러 주제에 걸친 글은 읽기 좋은 위치 한 곳에 배치했다.

### 화면·공간·사용자 경험

- [React와 Phaser 3를 연결해 첫 게임 화면 띄우기](/blog/seulgae-tech-lab-react-phaser-first-screen)
- ["Phaser 4.2.1에서 3.90.0으로 변경하고 버전 고정하기"](/blog/seulgae-tech-lab-phaser-4-2-1-to-3-90-0-pin-prune)
- [Phaser 플레이어 이동 구현 — delta 적용과 대각선 속도 정규화](/blog/seulgae-tech-lab-phaser-player-movement)
- [픽셀 캐릭터의 외형과 발밑 충돌을 분리하기](/blog/seulgae-tech-lab-pixel-character-foot-collider)
- [Phaser 한글 획이 사라진 원인은 축소 렌더링이었다](/blog/seulgae-tech-lab-hangul-canvas-device-pixels)
- [한글은 써지는데 띄어쓰기가 막힌 이유](/blog/seulgae-tech-lab-phaser-key-capture-text-input)
- [모바일 조이스틱은 방향보다 손을 뗀 순간이 중요했다](/blog/seulgae-tech-lab-mobile-joystick-input-lifecycle)
- [컴퓨터 상호작용으로 React 연구 기록 패널 열기 — 슬개기술연구소 8단계](/blog/seulgae-tech-lab-computer-interaction-research-panel)
- [같은 E 키에 방마다 다른 책임을 연결하기](/blog/seulgae-tech-lab-per-room-e-interactions)
- [충돌 좌표를 지키면서 방의 분위기를 바꾸기](/blog/seulgae-tech-lab-room-themes-door-animation)
- [회의 안건과 아이디어 일지, 공간에 쓰기와 생활감을 더하다](/blog/seulgae-tech-lab-room-boards-seats-and-living-props)
- [연구 기록 컴퓨터 앞 의자를 치울 때 확인한 좌석 데이터](/blog/seulgae-tech-lab-development-lab-seat-removal)
- [사무실 배치와 NPC 동선을 함께 검증하기](/blog/seulgae-tech-lab-office-layout-navigation-and-npc-behavior)
- [방의 위치를 바꾸어도 기능의 정체성은 유지하기](/blog/seulgae-tech-lab-room-identity-and-build-reactions)
- [연구 기록을 옮기고 짧은 방명록의 입력 계약을 맞추기](/blog/seulgae-tech-lab-supercomputer-guestbook-unicode)
- [방의 문 좌표로 폰 지도를 만들고 스태미나 이름을 바로잡기](/blog/seulgae-tech-lab-stamina-map-world-layout)
- [낚시터를 옮길 때 그림 밖의 좌표도 함께 옮기기](/blog/seulgae-tech-lab-fishing-dock-spatial-consistency)
- [움직이는 NPC와 저녁 포장마차의 시간을 분리하기](/blog/seulgae-tech-lab-townsfolk-food-cart-fish-sale)
- [오디오 파일 대신 코드로 게임의 소리를 만들기](/blog/seulgae-tech-lab-synthesized-game-audio)
- [120Hz 화면에서 발걸음이 연속으로 들린 이유](/blog/seulgae-tech-lab-high-refresh-mobile-footstep-timing)
- [따라오는 로봇에게 긴 설명 대신 작은 힌트를 맡기기](/blog/seulgae-tech-lab-tutorial-robot-time-based-follow)
- [안내를 지워도 상호작용은 남아 있어야 했다](/blog/seulgae-tech-lab-two-second-interaction-hints)
- [로비 소품의 상태를 어디까지 저장할 것인가](/blog/seulgae-tech-lab-lobby-cafe-and-books)
- [회복 결과를 보여 주고 의자에서 컴퓨터를 켜기](/blog/seulgae-tech-lab-energy-display-seat-interaction-followups)
- [Java 연습 오류와 QA 버튼이 알려 준 피드백의 차이](/blog/seulgae-tech-lab-java-practice-errors-and-qa-buttons)
- [서버실 로봇이 점검 방법을 안내하도록 연결하기](/blog/seulgae-tech-lab-server-room-robots-and-monitoring-story)
- [첫 출근 안내를 호숫가에서 내 자리까지 잇기](/blog/seulgae-tech-lab-first-day-onboarding-handover)


### 멀티플레이·실시간 연결

- [서버 기준 이동에도 전송과 종료의 순서가 필요했다](/blog/seulgae-tech-lab-authoritative-lobby-connection-lifecycle)
- [Phaser 멀티플레이어 트러블슈팅 — 이동 입력 대기 처리와 원격 캐릭터 보간](/blog/seulgae-tech-lab-phaser-multiplayer-input-burst-remote-interpolation)
- [Phaser 멀티플레이어 이동 진동 해결 — body.reset과 ack 기반 위치 보정](/blog/seulgae-tech-lab-phaser-multiplayer-movement-rubber-banding)
- [방을 바꿀 때 좌표뿐 아니라 입력의 세대도 바꾸기](/blog/seulgae-tech-lab-room-travel-input-epochs)
- [의자에서 다시 일어난 이유는 오래된 걸음이었다](/blog/seulgae-tech-lab-seat-input-race-mobile-nickname)
- [채팅창을 열어도 게임 연결은 다시 만들지 않기](/blog/seulgae-tech-lab-chat-connection-ownership)
- [한 주소의 새 연결이 기존 연결을 대신하게 만들기](/blog/seulgae-tech-lab-single-address-websocket)
- [HTTPS는 열리는데 WebSocket만 연결되지 않은 이유](/blog/seulgae-tech-lab-websocket-origin-server-migration)
- [멀티플레이를 회의실에만 남겨 이동을 단순하게 만들기](/blog/seulgae-tech-lab-meeting-room-only-multiplayer)
- [아이템 교환은 신청보다 소유권 확정이 중요했다](/blog/seulgae-tech-lab-meeting-item-trade-ground-events)
- [협동 연구실에서 맵 실행과 대기실을 분리하기](/blog/seulgae-tech-lab-cooperative-usemap-lobby-iframe)


### 백엔드 설계·게임 상태와 재화

- [기능별 패키지 안에서 계층을 다시 나누기](/blog/seulgae-tech-lab-backend-feature-layer-packages)
- [물고기 소유권과 동전 잔액을 조건부 UPDATE로 지키기](/blog/seulgae-tech-lab-inventory-coins-conditional-updates)
- [간식 구매를 동전과 기력의 하나의 거래로 다루기](/blog/seulgae-tech-lab-vitals-snack-transactions)
- [화분의 보상에도 서버 추첨과 장부가 필요했다](/blog/seulgae-tech-lab-plant-luck-server-rewards)
- [네 사무실을 하나의 업무 흐름과 작은 오락실로 채우기](/blog/seulgae-tech-lab-office-workflow-and-arcade)
- [CCTV의 관측 범위와 낚시의 시간 규칙을 분리하기](/blog/seulgae-tech-lab-control-room-outdoor-fishing)
- [오락실에서 남은 횟수와 기력 부족을 구분하기](/blog/seulgae-tech-lab-arcade-limits-and-energy-feedback)
- [폰 속 송금과 할 일에 서버 규칙을 두기](/blog/seulgae-tech-lab-phone-apps-transaction-and-data-ownership)
- [가구를 사서 놓는 개인 기숙사의 서버 규칙](/blog/seulgae-tech-lab-private-dorm-furniture-transactions)
- [적금과 가상 시세, 오락실 결과를 서버에서 관리하기](/blog/seulgae-tech-lab-savings-stocks-arcade-transactions)
- [내 자리 컴퓨터에 업무 기록과 Java 연습을 모으기](/blog/seulgae-tech-lab-my-desk-idea-qa-daily-tasks)
- [사원증 급여를 여러 탭에서 한 번만 받게 하기](/blog/seulgae-tech-lab-badge-salary-conditional-update)
- [게임 규칙을 테이블로 옮기고 침대 휴식에 간격을 두기](/blog/seulgae-tech-lab-database-game-rules-vitals-rest)
- [엔딩을 보기 직전에 자격을 다시 확인하기](/blog/seulgae-tech-lab-ending-rebirth-transaction)


### 인증·회원 권한

- [카카오 로그인과 배포 설정을 같은 기능으로 다루기](/blog/seulgae-tech-lab-kakao-login-production-config)
- [관리자 권한을 등급 하나로 모으기까지](/blog/seulgae-tech-lab-member-level-approval-and-admin-access)
- [관리자인데 문이 열리지 않은 생성 순서 문제](/blog/seulgae-tech-lab-admin-room-auth-initialization-race)
- [관리자실 문보다 중요한 것은 API의 권한 검사였다](/blog/seulgae-tech-lab-admin-sql-console-boundaries)


### 데이터 전환과 기능 개편

- [앱 계정에 DDL을 주지 않고 연구 기록 스키마와 Flyway 구성하기](/blog/seulgae-tech-lab-research-schema-flyway)
- [연구 기록 저장·조회 API 만들기 — 실행 권한과 쓰기 경로를 분리하다](/blog/seulgae-tech-lab-research-record-api)
- [임시 연구 기록을 실제 API로 교체하기 — 목록·상세와 재시도 연결](/blog/seulgae-tech-lab-research-panel-api)
- [DB 저장부터 게임 패널까지 연결 검증하기 — 개발 데이터와 CI를 분리하다](/blog/seulgae-tech-lab-research-integration-verification)
- [Java 17 CI를 확인하고 연구 기록 기능을 main에 병합하기](/blog/seulgae-tech-lab-research-main-merge)
- [완료 체크보다 먼저 배포한 스키마 확장](/blog/seulgae-tech-lab-expand-migrate-use-idea-done)
- [테이블 이름을 바꾸는 동안 옛 앱을 위한 뷰 남기기](/blog/seulgae-tech-lab-table-rename-compatibility-views)
- [마이그레이션보다 사용 코드가 먼저 병합됐을 때](/blog/seulgae-tech-lab-schema-release-order-revert)
- [자판기 거래와 V14 배포 검사가 만난 지점](/blog/seulgae-tech-lab-vending-transactions-and-v14-deployment-check)
- [첫 기능을 정리하고 슈퍼컴퓨터에서 PR을 보여 주기](/blog/seulgae-tech-lab-research-removal-github-pulls-cache)
- [기술 원리 실험을 위한 방을 먼저 마련하기](/blog/seulgae-tech-lab-practice-room-foundation)
- [검색 중심 채용 에이전트를 접수와 검토 흐름으로 바꾸기](/blog/seulgae-tech-lab-recruitment-agent-evolution-and-inbox)
- [한 화면에 몰린 업무를 역할별 작업석으로 나누기](/blog/seulgae-tech-lab-recruitment-workstations-and-pagination)
- [채용 기능을 지울 때도 배포 순서를 설계하기](/blog/seulgae-tech-lab-recruitment-removal-schema-contract)


### 개발 환경·배포·관측과 문서

- [새 프로젝트의 GitHub 저장소를 만들고 Windows 개발 환경에 연결하기](/blog/seulgae-tech-lab-github-repository-setup)
- [슬개기술연구소 GitHub 저장소를 기존 로컬 폴더에 복제한 과정](/blog/seulgae-tech-lab-clone-into-existing-folder)
- [PowerShell에서 npm 실행이 차단될 때 npm.cmd로 Vite 프로젝트 생성하기](/blog/seulgae-tech-lab-vite-powershell-npm-execution-policy)
- [기존 Ubuntu 서버에 연구소를 함께 운영하기 — Compose 격리부터 IntelliJ 개발 DB 연결까지](/blog/seulgae-tech-lab-isolated-server-and-development-db)
- [인프라 PR을 병합하고 개발 PC에서 Spring Boot 실행하기](/blog/seulgae-tech-lab-main-sync-local-backend)
- [Java 17 기준을 바로잡고 IntelliJ 로컬 실행 구성 만들기](/blog/seulgae-tech-lab-java-intellij-local-run)
- [개발 시작 경로를 DB 없는 화면 확인과 실제 DB 검증으로 나누기](/blog/seulgae-tech-lab-local-development-verification-paths)
- [이전 버전이 없는 서버의 첫 배포를 설계하기](/blog/seulgae-tech-lab-physical-server-first-deployment)
- [검증 이미지로 실제 배포하고 앱 롤백과 운영 명령 확인하기](/blog/seulgae-tech-lab-manual-deploy-rollback-verification)
- [GitHub Actions와 Tailscale로 홈서버 자동 배포 연결하기](/blog/seulgae-tech-lab-github-actions-tailscale-auto-deploy)
- [SHA 입력 없이 검증된 이미지를 배포하는 운영 명령 구성하기](/blog/seulgae-tech-lab-verified-image-deployment)
- [최신 이미지에 옛 Compose 설정이 붙었던 이유](/blog/seulgae-tech-lab-release-checkout-deployment)
- [고지연 경로에서는 압축과 대기 시간도 게임 설계였다](/blog/seulgae-tech-lab-high-latency-asset-delivery)
- [서버실 랙에서 호스트와 JVM의 상태를 나눠 보기](/blog/seulgae-tech-lab-server-rack-ssh-capacity-metrics)
- [주석의 갱신 주기를 실행 코드와 맞추기](/blog/seulgae-tech-lab-source-comments-implementation-alignment)
