# 포트폴리오·블로그 검토 기록

검토일: 2026-11-03 (Asia/Seoul)

## 확인 기준

- 저장소: https://github.com/seulgae/seulgae.github.io
- 로컬: `C:\IdeaProjects\seulgae.github.io`
- 로컬 HEAD / 원격 main: `c0297afa5fe5e8a641eb6fbfac9a36b79c53d874` (git ls-remote 확인)
- 원격 gh-pages: `b7d38a64628bc4b61e5e9a90f46555fa4891617a`
- 검토 시작 시 작업 트리 깨끗함. 소스·게시글 수정 및 배포는 하지 않음.
- 배포 홈·블로그 목록·이력서의 렌더링과 CloudXper 아키텍처 팝업을 브라우저에서 확인했다. 모바일 실제 화면 및 A4 인쇄 미리보기는 확인하지 않았다.
- 기존 테스트: 5개 파일, 32개 통과. 프로덕션 빌드 성공. JS 청크 688.98 kB, gzip 229.95 kB 경고 발생.
- 아래 경험·성과 수치는 저자의 서술을 대조한 것이며 실제 업무 산출물로 검증한 결과가 아니다.

## 현재 구조

- 포트폴리오: `/`의 About / Skills / Projects / Credentials 포스터 4개 + `/resume`.
- 블로그: `/blog`, `/blog/:slug`. 독립 헤더·사이드바·푸터와 네이비/블루 테마.
- 프로젝트 3개는 회사 2개로 묶임. 애버커스의 개발·운영 트랙과 CloudXper SI 트랙을 함께 표시해 기간 중첩 맥락을 전달한다.
- 프로젝트 상세는 원페이지 앵커로 통합. 구 `/projects/:slug`와 기존 교육·자격 경로는 리다이렉트한다.
- 시스템 구성도는 ArchitectureModal에서 열리고, 내부 SVG 확대 기능이 추가로 있다.
- 블로그 24개: Backend 5, Database 3, Security/Infra 10, Retrospective 6. 대분류 4개·소분류 8개, 검색·태그·카테고리 필터·10개 단위 페이징.
- `profile.js`와 `projects.js`가 홈·이력서 공통 데이터다. 아키텍처 설명과 블로그 본문은 별도 파일이므로 자동으로 정합성이 보장되지는 않는다.

## 우선 확인하거나 고칠 항목

### 1. 정보처리기사 미래 취득일 표시

`src/data/licenses.js` 7행은 정보처리기사를 `2026.12.18`로 기록한다. 검토일보다 미래인데 홈에서는 일반 자격증으로, 이력서에서는 **취득일**로 출력된다. 취득 예정이라면 예정 상태를 구분해야 하며 오기라면 실제 날짜를 확인해야 한다. 자격 취득 사실을 임의로 판단해서 바꾸면 안 된다.

### 2. 대용량 API 성과 수치 변경 근거 확인

기존 AGENTS.md·BLOG_REFERENCE.md의 기록은 `10분 → 1분 15초`였으나 현재 프로필 KPI·프로젝트 성과·MyBatis 글·아키텍처 설명은 `10분 → 30초 이내`, `95% 단축`으로 변경됐다. 현재 화면끼리는 대체로 일치한다. 새로운 수치가 재측정 결과인지, 이전 기록의 정정인지 사용자 확인이 필요하다. 동일 테스트 데이터라는 설명만으로 하드웨어·조회 결과 건수·동시 요청·측정 구간의 동일성까지 확인할 수는 없다.

`src/data/projects.js` 245행의 **소스 전역 집계 로직에 적용** 표현은 기존 감사 리포트가 지적한 그대로 남아 있다. 현재 MyBatis 글도 같은 적용 범위를 서술한다. 실제 범위에 맞게 대상 API와 조회·조립 구간을 구체화하는 것이 좋다. SQL 횟수 감소와 병렬화 성과는 계속 구분해야 한다.

### 3. Redis TTL 코드와 정책 설명 불일치

