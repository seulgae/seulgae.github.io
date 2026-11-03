# 포트폴리오 기술 검토 및 면접 문서 현행화 결과

검토일: 2026-11-03. 기준 커밋: a4a8f4d. 대상: 로컬 포트폴리오 데이터, 기술 블로그 24편, 면접 문서 3편, 논리 구성도 5개.

## A. 프로젝트별 변경

- CloudXper: 병렬 조회는 호출 수 제거와 구분했다. 최종 성과는 저자가 확인한 10분 → 30초 이내로 통일했다. 권한 캐시의 고정 TTL·토큰 만료·변경 무효화를 구분하고, 구성도에서 업무 조회와 권한 조회의 책임을 분리했다. 컨벤션 표준화의 실제 역할과 정성 경험을 유지했다.
- 공공 지원관리시스템: 정적 동기화의 테이블 누락·복구 경험을 보존했다. 암호화 예제의 값/완료 플래그 동시 갱신, nohup의 한계, CUBRID 인덱스 설명, SSH 주기 수집·종료 확인, CWE별 안전성 설명을 보완했다. 기존 실패 경험을 성공 서사로 바꾸지 않았다.
- 빌링 GW: Kafka 전달, Redis 업무키 매핑, 메타데이터 조회, 대상 DB 반영을 구분했다. offset/DB 커밋과 재처리 매체는 미확인으로 남겼다. Oracle 실행계획·힌트·병렬도와 POI 메모리·컬럼 자동 너비·자원 정리 설명을 보완했다.
- 정보처리기사: 저자의 합격 확인을 반영하고 2026.12.18은 합격자 발표일 기준이라고 표시했다. 외부 증명서를 검증했다는 의미는 아니다.

## B. 감사 보고서 변경

[공개 검토 보고서](src/posts/portfolio-blog-audit-report.md)를 현재 상태로 다시 정리했다. 과거 지적은 기존 완료·이번 수정·조치 불필요·추가 확인으로 분리했다. 남은 U01~U12에는 프로젝트, 파일, 문제, 이유, 수정 방향, 적용 상태, 필요한 근거, 우선순위를 기록했다.

P0 확인 대상은 권한 캐시 무효화, XSS 정화의 실제 구현, 대량 암호화의 완료 판정이다. 이는 업무 원본 코드가 없는 상태에서 문서만으로 안전성을 단정하지 않기 위한 항목이다. 측정 근거, Kafka 처리 보장, SSH 파서, POI 버전 등도 추가 근거가 필요하다.

엑셀 다운로드는 저자가 빌링 업무 중 개발했다고 확인했다. 핵심 성과에서 의도적으로 감춘 항목은 복원하지 않고 블로그에 개발 맥락을 보완했다. 게시일을 개발일로 추정하지 않았다.

## C. 면접 문서 보완

- [CloudXper](src/posts/interview-cloudxper-billing.md): 프로젝트 흐름, 병렬 조회·권한 캐시·코드 표준화, 기본/심화/꼬리 질문, 학습 체크 8개.
- [공공 지원관리시스템](src/posts/interview-jeonse-support-system.md): 동기화·보안·SQL·SSH 운영, 실패와 복구, 기본/심화/꼬리 질문, 학습 체크 10개.
- [빌링 GW](src/posts/interview-lgu-billing-gw.md): 키 매핑·정합성·Oracle·POI, 기본/심화/꼬리 질문, 학습 체크 9개.

실제 경험, 일반적인 기술 원리, 지금 다시 한다면의 제안과 실습을 구분했다. 성능 조건·운영 설정·담당 범위를 임의로 만들지 않았다. 게시글 날짜와 URL을 유지했다. 기존 사이드 프로젝트 아이디어는 후속 학습안으로 보존했다.

## D. 검증 결과와 한계

