# 블로그 전체 글 색인

2026-11-24 로컬 파일 기준 167편. 제목, 요약, 태그와 본문 소제목으로 검색할 수 있다. 각 설명은 글의 자체 서술이며 사실관계의 독립 검증 결과가 아니다. 미커밋 Claude 초안이 포함된다.

| 분류 | 글 수 |
| --- | ---: |
| dev-notes | 2 |
| home-server | 11 |
| java | 11 |
| kafka-di | 7 |
| linux-ops | 5 |
| project-review | 12 |
| redis-cache | 1 |
| sast-cwe | 12 |
| seulgae-tech-lab | 87 |
| spring-mybatis | 12 |
| sql-tuning | 7 |

## dev-notes

### [이 블로그에 글 쓰는 방법](src/posts/how-to-write-posts.md)

- 날짜: 2026-08-11
- 태그: Guide
- 요약: DB 없이 마크다운 파일로 운영되는 이 블로그의 글 작성·수정·배포 방법 정리
- 소제목: 글 추가하기 · 지원하는 문법 · category id · 수정과 삭제 · 공개(배포)

### [포트폴리오 사이트 구조 리팩터링 기록](src/posts/portfolio-refactoring.md)

- 날짜: 2026-08-11
- 태그: React, Refactoring
- 요약: 콘텐츠와 화면을 분리하고, 페이지 파일 복제를 단일 라우트로 통합한 과정 정리
- 소제목: 문제 · 개선 · 현재 구조와 당시 기록의 차이 · 배운 점


## home-server

### [홈서버 구축 1 — Hyper-V와 Ubuntu, Docker의 역할부터 나누기](src/posts/home-server-architecture-hyper-v-ubuntu-docker.md)

- 날짜: 2026-11-21
- 태그: Ubuntu, Hyper-V, Docker, Docker Compose, PostgreSQL, Spring Boot, SSH, DevOps
- 요약: Windows 가상머신으로 시작한 홈서버의 계층과 통신 경로를 정리하고, 물리 서버 확장과 구분해 10편의 구축 로드맵을 세웠다.
- 소제목: 1. 들어가며 — 애플리케이션 실행 다음의 문제 · 2. 구현 목표와 10편의 로드맵 · 3. 사전 지식 — Hyper-V와 Docker는 서로 다른 계층이다 · 4. 현재 환경 — 초기 구축과 이후 확장을 분리하기 · 5. 구축 과정 — 통신 경로와 데이터 위치를 먼저 그리기 · 초기 VM의 역할 배치 · 물리 서버로 확장한 뒤의 접근 경로 · 6. 트러블슈팅 — 설치를 다시 한 사실과 원인을 구분하기 · 7. 기술적 이해 — 홈서버를 선택하며 얻는 것과 맡게 되는 것 · 8. 최종 검증 — 출력은 재현용 예시와 실제 결과를 나누기 · 9. 회고 · 10. 다음 편 — Windows Hyper-V에 Ubuntu Server 설치하기

### [홈서버 구축 8 — Compose 운영에서 재시작·백업·롤백을 구분하기](src/posts/home-server-compose-operations-backup-rollback.md)

- 날짜: 2026-11-21
- 태그: Docker Compose, PostgreSQL, Backup, Rollback, Python, Operations
- 요약: 두 프로젝트의 실제 운영 도구를 비교하고 상태 확인·설정 반영·데이터 복원·이미지 롤백의 경계를 정리했다.
- 소제목: 1. 들어가며 · 2. 구현 목표 · 3. 사전 지식 · 4. 현재 환경 — 프로젝트별 복구 정책이 다르다 · 5. 구축 과정 · 조회부터 하고 설정 반영 방식을 선택하기 · 실제 운영 진입점 확인 · DB 백업은 Ubuntu Bash에서 별도로 만들기 · 복원은 빈 검증 DB에서 시험하기 · 앱 롤백의 호환 조건 확인 · 6. 트러블슈팅 · 7. 기술적 이해 · 8. 최종 검증 · 9. 회고 · 10. 다음 편

### [홈서버 구축 5 — Ubuntu에 Docker Engine과 Compose를 설치하고 검증하기](src/posts/home-server-docker-engine-compose-install.md)

- 날짜: 2026-11-21
- 태그: Docker, Docker Compose, Ubuntu, Linux, Containers, Security
- 요약: 공식 APT 저장소 설치와 hello-world 검증을 클라이언트·데몬·권한·컨테이너 수명으로 나눠 설명했다.
- 소제목: 1. 들어가며 · 2. 구현 목표 · 3. 사전 지식 · 4. 현재 환경 · 5. 구축 과정 · 공식 저장소의 키와 출처 연결 · Engine·CLI·Compose 설치 · 버전과 실행을 각각 검증 · 6. 트러블슈팅 — Docker 소켓 접근 거부 · 7. 기술적 이해 — UFW와 게시 포트 · 8. 최종 검증 · 9. 회고 · 10. 다음 편

### [홈서버 구축 10 — GitHub Actions에서 검증한 릴리스만 배포하기](src/posts/home-server-github-actions-cicd.md)

- 날짜: 2026-11-21
- 태그: GitHub Actions, CI/CD, Docker, GHCR, Tailscale, Flyway, Deployment
- 요약: 테스트·이미지 게시·서버 배포를 분리하고 커밋·이미지 digest·스키마 호환성을 하나의 릴리스로 묶는 실제 운영 구조를 정리했다.
- 소제목: 1. 들어가며 · 2. 구현 목표 · 3. 사전 지식 · 4. 현재 환경 · 5. 구축 과정 · 로컬 검사와 CI 검사를 연결하기 · 검사와 이미지 게시를 분리하기 · 릴리스에 코드와 이미지·스키마 정보를 묶기 · 배포 실행 조건과 비밀 정보를 따로 관리하기 · 6. 트러블슈팅 · 이미지는 새것인데 서버의 Compose는 예전 파일이었다 · 앱을 되돌리면 DB도 되돌아가는가 · 7. 기술적 이해 · 8. 최종 검증 · 9. 회고 · 10. 다음 편

### [홈서버 구축 3 — Hyper-V Internal Switch와 NAT로 Ubuntu 고정 IP 연결하기](src/posts/home-server-hyper-v-nat-static-ip.md)

- 날짜: 2026-11-21
- 태그: Hyper-V, Ubuntu, Netplan, NAT, Networking, PowerShell
- 요약: 내부 스위치와 Windows 게이트웨이·NAT, Ubuntu 주소·경로·DNS를 나눠 구성하고 SSH 실패를 계층별로 확인하는 방법을 정리했다.
- 소제목: 1. 들어가며 · 2. 구현 목표 · 3. 사전 지식 · 4. 현재 환경과 공개용 값 · 5. 구축 과정 · 먼저 기존 Windows 구성을 조회하기 · 내부 스위치·게이트웨이·NAT 만들기 · Ubuntu의 주소·기본 경로·DNS 설정 · 검사 후 되돌릴 수 있는 방식으로 적용하기 · 6. 트러블슈팅 — SSH 실패를 바로 방화벽 탓으로 돌리지 않기 · 7. 기술적 이해 · 8. 최종 검증 · 9. 회고 · 10. 다음 편

### [홈서버 구축 2 — Windows Hyper-V에 Ubuntu Server 설치하기](src/posts/home-server-hyper-v-ubuntu-install.md)

- 날짜: 2026-11-21
- 태그: Ubuntu, Hyper-V, Windows, Linux, Virtualization, APT
- 요약: Windows Pro에서 Ubuntu VM을 준비하는 순서와 설치 옵션의 의미, OS·커널·패키지 상태를 구분하는 검증 방법을 정리했다.
- 소제목: 1. 들어가며 · 2. 구현 목표 · 3. 사전 지식 — 가상머신에도 부팅 장치가 필요하다 · 4. 현재 환경과 확인할 조건 · 5. 구축 과정 · Hyper-V 활성화 · ISO와 VM 생성 · Ubuntu 설치 화면에서 결정할 것 · OS 정보와 패키지 상태 확인 · 6. 트러블슈팅 — 재설치의 원인을 만들지 않기 · 7. 기술적 이해 · 8. 최종 검증 · 9. 회고 · 10. 다음 편

### [홈서버 구축 7 — Java 17 Spring Boot를 멀티스테이지 이미지로 배포하기](src/posts/home-server-java17-spring-boot-docker-build.md)

- 날짜: 2026-11-21
- 태그: Java, Spring Boot, Gradle, Docker, Eclipse Temurin, PostgreSQL
- 요약: InvenCore의 실제 Gradle·Dockerfile을 읽고 실행 JAR·빌드 컨텍스트·환경변수·DB 권한 검증을 분리했다.
- 소제목: 1. 들어가며 · 2. 구현 목표 · 3. 사전 지식 · 4. 현재 환경과 중요한 차이 · 5. 구축 과정 · 실행 JAR과 테스트를 먼저 확인 · 실제 Dockerfile의 빌드 단계 읽기 · 이미지를 빌드하고 식별하기 · 런타임 설정과 DB 준비를 분리 · 6. 트러블슈팅 · 7. 기술적 이해 · 8. 최종 검증 · 9. 회고 · 10. 다음 편

### [홈서버 구축 6 — PostgreSQL 18의 데이터·계정·접속 경로를 분리하기](src/posts/home-server-postgresql-compose-volumes-roles.md)

- 날짜: 2026-11-21
- 태그: PostgreSQL, Docker Compose, Volumes, SSH, JDBC, Database
- 요약: PostgreSQL 18 Compose 예시를 통해 데이터 경로·초기화·역할 권한과 SSH 터널 검증을 구분해 정리했다.
- 소제목: 1. 들어가며 · 2. 구현 목표 · 3. 사전 지식 · 4. 현재 환경과 버전 차이 · 5. 구축 과정 · 새 비밀값 파일 준비 · Compose로 DB 실행 · 목록부터 확인하고 역할 권한 나누기 · SSH 터널로 IntelliJ 연결 · 6. 트러블슈팅 · 7. 기술적 이해 · 8. 최종 검증 · 9. 회고 · 10. 다음 편

### [홈서버 구축 4 — SSH 공개키와 UFW를 접속이 끊기지 않는 순서로 설정하기](src/posts/home-server-ssh-keys-ufw.md)

- 날짜: 2026-11-21
- 태그: SSH, OpenSSH, Ubuntu, UFW, Windows, Security
- 요약: ed25519 공개키와 Windows 에이전트, SSH 접근 제한을 인증·방화벽·검증 순서로 나눠 정리했다.
- 소제목: 1. 들어가며 · 2. 구현 목표 · 3. 사전 지식 · 4. 현재 환경 · 5. 구축 과정 · SSH 서버를 준비하고 리스닝 상태 확인하기 · Windows에서 키를 만들고 공개키만 등록하기 · 패스프레이즈가 있는 키는 에이전트로 관리하기 · UFW는 허용 규칙을 만든 뒤 활성화하기 · 비밀번호 인증 제한은 키 접속 확인 후 검토하기 · 6. 트러블슈팅 · 7. 기술적 이해 · 8. 최종 검증 · 9. 회고 · 10. 다음 편

### [홈서버 구축 9 — Tailscale 관리망과 Funnel 공개 HTTPS를 분리하기](src/posts/home-server-tailscale-funnel-access.md)

- 날짜: 2026-11-21
- 태그: Tailscale, Funnel, HTTPS, SSH, Nginx, WebSocket, Network
- 요약: 관리용 사설 접속과 방문자용 공개 웹 경로를 분리하고, HTTPS 화면과 WebSocket 연결을 따로 검증하는 방법을 정리했다.
- 소제목: 1. 들어가며 · 2. 구현 목표 · 3. 사전 지식 · 4. 현재 환경 · 5. 구축 과정 · 먼저 서버 내부에서 웹 응답을 확인하기 · 관리망 연결 확인하기 · Serve와 Funnel 중 공개 범위를 선택하기 · 6. 트러블슈팅 · 컨테이너는 healthy인데 호스트 웹 포트가 열리지 않았다 · HTTPS 화면은 열리는데 WebSocket은 실패했다 · 7. 기술적 이해 · 8. 최종 검증 · 9. 회고 · 10. 다음 편

### [홈서버 구축 후속편 — Hyper-V에서 물리 Ubuntu 서버로 옮기며 바뀐 전제](src/posts/home-server-vm-to-physical-ubuntu-migration.md)

- 날짜: 2026-11-21
- 태그: Ubuntu, Home Server, Docker Compose, PostgreSQL, Migration, Tailscale, Deployment
- 요약: 가상머신에서 물리 서버로 이동하며 달라진 네트워크·공유 인프라·최초 배포 조건을 실제 기록과 코드로 구분해 정리했다.
- 소제목: 1. 들어가며 · 2. 구현 목표 · 3. 사전 지식 · 4. 현재 환경 · 5. 구축 과정 · 새 호스트의 준비 상태를 먼저 목록화하기 · 공유 인프라의 필수 조건을 다시 나누기 · 최초 배포에는 이전 앱이 없다는 사실을 반영하기 · 데이터 준비와 앱 배포를 분리하기 · 6. 트러블슈팅 · 새 환경인데 예전 서버 구성까지 요구했다 · 웹은 열렸지만 로비 연결은 실패했다 · 배포를 잠시 꺼야 하는 시기였다 · 7. 기술적 이해 · 8. 최종 검증 · 9. 회고 · 10. 다음 편


## java

### [List·Set·Map은 어떤 기준으로 선택하는가](src/posts/java-collections-selection.md)

- 날짜: 2026-11-22
- 태그: Java, Collections, HashMap, Interview
- 요약: 중복·순서·키 조회 요구에서 자료구조를 선택하고 해시 동등성과 공유 컬렉션의 제약을 정리한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [예외를 어디에서 처리하고 어디까지 전달할 것인가](src/posts/java-exception-handling-boundaries.md)

- 날짜: 2026-11-22
- 태그: Java, Exception, Resources, Interview
- 요약: 예외 전파와 복구 책임, 자원 정리, 트랜잭션 실패 전달을 하나의 처리 경계로 복습한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [Java 객체지향 01 — 클래스와 객체, 참조를 구분하기](src/posts/java-oop-01-classes-and-objects.md)

- 날짜: 2022-06-07
- 태그: Java, OOP, Study
- 요약: 객체지향의 네 가지 개념부터 클래스·인스턴스·참조 변수·객체 배열까지, 객체를 만드는 코드의 의미 정리
- 소제목: 시리즈 읽는 순서 · 객체는 상태와 행동을 함께 가진다 · 네 가지 개념은 어떤 문제를 해결하는가 · 참조 변수 선언과 객체 생성은 다르다 · 실행 예제 — 두 참조와 하나의 객체 · 객체 배열은 배열과 각 요소를 따로 만든다 · 복습할 질문

### [Java 객체지향 02 — 변수의 소속과 메서드의 실행 흐름](src/posts/java-oop-02-fields-and-methods.md)

- 날짜: 2022-06-07
- 태그: Java, OOP, Study
- 요약: 인스턴스 변수·클래스 변수·지역 변수를 구분하고, 매개변수·반환값·호출 스택으로 메서드의 흐름 이해
- 소제목: 인스턴스 변수·클래스 변수·지역 변수 · 함께 쓰는 값이라고 모두 static이어야 할까 · 메서드는 입력·처리·결과를 정의한다 · 실행 예제 — 공유 값과 개별 값 · 호출 스택으로 실행 순서를 따라가기 · 정리

### [Java 객체지향 03 — 참조형도 값으로 전달된다](src/posts/java-oop-03-pass-by-value-and-static.md)

- 날짜: 2022-06-07
- 태그: Java, OOP, Study
- 요약: 기본형·참조형 매개변수와 객체 변경·재대입의 차이, 복사와 static 메서드의 접근 범위 정리
- 소제목: 값을 바꾸는 것과 객체를 바꾸는 것 · 실행 예제 — 변경과 재대입 비교 · 객체를 반환해도 자동으로 복사되지는 않는다 · static 메서드는 인스턴스 멤버를 전혀 못 쓸까 · 복습할 질문