`src/posts/redis-permission-cache-ttl.md` 68행의 고정 `entryTtl(30분)`은 **캐시 저장 시점부터의 TTL**이다. 세션의 남은 유효시간이나 토큰 만료 시각에 자동 정렬되는 코드가 아니다. 지연된 최초 조회·캐시 재생성·세션 연장 시 만료 시각이 달라진다. 따라서 projects.js의 **토큰 만료와 Redis TTL 자동 동기화**라는 표현을 입증하려면 실제 만료 시각 기반 처리나 별도 동기화 구현 설명이 필요하다.

같은 글은 권한이 세션 동안 고정되어 재로그인 시 반영된다고 설명하면서, 권한 변경 시 evict하여 다음 요청에 반영한다고도 쓴다. 실제 정책을 하나로 설명해야 한다. 사용자+코드그룹 키를 사용자 단위로 어떻게 모두 삭제했는지도 빠져 있다. 실제 구현과 개념 예제를 구분할 필요가 있다.

공식 근거: https://docs.spring.io/spring-data/redis/reference/redis/redis-cache.html

### 4. 암호화 패치 예제의 재실행 안전성 누락

`src/posts/csql-nohup-mass-patch.md` 78~86행은 `enc_yn='N'`을 조건으로 쓰면서 UPDATE에서 `enc_yn`을 바꾸지 않는다. 제시한 SQL만 재실행하면 이미 암호화한 값이 다시 대상이 될 수 있다. **암호화 값과 완료 플래그를 같은 트랜잭션에서 변경**하거나 실제 사용한 별도 완료 판별 방식을 보여줘야 한다. 함수·트리거가 별도로 처리했다면 그 전제를 명시해야 한다. 이는 개념 예제의 결함이며 실제 운영 패치가 잘못됐다는 뜻은 아니다.

### 5. 공개 점검 리포트가 완료 작업을 여전히 미완료로 안내

`portfolio-blog-audit-report.md`는 목록 첫 글로 공개되며, 수정이 끝난 항목을 여전히 부족하다고 설명하고 마지막 체크박스도 모두 미완료다. 요약은 19편 기준인 반면 현재 전체 글은 24개다. 당시 진단 기록임을 표시하고 현재 반영 상태를 별도로 적거나, 내부 참고 문서로 옮기는 편이 명확하다.

면접 정리 3편도 목록 상단에 공개되어 있다. hidden 지원은 없으며 제목도 아직 ‘면접 정리’다. 이는 기존 리포트의 선택 항목이 아직 결정되지 않은 상태이지 기능 오류는 아니다. 전세사기 면접 정리의 ‘projects.js의 6대 성과’는 현재 활성 성과 3개와 다르므로 과거 전체 경험의 정리라는 설명이 필요하다. 주석 처리한 성과를 자동으로 복원하지 않는다.

### 6. 보안 글에서 탐지 해소와 안전성 보장의 경계 보완

- `cwe-79-xss-remediation.md`: rawHtml 전용 태그는 출력 지점을 모으지만 자체적으로 HTML을 무해화하지 않는다. 사용자 에디터 HTML의 서버 측 허용 태그·속성·URL 프로토콜 정책과 검증 방법이 필요하다. 실제로 추가 구현한 사실이 없으면 남은 한계로 기록한다.
- `cwe-209-error-message-exposure.md`: throwable을 로거에 넘겨도 예외 메시지는 스택트레이스에 포함된다. 문자열 연결을 제거하는 것만으로 민감정보가 로그에서 사라지지는 않는다. 사용자 응답 노출 차단과 서버 로그의 접근통제·민감값 제거를 구분해야 한다. 도입부의 ‘가장 건수가 많았던 유형’도 XSS 200여 건과 맞지 않는다.
- `cwe-615-sensitive-comments.md`: Java 주석이 컴파일된 class에 그대로 포함되는 것은 아니다. Java/JSP/HTML 주석과 소스 포함 배포의 차이를 명시하면 요약의 일반화를 줄일 수 있다. 실제 비밀값 노출은 현재 라인 삭제 후에도 이력에 남으므로 해당되는 경우 자격 증명 교체가 별도 조치다.
- `cwe-754-exception-handling.md`: IOException 재던지기 예제가 cause를 버린다. 이전 글의 cause 보존 원칙과 맞추면 좋다.

