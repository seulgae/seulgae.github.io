// 좌표는 읽기 쉬운 논리 구성도를 위한 배치이며 실제 서버 위치·망 경로가 아니다.
// 출처: projects.js의 보유 기술 + 각 프로젝트에 연결한 기술 블로그.
const node = (id, x, y, w, title, lines, logo, detail, owned = false, kind = "service") =>
  ({ id, x, y, w, h: 108, title, lines, logo, detail, owned, kind });
const edge = (from, to, d, label, x, y, type = "data", both = false) =>
  ({ from, to, d, label, x, y, type, both });

const diagrams = {
  "lgu-billing-gw": {
    theme: "event",
    intro: "이벤트가 도착한 뒤, 서로 다른 키와 데이터 구조를 맞춰 구독 DB에 반영하는 흐름입니다.",
    figures: [{
      id: "gw-events", title: "01 / 이벤트 연동과 업무키 변환", height: 450,
      summary: "발행 시스템 → Kafka → Spring Boot GW → 구독 DB. GW는 Redis에서 업무키를 해석하고 메타데이터로 변환하며, 매핑이 없으면 재처리합니다.",
      zones: [{ x: 474, y: 30, w: 250, h: 400, label: "담당 영역 · 서비스 도메인 GW", owned: true }],
      nodes: [
        node("publisher", 20, 98, 180, "차세대 발행 시스템", ["분리된 원천 테이블", "UUID 기반 payload"], null, "차세대 전환으로 원천 테이블과 PK 체계가 변경됐습니다. 발행 시스템의 DB 제품별 배치는 공개 기록에 없어 특정 제품으로 지정하지 않았습니다."),
        node("kafka", 255, 98, 170, "Apache Kafka", ["테이블 / 도메인 토픽", "Pub · Sub 이벤트 전달"], "apachekafka", "Producer가 payload를 발행하고 GW가 토픽을 구독합니다. Redis는 이 메시지를 전달하는 큐가 아니라 키 해석을 위한 저장소입니다."),
        node("gw", 494, 98, 210, "Spring Boot 2.x", ["Dispatcher → 변환 서비스", "MyBatis · INS/UPD/MER/DEL"], "spring", "Dispatcher가 MNO/MVNO를 분기하고 AbstractGwService의 구현체가 원천을 해석해 대상 데이터로 변환합니다. 이 연동 로직의 개발·유지보수와 정합성 대응을 담당했습니다.", true),
        node("target", 770, 98, 170, "구독 파트 DB", ["과금 · 청구 · 정산", "Oracle / MySQL 연동 환경"], "oracle", "GW가 기존 업무키와 join 조건을 이용해 대상 테이블을 반영합니다. Oracle↔MySQL 연동 경험은 확인되지만 각 파트별 DB 제품 배치는 공개 기록에 구분되어 있지 않습니다.", false, "database"),
        node("redis", 494, 296, 210, "Redis · 키 매핑", ["UUID ↔ 기존 업무키", "신규 생성 때 저장 / 변경 때 조회"], "redis", "INS 이벤트에서 UUID와 업무키 매핑을 저장합니다. 이후 UUID만 온 변경 이벤트는 Redis에 저장된 업무키로 대상 행을 찾습니다.", true, "database"),
        node("metadata", 770, 296, 170, "매핑 메타데이터", ["원천 → 대상 컬럼", "1:1 / 1:N · join 조건"], null, "토픽·이벤트 필드·원천/대상 컬럼과 join 플래그를 테이블로 관리합니다. 신규 연계는 매핑 등록과 DTO·의존성 배포를 함께 처리했습니다.", false, "database"),
        node("retry", 255, 296, 170, "재처리 대기", ["매핑 생성 전 도착한 이벤트", "업무키 확보 후 다시 처리"], null, "순서 역전으로 키를 해석하지 못한 이벤트를 보관했다가 매핑 생성 후 재처리합니다. 전용 DLQ나 Kafka 재발행 방식은 기록에 없어 특정 기술로 표시하지 않았습니다."),
      ],
      edges: [
        edge("publisher", "kafka", "M200 150 H255", "① Pub", 227, 136),
        edge("kafka", "gw", "M425 150 H494", "② Sub", 459, 136),
        edge("gw", "target", "M704 150 H770", "④ DML", 737, 136),
        edge("gw", "redis", "M599 206 V296", "③ 키 저장·조회", 599, 257, "lookup", true),
        edge("gw", "metadata", "M704 180 H744 V350 H770", "변환 규칙", 745, 265, "lookup", true),
        edge("gw", "retry", "M514 206 V246 H340 V296", "키 해석 실패", 398, 238, "retry"),
        edge("retry", "gw", "M255 350 H226 V70 H540 V98", "매핑 생성 후 재처리", 358, 62, "retry"),
      ],
      notes: ["실선: 이벤트·데이터 반영", "점선: 키·규칙 조회", "주황선: 재처리"],
      guide: [
        ["①–② 이벤트 수신", "새 UUID 구조로 온 이벤트를 Kafka에서 구독합니다. GW가 사업 구분과 payload 형상에 맞는 처리 경로를 선택합니다."],
        ["③ 업무키 해석", "Redis에서 기존 업무키를 찾고, 메타데이터로 컬럼·join 조건을 맞춥니다. 매핑이 없으면 재처리 경로로 보냅니다."],
        ["④ 구독 DB 반영", "과금·청구·정산 테이블에 작업 유형별 DML을 반영합니다. Redis와 DB는 서로 다른 책임을 가집니다."],
      ],
    }],
    supporting: [
      { title: "연동 운영", tools: [["WhaTap", null], ["GW 모니터링", null]], text: "히트맵·대사 결과 확인 → 원인 분류 → 보정 DML → 재대사" },
      { title: "병행 개발 업무", tools: [["Spring Batch 4.x", "spring"], ["REST API · Swagger", null]], text: "배치·리포팅 자동화, 요금·위약금 조회 API 개발" },
      { title: "빌드·운영 환경", tools: [["GitLab", "gitlab"], ["Maven", "maven"], ["Jenkins", "jenkins"], ["CentOS", "linux"]], text: "함께 사용한 도구 · APIM / TMS / JobPass의 세부 연결은 생략" },
    ],
  },
  "cloudxper-billing": {
    theme: "cloud",
    intro: "화면 요청을 처리하는 API를 중심으로, 권한 캐시 경로와 업무 데이터 조회 경로를 나눴습니다.",
    providers: [["AWS", "amazonwebservices"], ["GCP", "googlecloud"], ["Azure", "azure"], ["Kakao", null]],
    figures: [{
      id: "cloud-request", title: "01 / 요청·권한·업무 데이터의 분기", height: 605,
      summary: "React 화면이 Spring Boot Controller를 호출하고 권한 서비스는 Redis를 조회합니다. 캐시 미스는 MySQL에서 조회해 채우며, 업무 서비스는 MyBatis를 통해 MySQL을 조회합니다.",
      zones: [{ x: 248, y: 24, w: 324, h: 556, label: "Spring Boot 3.x · Ubuntu", owned: true }, { x: 684, y: 188, w: 252, h: 392, label: "캐시 / 영속 데이터" }],
      nodes: [
        node("react", 24, 90, 172, "React 관리 화면", ["가입 · 상품 · 청구", "사용자별 권한에 맞춘 표시"], "react", "React 화면이 REST API를 호출하고 DTO 응답을 받습니다. 담당 범위는 플랫폼 백엔드 개발이며 프런트엔드 전체 개발로 표시하지 않았습니다."),
        node("controller", 280, 90, 260, "Controller · DTO", ["HTTP 요청·응답 / 입력 검증", "API 계약과 DB Model 분리"], "spring", "HTTP 처리와 검증을 Controller에 두고, 비즈니스 규칙과 데이터 조립은 ServiceImpl로 모았습니다.", true),
        node("permission", 280, 255, 260, "인증·권한 서비스", ["사용자 + 코드 그룹별 캐시", "로그아웃·권한 변경 시 삭제"], "java", "OAuth 인증·권한 조회 모듈을 Redis 캐싱 구조로 개선했습니다. TTL은 만료 정책에 맞추고 사용자별 키를 무효화합니다.", true),
        node("redis", 704, 255, 212, "Redis", ["인증·권한 캐시", "Cache hit → 권한 반환"], "redis", "반복되는 권한 조회를 메모리에서 처리합니다. 캐시가 없으면 애플리케이션이 DB에서 조회해 캐시를 채웁니다. Redis가 DB를 직접 조회하는 구조는 아닙니다.", false, "database"),
        node("service", 280, 440, 260, "ServiceImpl · MyBatis", ["공통 조회·데이터 조립", "연관 리스트 병렬 조회"], "spring", "화면마다 흩어진 로직을 모으고 parallelStream으로 연관 조회의 대기 시간을 겹쳤습니다. SQL 호출 수 자체는 유지됩니다.", true),
        node("mysql", 704, 440, 212, "MySQL", ["가입 · 상품 · 청구 데이터", "권한 원본 테이블"], "mysql", "DAO가 MyBatis로 업무 데이터를 조회합니다. 캐시 미스 시 권한 원본도 여기에서 조회하며, 캐시는 DB 왕복을 줄이는 별도 경로입니다.", false, "database"),
      ],
      edges: [
        edge("react", "controller", "M196 144 H280", "① REST / JSON", 238, 123, "data", true),
        edge("controller", "permission", "M410 198 V255", "② 권한 확인", 410, 229),
        edge("permission", "redis", "M540 307 H704", "③ 캐시 저장·조회", 622, 289, "lookup", true),
        edge("permission", "mysql", "M540 335 H626 V469 H704", "Cache miss", 626, 399, "lookup"),
        edge("permission", "service", "M410 363 V440", "권한 확인 후 업무 처리", 410, 403),
        edge("service", "mysql", "M540 514 H704", "④ SQL / 조회 결과", 622, 540, "data", true),
      ],
      notes: ["실선: 요청·업무 데이터", "점선: 캐시 조회 / 미스 경로"],
      guide: [
        ["① API 진입", "관리 화면의 요청을 검증하고, DTO로 입출력 계약을 분리합니다. 실제 인증 제공자의 외부 배치는 생략했습니다."],
        ["②–③ 권한 캐시", "캐시가 있으면 Redis에서 권한을 읽습니다. 없으면 권한 서비스가 MySQL을 조회해 다시 캐싱합니다."],
        ["④ 업무 조회", "권한 확인을 거친 조회·조립 로직은 공통 ServiceImpl을 사용합니다. 응답은 Controller를 통해 화면으로 돌아갑니다."],
      ],
    }, {
      id: "cloud-performance", title: "02 / 성능 개선 지점 · 순차 대기를 병렬 대기로", height: 325,
      summary: "개선 전에는 연관 DB 조회를 순서대로 기다렸습니다. 개선 후 parallelStream에서 일부 조회를 동시에 처리했고, N+1 SQL 횟수는 그대로입니다.",
      zones: [{ x: 20, y: 18, w: 440, h: 276, label: "BEFORE · 약 10분" }, { x: 490, y: 18, w: 450, h: 276, label: "AFTER · 약 1분 15초", owned: true }],
      nodes: [
        node("sequential", 44, 80, 180, "순차 조회", ["항목 1 → 2 → 3 → …", "이전 조회 종료까지 대기"], "java", "부모 목록의 각 항목마다 연관 리스트를 순서대로 조회하던 형태입니다. 100만 건 데이터에서 약 10분이 소요됐습니다."),
        node("beforedb", 270, 80, 164, "MySQL", ["목록 1회 + 연관 N회", "대기 시간 누적"], "mysql", "N+1 조회가 데이터 증가에 따라 병목으로 드러났습니다.", false, "database"),
        node("parallel", 514, 80, 204, "parallelStream", ["여러 연관 조회 동시 진행", "ServiceImpl에서 조립"], "java", "같은 테스트 조건에서 약 1분 15초로 줄었습니다. 작업 스레드, 커넥션 풀과 DB 자원의 영향을 받는 개선입니다.", true),
        node("afterdb", 770, 80, 146, "MySQL", ["SQL 수는 동일", "N+1 구조는 남음"], "mysql", "N+1 자체를 제거한 개선은 아닙니다. 집합 조회와 EXPLAIN 분석은 회고에서 정리한 다음 단계입니다.", false, "database"),
      ],
      edges: [edge("sequential", "beforedb", "M224 134 H270", "SQL", 247, 121), edge("parallel", "afterdb", "M718 110 H770", "", 744, 98), edge("parallel", "afterdb", "M718 140 H770", "", 744, 98), edge("parallel", "afterdb", "M718 170 H770", "", 744, 98)],
      notes: ["동일한 100만 건 테스트 조건에서 비교 · 시간 축 비례 도표 아님"],
      guide: [["이 그림의 핵심", "병렬화로 DB 대기 시간을 겹친 성과입니다. 쿼리 수 감소나 무제한 확장으로 해석하지 않도록 SQL 수와 남은 한계를 함께 표시했습니다."]],
    }],
    supporting: [
      { title: "빌드·품질 도구", tools: [["GitLab", "gitlab"], ["Gradle", "gradle"], ["Jenkins", "jenkins"], ["SonarQube", "sonarqube"]], text: "프로젝트에서 함께 사용한 도구 · 실제 CI 단계 순서는 표현하지 않음" },
      { title: "개발·검증", tools: [["Swagger", null], ["DBeaver", null], ["Ubuntu", "linux"]], text: "API 성능 반복 확인 · DTO/Model/Service 컨벤션 작성·팀 공유" },
    ],
  },
  "jeonse-support-system": {
    theme: "public",
    intro: "대민 인터넷망과 내부 업무망을 구분하고, 데이터 동기화와 운영 수집을 별도의 그림으로 읽을 수 있게 구성했습니다.",
    figures: [{
      id: "public-network", title: "01 / 망 분리 환경과 데이터 동기화", height: 605,
      summary: "인터넷망과 업무망 각각의 WEB, WAS, CUBRID DB 계층. 두 DB의 게시물·첨부 데이터를 MyBatis 정적 SELECT/MERGE 동기화 로직으로 맞춥니다.",
      zones: [{ x: 20, y: 24, w: 270, h: 555, label: "인터넷망 · 대민 서비스" }, { x: 670, y: 24, w: 270, h: 555, label: "업무망 · 내부 업무" }],
      nodes: [
        node("publicweb", 46, 84, 218, "WEB · 인터넷망", ["대민 웹 요청 진입", "Linux 서버"], "linux", "인터넷망 WEB/WAS 운영 환경을 표현한 논리 계층입니다. WEB 서버 제품명·방화벽·로드밸런서 구성은 기록에 없어 지정하지 않았습니다."),
        node("publicwas", 46, 266, 218, "WAS · 업무 서비스", ["eGovFrame 4.1 · JSP", "JSTL · jQuery · MyBatis"], "java", "JSP·jQuery 화면과 eGovFrame 기반 업무 서비스입니다. 공통 사용 WAS는 Tomcat 9 / JBoss지만 각 망의 제품별 배치 정보는 없어 여기서는 WAS로 표기합니다."),
        node("publicdb", 46, 446, 218, "CUBRID · 인터넷망", ["게시물 · 첨부파일 데이터", "명시적 컬럼 조회·반영"], null, "망간 동기화 대상 데이터입니다. 원본 존재 여부를 확인한 뒤 대상 MERGE를 수행해 빈 원본으로 인한 NULL 덮어쓰기를 방지합니다.", false, "database"),
        node("internalweb", 696, 84, 218, "WEB · 업무망", ["내부 업무 요청 진입", "Linux 서버"], "linux", "업무망 WEB/WAS 환경입니다. 그림의 선은 애플리케이션 요청 흐름이며 실제 망 접근 정책이나 물리 네트워크 연결을 의미하지 않습니다."),
        node("internalwas", 696, 266, 218, "WAS · 업무 서비스", ["eGovFrame 4.1 · JSP", "Jasypt · MyBatis"], "java", "기능 개발·오류 분석·보안 조치를 수행한 업무 계층입니다. Jasypt 공통 유틸은 환경별 계정 정보 보호에 사용했습니다."),
        node("internaldb", 696, 446, 218, "CUBRID · 업무망", ["업무 데이터 · 동기화 이력", "Damo 개인정보 암호화"], null, "CUBRID에서 실행계획과 인덱스를 분석했습니다. CI·개인정보 이력 384만 건 암호화는 별도 DB 패치로 수행했으며 두 망의 제품별 암호화 배치를 나타낸 것은 아닙니다.", false, "database"),
        node("sync", 364, 446, 232, "동기화 Service / DAO", ["테이블별 SELECT / MERGE", "원본 없으면 skip + 로그"], "java", "기존 연계 Service 인터페이스를 유지하면서 DAO·MyBatis Mapper를 정적 statement로 개선했습니다. 배치 위치가 아닌 두 망 간 논리 연계 기능을 나타냅니다.", true),
        node("security", 364, 206, 232, "보안 개선 지점", ["CodeRay SAST → 재검증", "SQL 바인딩 · Jasypt · Damo"], null, "CodeRay 358→4건, 웹 취약점과 SQL Injection 개선, 계정 정보 보호 및 개인정보 암호화를 수행했습니다. 운영 데이터 흐름과 구분된 개선 범위입니다.", true),
      ],
      edges: [
        edge("publicweb", "publicwas", "M155 192 V266", "① HTTP 요청", 155, 232),
        edge("publicwas", "publicdb", "M155 374 V446", "② MyBatis / SQL", 155, 415, "data", true),
        edge("internalweb", "internalwas", "M805 192 V266", "① HTTP 요청", 805, 232),
        edge("internalwas", "internaldb", "M805 374 V446", "② MyBatis / SQL", 805, 415, "data", true),
        edge("publicdb", "sync", "M264 500 H364", "③ 동기화", 314, 484, "data", true),
        edge("sync", "internaldb", "M596 500 H696", "③ 동기화", 646, 484, "data", true),
        edge("security", "sync", "M480 314 V446", "정적 SQL · 값 바인딩", 480, 389, "lookup"),
      ],
      notes: ["실선: 업무·동기화 흐름", "점선: 보안 개선 적용", "WEB/WAS/DB는 논리 계층 · 장비 대수·물리 배치 생략"],
      guide: [
        ["①–② 각 망의 업무 처리", "WEB을 거친 요청을 eGovFrame·JSP 서비스가 처리하고 MyBatis로 CUBRID에 접근합니다. 각 망의 서버·DB를 나눠 표시했습니다."],
        ["③ 망간 데이터 동기화", "게시물·첨부 데이터는 테이블별 SELECT/MERGE로 맞춥니다. 중간 박스는 논리 연계 기능이며 직접 DB 간 통신을 뜻하지 않습니다."],
        ["담당 개선 범위", "동적 SQL의 문자열 조립을 제거하고, 개인정보·계정 암호화와 취약점 재검증을 수행했습니다. 다음 그림은 별도 개발한 운영 수집 기능입니다."],
      ],
    }, {
      id: "public-monitoring", title: "02 / SSH 기반 서버 점검과 이력 조회", height: 505,
      summary: "대표 WAS Quartz가 4시간마다 MINA SSHD 수집을 시작합니다. WEB/WAS에서 명령 결과를 받고 CUBRID에 이력을 저장해 JSP 관리자 화면에서 조회합니다.",
      zones: [{ x: 20, y: 22, w: 545, h: 216, label: "대표 WAS · 직접 개발한 수집 기능", owned: true }, { x: 20, y: 282, w: 545, h: 188, label: "CUBRID · 수집 설정과 이력" }],
      nodes: [
        node("quartz", 40, 92, 190, "Quartz 스케줄러", ["4시간 주기 · 대표 1대", "개발 환경 수집 차단"], "java", "WAS 2대의 이중 수집을 막기 위해 대표 1대만 스케줄을 활성화했습니다. 개발 환경은 별도로 차단합니다."),
        node("ssh", 325, 92, 220, "Apache MINA SSHD", ["SSH EXEC · 명령 결과 파싱", "timeout · stdout/stderr 분리"], "java", "JSch의 알고리즘 협상 실패를 분석한 뒤 MINA SSHD로 전환했습니다. 접속·인증·명령 실행에 제한 시간을 두고 자원을 정리합니다.", true),
        node("servers", 690, 92, 230, "Linux WEB / WAS", ["인터넷망 · 업무망 수집 대상", "free · top/vmstat · df"], "linux", "서버별 메모리·CPU·디스크 값을 수집합니다. 선은 수집 요청/응답의 논리 경로이며 실제 망별 허용 경로는 생략했습니다."),
        node("connections", 40, 320, 190, "접속 정보 테이블", ["호스트 · 계정 · 수집 대상", "비밀번호 DB 암호화"], null, "접속 정보는 DB 테이블로 관리하고 비밀번호 컬럼은 암호화했습니다. 서버 추가는 데이터 등록으로 반영합니다.", false, "database"),
        node("history", 325, 320, 220, "CUBRID · 수집 이력", ["서버별 CPU·메모리·디스크", "주기별 데이터 누적"], null, "SSH 수집 결과를 파싱해 이력으로 저장합니다. 관리자 화면은 서버별 최신 1건을 조회하며, 실시간 스트리밍 수집이 아닙니다.", false, "database"),
        node("admin", 690, 320, 230, "관리자 화면", ["Controller → JSP / jQuery", "최신 이력 조회 · 월말 보고"], "jquery", "서버별 최신 이력을 화면에서 확인하고 누적 데이터를 월말 보고에 활용합니다. 수집 주기는 4시간입니다.", true),
      ],
      edges: [
        edge("quartz", "ssh", "M230 145 H325", "① 실행", 278, 128),
        edge("ssh", "servers", "M545 145 H690", "② SSH / 명령 결과", 617, 126, "data", true),
        edge("ssh", "history", "M435 200 V320", "③ 파싱·저장", 435, 265),
        edge("connections", "ssh", "M135 320 V258 H354 V200", "접속 정보 조회", 234, 249, "lookup"),
        edge("history", "admin", "M545 374 H690", "④ 최신 이력 조회", 617, 355, "data", true),
      ],
      notes: ["실선: 주기 실행·수집·조회", "점선: 수집 대상·접속 설정"],
      guide: [["①–② 수집", "대표 WAS가 4시간마다 SSH로 명령을 실행하고 결과를 받습니다. 별도 에이전트 설치 없이 수집하도록 구현했습니다."], ["③–④ 활용", "CUBRID에 누적한 이력에서 서버별 최신 상태를 조회합니다. 수동 접속·기록 업무를 화면 조회와 월말 데이터 정리로 전환했습니다."]],
    }],
    supporting: [
      { title: "공통 서비스 스택", tools: [["Tomcat 9", "tomcat"], ["JBoss", null], ["eGovFrame 4.1", null], ["JSP · JSTL", "java"], ["Fedora", "linux"]], text: "제품별 망·서버 배치는 공개 자료에서 구분되지 않아 공통 사용 기술로 표시" },
      { title: "배포·보안 도구", tools: [["SVN", null], ["Maven", "maven"], ["SFTP / SSH", null], ["CodeRay", null], ["Damo · Jasypt", null]], text: "패키징·운영 배포 / SAST 분석 / 계정·개인정보 암호화" },
    ],
  },
};

export default diagrams;
