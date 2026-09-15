// 프로젝트 경력과 연결된 블로그 원문을 바탕으로 정리한 논리 구조.
// 화면용 요약이며, 이력서의 기존 업무·성과 데이터와 독립적으로 확장한다.
const projectArchitecture = {
  "cloudxper-billing": {
    headline: "조회 대기 시간을 줄이고, 반복되는 권한 조회를 캐시로 전환하다",
    caption: "멀티 클라우드 대여·청구 통합 관리 플랫폼의 백엔드 개선 영역",
    metrics: [
      { label: "대용량 API 응답", value: "10분 → 1분 15초", detail: "100만 건 테스트 데이터 · 동일 조건 비교" },
      { label: "권한 조회 관련 화면 응답", value: "10초 → 0.1초 이내", detail: "프로젝트 경력에 기록된 개선 결과" },
      { label: "권한 캐시 수명", value: "세션 만료와 정렬", detail: "로그아웃·권한 변경 시 사용자 캐시 삭제" },
    ],
    flowLabel: "관리 화면 → Spring Boot API → MyBatis · MySQL",
    nodes: [
      { title: "관리 화면", body: "가입 · 상품 · 청구 조회", tech: "React · REST API" },
      { title: "Spring Boot API", body: "요청 검증 · 비즈니스 규칙 · 데이터 조립", tech: "Controller → Service → ServiceImpl", owned: true },
      { title: "MyBatis · MySQL", body: "목록과 연관 데이터 조회", tech: "DAO · DB 매핑 Model(VO)" },
    ],
    dependencies: [
      { label: "조회·조립 로직 개선", title: "ServiceImpl에서 병렬 처리", body: "화면별로 복제된 로직을 모으고, 연관 데이터 조회의 대기 시간을 겹쳐 처리", tech: "parallelStream · DTO / Model 분리 · Builder" },
      { label: "권한 모듈 신규 개발", title: "권한 서비스 ↔ Redis", body: "로그인·첫 조회 시 DB 권한 조회 후 캐싱, 이후 요청은 캐시에서 조회", tech: "사용자 + 코드 그룹별 키 · 캐시 미스 시 DB 조회" },
    ],
    outputLabel: "↓ 서비스 계층에서 조회 결과 조립",
    output: { title: "DTO 응답 → 관리 화면", body: "서비스·상품·청구 화면이 공통 서비스 계약을 사용", tech: "화면별 중복 로직 축소 · 입력 검증 위치 통일" },
    details: [
      { title: "조회 성능은 어떻게 달라졌을까?", open: true, items: [
        { title: "개선 전 · 순차 조회", body: "부모 목록 조회 후 항목별 연관 리스트를 하나씩 조회. 100만 건 테스트에서 약 10분 소요." },
        { title: "개선 후 · 병렬 조회", body: "ServiceImpl로 조회·조립을 모으고 병렬 스트림 적용. 같은 테스트 조건에서 약 1분 15초로 단축." },
      ] },
      { title: "병렬 처리의 범위와 남은 과제", items: [
        { title: "당시 적용한 개선", body: "SQL 횟수는 그대로이며 N+1을 제거한 것은 아닙니다. 여러 DB 조회의 대기 시간을 겹쳐 응답 시간을 줄였습니다." },
        { title: "회고에서 정리한 다음 단계", body: "EXPLAIN 확인과 집합 단위 조회로 쿼리 수를 줄이는 방향을 검토했습니다. 커넥션 풀 부하와 작업 스레드의 트랜잭션 경계도 고려 대상입니다." },
      ] },
      { title: "권한 캐시는 언제 갱신할까?", items: [
        { title: "조회 · 만료", body: "사용자·코드 그룹별 캐시를 읽고, 없으면 DB에서 조회합니다. TTL은 세션 만료 정책에 맞췄습니다." },
        { title: "로그아웃 · 권한 변경", body: "해당 사용자의 캐시 키를 삭제해 다음 조회에서 새 권한을 읽도록 구성했습니다." },
      ] },
    ],
    operationTitle: "개선을 팀의 개발 기준으로 남기기",
    operations: [
      { label: "구조 표준화", title: "계층별 책임 정리", body: "Controller는 HTTP 처리, ServiceImpl은 규칙·데이터 조립, DAO는 DB 접근을 담당", tech: "DTO: API 계약 / Model: DB 매핑" },
      { label: "협업 · 품질", title: "컨벤션 작성·팀 공유", body: "Builder 사용, 입력 검증·예외·로그 기준 정리와 동일 로직 복제 방지", tech: "SonarQube 코드 품질 지표 개선" },
    ],
    caseStudy: {
      problem: "1만 건에서는 드러나지 않던 목록·연관 리스트의 N+1 조회가 100만 건 테스트에서 10분짜리 API가 됐습니다.",
      action: "Map 기반 로직을 DTO·Model·Service 계층으로 정리하고, ServiceImpl에 모인 연관 조회에 병렬 스트림을 적용했습니다.",
      result: "동일 테스트 조건에서 API 응답 약 10분 → 1분 15초. 조회 횟수 감소가 아닌 대기 시간 단축입니다.",
    },
    sources: [
      { slug: "mybatis-builder-parallel-refactoring", label: "100만 건 성능 검증과 계층 리팩토링" },
      { slug: "redis-permission-cache-ttl", label: "Redis 권한 캐시와 만료 정책" },
    ],
  },
  "jeonse-support-system": {
    headline: "민감한 데이터를 보호하고, 반복되는 운영 점검을 자동화하다",
    caption: "전세사기 피해자 지원관리시스템의 망간 데이터 동기화·보안·운영 개선 영역",
    metrics: [
      { label: "CodeRay SAST 탐지", value: "358 → 4건", detail: "CWE 유형별 분석 · 수정 후 반복 재검증" },
      { label: "개인정보 암호화", value: "384만 건", detail: "CI 14만 건 + 개인정보 이력 로그 370만 건" },
      { label: "서버 현황 수집", value: "4시간 주기", detail: "대표 WAS에서 수집 · 관리자 화면에서 이력 조회" },
    ],
    flowLabel: "업무망 DB ↔ 망간 동기화 로직 ↔ 인터넷망 DB",
    bidirectional: true,
    nodes: [
      { title: "업무망 DB", body: "게시물 · 첨부파일 데이터", tech: "CUBRID · 동기화 이력" },
      { title: "망간 동기화 로직", body: "원본 조회 → 원본 존재 확인 → 대상 반영", tech: "eGovFrame · MyBatis 정적 SELECT / MERGE", owned: true },
      { title: "인터넷망 DB", body: "게시물 · 첨부파일 데이터", tech: "양방향 동기화" },
    ],
    dependencies: [
      { label: "연계 SQL 개선", title: "테이블별 정적 statement", body: "테이블·컬럼 문자열 조립을 명시적 SQL과 값 바인딩으로 전환", tech: "DAO·Mapper 개선 · 기존 Service 인터페이스 유지" },
      { label: "개인정보 · 설정 보호", title: "DB 암호화와 Jasypt", body: "Damo로 개인정보를 암호화하고, Jasypt 공통 유틸로 환경별 계정 정보 보호", tech: "대량 패치: csql · nohup · 범위 분할 커밋" },
    ],
    // 망간 DB 흐름과 별개인 운영 수집 경로이므로 출력 노드로 연결하지 않는다.
    details: [
      { title: "망간 동기화는 어떻게 안전해졌을까?", open: true, items: [
        { title: "개선 전 · 범용 동적 쿼리", body: "테이블명과 컬럼명을 문자열로 조립해 실행하는 구조여서 실제 SQL과 변경 영향을 확인하기 어려웠습니다." },
        { title: "개선 후 · 명시적 쿼리", body: "정의된 statement만 실행하고 값을 바인딩합니다. 원본이 없으면 MERGE를 건너뛰고 로그를 남겨 NULL 덮어쓰기를 방지했습니다." },
      ] },
      { title: "대량 암호화와 보안 점검 과정", items: [
        { title: "384만 건 암호화", body: "csql·nohup으로 DB 패치를 실행하고 범위별 커밋과 미처리 조건으로 처리했습니다. 로그를 추적하고 반영 결과를 확인했습니다." },
        { title: "SAST · 웹 취약점 개선", body: "CodeRay 탐지를 CWE별로 분석·수정·재검증했습니다. 별도로 웹 취약점 16건, SQL Injection 14건을 개선하고 계정 정보 17건을 암호화했습니다." },
      ] },
      { title: "전환 과정에서 배운 정합성 검증", items: [
        { title: "대상 목록 누락과 복구", body: "코드 목록만으로 전환 대상을 정해 테이블 하나가 누락됐습니다. statement 추가와 차이 데이터 보정 후 건수·키 대사로 복구를 확인했습니다." },
        { title: "운영 이력과 교차 검증", body: "동기화 이력 기준으로 실제 대상과 코드 목록을 비교했습니다. 오류 로그가 없는 연계 누락도 데이터 대사로 확인해야 한다는 기준을 남겼습니다." },
      ] },
    ],
    secondaryFlow: {
      title: "서버 점검 자동화 · 별도의 운영 수집 경로",
      label: "Quartz → SSH 수집 → 수집 이력 DB 및 관리자 화면",
      nodes: [
        { title: "Quartz", body: "대표 WAS 1대에서 4시간마다 실행", tech: "스케줄 활성화 플래그 · 개발 환경 차단" },
        { title: "SSH 수집", body: "인터넷망·업무망 WEB/WAS에 접속", tech: "Apache MINA SSHD · free / top / df", owned: true },
        { title: "이력 저장 · 화면 조회", body: "파싱 결과를 DB에 저장하고 서버별 최신 이력 표시", tech: "Controller → JSP 관리자 화면" },
      ],
    },
    operationTitle: "장애 상황에도 동작하는 점검·운영",
    operations: [
      { label: "모니터링 기능 개발", title: "접속부터 종료까지 제한 시간", body: "연결·인증·명령 실행에 타임아웃을 적용하고 오류를 기록하며 자원을 정리", tech: "EXEC 채널 · stdout/stderr 분리 · 원본 예외 보존" },
      { label: "조회 성능 개선", title: "실행계획 기반 SQL 튜닝", body: "CUBRID의 Full Scan과 조회 조건을 분석해 인덱스와 SQL을 개선", tech: "53초 소요 Slow Query 개선 · 월간 점검 특이사항 0건" },
    ],
    caseStudy: {
      problem: "월말마다 각 서버에 접속해 메모리·디스크 사용량을 수기로 옮겼고, 수집 기능 도입 중 SSH 알고리즘 협상 실패가 발생했습니다.",
      action: "Apache MINA SSHD로 전환하고 대표 WAS의 Quartz에서 주기적으로 수집해 DB에 저장했습니다. 관리자 화면은 서버별 최신 이력을 조회하도록 구성했습니다.",
      result: "수동 접속·기록을 4시간 주기 수집과 화면 조회로 전환해, 누적 데이터로 월말 용량 현황을 정리할 수 있게 됐습니다.",
    },
    sources: [
      { slug: "dynamic-to-static-sync-query", label: "망간 동기화 SQL 개선과 복구 경험" },
      { slug: "jsch-to-mina-sshd", label: "SSH 기반 서버 점검 자동화" },
      { slug: "csql-nohup-mass-patch", label: "대량 개인정보 암호화 패치" },
      { slug: "cubrid-query-plan-index-tuning", label: "CUBRID 실행계획과 인덱스 튜닝" },
    ],
  },
};

export default projectArchitecture;