공식 근거:
- https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
- https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html

### 7. POI 설명의 과도한 일반화

`sxssf-vs-xssf-excel-download.md`는 컬럼 추적이 flush한 모든 셀 정보를 유지해 스트리밍 이점을 상쇄한다고 설명한다. 공식 API는 추적 등록으로 flush 전후 행을 포함해 자동 너비 계산을 지원한다. 계산 비용과 모든 셀 보관을 구분해야 한다. 메모리 사용량도 행 윈도우 외 입력 dataList·스타일·공유 문자열·병합 영역 등의 영향을 받는다. close/dispose 동작은 사용한 POI 버전을 명시해야 한다. 빌링 면접 글의 ‘최근 몇백 행만으로 자동 너비 계산’ 설명과도 맞춰야 한다.

공식 근거: https://poi.apache.org/apidocs/dev/org/apache/poi/xssf/streaming/SXSSFSheet.html

## 기존 보완 리포트 반영 상태

| 항목 | 현재 확인 |
| --- | --- |
| Oracle 중복 문단 삭제 | 해당 원인 설명이 한 번만 나타남 |
| csql 대상 384만 건 보강 | CI 14만 + 이력 370만 및 분할 커밋 배경 추가 |
| Redis 10초→0.10초 보강 | 반영됨. 측정 범위 및 만료 정책은 추가 확인 필요 |
| 동기화 9개 테이블·97개 컬럼·SQLi 14건 | 반영됨. 테이블 누락·복구 경험도 보존 |
| Kafka 70건→5건 미만·인코딩 오류 95% 감소 | 반영됨. 중심키·메타데이터·대사 운영 맥락도 유지 |
| 기술 스택·블로그 주소 정리 | Thymeleaf 제거, CUBRID/eGovFrame 추가, 자체 /blog로 통일 |
| 컨벤션 표준화 글 분리 | backend-code-convention-standardization 신규 추가 및 연결 |
| AI 템플릿·암호화·Oracle/POI 성과 | 일부는 보완 후 의도적으로 주석 처리됨. 미반영으로 단정하지 않음 |
| parallelStream 적용 범위 정밀화 | ‘소스 전역’ 표현 남음 |
| 면접 글 숨김/제목 변경 | 미적용, 공개 유지 |
| 리포트 자체 완료 상태 갱신 | 미적용 |

## 글별 검토 색인