### [Java 객체지향 04 — 오버로딩과 생성자, 초기화 순서](src/posts/java-oop-04-overloading-and-constructors.md)

- 날짜: 2022-06-07
- 태그: Java, OOP, Study
- 요약: 메서드 오버로딩의 선택 기준과 기본 생성자·this·this()의 차이, 클래스·인스턴스 초기화 순서 정리
- 소제목: 반환 타입만 바꾸면 오버로딩이 아니다 · 생성자는 객체를 사용할 수 있는 상태로 만든다 · this와 this()는 다르다 · 실행 예제 — 기본값을 한 생성자로 모으기 · 로딩과 초기화는 같은 단계가 아니다 · 복습할 질문

### [Java 객체지향 05 — 상속보다 먼저 관계를 판단하기](src/posts/java-oop-05-inheritance-and-composition.md)

- 날짜: 2022-06-07
- 태그: Java, OOP, Study
- 요약: is-a와 has-a로 상속·포함을 구분하고, super·오버라이딩·Object의 역할과 재정의 조건 이해
- 소제목: is-a와 has-a는 출발점이다 · Java 클래스는 하나의 클래스만 상속한다 · 실행 예제 — 상속과 포함을 함께 사용하기 · 오버라이딩 조건을 정확히 구분하기 · Object는 공통 출발점이다 · 배운 점

### [Java 객체지향 06 — 패키지와 접근 제어로 경계 만들기](src/posts/java-oop-06-packages-and-encapsulation.md)

- 날짜: 2022-06-07
- 태그: Java, OOP, Study
- 요약: 패키지·import·클래스패스와 접근 제어, final·abstract·인터페이스를 객체의 사용 경계 관점으로 정리
- 소제목: 패키지·import·클래스패스는 역할이 다르다 · 접근 범위는 필요한 만큼만 연다 · 실행 예제 — 잘못된 시간을 만들지 못하게 하기 · final은 객체 전체를 불변으로 만드는 키워드가 아니다 · 추상 클래스와 인터페이스는 어떤 계약을 드러내는가

### [Java 객체지향 07 — 다형성은 같은 호출을 다른 구현으로 연결한다](src/posts/java-oop-07-polymorphism-and-casting.md)

- 날짜: 2022-06-07
- 태그: Java, OOP, Study
- 요약: 참조 타입과 실제 객체의 역할, 동적 메서드 호출·안전한 형변환·매개변수 다형성과 컬렉션 예제 정리
- 소제목: 참조 타입과 실제 객체는 서로 다른 역할을 한다 · 실행 예제 — 구매자는 제품의 구체 타입을 몰라도 된다 · 형변환은 객체를 바꾸지 않는다 · 오버로딩과 오버라이딩의 선택 시점 · 객체지향 학습을 마치며

### [객체지향 설계에서 인터페이스와 추상 클래스를 선택하는 기준](src/posts/java-oop-interface-abstract-class.md)

- 날짜: 2026-11-22
- 태그: Java, OOP, Interface, Interview
- 요약: 객체지향의 네 원리를 변경 경계와 연결하고 인터페이스·추상 클래스·조합의 선택을 복습한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [Java 코드는 어떻게 실행되는가 — JDK·JRE·JVM](src/posts/java-runtime-compilation-jvm.md)

- 날짜: 2026-11-22
- 태그: Java, JVM, JDK, Interview
- 요약: Java 17을 기준으로 컴파일·클래스 로딩·실행을 연결하고 런타임 버전 오류를 구분하는 복습 노트.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료


## kafka-di

### [배치 재처리와 대체 발송을 구분하기](src/posts/batch-retry-fallback-reprocessing.md)

- 날짜: 2026-11-22
- 태그: Batch, Retry, Fallback, Messaging, Interview
- 요약: 배치 단위·재시작·재시도·채널 대체를 구별하고 발송 결과 미확인 상태의 중복 위험을 정리한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [연동 오류를 담당자의 조치로 연결하기 — 일일 메일 보고 체계를 만든 이유](src/posts/gw-daily-error-reporting-workflow.md)

- 날짜: 2025-02-10
- 태그: Kafka, Operations, Collaboration, Retrospective
- 요약: Kafka GW의 미처리 오류를 파트별로 정리하고 PL·PM과 공유해, 운영 데이터의 책임 범위를 지키면서 일일 조치로 연결한 업무 방식
- 소제목: 실패 건수만으로는 다음 행동이 정해지지 않았다 · 보정 도구가 있어도 업무 데이터의 판단은 필요했다 · 담당 배분과 미처리 현황 공유를 연결했다 · 표에는 담당자가 다음에 할 일을 담았다 · 잔여 오류는 발행 파트의 수정과 재발행으로 맞췄다 · 결과는 각 파트의 조치가 이어지면서 나왔다 · 청구·과금 운영 일정까지 생각하며 오류를 처리했다 · 잘되지 않았던 점과 보완한 과정 · 원인을 알아도 조치가 끝나지 않았다 · 담당자의 판단으로 이어지도록 전달 방식을 바꿨다 · 배운 점 · 운영의 완료 기준은 후속 업무까지 이어진다 · 책임 범위와 후속 대응을 함께 챙겨야 한다 · 공유 자료는 다음 행동을 정할 수 있어야 한다 · 지금 다시 운영한다면 보완할 점

### [같은 한글인데 왜 길이 초과가 날까 — GW 메타데이터와 Java 바이트 길이 보정](src/posts/gw-encoding-byte-length-validation.md)

- 날짜: 2025-03-27
- 태그: Kafka, Java, Oracle, MySQL, Encoding
- 요약: 발행 데이터가 응용 DB의 바이트 제한을 넘는 문제를 Java 문자열 보정 함수와 GW 메타데이터의 변환 규칙으로 대응한 경험
- 소제목: 화면에서는 들어갔는데, 연동에서는 실패했다 · 한글 2바이트와 3바이트는 모두 가능한 이야기다 · 개별 연동마다 자르지 않고, 메타데이터의 변환 규칙에 연결했다 · 문자 경계를 지키면서 대상 바이트 수에 맞추기 · 실제 설정은 화면이 아니라 DB와 컬럼에서 확인해야 한다 · 결과와 배운 점 · 공통 함수를 만들었지만, 모든 컬럼에 적용하지는 못했다 · 저장 제약도 연동 규칙의 일부였다

### [쪼개진 원천 테이블과 달라진 PK 사이 — Kafka 서비스 도메인 GW에서 데이터 정합성 지키기](src/posts/kafka-gw-data-integrity.md)

- 날짜: 2025-02-10
- 태그: Kafka, Java, Spring, Operations
- 요약: 원부·응용 파트의 키와 컬럼을 맞추는 Kafka GW 구조와, 누적 오류 해소를 위해 오류 대응 절차와 일일 메일 보고 체계를 만든 운영 경험
- 소제목: 배경 — 왜 중간에 GW가 필요했나 · GW 소스 구조 — 변환 로직의 뼈대 · 이벤트 토픽은 어떻게 만들었나 — 메타데이터 테이블 · 참조 예제 — 신규 이벤트 토픽 등록 절차 · 업무 중심키와 컬럼 매핑을 구분하기 · 모니터링 — same, mismatch, 그리고 재연동 대기 · 오류 대응 — 대응 절차 정비와 일일 보고 체계 구축 · 배운 점

### [Kafka의 Topic·Partition·Consumer Group](src/posts/kafka-producer-consumer-partitions.md)

- 날짜: 2026-11-22
- 태그: Kafka, Producer, Consumer, Interview
- 요약: 기록의 저장·소비 단위와 순서·offset·리밸런싱을 연결하고 빌링 GW 운영 경험과 구분한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료 · 면접 연습 Q3 — 당시 연동 역할과 Kafka 원리 연결 · Q3. Kafka의 토픽이 무엇이고, 시스템 간 연계는 어떻게 이루어졌나요?

### [메시지 전달 보장과 멱등성은 어떻게 다른가](src/posts/message-delivery-idempotency.md)

- 날짜: 2026-11-22
- 태그: Messaging, Idempotency, Kafka, Interview
- 요약: 전달·처리·외부 효과의 범위를 구별하고 중복 방지 키와 원자적 상태 관리의 필요성을 설명한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [동기·비동기와 UMS 발송 흐름 이해하기](src/posts/messaging-sync-async-ums-flow.md)

- 날짜: 2026-11-22
- 태그: Messaging, UMS, Async, Interview
- 요약: 요청 수락·발송·결과 확인을 분리하고 NURI2 DB 큐 연동에서 직접 맡은 영역을 구분한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료


## linux-ops

### [csql과 nohup — 운영 중인 DB에 수백만 건 패치를 조용히 밀어 넣는 법](src/posts/csql-nohup-mass-patch.md)

- 날짜: 2026-07-08
- 태그: DB, Linux, Security, Operations
- 요약: 개인정보 컬럼 대량 암호화 패치를 서비스 중단 없이 처리한 기록 — nohup 백그라운드 실행, 분할 커밋, 로그 기반 모니터링까지 대량 DML 작업의 절차 정리
- 소제목: 왜 애플리케이션이 아니라 DB에서 직접 했나 · nohup — 세션과 프로세스의 생명줄을 끊어두기 · 무중단의 핵심 — 트랜잭션을 잘게 쪼개기 · 실행 전후 — 대사(對査)로 마무리 · 배운 점

### [JSch가 WEB 서버 앞에서 멈춘 날 — Apache MINA SSHD로 서버 용량 모니터링 만들기](src/posts/jsch-to-mina-sshd.md)

- 날짜: 2026-01-05
- 태그: Java, SSH, Infra, Spring
- 요약: 월말마다 수기로 정리하던 서버 메모리·디스크 현황을 SSH 기반 주기 수집 화면으로 자동화한 과정 — JSch의 암호화 협상 실패, MINA SSHD 교체, 그리고 함수 하나하나의 선택 이유
- 소제목: 설계 — WAS가 각 서버에 SSH로 물어본다 · 첫 시도 — JSch, 그리고 암호화 협상 실패 · 교체 — Apache MINA SSHD 2.16.0 · 구현 디테일 — 함수 하나하나의 선택 이유 · 접속: 모든 비동기 단계에 verify(timeout) · 명령 실행: 셸 채널이 아니라 EXEC 채널 · 종료: finally에서 채널 → 세션 → 클라이언트 순서로 · 수집 명령과 파싱 — 왜 이 명령이었나 · 스케줄러: Quartz와 "Spring Bean이 아닌 클래스"의 함정 · 화면 조회: Collectors.toMap이 버그 검출기가 되도록 · 수집 누락 확인과 접속 정보 관리 · 결과 · 배운 점

### [Linux에서 프로세스·서비스·로그를 확인하는 순서](src/posts/linux-process-service-log-analysis.md)

- 날짜: 2026-11-22
- 태그: Linux, systemd, Logs, Interview
- 요약: 프로세스 존재·서비스 상태·업무 정상 여부를 구별하고 시간 범위를 맞춰 로그와 자원 상태를 조사한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [접속 장애를 포트·네트워크·앱으로 나눠 진단하기](src/posts/network-port-incident-diagnosis.md)

- 날짜: 2026-11-22
- 태그: Linux, Network, Troubleshooting, Interview
- 요약: DNS·연결·TLS·HTTP·업무 응답을 나눠 확인하고 리스닝과 외부 접근 가능성의 차이를 정리한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [TCP/IP부터 HTTP·HTTPS까지 요청이 지나가는 경로](src/posts/tcp-http-https-request-path.md)

- 날짜: 2026-11-22
- 태그: TCP, HTTP, HTTPS, TLS, Interview
- 요약: 네트워크 계층과 HTTP 의미·TLS 보호 범위를 구별하고 프록시·타임아웃·재시도 문제를 연결한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료


## project-review

### [백엔드 면접 복기 — 성능 개선과 협업 경험을 설명하는 방법](src/posts/backend-interview-performance-and-collaboration-review.md)

- 날짜: 2026-11-23
- 태그: Interview, Java, Kafka, Redis, MyBatis
- 요약: 과거 백엔드 면접에서 받은 성능 개선과 데이터 연동, 협업 질문을 복기하고 부족했던 기술 원리를 정리했다.
- 소제목: 경력과 프로젝트를 짧게 설명하기 · 경력을 소개해 주세요 · 기억에 남는 프로젝트와 기여는 무엇인가요? · 조회 성능을 개선한 위치를 설명하기 · `parallelStream`을 어떻게 적용했나요? · GW 운영과 Kafka 신규 구축의 차이 · 연동 오류를 어떻게 관리했나요? · 기존 시스템을 운영했다면 새로 구축할 수도 있나요? · Redis 권한 캐시와 변경 반영 · 왜 Redis에 권한 정보를 저장했나요? · MyBatis·JPA와 CI/CD 경험의 범위 · MyBatis와 JPA는 어떻게 다른가요? · CI/CD에서 직접 한 일은 어디까지인가요? · 의견이 다를 때와 모르는 일을 맡았을 때 · 동료와 의견이 달랐던 경험은? · 사수에게 질문하거나 새로운 기술을 배울 때는? · 다시 연습할 질문 · 참고 자료

### [빌링 GW 연동 오류 관리 실무 복기 — 누적 오류 정리, 일일 보고 체계, 대량 오류 분할 처리](src/posts/billing-gw-integration-error-interview-review.md)

- 날짜: 2026-11-19
- 태그: Interview, Kafka, Operations, Collaboration
- 요약: 원천·응용 파트 사이 빌링 GW 연동에서 쌓인 오류를 정리하고, 실패 유형과 해결 가이드를 담은 일일 보고 체계를 만들어 평소 주간 오류가 약 70건 안팎에서 5건 수준으로 감소한 경험과 대량 오류 분할 처리를 정리한 기록.
- 소제목: 1. 한눈에 보기 · 2. 연동 구조와 GW가 생긴 이유 · 오류가 나는 이유 · 3. 문제 정의 — 오류가 아니라 가시성의 문제 · 4. 한 일 · 4-1. 누적 오류 정리 · 4-2. 일일 보고 체계 · 4-3. 데이터는 직접 고치지 않았다 · 5. 대량 오류 사례 — 이관 때 10만 건 · 6. 결과와 수치를 말할 때의 단서 · 7. 기술 원리 정리 · 인코딩과 컬럼 사이즈 · 락과 트랜잭션 분할 · Kafka 연동에서 알아 둘 것 · 8. 이어지는 질문 대비 · 9. 지원 직무와 연결 — 엠앤와이즈 TS팀 · 10. 확인 필요 항목 · 참고 · 면접 연습 Q1·Q2 — 원문과 검증 후 답변 (2026-11-22 보완) · Q1. 연동 오류를 93% 줄였다고 하셨는데, 당시 상황을 설명해 주시겠어요? · Q2. 데이터 연동이 실패하는 원인은 무엇이었나요? · 연결해서 복습할 글

### [CodeRay 보안 취약점 개선 실무 복기 — 유형별 조치, AI 활용, 기능 검증, 잔여 항목 보고](src/posts/coderay-security-remediation-interview-review.md)

