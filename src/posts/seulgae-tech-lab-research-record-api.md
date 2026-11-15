---
title: 연구 기록 저장·조회 API 만들기 — 실행 권한과 쓰기 경로를 분리하다
date: 2026-11-15
createdAt: 2026-11-15T15:26:44+09:00
tags: Spring Boot, Java, PostgreSQL, REST API, Validation
summary: JdbcClient 기반 연구 기록 저장·목록·상세 API를 만들고, 입력 검증과 기본 쓰기 비활성 구성을 개발 DB에서 확인한 기록.
category: seulgae-tech-lab
---

Flyway V1을 개발 DB에 적용한 뒤, 게임 패널에서 사용할 연구 기록 API를 구현했다. 현재 인증 기능은 없으므로 **조회 API와 개발 전용 저장 API를 구분하는 것**을 먼저 정했다.

## API의 범위를 작게 정했다

| 요청 | 동작 |
| --- | --- |
| GET /api/research-records | 요약 목록과 다음 페이지 존재 여부 |
| GET /api/research-records/{id} | 본문을 포함한 상세 기록 |
| POST /api/research-records | 쓰기 기능을 명시적으로 켠 개발 환경에서만 생성 |

수정·삭제·사용자별 권한·검색은 이번에 넣지 않았다. 목록은 기본 20개, 최대 50개이며 offset은 0부터 10,000까지만 받는다. 목록에는 본문을 포함하지 않아 목록을 열 때 긴 내용을 전부 전송하지 않는다.

## 기존 JDBC 구성으로 구현했다

이미 JDBC 연결 풀이 있으므로 ORM을 새로 도입하지 않고 Spring의 `JdbcClient`를 사용했다. 다음은 `ResearchRepository.java`에서 발췌한 목록 쿼리다.

```sql
SELECT id, title, summary, created_at FROM lab.research_records
ORDER BY created_at DESC, id DESC LIMIT :limit OFFSET :offset
```

limit와 offset은 문자열로 SQL에 붙이지 않고 바인딩한다. 요청 개수보다 하나 더 조회하고 초과분을 응답에서 제외해 `hasMore`를 계산한다. 전체 건수 계산은 이번 화면에 필요하지 않아 추가하지 않았다. offset 페이지 방식은 기록이 중간에 추가되면 페이지 경계가 바뀔 수 있다는 한계가 있으며, 대량 데이터용 커서 페이지 구현은 아니다.

상세 조회에는 UUID를 사용한다. 존재하지 않는 ID는 404, UUID 형식 오류는 400으로 처리한다. 생성은 앱에서 UUID를 만들고 DB에서 생성 시각을 부여한 뒤 `INSERT ... RETURNING`으로 결과를 돌려준다. 성공 응답은 201과 상세 경로를 담은 Location 헤더이다.

## 입력 검증과 장애 응답을 구분했다

`CreateResearchRequest.java`의 실제 코드다.

```java
public record CreateResearchRequest(
    @NotBlank @Size(max = 120) String title,
    @NotBlank @Size(max = 500) String summary,
    @NotBlank @Size(max = 20000) String content
) {}
```

공백 입력과 과도하게 긴 입력을 HTTP 계층에서 제한하고, DB에도 길이·공백 제약을 뒀다. Java 문자열의 길이 계산과 PostgreSQL 문자 길이는 일부 유니코드에서 다를 수 있어 모든 문자 집합에 대해 동일한 길이 의미를 보장한다고 주장하지 않았다.

`ApiExceptionHandler.java`는 DB 접근 예외를 고정된 503 Problem Detail로 바꾼다. SQL이나 DB 오류 원문을 화면에 전달하지 않는다. 실제 DB 장애를 유발해 503을 검증한 것은 아니며, 이 부분은 코드로 확인한 처리 경로이다.

## 인증이 없는 저장 경로는 기본으로 열지 않았다

다음은 `ResearchWriteController.java`의 조건이다.

```java
@ConditionalOnProperty(name = "lab.research.write-enabled", havingValue = "true")
```

조건이 없으면 저장 컨트롤러 자체가 등록되지 않는다. `deploy/dev-env.ps1`은 개발용 루프백 실행을 위한 쓰기 활성화도 함께 설정한다. 공개 서비스에서는 이 설정을 켜지 않으며, 현재 Compose에도 추가하지 않았다. 이 조건은 인증이나 권한 관리의 대체물이 아니다.

## 실제 실행과 시행착오

처음 Maven verify를 실행했을 때, 앞 챕터에서 실행한 JAR가 Windows에서 잠겨 repackage의 파일 이름 변경이 실패했다. 내가 시작해 둔 로컬 백엔드 프로세스인지 확인한 후 그것만 종료하고 다시 빌드했다. 서버의 운영 컨테이너를 재시작한 것은 아니다.

```bash
mvn -B -f backend/pom.xml verify
```

재실행은 BUILD SUCCESS였다. `CreateResearchRequestTest` 한 개에서 정상 입력, 공백 세 필드, 길이 초과 세 필드를 검증했다. 실패·오류·건너뛴 테스트는 없었다. 이 단위 테스트는 HTTP나 실제 DB를 포함하지 않는다.

이후 Java 21로 앱을 실행하고 PowerShell HTTP 요청으로 개발 DB에 연결해 검사했다.

| 항목 | 실제 결과 |
| --- | --- |
| 초기 목록 | 빈 목록 |
| 정상 저장 | 201 |
| 상세 조회 | 저장한 내용과 일치 |
| 목록 조회 | 생성한 ID 확인 |
| 존재하지 않는 UUID | 404 |
| 잘못된 UUID | 400 |
| limit 0, limit 51 | 각각 400 |
| 공백 필드 저장 | 400 |
| 쓰기 활성화 설정을 제거한 별도 로컬 앱 | POST 405 |

별도 앱은 같은 개발 DB를 사용하되 쓰기 옵션 없이 실행했고, 확인 후 내가 시작한 해당 로컬 프로세스만 종료했다. 운영 앱에서 요청한 결과가 아니다. HTTP 검사 중 만든 데이터는 개발환경 검증용임을 명시했으며 다음 React 연동 검증에도 사용한다.

## 변경 파일과 다음 연결

`ResearchRecord.java`는 상세 응답, `CreateResearchRequest.java`는 생성 입력을 정의한다. `ResearchRepository.java`는 SQL을, `ResearchController.java`는 조회를, `ResearchWriteController.java`는 조건부 생성을 맡는다. `ApiExceptionHandler.java`와 `CreateResearchRequestTest.java`를 추가했고 `backend/pom.xml`에는 Validation과 테스트 의존성을 넣었다.

이 글은 API 챕터 당시의 실제 실행 기록이다. 글 작성 중 테스트를 다시 실행하지 않았다. 운영 DB에 스키마를 적용하거나 신규 API를 서버에 배포한 상태는 아니다. 다음에는 React의 임시 기록을 목록·상세 API로 교체하고, 로딩·빈 결과·실패·재시도와 패널 종료 시 요청 취소를 연결한다.
