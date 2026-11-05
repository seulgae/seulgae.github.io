// 프로젝트 경력과 연결된 블로그 원문을 바탕으로 정리한 논리 구조.
// 화면용 요약이며, 이력서의 기존 업무·성과 데이터와 독립적으로 확장한다.
const projectArchitecture = {
  "cloudxper-billing": {
    headline: "조회 대기 시간을 줄이고, 반복되는 권한 조회를 캐시로 전환하다",
    caption: "클라우드 저장소 대여 내역과 기업별 청구 정보를 관리하는 서비스의 백엔드 개선 영역",
    details: [
      { title: "조회 성능은 어떻게 달라졌을까?", open: true, items: [
        { title: "개선 전 · 순차 조회", body: "부모 목록 조회 후 항목별 연관 리스트를 하나씩 조회. DB 전체 테스트 데이터 100만 건 적재 환경에서 API 호출 후 응답 완료까지 약 480,000ms 소요." },
        { title: "개선 후 · 병렬 조회", body: "ServiceImpl로 조회·조립을 모으고 병렬 스트림 적용. 같은 테스트 조건에서 10,000ms 이내로 단축." },
      ] },
      { title: "병렬 처리의 범위와 남은 과제", items: [
        { title: "당시 적용한 개선", body: "SQL 횟수는 그대로이며 반복 호출 자체를 제거한 것은 아닙니다. 여러 DB 조회의 대기 시간을 겹쳐 응답 시간을 줄였습니다." },
        { title: "회고에서 정리한 다음 단계", body: "EXPLAIN 확인과 집합 단위 조회로 쿼리 수를 줄이는 방향을 검토했습니다. 커넥션 풀 부하와 작업 스레드의 트랜잭션 경계도 고려 대상입니다." },
      ] },
      { title: "권한 캐시는 언제 갱신할까?", items: [
        { title: "조회 · 만료", body: "로그인·재로그인 시 권한 API에서 사용자 권한을 조회해 Redis에 저장·갱신하고 이후 요청에서 재사용합니다." },
        { title: "조회 목록 제공", body: "권한 정보에 보관 기간을 두고, 캐시된 사용자 권한을 기준으로 조회 가능한 업무 목록을 제공합니다." },
      ] },
    ],
    sources: [
      { slug: "mybatis-builder-parallel-refactoring", label: "DB 100만 건 환경의 조회 성능 개선" },
      { slug: "redis-permission-cache-ttl", label: "Redis 권한 캐시와 만료 정책" },
      { slug: "backend-code-convention-standardization", label: "4인 백엔드 코드 리팩토링과 PDF 컨벤션 표준화" },
    ],
  },
  "jeonse-support-system": {
    headline: "민감한 데이터를 보호하고, 반복되는 운영 점검을 자동화하다",
    caption: "전세사기 피해자 지원관리시스템의 망간 데이터 동기화·보안·운영 개선 영역",
    details: [
      { title: "망간 동기화는 어떻게 안전해졌을까?", open: true, items: [
        { title: "개선 전 · 범용 동적 쿼리", body: "테이블명과 컬럼명을 문자열로 조립해 실행하는 구조여서 실제 SQL과 변경 영향을 확인하기 어려웠습니다." },
        { title: "개선 후 · 명시적 쿼리", body: "정의된 statement만 실행하고 값을 바인딩합니다. 원본이 없으면 MERGE를 건너뛰고 로그를 남겨 NULL 덮어쓰기를 방지했습니다." },
      ] },
      { title: "보안 취약점 점검 및 시큐어코딩 과정", items: [
        // { title: "384만 건 암호화", body: "csql·nohup으로 DB 패치를 실행하고 범위별 커밋과 미처리 조건으로 처리했습니다. 로그를 추적하고 반영 결과를 확인했습니다." },
        { title: "SAST · 웹 취약점 개선", body: "CodeRay 탐지 358건을 CWE별로 분석·수정·재검증해 4건으로 감축했습니다. 별도로 웹 취약점 16건, SQL Injection 14건을 개선했습니다." },
        { title: "환경별 계정 정보 보호", body: "Jasypt 공통 암호화 유틸을 적용해 4개 운영·개발 환경의 계정 설정 정보 17건을 안전하게 보호했습니다." },
      ] },
      { title: "전환 과정에서 배운 정합성 검증", items: [
        { title: "대상 목록 누락과 복구", body: "코드 목록만으로 전환 대상을 정해 테이블 하나가 누락됐습니다. statement 추가와 차이 데이터 보정 후 건수·키 대사로 복구를 확인했습니다." },
        { title: "운영 이력과 교차 검증", body: "동기화 이력 기준으로 실제 대상과 코드 목록을 비교했습니다. 오류 로그가 없는 연계 누락도 데이터 대사로 확인해야 한다는 기준을 남겼습니다." },
      ] },
    ],
    sources: [
      { slug: "dynamic-to-static-sync-query", label: "망간 동기화 SQL 개선과 복구 경험" },
      { slug: "jsch-to-mina-sshd", label: "SSH 기반 서버 점검 자동화" },
      // { slug: "csql-nohup-mass-patch", label: "대량 개인정보 암호화 패치" },
      { slug: "cubrid-query-plan-index-tuning", label: "CUBRID 실행계획과 인덱스 튜닝" },
    ],
  },
};

export default projectArchitecture;