- 날짜: 2026-11-20
- 태그: Interview, Security, SAST, CodeRay, Java, JSP, Claude
- 요약: CodeRay 검출 358건을 4건으로 줄인 경험을 유형별 조치, Claude 활용, 두 단계 기능 검증, 잔여 항목 보고로 나눠 복기하고 기존 보안 시리즈 기록과 맞춰 본 면접 준비 노트.
- 소제목: 1. 핵심 요약 · 확정해서 말할 수 있는 문장 · 수치를 말할 때 주의할 점 · 2. 문제와 접근 · 문제 상황 · 작업 흐름 · 조치를 고르는 기준 · 3. 주요 유형과 조치 원리 · 3-1. CWE-754 — 부적절한 예외 처리 · 3-2. CWE-209 — 오류 메시지에 의한 정보 노출 · 3-3. CWE-476 — Null Pointer 역참조 · 3-4. CWE-79 — JSP 출력부 XSS · 3-5. 미사용 코드 삭제와 조치불가 판정 · 4. 테스트와 검증 · CodeRay 재점검 · 두 단계 기능 확인 · 5. 잔여 4건의 판단과 보고 · 6. 면접 답변 (구어체) · 질문: 보안 취약점 개선 경험을 설명해 주세요. (약 1분) · 20초 압축 답변 · 7. 예상 꼬리 질문 · 8. 주의할 표현과 확인할 내용 · 바꿔 말할 표현 · 확인하면 좋은 항목 · 9. 이론 보충 — 기술 질문 대비 · 9-1. 출력 문맥마다 인코딩이 다르다 · 9-2. Jsoup으로 허용 목록 정화하기 · 9-3. 예외 처리 — 원인 보존과 자원 정리 · 9-4. SAST와 DAST · 더 공부할 자료 · 10. 면접 직전 암기 카드 · 11. 기록 출처

### [자사 솔루션 TS 직무 면접 후기](src/posts/in-house-solution-ts-interview-review.md)

- 날짜: 2026-11-23
- 태그: Interview, Java, SQL, Technical Support
- 요약: TS 직무 면접의 질문과 답변을 복기하고 병렬 처리, SQL 튜닝, 운영 대응을 다시 정리했다.
- 소제목: 1. 1차 면접 개요: 실제로 무엇을 평가했나 · 2. 실제 면접 질문·지원자 답변·피드백 (시간순) · Q01. 자기소개해 주세요. · Q02. TS팀 업무를 알고 지원했습니까? · Q03. 고객 접점 소통이 많은 업무인데 잘 맞습니까? · Q04. 사이버대학교에 진학한 이유는? 이전 하드웨어 업무는? · Q05. 이직이 잦고 재직 기간이 짧은 이유는? 협업에서 어떤 문제가 있었습니까? · Q06. 주로 사용한 언어는? · Q07. 데이터 조회 응답시간 약 48배 개선은 어떻게 했습니까? · Q08. 다른 성능 개선 방법은 검토했습니까? · Q09. 슬로우 쿼리·인덱스 튜닝은 어떻게 했습니까? · Q10. 튜닝을 해도 느리면? 운영 서비스라면 어떻게 대응? · Q11. AI로 개발하나요? AI 결과를 어떻게 검증합니까? · Q12. 어떤 프레임워크를 사용했습니까? · Q13. Java 1.8과 Java 11의 차이는? · Q14. CentOS와 Ubuntu의 차이는? · 3. 내가 면접관에게 했던 역질문 · 4. 오늘 면접에서 부족했던 부분 — 우선순위 학습 로드맵 · 최우선 A: Java `parallelStream`과 DB 성능 개선을 정확히 분리 · 우선순위 B: SQL 튜닝의 기술적 근거 · 우선순위 C: 운영 장애 해결의 우선순위 · 우선순위 D: 주력 기술의 기본기 · 우선순위 E: 이직 사유와 TS 업무 수용성 · 5. 면접관의 추가 질문을 재현한 실전 연습 카드 · 6. 성과별 '내가 한 일'과 '확인할 일' 구분 · 7. 이번 면접을 다음 면접 준비에 반영하는 방법 · 실전 답변 5단계 · 8. 집에서 복습 체크리스트 · 9. 최종 메모 · 참고 자료

### [성과 경험 면접 공통 정리 — 네 가지 경험, 네 가지 수치, 공통 질문](src/posts/interview-achievement-stories-overview.md)

- 날짜: 2026-11-20
- 태그: Interview, Retrospective, Performance, Security, Operations
- 요약: 빌링 GW 오류 관리, NURI2 알림톡 배치, CUBRID SQL 튜닝, CodeRay 보안 조치 경험을 한 표로 비교하고, 수치의 성격과 여러 경험에 걸친 공통 질문의 답을 정리한 면접 준비 허브.
- 소제목: 1. 네 가지 경험 한눈에 보기 · 2. 네 가지 수치의 성격 — 섞지 않기 · 3. 질문 유형별로 꺼낼 경험 · 4. 여러 경험에 걸친 공통 질문 · Q. AI 도구는 어떻게 활용했나요? · Q. 성과 수치는 어떻게 측정했나요? · Q. 가장 어려웠던 경험은 무엇인가요? · Q. 실패하거나 아쉬웠던 경험은 있나요? · Q. 네 경험의 공통점은 무엇인가요? · Q. 혼자 한 일과 다른 사람이 한 일을 어떻게 구분하나요? · 5. 모든 경험에 적용하는 말하기 원칙 · 6. 연습 체크리스트

### [면접 정리 2 — CloudXper의 병렬 조회·권한 캐시·코드 표준화](src/posts/interview-cloudxper-billing.md)

- 날짜: 2026-10-23
- 태그: Interview, Retrospective, Spring, MyBatis, Redis, Performance
- 요약: 실제 개선 경험과 기술 원리·후속 설계를 구분해 정리한 CloudXper 면접 자료 — 병렬 처리의 한계, 캐시 만료·무효화, DTO와 팀 표준화
- 소제목: 프로젝트 개요와 설명 범위 · 시스템 구조와 두 가지 조회 흐름 · 경험 1 — 반복 조회의 대기 시간을 병렬로 겹치기 · 경험 2 — 권한 캐시의 수명과 변경 이벤트 · 경험 3 — DTO·Model 분리와 4인 팀 표준화 · 쉬운 개념에서 내부 원리까지 · 병렬 처리·N+1·트랜잭션 · TTL·캐시 무효화·인가 · DTO·Model·Builder · 수준별 예상 질문과 말로 답하는 연습 · 추가로 확인할 경험 근거 · 기본기를 다지기 위한 사이드 프로젝트 아이디어 (아직 수행하지 않은 학습안) · Idea 1. 반복 조회 vs 집합 조회(`IN` 절) 벤치마크 & HikariCP 커넥션 풀 프로파일러 · Idea 2. 권한 API 응답 캐시 재현과 변경·장애 처리 검증 · Idea 3. `ArchUnit` 기반 아키텍처 컨벤션 자동 검증 테스트 · 추가 학습이 필요한 기술 개념

### [면접 정리 1 — 전세사기 피해자 지원관리시스템의 보안·성능·운영 개선](src/posts/interview-jeonse-support-system.md)

- 날짜: 2026-10-24
- 태그: Interview, Retrospective, CUBRID, Security, Infra, Java
- 요약: 정적 SQL 전환의 누락 사고, CUBRID 튜닝, 대량 패치와 SSH 수집, 알림톡 자동 발송 배치를 실제 경험·기술 원리·확인 항목으로 나눈 면접 준비 자료
- 소제목: 프로젝트 개요와 담당 범위 · 시스템 구조와 데이터 흐름 · 경험 1 — 정적 SQL로 바꾸다가 놓친 테이블 · 경험 2 — 53초 목록 조회와 복합 인덱스 · 경험 3 — 대량 암호화 패치와 재실행 안전성 · 경험 4 — SSH 점검 자동화와 취약점 조치 · 경험 5 — 심사 지연 안내 알림톡 자동 발송 배치 · 핵심 개념을 쉬운 설명부터 정리하기 · 바인딩·식별자·SQL Injection · 복합 인덱스·선택도·커버링 · 트랜잭션·멱등성·대사 · SSH·타임아웃·주기 수집 · XSS·SAST의 검증 범위 · 설정 암호화와 개인정보 DB 암호화 · 수준별 면접 질문과 답변 · 기본기를 다지기 위한 사이드 프로젝트 아이디어 (아직 수행하지 않은 학습안) · Idea 1. B-Tree 복합 인덱스 & 실행계획 벤치마크 샌드박스 · Idea 2. 무중단 대량 마이그레이션 시뮬레이터 (Lock 경합 & Zero-Offset Paging) · Idea 3. 경량 SSH 리소스 수집기 & 다중 서버 분산 스케줄러 (`ShedLock` 실습) · 추가 학습이 필요한 기술 개념

### [면접 정리 3 — 빌링 GW의 키 매핑·데이터 정합성·Oracle 튜닝](src/posts/interview-lgu-billing-gw.md)

- 날짜: 2026-10-22
- 태그: Interview, Retrospective, Kafka, Oracle, POI, Spring
- 요약: Kafka·Redis의 연계 구조, 오류 대응 절차 정비와 일일 보고 체계 구축, 인코딩 개선과 Oracle 튜닝 경험을 정리한 면접 자료
- 소제목: 프로젝트 개요와 근거 · 시스템 구조와 이벤트 처리 흐름 · 경험 1 — 업무키와 메타데이터가 연동의 중심이었다 · 경험 2 — 파트별 오류 대응 조율과 인코딩 개선 · 경험 3 — Oracle 묵시적 형변환 튜닝 · POI 다운로드 경험 — 핵심 성과와 구분한 일반 개발 경험 · 핵심 개념을 쉬운 설명부터 정리하기 · Kafka·파티션·offset·멱등성 · Redis 키 매핑과 캐시의 차이 · 대사·스키마 진화·인코딩 · Oracle 접근 경로와 POI 스트리밍 · 수준별 예상 질문과 자연스러운 답변 · 기본기를 다지기 위한 사이드 프로젝트 아이디어 (아직 수행하지 않은 학습안) · Idea 1. Kafka 이벤트 순서 역전 방어 & Non-blocking Retry + DLQ 파이프라인 · Idea 2. 옵티마이저 함정 재현기 — 묵시적 형변환과 스칼라 서브쿼리 vs 해시 조인 · Idea 3. `-Xmx256m` 환경 30만 건 엑셀 다운로드 OOM 재현 & Heap 프로파일링 실험실 · 추가 학습이 필요한 기술 개념

### [엠앤와이즈 TS팀 면접 준비 — 기업 분석과 실무 Q&A 매핑](src/posts/interview-mnwise-ts-prep.md)

- 날짜: 2026-11-22
- 태그: Interview
- 요약: 엠앤와이즈 TS팀 기업·직무 분석과 자기소개, 지원 동기, 인성·퇴사 질문, GW·Kafka·NURI2 실무 Q&A를 한곳에 모아 검증 상태와 함께 정리한 면접 준비 기록.
- 소제목: 1. 기업과 직무 이해 · TS팀 경력직 공고 · 내 경험과 맞닿는 지점 · 2. 1분 자기소개 · 자기소개를 이렇게 구성한 이유 · 3. 지원 동기 · 각 문장의 근거 · 4. 인성 질문 — 성격의 장단점 · 답변 · 5. 인성 질문 — 퇴사 사유와 협업 경험 · 답변의 맥락 · 일반형 답변 · 엠앤와이즈 TS팀에 맞춘 답변 · 예상 꼬리 질문 · 예상 꼬리 질문 — "저희도 운영 업무가 많은데 괜찮으시겠어요?" · 6. 면접관에게 할 질문 · 7. 준비 체크 · 8. 정리 · 9. Q1~Q6과 기술 블로그 매핑 (2026-11-22) · 사실 검증 표기의 의미 · 기존 글 조사와 보완 결과 · 가장 중요한 정정 · 10. 최종 면접 답변 매핑 · Q1. 연동 오류를 줄인 경험을 설명해 주세요 · Q2. 시스템 간 데이터 연동은 왜 실패했나요 · Q3. Kafka 토픽과 시스템 연동은 어떻게 설명하나요 · Q4. 이전 회사에서 퇴사한 이유는 무엇인가요 · Q5. 어떤 메시징 솔루션을 사용했고 어떻게 개발했나요 · Q6. 메시지 발송 이력과 실패 재처리는 어떻게 관리했나요 · 면접 전 확인할 자료

### [개발자 1분 자기소개 — 협업을 묻는 면접과 직무를 묻는 면접](src/posts/interview-one-minute-introduction.md)

- 날짜: 2026-11-06
- 태그: Interview, Java, Spring, 협업, 성능 개선
- 요약: 신뢰를 쌓는 업무 태도와 성능·운영·보안의 세 가지 개선 성과를 자연형·직무형 자기소개로 정리했다.
- 소제목: 자연형 1분 자기소개 · 직무형 1분 자기소개 · 대본에 담은 업무와 성과 · 초안을 다듬으며 남긴 것 · 면접 가이드와 사례에서 적용한 부분 · 이어지는 질문에는 이렇게 답한다

### [NURI2 알림톡 자동 발송 배치 실무 복기 — 발송 대상 관리, DB 큐 연동, 이력 조회](src/posts/nuri2-message-batch-interview-review.md)

- 날짜: 2026-11-19
- 태그: Interview, Messaging, Java, Spring, Batch
- 요약: 심의 지연으로 의결기한을 넘긴 대상자에게 안내 메시지를 보내는 배치를 만들며, 발송 대상 관리 테이블·NURI2 DATA 적재·LOG 대조와 트랜잭션 범위를 어떻게 나눴는지와 남은 한계를 정리한 기록.
- 소제목: 1. 한눈에 보기 · 2. 배경 · 3. 처리 흐름 · 직접 개발한 영역과 솔루션이 제공한 영역 · 4. 설계에서 나눈 것 · 4-1. 대상 관리와 발송 큐를 분리 · 4-2. 신규 적재와 요청 적재 재시도를 나눔 · 4-3. 트랜잭션 범위 · 4-4. 템플릿과 발송 객체 · 5. 성과와 한계 · 성과 · 한계 · 지금 다시 한다면 (당시 구현이 아니라 개선안) · 6. 기술 원리 정리 · 중복 발송 방지 · 트랜잭션의 한계 · Spring `@Transactional` 기본 · DB 테이블을 큐로 쓰는 방식 · 7. 이어지는 질문 대비 · 고정 답변: "메시지가 일부만 안 갔다"는 항의 · 8. 지원 직무와 연결 — 엠앤와이즈 TS팀 · 9. 확인 필요 항목 · 참고 · 면접 연습 Q5·Q6 — 원문과 정정된 상태 의미 · Q5. 어떤 메시징 솔루션을 사용했고, 어떻게 개발하여 성과를 냈나요? · Q6. 메시지 발송 실패에 대한 이력 관리는 어떻게 했나요? · 관련 글과 공식 기술 근거

### [SQL 성능 개선 실무 복기 — CUBRID 실행계획, 인덱스 튜닝, 검증 경험](src/posts/sql-performance-tuning-interview-review.md)

- 날짜: 2026-11-20
- 태그: Interview, SQL, CUBRID, Performance, Index
- 요약: 전세사기 피해자 관련 행정망 내부 시스템의 목록 조회 지연 개선 경험을 실제 수행 업무, 검증 과정, 사후 학습, 미확인 사항으로 구분해 정리한 면접 복기 노트.
- 소제목: 1. 핵심 요약 · 확정해서 말할 수 있는 문장 · 수치를 말하기 전에 확인할 점 · 감소율을 묻는다면 · 2. 업무 배경 — 이 화면은 무슨 일을 했나 · 3. 실제 수행한 작업 — 복기한 순서 · AI 도구 활용을 어떻게 설명할까 · 4. 성과 검증 — 무엇을 측정했나 · 4-1. SQL 실행 시간과 화면 응답 시간 · 4-2. AS-IS / TO-BE 데이터 비교 · 5. 사후 학습 — 실행계획과 인덱스 핵심 원리 · 5-1. 순차 스캔(`sscan`)과 인덱스 스캔(`iscan`) · 5-2. 인덱스가 있어도 쓰이지 않거나 비효율적인 경우 · 5-3. 복합 인덱스 — 백과사전 목차 비유 · 5-4. `ORDER BY`와 인덱스 · 5-5. 인덱스를 추가할 때의 비용 · 5-6. 개발환경과 운영환경의 차이 · 6. 사후 학습용 예제 SQL과 플랜 (원본 아님) · 6-1. 인덱스를 못 쓰게 만드는 흔한 실수 — Before / After · 6-2. CUBRID에서 플랜을 보는 방법 (학습용) · 7. 면접 답변 (구어체) · 질문: SQL 성능 개선 경험을 설명해 주세요. (약 1분) · 20초 압축 답변 · 질문: 직접 SQL 튜닝을 하신 건가요? · 질문: AI가 제안한 내용을 어떻게 믿을 수 있었나요? · 질문: 무엇이 가장 큰 원인이었나요? · 질문: 왜 복합 인덱스가 유리할 수 있나요? · 질문: 인덱스가 있는데 왜 Full Scan을 할 수 있나요? · 질문: 인덱스를 추가하면 단점은 없나요? · 질문: 개선 후 데이터가 달라지지 않았는지 어떻게 확인했나요? · 질문: Oracle 튜닝 경험과는 어떻게 다른가요? · 질문: 이 경험으로 무엇을 배웠나요? · 질문: 이 경험이 지원 직무와 어떻게 연결되나요? · 8. 검증 수준과 확인할 내용 · 9. 이어서 공부할 질문 · 10. 참고 자료 · 11. 면접 직전 암기 카드