- 최종 npm test: 5개 테스트 파일, 32개 테스트 통과.
- 최종 npm run build: 성공, 348개 모듈 변환.
- Markdown 24편의 메타데이터 순서, 기존 게시일, 코드 펜스, 본문 H1 중복을 검사했다. 오류 없음.
- 내부 글 링크 32개를 검사했다. 앞선 점검에서는 홈 프로젝트 앵커를 포함한 내부 링크 35개와 이미지 참조도 확인했다.
- 구성도 5개, 노드 31개의 ID와 연결 대상을 검사했다. 앞선 점검에서 노드 로고 경로도 확인했다.
- 변경된 JS/JSX 6개 파일의 주석을 HEAD와 비교했다. 기존 주석이 그대로 유지됐다. src/old 및 참고용 주석 코드는 변경하지 않았다.
- 브라우저에서 면접 문서 3편과 감사 보고서의 표·체크박스·본문을 확인했다. 확인한 데스크톱 화면에서 페이지 가로 넘침과 콘솔 오류가 없었다. CloudXper 구성도도 펼쳐 확인했다. 모든 구성도의 모든 해상도를 시각 검증한 것은 아니다.
- 현재 렌더러에 맞춰 text 흐름도와 기존 SVG를 사용했다. Mermaid 실행 검증을 주장하지 않는다.
- 이 저장소에는 업무 시스템 Java/SQL 원본·로그·DB·실행계획이 없다. 사이트 테스트 통과는 업무 로직이나 성과 수치의 실측 검증이 아니다. 외부 프로젝트 PDF와 증빙의 전체 내용은 미검증이다.
- 커밋·배포·의도적으로 숨긴 성과 복원·파일 삭제는 수행하지 않았다.

## E. 권장 학습 순서

1. 프로젝트별 역할·핵심 흐름·성과의 측정 범위를 1분 설명으로 정리한다.
2. N+1과 집합 조회 → 복합 인덱스와 실행계획 → 트랜잭션과 대사를 학습한다.
3. TTL·세션·토큰의 차이 → 권한 변경 무효화 → 장애 시 인가 정책을 학습한다.
4. Kafka 파티션·offset → 업무키 매핑·멱등성 → 재처리와 복구를 학습한다.
5. XSS 출력 문맥·정화 → SAST와 로그 보호 → SSH 타임아웃·측정 지표를 학습한다.
6. 병렬 조회 부하·캐시 장애·중복 이벤트·엑셀 메모리를 작은 재현 환경에서 측정한다.

## 변경 파일

- [BLOG_REFERENCE.md](BLOG_REFERENCE.md)
- [src/components/BillingArchitecture.jsx](src/components/BillingArchitecture.jsx)
- [src/data/architectureDiagrams.js](src/data/architectureDiagrams.js)
- [src/data/licenses.js](src/data/licenses.js)
- [src/data/profile.js](src/data/profile.js)
- [src/data/projectArchitecture.js](src/data/projectArchitecture.js)
- [src/data/projects.js](src/data/projects.js)
- [src/posts/csql-nohup-mass-patch.md](src/posts/csql-nohup-mass-patch.md)
- [src/posts/cubrid-query-plan-index-tuning.md](src/posts/cubrid-query-plan-index-tuning.md)
- [src/posts/cwe-209-error-message-exposure.md](src/posts/cwe-209-error-message-exposure.md)
- [src/posts/cwe-404-496-resource-handling.md](src/posts/cwe-404-496-resource-handling.md)
- [src/posts/cwe-476-null-dereference.md](src/posts/cwe-476-null-dereference.md)
- [src/posts/cwe-615-sensitive-comments.md](src/posts/cwe-615-sensitive-comments.md)
- [src/posts/cwe-676-dangerous-api.md](src/posts/cwe-676-dangerous-api.md)
- [src/posts/cwe-754-exception-handling.md](src/posts/cwe-754-exception-handling.md)
- [src/posts/cwe-79-xss-remediation.md](src/posts/cwe-79-xss-remediation.md)
- [src/posts/interview-cloudxper-billing.md](src/posts/interview-cloudxper-billing.md)
- [src/posts/interview-jeonse-support-system.md](src/posts/interview-jeonse-support-system.md)
- [src/posts/interview-lgu-billing-gw.md](src/posts/interview-lgu-billing-gw.md)
- [src/posts/jsch-to-mina-sshd.md](src/posts/jsch-to-mina-sshd.md)
- [src/posts/kafka-gw-data-integrity.md](src/posts/kafka-gw-data-integrity.md)
- [src/posts/mybatis-builder-parallel-refactoring.md](src/posts/mybatis-builder-parallel-refactoring.md)
- [src/posts/oracle-hint-subquery-fullscan.md](src/posts/oracle-hint-subquery-fullscan.md)
- [src/posts/portfolio-blog-audit-report.md](src/posts/portfolio-blog-audit-report.md)
- [src/posts/portfolio-refactoring.md](src/posts/portfolio-refactoring.md)
- [src/posts/redis-permission-cache-ttl.md](src/posts/redis-permission-cache-ttl.md)
- [src/posts/sxssf-vs-xssf-excel-download.md](src/posts/sxssf-vs-xssf-excel-download.md)
- [DOCUMENTATION_REVIEW_20261103.md](DOCUMENTATION_REVIEW_20261103.md) — 이 결과 문서. 게시글 수집 경로 밖에 둔다.