| 파일 | 검토 메모 |
| --- | --- |
| backend-code-convention-standardization | 신규 표준화 경험 글. 팀원 배경·직급 설명의 반복을 줄이고 본인 행동과 합의 과정을 중심으로 압축하면 좋음. 예제 Request DTO의 쿼리 파라미터 바인딩 방식도 명시 필요 |
| csql-nohup-mass-patch | 규모 보강 완료. 재실행 조건 예제 보완 우선 |
| cubrid-query-plan-index-tuning | 결과와 홈 KPI 일치. 인덱스에 apply_nm이 없어 전체 SELECT를 커버하지 않음. 낮은 선택도 선두 배제를 보편 규칙으로 단정하지 않도록 정밀화 |
| cwe-209-error-message-exposure | 서버 로그 노출 경계 및 도입부 건수 표현 보완 |
| cwe-330-489-dead-code-removal | 미사용 근거 확인·삭제 맥락 유지 |
| cwe-404-496-resource-handling | 자원 해제·배열 복사 맥락 유지. clone은 원소 객체까지 복제하는 깊은 복사가 아님 |
| cwe-476-null-dereference | 공통 원인 수정 경험 유지. null 계약 변경과 모든 런타임 호출자 검증은 구분 |
| cwe-615-sensitive-comments | 주석 유형·배포 형태 차이 보완 |
| cwe-676-dangerous-api | 호출부 전수조사·조치불가 판단 유지. window[callback]은 임의 코드 문자열 실행을 없애지만 호출 가능한 함수의 허용 목록과는 다름 |
| cwe-754-exception-handling | 예외 cause 보존 예제 보완 |
| cwe-79-xss-remediation | raw 통로 통제와 sanitization 구분 필요 |
| dynamic-to-static-sync-query | 보완 수치·누락 사고 유지. statement 누락과 요청 자체 누락의 인과를 조금 더 명확히 설명하면 좋음 |
| how-to-write-posts | 기본 형식 유효. 신규 category 및 검색·카테고리 동작 안내 추가 여지 |
| interview-cloudxper-billing | 신규 성능 수치·컨벤션 글 연결. 성과 수치 근거 및 Redis 설명 점검 필요 |
| interview-jeonse-support-system | 현재 공개 성과와 과거 전체 경험 정리의 범위 구분 필요 |
| interview-lgu-billing-gw | Oracle/POI 경험 요약 유지. POI 설명은 원문과 함께 수정 필요 |
| jsch-to-mina-sshd | 4시간 주기 이력 조회를 ‘실시간’이라고 부르는 표현 조정. 라이브러리가 모든 SSH 정책과 협상된다는 보장도 실제 확인 서버 범위로 한정 |
| kafka-gw-data-integrity | 수치 및 오류 유형 보강. 운영 대사·키 매핑 맥락 유지 |
| mybatis-builder-parallel-refactoring | 병렬화와 집합 조회 제안 구분 유지. 기존 75초→현재 30초 변경 근거 확인 |
| oracle-hint-subquery-fullscan | 중복 제거·DBA 보고서 학습 맥락 유지. 힌트가 실행계획을 반드시 고정한다는 표현은 보장 범위를 줄이면 좋음 |
| portfolio-blog-audit-report | 보완 완료 표시와 공개 용도 정리 우선 |
| portfolio-refactoring | 8월 당시 기록으로 유효. 11월 원페이지 통합 후 구조라는 업데이트 안내 추가 여지 |
| redis-permission-cache-ttl | TTL 시작 시점·권한 변경 정책·사용자별 다중 키 삭제 설명 필요 |
| sxssf-vs-xssf-excel-download | 컬럼 추적·메모리·버전별 자원 정리 설명 보완 |

## 사이트 유지보수 관점

- README는 이전 개별 프로젝트·교육·아키텍처 페이지와 삭제 전 파일 위치를 설명한다. BLOG_REFERENCE도 19개 기준이므로 현재 구조/24개 목록과 구분해야 한다.
- `index.html`의 description/OG/Twitter는 모든 블로그 URL에서도 포트폴리오 값이다. React에서 document.title만 바꿔도 링크 공유 메타데이터가 글별로 생성되지는 않는다. 글별 검색·공유가 중요하면 정적 HTML 생성 검토가 필요하다.
- ArchitectureModal은 초기 포커스와 Escape/복귀는 처리하지만 Tab 포커스 가두기와 배경 inert 처리는 없다. 모달 외부로 키보드 포커스가 이동할 수 있다.
- `useScrollSpy`는 React Router 외부에서 history.replaceState를 호출한다. 라우터 location과 실제 URL이 달라질 수 있어 같은 경로 내 Link 이동·앵커 복귀 동작을 추가 확인할 필요가 있다.
- `decodeURIComponent`에 잘못된 퍼센트 해시가 오면 예외가 발생할 수 있으므로 방어 파싱 여지가 있다.
- 이력서는 프로젝트 배열을 앞 2개/나머지로 나눈다. 회사 단위 그룹 구조를 홈과 동일하게 렌더링하는 방식은 아니다. 현재 인쇄가 정확히 2장인지는 인쇄 미리보기 확인이 필요하다.
- eager Markdown 로딩으로 모든 글 본문과 아키텍처 코드가 첫 JS에 포함된다. 빌드는 성공하지만 500 kB 초과 경고가 있으므로 글 증가 시 화면별 코드 분리를 고려할 수 있다.

## 다음 작업 원칙

이번 요청은 검토다. 미래 자격·성능 수치·실제 운영 정책은 사용자 확인 없이 고치지 않는다. 공개 콘텐츠의 사실은 보존하면서, 확인된 예제 결함과 설명의 과도한 일반화를 우선 보완하는 것이 좋다. 후속 작업 때는 해당 원문과 최신 git 상태를 다시 확인한다.