## redis-cache

### [화면마다 권한 API를 호출하던 시스템 — Redis 캐시의 TTL과 무효화 정책](src/posts/redis-permission-cache-ttl.md)

- 날짜: 2025-01-07
- 태그: Java, Spring, Redis, Performance
- 요약: 권한 API에서 가져온 사용자 권한을 Redis에 저장해 반복 호출을 줄인 기록 — 로그인·재로그인 시 권한 갱신, 캐시 재사용과 보관 기간 정리
- 소제목: 배경 — 반복되는 권한 조회 · 로그인 시 권한 정보 저장 · 재로그인 시 권한 갱신 · 캐시 보관 기간 · 권한 변경 요구가 생긴다면 — 후속 개선안 · 결과 · 배운 점


## sast-cwe

### [취약점을 유형별로 나누고 Claude와 검토하기 — 세션 분리부터 화면·데이터 검증까지](src/posts/claude-assisted-security-remediation.md)

- 날짜: 2026-11-13
- 태그: Security, SAST, Claude, AI, Retrospective
- 요약: CodeRay 결과를 유형별로 분류하고 Claude 세션을 나눠 분석·수정에 활용한 뒤, 브라우저 확인·직접 재테스트·AS-IS 데이터 대조로 검증한 보안 조치 경험
- 소제목: 시작점은 프롬프트가 아니라 CodeRay 결과 분류였다 · 세션을 나눠 관련 코드와 분석 내용을 전달했다 · 브라우저에서 함께 확인한 뒤, 다시 직접 테스트했다 · 내가 맡은 판단과 AI의 역할 · 결과는 전체 조치의 성과로 설명한다 · 배운 점과 다음에 보완할 점

### [CWE-209 오류 메시지 정보노출 — 예외 로깅이 보안 결함이 되는 순간](src/posts/cwe-209-error-message-exposure.md)

- 날짜: 2026-08-12
- 태그: Security, Java, SAST
- 요약: e.getMessage() 문자열 조립, printStackTrace 등 예외 정보가 새어 나가던 25여 건을 "고정 문구 + throwable 전달" 원칙으로 통일한 기록
- 소제목: 무엇이 문제인가 · 조치 원칙 — 하나로 통일 · 배운 점

### [CWE-330·489·497 — 결함의 절반은 쓰지 않는 코드에 있었다](src/posts/cwe-330-489-dead-code-removal.md)

- 날짜: 2026-08-12
- 태그: Security, Java, SAST
- 요약: 부적절한 난수, 디버그 코드, 시스템 정보 노출 검출을 추적해 보니 대부분 미사용 벤더 모듈과 테스트 화면 — 진입점 역추적 후 삭제로 종결한 기록
- 소제목: 발견된 것들 · 조치 — 고치지 않고 지우기 위한 확인 절차 · 덤 — 미사용 유틸의 TOCTOU (CWE-367) · 배운 점

### [CWE-404·496 — 자원 해제와 방어적 복사, 객체를 안전하게 다루는 두 가지](src/posts/cwe-404-496-resource-handling.md)

- 날짜: 2026-08-12
- 태그: Security, Java, SAST
- 요약: 수동 close를 try-with-resources로 전환하고(CWE-404), setter의 배열 참조 저장을 방어적 복사로 바꾼(CWE-496) 조치 기록
- 소제목: CWE-404 — 예외가 나면 close는 실행되지 않는다 · CWE-496 — setter가 배열 참조를 그대로 저장하면 · 배운 점

### [CWE-476 Null Pointer 역참조 — 검출 15건을 한 곳에서 잡은 이야기](src/posts/cwe-476-null-dereference.md)

- 날짜: 2026-08-12
- 태그: Security, Java, SAST
- 요약: NPE 검출 20여 건을 라인 단위가 아니라 근원 단위로 추적해, 공통 유틸 한 곳 수정으로 15건을 일괄 해소한 기록
- 소제목: 검출 15건의 근원은 한 곳이었다 · 나머지 케이스 — "null을 반환할 수 있는 API"들 · 배운 점

### [CWE-615 주석 속 민감정보 — 주석 처리했다고 사라지는 게 아니다](src/posts/cwe-615-sensitive-comments.md)

- 날짜: 2026-08-12
- 태그: Security, Java, SAST
- 요약: 주석에 남은 인증 관련 정보 제거 기록 — 소스·형상관리와 HTML/JS 산출물의 노출 경로를 구분하고, 이력에 남은 비밀정보는 별도 조치해야 한다
- 소제목: 발견된 것들 · 주석이 왜 위험한가 · 조치 — 삭제, 그리고 걱정 내려놓기 · 배운 점

### [CWE-676 위험한 API 사용 — eval을 지우기 전에 해야 하는 일](src/posts/cwe-676-dangerous-api.md)

- 날짜: 2026-08-12
- 태그: Security, JavaScript, Java, SAST
- 요약: 레거시 JS의 eval 호출부를 조사해 문자열 평가를 제거하고 deprecated API를 정리한 기록 — 동적 콜백 허용 범위는 추가 확인 과제로 구분
- 소제목: 케이스 1 — 문자열 조립 eval은 문법으로 대체된다 · 케이스 2 — 콜백 eval, 지우기 전에 전수조사 · 케이스 3 — deprecated API의 조용한 위험 · 조치불가 판정 — 서드파티 라이브러리 속 eval · 배운 점

### [CWE-754 부적절한 예외 처리 — catch(Exception)을 걷어내며](src/posts/cwe-754-exception-handling.md)

- 날짜: 2026-08-12
- 태그: Security, Java, SAST
- 요약: 광범위한 catch, 무의미한 재던지기, 예외 삼키기, null 미검사 — 네 가지 안티패턴을 걷어낸 예외 처리 정비 기록
- 소제목: 안티패턴 1 — 광범위한 catch(Exception) · 안티패턴 2 — 잡아서 그대로 다시 던지기 · 안티패턴 3 — 예외 삼키기 · 안티패턴 4 — 실패 조건 미검사 · 배운 점

### [CWE-79 크로스 사이트 스크립팅 — 레거시 JSP 200여 건 조치 기록](src/posts/cwe-79-xss-remediation.md)

- 날짜: 2026-08-12
- 태그: Security, JSP, XSS, SAST
- 요약: 코드레이 정적분석에서 검출된 CWE-79 결함 200여 건을 패턴별로 분류하고, 레거시 JSP 출력 구조를 개편해 조치한 과정 정리
- 소제목: 전제 — 이 시스템의 방어 구조 · 패턴 1 — HTML 본문의 raw EL 출력 (가장 많음) · 함정 — "마스킹했으니 안전하다"는 착각 · 패턴 2 — 인코딩 저장값의 이중 처리 (디코딩 + 재이스케이프) · 패턴 3 — HTML을 반환하는 서버 함수 출력 · 패턴 4 — 에러 페이지의 예외 메시지 출력 · 패턴 5 — 죽은 코드는 고치지 않고 삭제 · 패턴 6 — 에디터 본문처럼 escape할 수 없는 값 · 정리 · 배운 점

### [정적 분석 결과를 실제 취약점으로 검증하는 과정](src/posts/security-sast-dast-finding-validation.md)

- 날짜: 2026-11-22
- 태그: Security, SAST, DAST, CodeRay, Interview
- 요약: 정적 분석의 경고와 실행 검증을 구분하고 데이터 흐름·오탐·공통 원인·회귀 검사 순서로 개선을 정리한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [인증·인가와 CSRF를 구분하기](src/posts/web-authentication-authorization-csrf.md)

- 날짜: 2026-11-22
- 태그: Security, Authentication, Authorization, CSRF, Interview
- 요약: 사용자 신원과 요청별 권한, 브라우저 자격 증명 자동 전송을 구별하고 CSRF의 성립 조건을 정리한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [SQL Injection과 XSS는 어디에서 막아야 하는가](src/posts/web-sql-injection-xss-prevention.md)

- 날짜: 2026-11-22
- 태그: Security, SQL Injection, XSS, Interview
- 요약: 입력이 코드로 해석되는 경계를 기준으로 SQL 바인딩·식별자 허용 목록·출력 문맥별 XSS 방어를 구별한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료


## seulgae-tech-lab

### [AI 툴 활용법 · Claude 01 — 개발 환경 구축 및 필수 플러그인 정리](src/posts/claude-code-development-environment-plugins.md)

- 날짜: 2026-11-24
- 태그: Claude, Claude Code, AI, MCP, LSP
- 요약: Claude Code에서 플러그인과 MCP를 설정하는 방법, 29개 확장 기능의 역할, 설계부터 검증까지 단계별 활용 계획을 정리했다.
- 소제목: Claude 확장 기능은 어디에 쓰이는가 · 터미널에서 시작하고 연결 상태 확인하기 · 11월 24일 기준 설치 기록 · 코드와 문서, 브라우저를 연결하는 도구 · 요구사항부터 변경 검토까지 · 보안 검토에 쓰는 도구 · 언어별 코드 탐색과 진단 · 프론트엔드, 기술 학습, 확장 기능 개발 · 개발 단계별로 남길 결과 · 바로 활용할 프롬프트 · 신규 기능 설계 · 장애 및 오류 분석 · 기술 원리 학습 · 변경점 리뷰와 보안 검토 · 다음 글에서 살펴볼 것

### [슬개기술연구소 — 관리자인데 문이 열리지 않은 생성 순서 문제](src/posts/seulgae-tech-lab-admin-room-auth-initialization-race.md)

- 날짜: 2026-11-23
- 태그: React, TypeScript, Authorization, Phaser
- 요약: 인증 상태와 게임 클라이언트의 생성 순서가 엇갈린 문제를 분석했다.
- 소제목: 서버와 화면의 판단을 나눠 확인하다 · 필요할 때 현재 상태를 읽는다

### [슬개기술연구소 — 관리자실 문보다 중요한 것은 API의 권한 검사였다](src/posts/seulgae-tech-lab-admin-sql-console-boundaries.md)

- 날짜: 2026-11-18
- 태그: Spring Boot, JDBC, PostgreSQL, React, Security
- 요약: 관리자 전용 SQL 콘솔에 요청별 권한과 실행 제한을 적용하고 검증 한계를 구분한 커밋을 코드와 문서로 정리했다.
- 소제목: 문은 안내이고 권한은 요청마다 확인한다 · 자유 SQL에는 일반 조회 API와 다른 계약이 필요하다 · Statement를 선택한 맥락 · 가짜 JDBC로 확인한 것과 남은 것 · 배운 점

### [슬개기술연구소 — 오락실에서 남은 횟수와 기력 부족을 구분하기](src/posts/seulgae-tech-lab-arcade-limits-and-energy-feedback.md)

- 날짜: 2026-11-24
- 태그: TypeScript, React, Spring Boot, Game UX
- 요약: 오락실 게임 선택과 하루 횟수 제한, 실패 이유 안내를 정리했다.
- 소제목: 게임 선택과 비용 · 다섯 판 제한과 자원 부족은 다른 이유다

### [슬개기술연구소 — 서버 기준 이동에도 전송과 종료의 순서가 필요했다](src/posts/seulgae-tech-lab-authoritative-lobby-connection-lifecycle.md)

- 날짜: 2026-11-16
- 태그: WebSocket, Spring Boot, TypeScript, Concurrency
- 요약: 서버 기준 이동과 전송 제한·송신 종료 경쟁을 보완한 PR #6~#10을 정리했다.
- 소제목: 좌표 대신 입력을 받는 이유 · 20Hz로 보내도 수신은 몰릴 수 있다 · 종료 프레임도 같은 송신 흐름에서 처리하기 · 배운 점

### [슬개기술연구소 — 기능별 패키지 안에서 계층을 다시 나누기](src/posts/seulgae-tech-lab-backend-feature-layer-packages.md)

- 날짜: 2026-11-23
- 태그: Java, Spring Boot, Architecture, JDBC, Refactoring
- 요약: 기능별 백엔드 패키지를 컨트롤러·서비스·저장소 계층으로 정리한 변경을 살펴봤다.
- 소제목: 기능을 먼저, 계층을 그 안에 둔다 · 인터페이스 분리의 목적과 비용 · 대량 이동 후 무엇을 확인했나

### [슬개기술연구소 — 사원증 급여를 여러 탭에서 한 번만 받게 하기](src/posts/seulgae-tech-lab-badge-salary-conditional-update.md)

- 날짜: 2026-11-24
- 태그: Spring Boot, PostgreSQL, Flyway, Transactions
- 요약: 사원증 직급과 조건부 급여 지급, V22 전환을 정리했다.
- 소제목: 등급을 저장하지 않고 완료 횟수로 계산한다 · 요청 횟수와 지급 횟수를 구분한다

### [슬개기술연구소 — 채팅창을 열어도 게임 연결은 다시 만들지 않기](src/posts/seulgae-tech-lab-chat-connection-ownership.md)

- 날짜: 2026-11-16
- 태그: React, Phaser, WebSocket, Spring Boot, Unicode
- 요약: 채팅의 연결 소유권과 메시지 검증을 분리한 PR #12를 정리했다.
- 소제목: 연결 소유자는 하나, 화면은 구독자로 두기 · 발신자와 시각은 서버가 정하기 · 말풍선은 메시지마다 만들지 않기 · 입력창과 게임 키보드의 경계 · 배운 점

### [슬개기술연구소 GitHub 저장소를 기존 로컬 폴더에 복제한 과정](src/posts/seulgae-tech-lab-clone-into-existing-folder.md)

- 날짜: 2026-11-15
- 태그: Git, GitHub, Windows, PowerShell
- 요약: 새 프로젝트의 GitHub 저장소를 미리 생성한 로컬 폴더에 복제하고 origin, 브랜치, 작업 트리 상태를 검증한 과정이다.
- 소제목: 저장소를 새로 만들면서 고민한 점 · 원격 저장소와 로컬 저장소의 역할 · 이미 만든 폴더에 바로 복제하기 · 실제 복제 결과와 검증 · 다음 단계에서 주의할 점 · 참고 자료

### [컴퓨터 상호작용으로 React 연구 기록 패널 열기 — 슬개기술연구소 8단계](src/posts/seulgae-tech-lab-computer-interaction-research-panel.md)

- 날짜: 2026-11-15
- 태그: Phaser, React, TypeScript, 이벤트, 게임 개발
- 요약: 컴퓨터 근접 판정과 E 키 단일 입력을 React 패널에 연결하고, 이동 잠금과 이벤트 정리·반복 개폐를 검증한 기록.
- 소제목: 먼저 확인한 기존 상태와 작업 범위 · 중심점 대신 컴퓨터 책상 가장자리로 접근을 판정했다 · E를 누르고 있어도 한 번만 실행하도록 했다 · Phaser와 React는 인스턴스별 이벤트로 연결했다 · React 패널은 기본 dialog로 구현했다 · 패널 표시와 이동 잠금은 별도로 처리했다 · 실제 검증한 결과 · 브라우저에서 확인한 항목 · 자동 검증 7개 · 프로젝트 커밋과 푸시, 배포 범위 · 배운 점과 다음 단계

### [슬개기술연구소 — CCTV의 관측 범위와 낚시의 시간 규칙을 분리하기](src/posts/seulgae-tech-lab-control-room-outdoor-fishing.md)

- 날짜: 2026-11-17
- 태그: Phaser, TypeScript, WebSocket, Game Design
- 요약: 관제실의 선택적 상태 배포와 바깥 초원·낚시의 순수 규칙을 추가한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 보는 사람에게 필요한 정보만 보내기 · 낚시는 화면 효과보다 상태 전이가 먼저다 · 바닥은 가구와 같은 깊이 규칙을 쓰면 안 된다 · 배운 점

### [슬개기술연구소 — 협동 연구실에서 맵 실행과 대기실을 분리하기](src/posts/seulgae-tech-lab-cooperative-usemap-lobby-iframe.md)

- 날짜: 2026-11-24
- 태그: WebSocket, Phaser, iframe, TypeScript
- 요약: 협동 맵의 방 관리와 iframe 메시지 경계, 대기실 열기 경쟁을 정리했다.
- 소제목: 플랫폼과 맵의 책임을 나눈다 · 이동 중 창 열기가 무시된 문제 · 대기실에 어울리는 공간 만들기

### [슬개기술연구소 — 게임 규칙을 테이블로 옮기고 침대 휴식에 간격을 두기](src/posts/seulgae-tech-lab-database-game-rules-vitals-rest.md)

- 날짜: 2026-11-24
- 태그: Spring Boot, PostgreSQL, Flyway, Caching, Transactions
- 요약: V23 규칙 캐시와 V24 행동 비용·휴식의 서버 검증을 정리했다.
- 소제목: 규칙의 출처를 공유한다 · 행동과 차감을 같은 거래로

### [슬개기술연구소 — 연구 기록 컴퓨터 앞 의자를 치울 때 확인한 좌석 데이터](src/posts/seulgae-tech-lab-development-lab-seat-removal.md)

- 날짜: 2026-11-23
- 태그: Phaser, Game Design, Testing
- 요약: 개발 연구실의 의자 두 개를 제거하고 방별 좌석 규칙을 확인한 변경을 정리했다.
- 소제목: 화면의 가구와 좌석 판정을 함께 살핀다

### [슬개기술연구소 — 엔딩을 보기 직전에 자격을 다시 확인하기](src/posts/seulgae-tech-lab-ending-rebirth-transaction.md)

- 날짜: 2026-11-24
- 태그: Spring Boot, PostgreSQL, Flyway, Transactions
- 요약: 엔딩 조건을 서버에서 다시 확인하고 환생 기록을 저장한 과정을 정리했다.
- 소제목: 조회와 완료의 책임을 나눈다 · 스키마를 준비하고 기능을 연결한다

### [슬개기술연구소 — 회복 결과를 보여 주고 의자에서 컴퓨터를 켜기](src/posts/seulgae-tech-lab-energy-display-seat-interaction-followups.md)

- 날짜: 2026-11-24
- 태그: TypeScript, Phaser, React, Game UX
- 요약: 기력 회복 표시와 내 자리 의자 상호작용의 후속 PR을 정리했다.
- 소제목: 첫 구매에도 변화량을 보여 주기 · 카페 배너에는 구매 정보만 남기기 · 의자와 패널의 순서를 연결하기 · 가까운 상호작용 대상 선택

### [슬개기술연구소 — 완료 체크보다 먼저 배포한 스키마 확장](src/posts/seulgae-tech-lab-expand-migrate-use-idea-done.md)

- 날짜: 2026-11-17
- 태그: Flyway, PostgreSQL, React, CI/CD, Python
- 요약: 스키마 확장과 사용 코드를 분리하고 아이디어 완료 체크에 낙관적 갱신을 적용한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 옛 앱도 견디는 스키마를 먼저 만들기 · 새 릴리스뿐 아니라 실행 중인 앱도 확인하기 · 공유 상태에는 별도의 권한 모델이 있었다 · 배운 점

### [슬개기술연구소 최종 회고 — 화면에서 데이터와 운영까지](src/posts/seulgae-tech-lab-final-retrospective.md)

- 날짜: 2026-11-24
- 태그: Retrospective, Phaser, Spring Boot, PostgreSQL, WebSocket, CI/CD
- 요약: 연구소 개발을 마치며 사용한 기술과 주요 장애, 설계 판단의 변화를 정리하고 이전 글 85편을 주제별로 묶었다.
- 소제목: 화면과 게임 입력 · 무엇이 화면을 제어하는가 · 실시간 통신 · 서버 판정과 화면 표시의 시간을 구분하다 · 백엔드와 데이터 · 잔액, 소유권, 한 번의 지급 · 인증과 운영 권한 · 화면이 아는 상태와 서버가 허용한 상태 · 배포와 운영 · 실패한 위치를 분리해서 찾기 · 개발을 마치며 · 전체 글 찾아보기 · 화면·공간·사용자 경험 · 멀티플레이·실시간 연결 · 백엔드 설계·게임 상태와 재화 · 인증·회원 권한 · 데이터 전환과 기능 개편 · 개발 환경·배포·관측과 문서

### [슬개기술연구소 — 첫 출근 안내를 호숫가에서 내 자리까지 잇기](src/posts/seulgae-tech-lab-first-day-onboarding-handover.md)

- 날짜: 2026-11-24
- 태그: Phaser, React, TypeScript, Game UX
- 요약: 안내 로봇과 선임 연구원, 인수인계서를 방문 흐름에 맞춰 연결한 과정을 정리했다.
- 소제목: 선택을 남기고 공간이 바뀔 때 안내를 이어 간다 · 작은 화면에서 선택이 읽히는지 확인한다

### [슬개기술연구소 — 낚시터를 옮길 때 그림 밖의 좌표도 함께 옮기기](src/posts/seulgae-tech-lab-fishing-dock-spatial-consistency.md)

- 날짜: 2026-11-23
- 태그: Phaser, TypeScript, Game Design, Testing
- 요약: 낚시 데크와 상호작용, 소리 영역과 NPC 경로를 함께 변경한 PR을 살펴봤다.
- 소제목: 하나의 장소에 여러 좌표가 연결된다

### ["[슬개기술연구소] GitHub Actions와 Tailscale로 홈서버 자동 배포 연결하기"](src/posts/seulgae-tech-lab-github-actions-tailscale-auto-deploy.md)

- 날짜: 2026-11-15
- 태그: GitHub Actions, Tailscale, CI/CD, SSH, Docker Compose, Ubuntu, 홈서버
- 요약: "GitHub Actions Secrets·Variables와 Tailscale Auth Key를 설정하고, 기존 deploy.sh를 원격 실행하는 자동 배포를 연결한 과정"
- 소제목: 1. 배포 구조 · 2. GitHub Actions Secrets 등록 · SSH 배포키 등록 · 3. Tailscale Auth Key 생성 · 4. GitHub Actions Variables 설정 · 5. Tailscale 접근 정책 확인 · 6. 배포 워크플로 동작 방식 · 7. 첫 자동 배포 실행 및 결과 · 8. 홈서버에서 자주 쓰는 운영 명령어 · 9. 정리 및 남은 개선 사항

### [새 프로젝트의 GitHub 저장소를 만들고 Windows 개발 환경에 연결하기](src/posts/seulgae-tech-lab-github-repository-setup.md)

- 날짜: 2026-11-15
- 태그: Git, GitHub, Windows, Repository
- 요약: 슬개기술연구소를 기존 프로젝트와 분리하기 위해 GitHub 저장소 생성과 Windows 로컬 복제 절차를 정리했다.
- 소제목: 새 프로젝트에 독립된 저장소가 필요했던 이유 · 저장소 생성 시 정한 기준 · Windows에서 로컬 작업 공간 준비 · 로컬 저장소 연결 확인 · 초기 브랜치 운영 계획 · 정리와 다음 확인 사항 · 참고 자료

### [슬개기술연구소 — Phaser 한글 획이 사라진 원인은 축소 렌더링이었다](src/posts/seulgae-tech-lab-hangul-canvas-device-pixels.md)

- 날짜: 2026-11-16
- 태그: Phaser, Canvas, HiDPI, TypeScript
- 요약: 한글 획 손실을 표시 크기와 기기 픽셀 비율로 분석하고 렌더 해상도를 조정한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 픽셀아트와 글자가 같은 필터를 쓰던 문제 · 반올림 오차까지 실제 배율에 반영하기 · 기록으로 확인한 범위 · 배운 점

### [슬개기술연구소 — 고지연 경로에서는 압축과 대기 시간도 게임 설계였다](src/posts/seulgae-tech-lab-high-latency-asset-delivery.md)

- 날짜: 2026-11-16
- 태그: WebSocket, nginx, Vite, Spring Boot, Network
- 요약: 정적 파일과 API 지연을 비교하고 압축·캐시·청크 분리와 연결 대기 시간을 조정한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 보내는 양과 다시 받는 횟수를 줄이기 · 느린 응답을 실패로 판정하지 않기 · 테스트 종료 오류와 실제 장애를 구분하기 · 배운 점

### [슬개기술연구소 — 120Hz 화면에서 발걸음이 연속으로 들린 이유](src/posts/seulgae-tech-lab-high-refresh-mobile-footstep-timing.md)

- 날짜: 2026-11-23
- 태그: Phaser, TypeScript, Audio, Game Loop
- 요약: 물리 갱신과 화면 주기의 차이를 시간 기반 정지 판정으로 다뤘다.
- 소제목: 움직이지 않은 한 프레임이 정지는 아니다 · 좌표가 유지된 시간을 누적한다

### [슬개기술연구소 — 물고기 소유권과 동전 잔액을 조건부 UPDATE로 지키기](src/posts/seulgae-tech-lab-inventory-coins-conditional-updates.md)

- 날짜: 2026-11-17
- 태그: Spring Boot, PostgreSQL, React, WebSocket
- 요약: 회원 가방과 동전 장부에 조건부 갱신을 적용하고 통신 방식의 후속 변화까지 구분한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 가방과 바닥을 하나의 아이템 상태로 표현하기 · 잔액 검사와 차감을 따로 하지 않기 · 소켓을 썼던 이유와 지금의 차이 · 배운 점

### [기존 Ubuntu 서버에 연구소를 함께 운영하기 — Compose 격리부터 IntelliJ 개발 DB 연결까지](src/posts/seulgae-tech-lab-isolated-server-and-development-db.md)

- 날짜: 2026-11-15
- 태그: Ubuntu, Hyper-V, Docker Compose, PostgreSQL, SSH, Spring Boot, IntelliJ, Infra
- 요약: InvenCore를 중단하지 않고 기존 서버에 연구소 실행 환경과 개발·운영 DB를 분리하고, SSH 터널과 IntelliJ에서 접속 및 권한 제한을 검증한 기록.
- 소제목: 변경보다 기존 서비스 조사부터 시작했다 · SSH와 Docker 권한도 별도로 풀어야 했다 · Compose를 분리하고 DB 인스턴스만 공유했다 · DB 이름뿐 아니라 실행·마이그레이션 권한도 나눴다 · 추가한 파일과 실제 구현 범위 · 백엔드는 DB 연결과 상태 확인까지만 만들었다 · 비밀번호는 이미지와 Git 밖에서 전달했다 · 상태 확인 경로도 실제 응답으로 바로잡았다 · Windows 터널과 IntelliJ 조회를 따로 검증했다 · 노출된 개발 비밀번호는 교체하고 다시 연결했다 · 실제 수행한 검증과 한계를 구분했다 · 커밋·CI 성공과 자동 배포 완료는 구분했다 · 배운 점과 남은 범위

### [Java 17 기준을 바로잡고 IntelliJ 로컬 실행 구성 만들기](src/posts/seulgae-tech-lab-java-intellij-local-run.md)

- 날짜: 2026-11-15
- 태그: Java, IntelliJ, Maven, Spring Boot, Docker, 개발 환경
- 요약: 잘못 적용한 Java 21 기준을 17로 수정하고 IntelliJ에서 백엔드 실행과 개발 DB 연결을 확인한 뒤, 코드·CI·운영 배포의 현재 상태를 구분한 기록.
- 소제목: 로컬 실행 버튼을 만들기 전에 실제 설정을 확인했다 · 백엔드와 프론트엔드 실행 구성을 분리했다 · 비밀번호 값은 실행 구성에 복사하지 않았다 · 두 번의 실행 문제를 실제 원인에 맞춰 수정했다 · 실행 중인 JAR가 빌드 결과물을 잠그고 있었다 · Maven 실행 구성은 JDK 경로를 SDK 이름으로 인식하지 못했다 · 실제 확인한 결과와 확인하지 못한 범위 · 현재 프로젝트는 어디까지 진행됐는가 · 배운 점과 남은 작업

### [슬개기술연구소 — Java 연습 오류와 QA 버튼이 알려 준 피드백의 차이](src/posts/seulgae-tech-lab-java-practice-errors-and-qa-buttons.md)

- 날짜: 2026-11-24
- 태그: Java, Spring Boot, React, CSS, Game UX
- 요약: Java 형식 문자열 연습의 요청 제한과 오류 안내, QA 단계 버튼의 스타일 충돌을 정리했다.
- 소제목: 반복 실행에 글쓰기 제한을 그대로 적용한 문제 · 예외 이름에 인자의 순서를 설명하다 · 목록 버튼 스타일이 단계 버튼까지 덮었다 · 확인한 범위

### [슬개기술연구소 — 카카오 로그인과 배포 설정을 같은 기능으로 다루기](src/posts/seulgae-tech-lab-kakao-login-production-config.md)

- 날짜: 2026-11-17
- 태그: Spring Boot, OAuth 2.0, PostgreSQL, Docker Compose, React
- 요약: 서명 쿠키와 기존 수정 키를 함께 지원하고 개발 DB·운영 로그인 설정을 연결한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 인증을 추가해도 이전 글은 고칠 수 있어야 한다 · 재시작과 별개로 검증하는 서명 쿠키 · 로그인 코드보다 먼저 준비돼야 할 것 · 배운 점

### [슬개기술연구소 — 로비 소품의 상태를 어디까지 저장할 것인가](src/posts/seulgae-tech-lab-lobby-cafe-and-books.md)

- 날짜: 2026-11-17
- 태그: Phaser, React, TypeScript, localStorage
- 요약: 로비 카페와 책장에 로컬 상태와 순차 연출을 적용한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 가벼운 기록에 서버 저장이 필요할까 · 책이 도착한 뒤에 읽기 창을 열기 · 가장 가까운 물체가 항상 의도한 대상은 아니다 · 배운 점

### [슬개기술연구소 — 개발 시작 경로를 DB 없는 화면 확인과 실제 DB 검증으로 나누기](src/posts/seulgae-tech-lab-local-development-verification-paths.md)

- 날짜: 2026-11-20
- 태그: Spring Boot, PostgreSQL, Maven, Vite, Testing
- 요약: 복제 이후 개발 경로를 메모리 테스트 앱과 일회용 PostgreSQL로 구분한 PR #52를 실제 구성과 대조했다.
- 소제목: 화면 흐름에는 운영 DB가 필요하지 않다 · 문서의 기능 목록보다 코드의 대체 범위를 확인하기 · SQL과 권한은 일회용 DB에서 확인하기 · 문서 명령도 실행 위치에 의존한다 · 배운 점

### [인프라 PR을 병합하고 개발 PC에서 Spring Boot 실행하기](src/posts/seulgae-tech-lab-main-sync-local-backend.md)

- 날짜: 2026-11-15
- 태그: GitHub, Java, Spring Boot, Maven, PostgreSQL, SSH
- 요약: CI를 통과한 인프라 PR을 main에 병합하고, 개발 폴더 동기화와 JDK 21 기반 로컬 백엔드의 개발 DB 연결을 확인한 기록.
- 소제목: 기존 작업 폴더와 PR부터 확인했다 · 강제 초기화 대신 fast-forward로 동기화했다 · JDK와 Maven은 실행 환경을 확인해서 선택했다 · 실행 계정으로 개발 DB에 연결했다 · CI와 배포 범위는 구분했다 · 남은 범위

### [검증 이미지로 실제 배포하고 앱 롤백과 운영 명령 확인하기](src/posts/seulgae-tech-lab-manual-deploy-rollback-verification.md)

- 날짜: 2026-11-15
- 태그: Docker Compose, GitHub Actions, PostgreSQL, Flyway, CI/CD
- 요약: 공개 GHCR 이미지와 운영 V1을 적용하고 수동 배포·중지·시작·재시작·롤백을 검증한 뒤 자동 배포의 남은 조건을 정리했다.
- 소제목: 병합과 이미지 게시를 나눠 확인했다 · 준비되지 않은 상태에서는 배포가 멈췄다 · 백업 후 기존 V1만 별도로 적용했다 · 이미지 digest로 첫 배포를 완료했다 · 운영 명령과 수동 롤백을 실제 실행했다 · 공유 서비스와 공개 접속을 따로 확인했다 · 자동 배포는 자격증명 등록 뒤에 검증한다

### [슬개기술연구소 — 아이템 교환은 신청보다 소유권 확정이 중요했다](src/posts/seulgae-tech-lab-meeting-item-trade-ground-events.md)

- 날짜: 2026-11-21
- 태그: Spring Boot, WebSocket, PostgreSQL, React, Transactions
- 요약: 회의실 교환 신청과 조건부 소유권 교체, REST 변경의 소켓 알림을 연결한 PR #55를 코드와 검증 기록으로 정리했다.
- 소제목: 짧은 신청과 영속 소유권을 나누기 · 신청할 때 내 물건이었다는 사실만 믿지 않기 · REST는 변경하고 소켓은 알려 주기 · 검증과 남은 화면 확인 · 배운 점

### [슬개기술연구소 — 멀티플레이를 회의실에만 남겨 이동을 단순하게 만들기](src/posts/seulgae-tech-lab-meeting-room-only-multiplayer.md)

- 날짜: 2026-11-18
- 태그: WebSocket, Phaser, Spring Boot, React, Architecture
- 요약: 회의실만 실시간 연결을 사용하도록 바꾸고 방 이동·아이템 통신의 책임을 재배치한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 연결을 유지할 필요가 있는 순간을 좁히기 · 즉시 이동에도 다음 틱이 필요한 이유 · 소켓이 사라진 방의 아이템은 어떻게 할까 · 배운 점

### [슬개기술연구소 — 관리자 권한을 등급 하나로 모으기까지](src/posts/seulgae-tech-lab-member-level-approval-and-admin-access.md)

- 날짜: 2026-11-23
- 태그: Spring Boot, PostgreSQL, Authorization, Flyway
- 요약: 회원 등급 신청과 승인, 관리자 예외 제거의 순서와 동시성 제약을 정리했다.
- 소제목: 신청 중복을 DB에서 막는다 · 승인과 등급 변경을 함께 묶는다

### [슬개기술연구소 — 모바일 조이스틱은 방향보다 손을 뗀 순간이 중요했다](src/posts/seulgae-tech-lab-mobile-joystick-input-lifecycle.md)

- 날짜: 2026-11-16
- 태그: React, Phaser, TypeScript, Pointer Events
- 요약: 터치 입력을 기존 이동 경로로 통합하고 포인터 취소·화면 전환의 입력 해제를 설계한 PR #16을 정리했다.
- 소제목: 아날로그 위치를 기존 8방향으로 바꾸기 · 패드 밖에서 손을 떼도 멈춰야 한다 · 패널과 화면 전환도 제스처의 끝이다 · 모의 포인터와 실제 휴대폰은 구별하기 · 배운 점

### [슬개기술연구소 — 내 자리 컴퓨터에 업무 기록과 Java 연습을 모으기](src/posts/seulgae-tech-lab-my-desk-idea-qa-daily-tasks.md)

- 날짜: 2026-11-24
- 태그: Spring Boot, PostgreSQL, Flyway, React
- 요약: V21 게시판 확장과 내 자리의 업무 계산·QA 상태 전이를 정리했다.
- 소제목: 기존 QA를 옮기고 새 업무를 나눈다 · 오늘 업무는 기존 기록에서 계산한다

### [슬개기술연구소 — 사무실 배치와 NPC 동선을 함께 검증하기](src/posts/seulgae-tech-lab-office-layout-navigation-and-npc-behavior.md)

- 날짜: 2026-11-23
- 태그: Phaser, TypeScript, Game Design, Testing
- 요약: 가구 좌표와 통로, NPC 연출을 함께 다룬 사무실 변경을 정리했다.
- 소제목: 그림과 충돌을 함께 바꾼다 · 생활 연출은 업무 상태와 분리한다

### [슬개기술연구소 — 네 사무실을 하나의 업무 흐름과 작은 오락실로 채우기](src/posts/seulgae-tech-lab-office-workflow-and-arcade.md)

- 날짜: 2026-11-17
- 태그: Spring Boot, PostgreSQL, React, Phaser, Workflow
- 요약: 개인 사무실 골격에 공통코드 기반 업무 흐름과 순수 규칙의 벽돌 부수기를 연결한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 공간의 차이를 데이터 흐름으로 만들기 · 공통코드는 DB에서도 그룹을 구분해야 한다 · 오락실은 게임 규칙과 그리기를 나누기 · 요청 도구의 오류를 앱 오류와 구별하기 · 배운 점

### [슬개기술연구소 — 같은 E 키에 방마다 다른 책임을 연결하기](src/posts/seulgae-tech-lab-per-room-e-interactions.md)

- 날짜: 2026-11-16
- 태그: React, Phaser, Spring Boot, WebSocket
- 요약: 공유 맵의 근접 판정과 서버 좌표 기반 테이블 대화, 요청 수명을 관리하는 정보 패널을 추가한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 대상 선택과 실행 책임을 나누기 · 대화 범위는 화면이 아닌 서버가 결정한다 · 정보 패널이 닫히면 조회도 끝나야 한다 · 장애와 설계상 주의를 구별하기 · 배운 점

### ["Phaser 4.2.1에서 3.90.0으로 변경하고 버전 고정하기"](src/posts/seulgae-tech-lab-phaser-4-2-1-to-3-90-0-pin-prune.md)

- 날짜: 2026-11-15
- 태그: ["Phaser", "npm", "의존성 관리", "개발 환경"]
- 요약: "슬개기술연구소 프런트엔드의 Phaser를 4.2.1에서 3.90.0으로 변경하고, --save-exact와 npm prune으로 의존성을 정리한 기록."
- 소제목: 처음 설치된 버전 확인 · Phaser 3.90.0으로 변경 · --save-exact로 버전 고정 · npm prune 실행 · 확인된 결과와 남은 확인 범위

### [슬개기술연구소 — 한글은 써지는데 띄어쓰기가 막힌 이유](src/posts/seulgae-tech-lab-phaser-key-capture-text-input.md)

- 날짜: 2026-11-17
- 태그: Phaser, React, TypeScript, DOM
- 요약: Phaser의 전역 키 가로채기를 입력 포커스와 연동해 게시판 입력을 복구한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 게임 입력을 막아도 기본 동작 취소는 남는다 · 포커스가 입력의 소유자를 결정하게 하기 · Scene이 끝나면 입력 정책도 돌려놓기 · 확인한 값은 입력 성공 화면만이 아니었다 · 배운 점

### [Phaser 멀티플레이어 트러블슈팅 — 이동 입력 대기 처리와 원격 캐릭터 보간](src/posts/seulgae-tech-lab-phaser-multiplayer-input-burst-remote-interpolation.md)

- 날짜: 2026-11-16
- 태그: Phaser, WebSocket, TypeScript, Spring Boot, 멀티플레이어, 트러블슈팅
- 요약: 정상 이동 입력이 지연 후 몰릴 때의 연결 종료 경로를 재현하고, 서버 대기 처리와 서버 시간 기반 원격 보간으로 개선한 과정과 검증 결과를 정리했다.
- 소제목: 같은 이동 문제처럼 보여도 확인할 기준이 달랐다 · 종료 로그에서 확정할 수 있는 범위를 먼저 정했다 · 정상 입력도 지연 뒤에 몰리면 거부될 수 있었다 · 수신한 순번과 완료한 순번을 분리했다 · 상대 캐릭터는 서버 시간의 표본 사이를 보간했다 · 재현 모델과 실제 브라우저의 결과를 나누어 확인했다 · 일정 이동을 비교한 격리 모델 · 로컬 브라우저 화면 두 개와 가변 지연 · 자동 검사와 PR 검증 · 재발했을 때 구분할 수 있도록 진단도 바꿨다 · 코드 반영과 남은 운영 확인 · 후속 PR을 대조하며 구분한 보정 단계 · 관련 구현과 검증 기록

### [Phaser 멀티플레이어 이동 진동 해결 — body.reset과 ack 기반 위치 보정](src/posts/seulgae-tech-lab-phaser-multiplayer-movement-rubber-banding.md)

- 날짜: 2026-11-16
- 태그: Phaser, WebSocket, TypeScript, Spring Boot, 트러블슈팅
- 요약: 이동 중 캐릭터가 흔들리던 원인을 Phaser Body로 재현하고, 입력 번호에 맞춘 예측 기록과 물리 프레임 이후 보정으로 개선한 과정과 검증 결과.
- 소제목: 연결 종료와 이동 진동을 먼저 구분했다 · 내 캐릭터의 위치를 바꾸는 경로를 추적했다 · 지연된 서버 좌표와 현재 좌표를 바로 비교하고 있었다 · body.reset은 좌표만 바꾸는 메서드가 아니었다 · 입력 번호에 맞춘 예측 위치를 기록했다 · 위치를 쓰는 시점을 물리 프레임 이후로 모았다 · 수정 전후를 같은 조건의 자동 테스트로 비교했다 · 실제 브라우저 두 개에 지연을 넣어 확인했다 · 이동 외의 기존 기능도 확인했다 · 테스트와 Docker 빌드를 확인한 뒤 병합했다 · 이번에 배운 점

### [Phaser 플레이어 이동 구현 — delta 적용과 대각선 속도 정규화](src/posts/seulgae-tech-lab-phaser-player-movement.md)

- 날짜: 2026-11-15
- 태그: Phaser, TypeScript, 게임 개발, 키보드 입력
- 요약: 주황색 사각형 플레이어에 WASD·방향키 이동을 연결하고 delta 적용, 대각선 정규화, 화면 경계 제한을 검증한 기록.
- 소제목: 기존 장면에 이동 로직을 분리해 붙이기 · Player.ts에서 입력과 이동을 처리했다 · 두 종류의 키를 하나의 방향으로 합쳤다 · delta를 초로 바꿔 이동 거리를 계산했다 · 대각선 벡터를 정규화했다 · 중심 좌표 대신 사각형 전체를 화면 안에 제한했다 · LabLobbyScene에서 생성과 갱신을 연결했다 · 실제 검증한 범위 · 브라우저에서 키를 눌러 확인한 항목 · 별도 계산 검증 16개 · 배운 점과 남은 범위

### [슬개기술연구소 — 폰 속 송금과 할 일에 서버 규칙을 두기](src/posts/seulgae-tech-lab-phone-apps-transaction-and-data-ownership.md)

- 날짜: 2026-11-23
- 태그: Spring Boot, PostgreSQL, React, Transactions
- 요약: 폰 앱의 송금 원장과 회원별 데이터 접근을 스키마 확장부터 살펴봤다.
- 소제목: 보내기와 받기를 한 거래로 · 개인 데이터는 조회 조건부터 소유자를 포함한다

### [슬개기술연구소 — 이전 버전이 없는 서버의 첫 배포를 설계하기](src/posts/seulgae-tech-lab-physical-server-first-deployment.md)

- 날짜: 2026-11-16
- 태그: Docker Compose, Python, PostgreSQL, CI/CD
- 요약: 기존 이미지 검증과 DB 보호를 유지하며 최초 배포와 실패 정리를 구분한 PR #17을 코드와 검증 기록으로 정리했다.
- 소제목: 없는 공유 서비스와 필수 DB를 구별하기 · 앱이 없다는 사실을 오류로 만들지 않기 · 최초 실패에는 롤백할 이미지가 없다 · 앱 시작을 DB 초기화와 분리하기 · 코드 검증과 실제 서버 이전을 나눠 보기 · 배운 점

### [슬개기술연구소 — 픽셀 캐릭터의 외형과 발밑 충돌을 분리하기](src/posts/seulgae-tech-lab-pixel-character-foot-collider.md)

- 날짜: 2026-11-15
- 태그: Phaser, TypeScript, Pixel Art, React
- 요약: 직접 생성한 픽셀 에셋과 방향별 애니메이션을 기존 물리·UI 계약에 연결한 PR #5를 코드와 작업 문서로 정리했다.
- 소제목: 이미지를 내려받는 대신 정수 픽셀로 그리기 · 발밑만 부딪히게 만들기 · 방향과 걷기 상태를 따로 관리하기 · 당시 확인한 화면과 남은 범위 · 배운 점

### [슬개기술연구소 — 화분의 보상에도 서버 추첨과 장부가 필요했다](src/posts/seulgae-tech-lab-plant-luck-server-rewards.md)

- 날짜: 2026-11-21
- 태그: Spring Boot, PostgreSQL, Phaser, TypeScript
- 요약: 식물 행운의 스키마 확장과 서버 추첨·쿨다운·일일 한도를 구현한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 공통코드도 먼저 준비하기 · 화면은 흔들고 서버는 당첨을 결정하기 · 테스트에서는 추첨을 고정하기 · 배운 점

### [슬개기술연구소 — 기술 원리 실험을 위한 방을 먼저 마련하기](src/posts/seulgae-tech-lab-practice-room-foundation.md)

- 날짜: 2026-11-24
- 태그: Phaser, TypeScript, Learning, Game UX
- 요약: 빈 방을 실습 연구실로 바꾸며 기술 원리 실험의 진행 방식을 정리했다.
- 소제목: 실험 장치 하나에 원리 하나 · 공간 변경도 안내를 함께 갱신한다

### [슬개기술연구소 — 가구를 사서 놓는 개인 기숙사의 서버 규칙](src/posts/seulgae-tech-lab-private-dorm-furniture-transactions.md)

- 날짜: 2026-11-24
- 태그: Spring Boot, PostgreSQL, Flyway, Phaser, Transactions
- 요약: 개인 기숙사의 가구 구매와 배치를 V19 스키마 확장, 서버 검증, 충돌 처리로 나눠 정리했다.
- 소제목: 스키마를 먼저 준비한다 · 잔액과 가구는 하나의 구매로 다룬다 · 미리보기와 최종 판정을 분리한다 · 확인한 범위

### [React와 Phaser 3를 연결해 첫 게임 화면 띄우기](src/posts/seulgae-tech-lab-react-phaser-first-screen.md)

- 날짜: 2026-11-15
- 태그: React, Phaser, TypeScript, Vite
- 요약: React 컴포넌트에서 Phaser 3.90.0 게임을 생성하고 StrictMode를 고려한 정리 코드를 작성한 뒤 첫 화면을 검증한 기록.
- 소제목: 기존 프로젝트부터 확인했다 · 장면의 내용은 LabLobbyScene에서 그렸다 · GameCanvas에서 게임 생성과 정리를 연결했다 · StrictMode를 끄는 대신 생성 예약을 취소하도록 했다 · App과 CSS는 화면 배치만 맡겼다 · 빌드와 브라우저에서 확인한 결과 · 이번 작업에서 배운 점

### [슬개기술연구소 — 검색 중심 채용 에이전트를 접수와 검토 흐름으로 바꾸기](src/posts/seulgae-tech-lab-recruitment-agent-evolution-and-inbox.md)

- 날짜: 2026-11-23
- 태그: Spring Boot, PostgreSQL, Scheduling, Data Integrity
- 요약: 채용 에이전트의 초기 설계와 접수 중심 후속 변경을 나누어 정리했다.
- 소제목: 처음에는 일정과 규칙을 서버에 두었다 · 이후에는 정형 공고의 접수로 바뀌었다

### [슬개기술연구소 — 채용 기능을 지울 때도 배포 순서를 설계하기](src/posts/seulgae-tech-lab-recruitment-removal-schema-contract.md)

- 날짜: 2026-11-23
- 태그: Spring Boot, PostgreSQL, Flyway, Deployment
- 요약: 채용 기능 제거와 V16 축소, 공유 작업 트리 테스트의 위험을 정리했다.
- 소제목: API를 먼저 제거하고 DB를 축소한다 · 남은 공간의 역할을 다시 정한다 · 테스트가 작업 트리를 변경한 경험

### [슬개기술연구소 — 한 화면에 몰린 업무를 역할별 작업석으로 나누기](src/posts/seulgae-tech-lab-recruitment-workstations-and-pagination.md)

- 날짜: 2026-11-23
- 태그: React, TypeScript, Phaser, UX
- 요약: 채용 NPC 역할별 화면과 게시판 페이지 이동을 연결해 살펴봤다.
- 소제목: 다섯 건씩 보여 주되 데이터 경계를 살핀다 · 역할별로 같은 데이터를 다른 질문에 맞추다

### [슬개기술연구소 — 최신 이미지에 옛 Compose 설정이 붙었던 이유](src/posts/seulgae-tech-lab-release-checkout-deployment.md)

- 날짜: 2026-11-17
- 태그: Docker Compose, GitHub Actions, Python, Git
- 요약: 이미지와 서버 저장소의 버전 불일치를 릴리스 커밋 동기화와 배포 코드 재실행으로 고친 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 배포 대상은 이미지 하나가 아니었다 · 파일을 바꾼 프로세스는 여전히 옛 코드다 · 자동 수정에도 최초 진입점이 필요하다 · 배운 점

### [DB 저장부터 게임 패널까지 연결 검증하기 — 개발 데이터와 CI를 분리하다](src/posts/seulgae-tech-lab-research-integration-verification.md)

- 날짜: 2026-11-15
- 태그: PostgreSQL, GitHub Actions, Integration Test, Spring Boot, React
- 요약: 개발환경의 실제 저장·조회·게임 패널 흐름과 임시 PostgreSQL 기반 CI 통합 검증을 나누고, 검증 데이터를 정리한 기록.
- 소제목: 실제 개발환경에서는 한 건의 기록으로 연결을 확인했다 · CI에는 별도의 임시 PostgreSQL을 추가했다 · 통합 검증에서는 페이지 경계도 확인했다 · 기존 서비스에 대한 확인도 유지했다 · 커밋과 완료 범위

### [Java 17 CI를 확인하고 연구 기록 기능을 main에 병합하기](src/posts/seulgae-tech-lab-research-main-merge.md)

- 날짜: 2026-11-15
- 태그: GitHub, CI, Java, Git
- 요약: 연구 기록 스키마·API·React 연동과 Java 17 변경의 CI 성공을 확인하고 PR을 병합한 뒤 로컬 main을 동기화한 기록.
- 소제목: 최신 head의 CI부터 확인했다 · 확인한 SHA를 지정해 병합했다 · 로컬 작업 폴더도 main으로 맞췄다 · 병합과 운영 적용은 별개이다

### [임시 연구 기록을 실제 API로 교체하기 — 목록·상세와 재시도 연결](src/posts/seulgae-tech-lab-research-panel-api.md)

- 날짜: 2026-11-15
- 태그: React, TypeScript, Phaser, API, AbortController
- 요약: 게임의 연구 기록 패널을 DB 목록·상세 API에 연결하고 로딩·빈 결과·오류·재시도를 브라우저에서 확인한 기록.
- 소제목: 게임 입력 흐름은 유지하고 데이터 부분을 교체했다 · 개발 프록시로 같은 출처의 경로를 사용했다 · 패널이 닫히면 진행 중인 요청을 취소했다 · 실제 브라우저에서 확인한 흐름 · 자동 검증과 변경 파일

### [연구 기록 저장·조회 API 만들기 — 실행 권한과 쓰기 경로를 분리하다](src/posts/seulgae-tech-lab-research-record-api.md)

- 날짜: 2026-11-15
- 태그: Spring Boot, Java, PostgreSQL, REST API, Validation
- 요약: JdbcClient 기반 연구 기록 저장·목록·상세 API를 만들고, 입력 검증과 기본 쓰기 비활성 구성을 개발 DB에서 확인한 기록.
- 소제목: API의 범위를 작게 정했다 · 기존 JDBC 구성으로 구현했다 · 입력 검증과 장애 응답을 구분했다 · 인증이 없는 저장 경로는 기본으로 열지 않았다 · 실제 실행과 시행착오 · 변경 파일과 다음 연결

### [슬개기술연구소 — 첫 기능을 정리하고 슈퍼컴퓨터에서 PR을 보여 주기](src/posts/seulgae-tech-lab-research-removal-github-pulls-cache.md)

- 날짜: 2026-11-23
- 태그: Spring Boot, PostgreSQL, Flyway, GitHub API, React
- 요약: 연구 기록 기능 축소와 GitHub PR 목록의 캐시·실패 처리를 정리했다.
- 소제목: 코드를 먼저 떼고 테이블은 나중에 지운다 · 삭제 대상 안의 공통 의존성을 찾는다 · GitHub 호출이 실패하면 마지막 목록을 표시한다

### [앱 계정에 DDL을 주지 않고 연구 기록 스키마와 Flyway 구성하기](src/posts/seulgae-tech-lab-research-schema-flyway.md)

- 날짜: 2026-11-15
- 태그: PostgreSQL, Flyway, Maven, Spring Boot, Database
- 요약: 연구 기록 테이블과 정렬 인덱스를 V1 마이그레이션으로 만들고, 앱 실행 권한과 Flyway 이력 접근을 분리해 개발 DB에서 검증한 기록.
- 소제목: 한 테이블부터 시작했다 · 앱 기동과 마이그레이션을 분리했다 · Flyway 이력 테이블의 기본 권한을 따로 제거했다 · 실제 개발 DB에서 검증했다 · 변경 파일과 남은 범위

### [슬개기술연구소 — 회의 안건과 아이디어 일지, 공간에 쓰기와 생활감을 더하다](src/posts/seulgae-tech-lab-room-boards-seats-and-living-props.md)

- 날짜: 2026-11-16
- 태그: React, Phaser, Spring Boot, PostgreSQL, Flyway, WebSocket
- 요약: 방 이동 이후 회의 안건과 연구 아이디어 일지, 수정 키 기반 편집, 서버 검증 의자와 시간대 연출을 추가한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 회의실에는 안건을, 로비에는 짧은 일지를 남기기 · 로그인 없이 수정 권한을 어떻게 구분했나 · V1 데이터를 지우지 않고 Flyway V2로 확장하기 · 의자에 앉는 모습과 실제 충돌 위치를 분리하기 · 식물과 창문, 시계는 브라우저 안의 연출로 만들기 · 검증된 기록과 남은 확인 사항 · 후속 수정 — 출입구를 가린 식물은 공유 맵에서 제거했다 · 공간을 늘린 뒤에는 상태의 책임도 나눠야 했다

### [슬개기술연구소 — 방의 위치를 바꾸어도 기능의 정체성은 유지하기](src/posts/seulgae-tech-lab-room-identity-and-build-reactions.md)

- 날짜: 2026-11-23
- 태그: Phaser, TypeScript, Game Design
- 요약: 방 연결을 바꾸면서 게시판과 NPC 연출의 책임을 분리한 과정을 정리했다.
- 소제목: 방 ID와 문 목적지를 구분하다 · 빌드 연출은 결과만 전달한다

### [슬개기술연구소 — 충돌 좌표를 지키면서 방의 분위기를 바꾸기](src/posts/seulgae-tech-lab-room-themes-door-animation.md)

- 날짜: 2026-11-16
- 태그: Phaser, TypeScript, React, Pixel Art
- 요약: 공유 충돌 영역을 유지하면서 테마와 문 애니메이션, 방별 이벤트를 분리한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 테마를 바꿔도 세계의 규칙은 유지하기 · 이동 승인과 문 열림은 다른 시간선이다 · 이벤트의 규칙은 화면 밖에서 검사하기 · 멈춤처럼 보이는 장면을 해석하기 · 배운 점

### [슬개기술연구소 — 방을 바꿀 때 좌표뿐 아니라 입력의 세대도 바꾸기](src/posts/seulgae-tech-lab-room-travel-input-epochs.md)

- 날짜: 2026-11-16
- 태그: Phaser, WebSocket, Spring Boot, TypeScript
- 요약: 공유 맵의 서버 승인 이동과 roomEpoch·입력 초기화를 연결한 PR #19를 당시 코드와 후속 변경으로 구분해 정리했다.
- 소제목: 문과 스폰은 서버·클라이언트가 같이 읽기 · 같은 소켓 안에서도 메시지의 유효 범위가 있다 · 보간의 서버 시각도 이어 주기 · Scene 종료 순서도 실제로 확인하기 · 배운 점

### [슬개기술연구소 — 적금과 가상 시세, 오락실 결과를 서버에서 관리하기](src/posts/seulgae-tech-lab-savings-stocks-arcade-transactions.md)

- 날짜: 2026-11-24
- 태그: Spring Boot, PostgreSQL, Flyway, Transactions, Game Economy
- 요약: V20 확장과 적금 중복 수령 방지, 가상 시세 갱신과 오락실 결과의 서버 처리를 정리했다.
- 소제목: 스키마 확장과 기능 사용의 순서 · 적금은 성공한 요청만 지급한다 · 가상 시세는 조회할 때 따라잡는다 · 확인한 범위

### [슬개기술연구소 — 마이그레이션보다 사용 코드가 먼저 병합됐을 때](src/posts/seulgae-tech-lab-schema-release-order-revert.md)

- 날짜: 2026-11-23
- 태그: PostgreSQL, Flyway, Deployment, CI
- 요약: V17 적용 전 새 이름 사용 릴리스가 병합돼 배포와 마이그레이션이 막힌 과정과 복구 순서를 정리했다.
- 소제목: 배포와 마이그레이션이 서로 다른 이유로 막혔다 · 되돌린 뒤 중간 단계를 거친다

### [슬개기술연구소 — 의자에서 다시 일어난 이유는 오래된 걸음이었다](src/posts/seulgae-tech-lab-seat-input-race-mobile-nickname.md)

- 날짜: 2026-11-17
- 태그: WebSocket, Spring Boot, TypeScript, React
- 요약: 앉기 이전 이동의 처리 순서와 늦은 로그인 닉네임 반영을 수정한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 전송 순서와 처리 완료 순서가 달랐다 · 앉기 요청에 이동 순번의 경계를 만들기 · 늦게 끝난 로그인도 게임에 반영하기 · 배운 점

### [슬개기술연구소 — 서버실 랙에서 호스트와 JVM의 상태를 나눠 보기](src/posts/seulgae-tech-lab-server-rack-ssh-capacity-metrics.md)

- 날짜: 2026-11-23
- 태그: Java, Spring Boot, Apache MINA SSHD, JVM, Monitoring
- 요약: SSH 호스트 수집과 JVM 내부 지표를 분리하고 서버실 랙에 표시하는 설계를 정리했다.
- 소제목: 호스트와 JVM은 서로 다른 곳에서 읽는다 · SSH 명령은 한 번 실행하고 결과를 검증한다 · 접속 권한과 공개 응답을 좁힌다 · 운영 연결을 위한 준비 순서 · 호스트 키 종류가 달라 연결이 거절된 문제 · 호스트 키 다음에는 개인키를 읽지 못했다 · 마지막 원인은 공개키 등록 누락이었다 · 확인한 범위와 남은 일

### [슬개기술연구소 — 서버실 로봇이 점검 방법을 안내하도록 연결하기](src/posts/seulgae-tech-lab-server-room-robots-and-monitoring-story.md)

- 날짜: 2026-11-23
- 태그: Phaser, TypeScript, Game UX, Testing
- 요약: 서버실 NPC의 동선과 점검 안내 패널을 연결한 변경을 정리했다.
- 소제목: 순찰 경로와 실제 장비를 분리한다

### [슬개기술연구소 — 한 주소의 새 연결이 기존 연결을 대신하게 만들기](src/posts/seulgae-tech-lab-single-address-websocket.md)

- 날짜: 2026-11-17
- 태그: WebSocket, Spring Boot, nginx, TypeScript
- 요약: 같은 주소의 연결 대체와 재연결 중단, 프록시 주소 신뢰 조건을 정리한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 주소를 쓰기 전에 전달 경로를 확인하기 · 연결 교체는 종료 코드까지 설계해야 한다 · 한 주소와 한 사용자는 다르다 · 배운 점

### [슬개기술연구소 — 주석의 갱신 주기를 실행 코드와 맞추기](src/posts/seulgae-tech-lab-source-comments-implementation-alignment.md)

- 날짜: 2026-11-24
- 태그: Java, Javadoc, React, Phaser
- 요약: 게임 규칙과 권한 설명을 실제 구현에 맞추고 문서 생성 결과를 점검한 과정을 정리했다.
- 소제목: 없음

### [슬개기술연구소 — 방의 문 좌표로 폰 지도를 만들고 스태미나 이름을 바로잡기](src/posts/seulgae-tech-lab-stamina-map-world-layout.md)

- 날짜: 2026-11-24
- 태그: TypeScript, Phaser, React, Game UX
- 요약: 방 연결 데이터로 지도를 만들고 화면 용어를 실제 자원 동작에 맞춘 과정을 정리했다.
- 소제목: 지도 배치를 방 데이터에서 계산한다 · 사용자에게 보이는 의미를 맞춘다

### [슬개기술연구소 — 연구 기록을 옮기고 짧은 방명록의 입력 계약을 맞추기](src/posts/seulgae-tech-lab-supercomputer-guestbook-unicode.md)

- 날짜: 2026-11-17
- 태그: Phaser, React, Spring Boot, PostgreSQL, Unicode
- 요약: 공유 맵으로 연구 기록 위치를 옮기고 방명록의 글자 수 제한을 화면·서버·DB에 적용한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 창을 고치지 않고 기능의 위치를 바꾸기 · 짧은 입력도 글자 수의 의미부터 맞추기 · 맵을 바꾸면 테스트의 출발점도 달라진다 · 배운 점

### [슬개기술연구소 — 오디오 파일 대신 코드로 게임의 소리를 만들기](src/posts/seulgae-tech-lab-synthesized-game-audio.md)

- 날짜: 2026-11-17
- 태그: Web Audio, Phaser, TypeScript, Sound Design
- 요약: 합성 음원을 Phaser 캐시에 연결하고 재생 수명·발걸음·음량을 분리한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 샘플 배열을 기존 사운드 시스템에 연결하기 · 같은 곡으로 방을 옮겼을 때 끊지 않기 · 키가 아니라 실제 이동 거리에 발걸음을 붙이기 · 재생 상태와 듣기 좋은 소리는 다르다 · 배운 점

### [슬개기술연구소 — 테이블 이름을 바꾸는 동안 옛 앱을 위한 뷰 남기기](src/posts/seulgae-tech-lab-table-rename-compatibility-views.md)

- 날짜: 2026-11-23
- 태그: PostgreSQL, Flyway, Migration, Deployment
- 요약: V17 호환 뷰와 V18 제거 계획으로 테이블 이름 전환을 정리했다.
- 소제목: V17에서 옛 이름을 유지한다 · 새 이름으로 전환하고 호환 뷰를 제거한다

### [슬개기술연구소 — 움직이는 NPC와 저녁 포장마차의 시간을 분리하기](src/posts/seulgae-tech-lab-townsfolk-food-cart-fish-sale.md)

- 날짜: 2026-11-21
- 태그: Phaser, TypeScript, Spring Boot, PostgreSQL, Game Economy
- 요약: V9 확장과 시민·아이·낚시꾼 NPC, 저녁 물고기 판매를 연결한 PR #57·#58을 코드와 기록으로 정리했다.
- 소제목: 고정 맵에 움직이는 대상을 억지로 넣지 않기 · 그림의 겹침은 충돌 영역만으로 찾을 수 없다 · 판매 가격은 서버가 다시 계산하기 · 브라우저의 저녁과 서버의 저녁은 다를 수 있다 · 배운 점

### [슬개기술연구소 — 따라오는 로봇에게 긴 설명 대신 작은 힌트를 맡기기](src/posts/seulgae-tech-lab-tutorial-robot-time-based-follow.md)

- 날짜: 2026-11-21
- 태그: Phaser, TypeScript, Pixel Art, Game UX
- 요약: 프레임 독립적인 따라가기와 방별 팁 선택을 분리한 튜토리얼 로봇 PR #56을 코드와 검증 기록으로 정리했다.
- 소제목: 함께 움직이지만 서버에 공유하지 않는 상태 · 매 프레임 같은 비율로 이동하면 속도가 달라진다 · 아직 안 본 팁을 먼저 고르기 · 상태와 화면을 나눠 확인하기 · 배운 점

### [슬개기술연구소 — 안내를 지워도 상호작용은 남아 있어야 했다](src/posts/seulgae-tech-lab-two-second-interaction-hints.md)

- 날짜: 2026-11-17
- 태그: Phaser, TypeScript, Game UI
- 요약: 의자 안내에서 시작한 2초 표시 규칙을 대상과 문구의 변화로 일반화한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 대상이 같은데도 안내를 다시 보여 줘야 하는 경우 · 문구와 강조 표시를 별도로 갱신하기 · 화면을 보지 못한 테스트의 의미 · 배운 점

### [슬개기술연구소 — 자판기 거래와 V14 배포 검사가 만난 지점](src/posts/seulgae-tech-lab-vending-transactions-and-v14-deployment-check.md)

- 날짜: 2026-11-23
- 태그: Spring Boot, PostgreSQL, Flyway, CI/CD
- 요약: 음료 구매의 서버 트랜잭션과 스키마 버전 검사 누락을 정리했다.
- 소제목: 먼저 공통코드를 준비하고 구매를 처리한다 · DB는 V14인데 배포 검사는 V13까지였다

### [SHA 입력 없이 검증된 이미지를 배포하는 운영 명령 구성하기](src/posts/seulgae-tech-lab-verified-image-deployment.md)

- 날짜: 2026-11-15
- 태그: Docker Compose, GitHub Actions, GHCR, Python, CI/CD
- 요약: CI 성공 이력과 이미지 digest를 연결하고 앱 롤백과 DB 마이그레이션을 분리한 운영 스크립트를 구현한 기록이다.
- 소제목: 기존 서비스의 상태부터 다시 확인했다 · 짧은 명령과 검증 로직을 분리했다 · latest 대신 성공 CI와 digest를 연결했다 · 앱 복원과 DB 복원을 분리했다 · 자동 배포도 같은 명령을 사용하도록 했다 · 검증한 범위와 남은 작업

### [슬개기술연구소 — 간식 구매를 동전과 기력의 하나의 거래로 다루기](src/posts/seulgae-tech-lab-vitals-snack-transactions.md)

- 날짜: 2026-11-17
- 태그: Spring Boot, PostgreSQL, React, Game Economy
- 요약: HP·피로도 스키마 확장과 조건부 차감·회복, 실패 시 결제 복원을 연결한 커밋을 코드와 작업 문서로 정리했다.
- 소제목: 현재 값과 최대치를 함께 저장하기 · 범위 검사는 갱신문에도 들어가야 한다 · 결제 중간에 실패하면 되돌리기 · 배운 점

### [PowerShell에서 npm 실행이 차단될 때 npm.cmd로 Vite 프로젝트 생성하기](src/posts/seulgae-tech-lab-vite-powershell-npm-execution-policy.md)

- 날짜: 2026-11-15
- 태그: Windows, PowerShell, Node.js, npm, Vite, React, TypeScript
- 요약: PowerShell의 npm.ps1 실행 정책 오류를 npm.cmd로 우회하고 React·TypeScript 기반 Vite 개발 서버를 실행한 과정이다.
- 소제목: React 개발환경을 구성하다 npm 실행이 막혔다 · 환경과 오류 확인 · 실행 정책을 바꾸지 않고 npm.cmd 사용 · Vite로 React·TypeScript 프로젝트 생성 · 검증 결과와 확인하지 못한 부분 · 정리

### [슬개기술연구소 — HTTPS는 열리는데 WebSocket만 연결되지 않은 이유](src/posts/seulgae-tech-lab-websocket-origin-server-migration.md)

- 날짜: 2026-11-16
- 태그: WebSocket, Spring Boot, Docker Compose, Security
- 요약: 서버 이전 뒤 달라진 Origin을 명시적 허용 목록과 실제 핸드셰이크 테스트로 확인한 PR #18을 정리했다.
- 소제목: 1006은 원인 이름이 아니다 · 허용 목록의 형식부터 검사하기 · 업그레이드 전에 거부하기 · 허용 테스트만 있으면 정책을 검증한 것이 아니다 · 배운 점


## spring-mybatis

### [4인 백엔드 팀의 제각각이던 selectList 코드 — 예제 코드와 PDF 가이드로 개발 기준 맞추기](src/posts/backend-code-convention-standardization.md)

- 날짜: 2024-12-12
- 태그: Java, Spring, MyBatis, Architecture
- 요약: 4명이 서로 다른 방식으로 작성하던 조회 코드를 Request/Response DTO·Model·Builder 구조로 정리하고, 예제 코드와 PDF 가이드를 공유해 팀의 개발 기준을 맞춘 기록
- 소제목: 배경 — 서로 다른 배경의 4명, 네 가지 모양의 `selectList` 코드 · AS-IS — 표준 없는 단일 `selectList`가 만들던 비용 · 먼저 코드로 증명하기 — 패키지 재정립과 Request/Response · Model · Builder 패턴화 · 1. 패키지 구조와 계층별 책임 고정 · 2. 만능 VO 지양 — `Request` · `Response` DTO와 `Model` 분리 · 3. 무분별한 `@Setter` 대신 `@Builder` 패턴 도입 · PDF 가이드 제작과 팀 회의 공유 — 예제를 바탕으로 개발 기준 합의하기 · 결과 · 한계 회고 — 지금 다시 한다면 · 배운 점

### [MyBatis를 JPA처럼 쓰던 연계 로직 — 범용 동적 쿼리를 정적 쿼리로 되돌리기](src/posts/dynamic-to-static-sync-query.md)

- 날짜: 2026-06-17
- 태그: Java, MyBatis, SQL, Security
- 요약: 테이블명·컬럼명을 문자열 치환으로 조립하던 망간 데이터 동기화 로직을 테이블별 정적 쿼리로 재작성한 기록 — 그리고 대상 목록을 코드에서 뽑았다가 테이블 하나를 누락한 사고의 수습기
- 소제목: 원래 구조 — MyBatis로 만든 "만능 저장소" · 무엇이 위험했나 · 개선 — 테이블을 아는 쿼리로 되돌리기 · 사고 — 대상 목록을 코드에서 뽑은 대가 · 수습 — csql과 nohup으로 양쪽을 다시 맞추기 · 잘한 점, 아쉬운 점 · 배운 점

### [JDBC에서 MyBatis까지 — SQL은 어떻게 실행되는가](src/posts/jdbc-mybatis-query-execution.md)

- 날짜: 2026-11-22
- 태그: JDBC, MyBatis, SQL, Interview, 데이터 접근
- 요약: 연결·문장·결과 처리와 Mapper 실행을 연결하고 파라미터 바인딩·세션·트랜잭션 경계를 복습한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [JPA와 MyBatis를 선택할 때 비교할 것들](src/posts/jpa-mybatis-selection-tradeoffs.md)

- 날짜: 2026-11-22
- 태그: JPA, MyBatis, JDBC, Interview, 데이터 접근
- 요약: 객체 상태 관리와 SQL 중심 매핑의 차이, 조회 비용, 혼용 시 연결·flush·캐시 경계를 비교한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [영속성 컨텍스트와 엔티티 생명주기](src/posts/jpa-persistence-context-entity-lifecycle.md)

- 날짜: 2026-11-22
- 태그: JPA, Persistence Context, Entity, Interview, 데이터 접근
- 요약: 엔티티의 네 상태와 변경 감지·flush·commit을 구분하고 merge와 지연 로딩의 오개념을 정리한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [API 응답 약 480,000ms → 10,000ms 이내 — 병렬 조회 개선과 한계](src/posts/mybatis-builder-parallel-refactoring.md)

- 날짜: 2024-11-27
- 태그: Java, Spring, MyBatis, Performance
- 요약: DB 적재 규모를 1만 건에서 운영 데이터 테스트를 위한 100만 건으로 늘리자 드러난 청구·가입 조회 병목 — 병렬 스트림으로 API 응답을 약 480,000ms에서 10,000ms 이내로 줄인 과정과 한계
- 소제목: 왜 당시에는 DB보다 애플리케이션을 먼저 손댔나 · AS-IS — MyBatis selectList 순차 반복 호출이 만든 약 480,000ms 지연 · TO-BE — parallelStream을 통한 조회 대기 시간 중첩 · 결과 · 이 방식의 분명한 한계와 교훈 · 지금 다시 한다면 — IN 절을 활용한 '집합 단위 조회' · 1단계: 마스터 목록 조회 및 키 추출 (쿼리 1회) · 2단계: 하위 데이터를 IN 절로 한 번에 조회 (쿼리 1회) · 3단계: 애플리케이션 메모리에서 부모 키 기준으로 매핑 · 배운 점

### [ORM·JPA·Hibernate는 각각 무엇인가](src/posts/orm-jpa-hibernate-relationship.md)

- 날짜: 2026-11-22
- 태그: JPA, ORM, Hibernate, Interview, 데이터 접근
- 요약: 객체·테이블 매핑이라는 접근법과 영속성 명세·구현체를 구분하고 SQL 관측의 필요성을 정리한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [AOP 프록시로 이해하는 @Transactional](src/posts/spring-aop-transactional-proxy.md)

- 날짜: 2026-11-22
- 태그: Spring, AOP, Transaction, Interview
- 요약: 프록시를 통과한 호출이 트랜잭션 경계를 만드는 원리와 자기 호출·롤백·전파의 주의점을 정리한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [Spring Bean은 언제 만들어지고 정리되는가](src/posts/spring-bean-lifecycle.md)

- 날짜: 2026-11-22
- 태그: Spring, Bean, Lifecycle, Interview
- 요약: Bean의 생성·주입·초기화·후처리·종료와 singleton의 공유 상태 문제를 복습한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [Spring과 Spring Boot, IoC·DI가 해결하는 문제](src/posts/spring-boot-ioc-dependency-injection.md)

- 날짜: 2026-11-22
- 태그: Spring, Spring Boot, DI, Interview
- 요약: 객체 생성 책임과 자동 구성의 범위를 구별하고 생성자 주입이 변경·테스트에 주는 효과를 정리한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [HTTP 요청은 Spring MVC에서 어떻게 처리되는가](src/posts/spring-mvc-request-lifecycle.md)

- 날짜: 2026-11-22
- 태그: Spring MVC, HTTP, Controller, Interview
- 요약: 서블릿 필터부터 DispatcherServlet·컨트롤러·메시지 변환·예외 처리까지 요청의 경로를 정리한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [XSSFWorkbook vs SXSSFWorkbook — 수작업 엑셀 업무를 기능으로 만들며 정리한 선택 기준](src/posts/sxssf-vs-xssf-excel-download.md)

- 날짜: 2025-11-20
- 태그: Java, POI, Excel, Performance
- 요약: 운영자가 매번 DB를 조회해 손으로 만들던 추출 대장·통계 엑셀을 다운로드 기능으로 구현한 기록 — 건수에 따라 XSSF와 SXSSF를 가르는 기준과 스트리밍 방식의 함정들
- 소제목: XSSF vs SXSSF — 차이의 본질은 "어디에 들고 있느냐" · 건수별 선택 기준 · 구현 — 스트리밍을 무력화하는 함정들 · 검증 — 힙 로그로 눈으로 확인하기 · 결과 · 배운 점


## sql-tuning

### [53초짜리 목록 조회 — CUBRID 실행계획 분석과 복합 인덱스 설계](src/posts/cubrid-query-plan-index-tuning.md)

- 날짜: 2026-03-04
- 태그: SQL, CUBRID, Performance
- 요약: 운영 목록 조회의 실행계획을 분석하고 인덱스를 적용해 53초를 1초 미만으로 개선한 경험 — SQL·인덱스·플랜은 설계 원리를 설명하기 위한 재구성 예제
- 소제목: 진단 — 읽는 범위와 정렬 비용 확인 · 인덱스 설계 — 컬럼을 어떤 순서로 태울 것인가 · 함께 살펴볼 조건절 — 인덱스 설계와 구분한 보충 예제 · 결과 · 배운 점

### [인덱스는 어떻게 찾고, 언제 효율이 떨어지는가](src/posts/database-index-access-paths.md)

- 날짜: 2026-11-22
- 태그: Database, Index, B-tree, Interview
- 요약: B-tree 탐색과 복합 인덱스, 테이블 접근 비용을 연결하고 Full Scan이 유리할 수 있는 이유를 정리한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [격리 수준과 잠금 — 동시에 처리하면 무엇이 달라지는가](src/posts/database-isolation-locking.md)

- 날짜: 2026-11-22
- 태그: Database, Isolation, Lock, MVCC, Interview
- 요약: 동시성 이상 현상과 PostgreSQL의 스냅샷·잠금, 교착 상태 및 조건부 갱신을 구분한다.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [트랜잭션과 ACID — 성공과 실패의 범위 정하기](src/posts/database-transactions-acid-boundaries.md)

- 날짜: 2026-11-22
- 태그: Database, Transaction, ACID, Interview
- 요약: ACID를 실제 작업 경계와 연결하고 DB 커밋과 외부 메시지 발송을 구분하는 학습 노트.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [인덱스가 있는데 왜 안 타지 — 실행계획으로 좁혀간 슬로우 쿼리 튜닝기](src/posts/oracle-hint-subquery-fullscan.md)

- 날짜: 2023-01-10
- 태그: SQL, Oracle, Performance
- 요약: 스칼라 서브쿼리가 행마다 TABLE ACCESS FULL을 반복하던 조회 쿼리 — Trusted Orange로 플랜을 열고, 묵시적 형변환이라는 원인을 찾고, 인덱스 접근과 쿼리 재작성으로 고쳐간 기록. 그리고 그 과정을 기존 소스와 DBA 보고서에서 배웠다는 이야기
- 소제목: 실행계획부터 열었다 · 원인 — 인덱스는 있는데 타지 않았다 · 개선 1 — 형변환을 정리하고, 힌트 적용 결과를 확인 · 개선 2 — 행마다 실행되는 구조 자체를 손보기 · 결과 · 덧붙여 — 같은 시기에 배운 PARALLEL 힌트 · 어떻게 배웠나 — 기존 소스와 DBA의 튜닝 보고서 · 배운 점

### [실행계획으로 SQL 병목을 좁히는 방법](src/posts/sql-execution-plan-tuning-process.md)

- 날짜: 2026-11-22
- 태그: SQL, EXPLAIN, Performance, Interview
- 요약: 결과 정확성부터 예상·실제 행 수, 반복 횟수와 I/O까지 확인하는 SQL 튜닝의 검증 순서.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료

### [JOIN 결과가 예상보다 늘어나는 이유](src/posts/sql-joins-cardinality-null.md)

- 날짜: 2026-11-22
- 태그: SQL, JOIN, NULL, Interview
- 요약: 관계의 건수와 OUTER JOIN의 NULL 확장을 이해하고 이력 조회의 중복·누락을 진단하는 방법.
- 소제목: 1. 학습 배경 · 2. 핵심 개념 · 3. 동작 원리 · 4. 실무 활용 · 5. 주의사항 및 오개념 · 6. 기술 면접 예상 질문 · 7. 핵심 요약 · 8. 참고 자료
