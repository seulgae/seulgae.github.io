# 기존 블로그 글 목록

2026-11-04 로컬 검토 기준 25개. 메타데이터 색인이며 실제 경험의 검증 자료가 아니다. 작업할 때 관련 본문과 감사 보고서를 다시 읽는다.

CloudXper 병렬 조회 최종 수치는 저자가 2026-11-03 확인한 10분 → 30초 이내다. 과거 1분 15초 기록은 최신 확인값으로 대체한다.

## backend-code-convention-standardization

원문: [글 파일](src/posts/backend-code-convention-standardization.md)

- title: 4인 백엔드 팀의 제각각이던 selectList 코드 — 예제 코드와 PDF 가이드로 개발 기준 맞추기
- date: 2024-12-12
- tags: Java, Spring, MyBatis, Architecture
- summary: 4명이 서로 다른 방식으로 작성하던 조회 코드를 Request/Response DTO·Model·Builder 구조로 정리하고, 예제 코드와 PDF 가이드를 공유해 팀의 개발 기준을 맞춘 기록

## csql-nohup-mass-patch

원문: [글 파일](src/posts/csql-nohup-mass-patch.md)

- title: csql과 nohup — 운영 중인 DB에 수백만 건 패치를 조용히 밀어 넣는 법
- date: 2026-07-08
- tags: DB, Linux, Security, Operations
- summary: 개인정보 컬럼 대량 암호화 패치를 서비스 중단 없이 처리한 기록 — nohup 백그라운드 실행, 분할 커밋, 로그 기반 모니터링까지 대량 DML 작업의 절차 정리

## cubrid-query-plan-index-tuning

원문: [글 파일](src/posts/cubrid-query-plan-index-tuning.md)

- title: 53초짜리 목록 조회 — CUBRID 쿼리 플랜의 빨간 구간을 지우는 인덱스 설계
- date: 2026-03-04
- tags: SQL, CUBRID, Performance
- summary: 7만 건 목록 조회가 53초 걸리던 운영 화면 — CUBRID 매니저의 쿼리 플랜에서 풀 스캔(sscan) 구간을 찾아 WHERE 조건과 ORDER BY까지 함께 타는 복합 인덱스로 재설계한 기록

## cwe-209-error-message-exposure

원문: [글 파일](src/posts/cwe-209-error-message-exposure.md)

- title: CWE-209 오류 메시지 정보노출 — 예외 로깅이 보안 결함이 되는 순간
- date: 2026-08-12
- tags: Security, Java, SAST
- summary: e.getMessage() 문자열 조립, printStackTrace 등 예외 정보가 새어 나가던 25여 건을 "고정 문구 + throwable 전달" 원칙으로 통일한 기록

## cwe-330-489-dead-code-removal

원문: [글 파일](src/posts/cwe-330-489-dead-code-removal.md)

- title: CWE-330·489·497 — 결함의 절반은 쓰지 않는 코드에 있었다
- date: 2026-08-12
- tags: Security, Java, SAST
- summary: 부적절한 난수, 디버그 코드, 시스템 정보 노출 검출을 추적해 보니 대부분 미사용 벤더 모듈과 테스트 화면 — 진입점 역추적 후 삭제로 종결한 기록

## cwe-404-496-resource-handling

원문: [글 파일](src/posts/cwe-404-496-resource-handling.md)

- title: CWE-404·496 — 자원 해제와 방어적 복사, 객체를 안전하게 다루는 두 가지
- date: 2026-08-12
- tags: Security, Java, SAST
- summary: 수동 close를 try-with-resources로 전환하고(CWE-404), setter의 배열 참조 저장을 방어적 복사로 바꾼(CWE-496) 조치 기록

## cwe-476-null-dereference

원문: [글 파일](src/posts/cwe-476-null-dereference.md)

- title: CWE-476 Null Pointer 역참조 — 검출 15건을 한 곳에서 잡은 이야기
- date: 2026-08-12
- tags: Security, Java, SAST
- summary: NPE 검출 20여 건을 라인 단위가 아니라 근원 단위로 추적해, 공통 유틸 한 곳 수정으로 15건을 일괄 해소한 기록

## cwe-615-sensitive-comments

원문: [글 파일](src/posts/cwe-615-sensitive-comments.md)

- title: CWE-615 주석 속 민감정보 — 주석 처리했다고 사라지는 게 아니다
- date: 2026-08-12
- tags: Security, Java, SAST
- summary: 주석에 남은 인증 관련 정보 제거 기록 — 소스·형상관리와 HTML/JS 산출물의 노출 경로를 구분하고, 이력에 남은 비밀정보는 별도 조치해야 한다

## cwe-676-dangerous-api

원문: [글 파일](src/posts/cwe-676-dangerous-api.md)

- title: CWE-676 위험한 API 사용 — eval을 지우기 전에 해야 하는 일
- date: 2026-08-12
- tags: Security, JavaScript, Java, SAST
- summary: 레거시 JS의 eval 호출부를 조사해 문자열 평가를 제거하고 deprecated API를 정리한 기록 — 동적 콜백 허용 범위는 추가 확인 과제로 구분

## cwe-754-exception-handling

원문: [글 파일](src/posts/cwe-754-exception-handling.md)

- title: CWE-754 부적절한 예외 처리 — catch(Exception)을 걷어내며
- date: 2026-08-12
- tags: Security, Java, SAST
- summary: 광범위한 catch, 무의미한 재던지기, 예외 삼키기, null 미검사 — 네 가지 안티패턴을 걷어낸 예외 처리 정비 기록

## cwe-79-xss-remediation

원문: [글 파일](src/posts/cwe-79-xss-remediation.md)

- title: CWE-79 크로스 사이트 스크립팅 — 레거시 JSP 200여 건 조치 기록
- date: 2026-08-12
- tags: Security, JSP, XSS, SAST
- summary: 코드레이 정적분석에서 검출된 CWE-79 결함 200여 건을 패턴별로 분류하고, 레거시 JSP 출력 구조를 개편해 조치한 과정 정리

## dynamic-to-static-sync-query

원문: [글 파일](src/posts/dynamic-to-static-sync-query.md)

- title: MyBatis를 JPA처럼 쓰던 연계 로직 — 범용 동적 쿼리를 정적 쿼리로 되돌리기
- date: 2026-06-17
- tags: Java, MyBatis, SQL, Security
- summary: 테이블명·컬럼명을 문자열 치환으로 조립하던 망간 데이터 동기화 로직을 테이블별 정적 쿼리로 재작성한 기록 — 그리고 대상 목록을 코드에서 뽑았다가 테이블 하나를 누락한 사고의 수습기

## how-to-write-posts

원문: [글 파일](src/posts/how-to-write-posts.md)

- title: 이 블로그에 글 쓰는 방법
- date: 2026-08-11
- tags: Guide
- summary: DB 없이 마크다운 파일로 운영되는 이 블로그의 글 작성·수정·배포 방법 정리

## interview-cloudxper-billing

원문: [글 파일](src/posts/interview-cloudxper-billing.md)

- title: 면접 정리 2 — CloudXper의 병렬 조회·권한 캐시·코드 표준화
- date: 2026-10-23
- tags: Interview, Retrospective, Spring, MyBatis, Redis, Performance
- summary: 실제 개선 경험과 기술 원리·후속 설계를 구분해 정리한 CloudXper 면접 자료 — 병렬 처리의 한계, 캐시 만료·무효화, DTO와 팀 표준화

## interview-jeonse-support-system

원문: [글 파일](src/posts/interview-jeonse-support-system.md)

- title: 면접 정리 1 — 전세사기 피해자 지원관리시스템의 보안·성능·운영 개선
- date: 2026-10-24
- tags: Interview, Retrospective, CUBRID, Security, Infra, Java
- summary: 정적 SQL 전환의 누락 사고, CUBRID 튜닝, 대량 패치와 SSH 수집을 실제 경험·기술 원리·확인 항목으로 나눈 면접 준비 자료

## interview-lgu-billing-gw

원문: [글 파일](src/posts/interview-lgu-billing-gw.md)

- title: 면접 정리 3 — 빌링 GW의 키 매핑·데이터 정합성·Oracle 튜닝
- date: 2026-10-22
- tags: Interview, Retrospective, Kafka, Oracle, POI, Spring
- summary: Kafka와 Redis의 역할, 메타데이터 연계, 대사·보정·재대사, Oracle 튜닝을 근거 중심으로 정리하고 POI 개발 경험과 학습 질문을 보완한 면접 자료

## jsch-to-mina-sshd

원문: [글 파일](src/posts/jsch-to-mina-sshd.md)

- title: JSch가 WEB 서버 앞에서 멈춘 날 — Apache MINA SSHD로 서버 용량 모니터링 만들기
- date: 2026-01-05
- tags: Java, SSH, Infra, Spring
- summary: 월말마다 수기로 정리하던 서버 메모리·디스크 현황을 SSH 기반 주기 수집 화면으로 자동화한 과정 — JSch의 암호화 협상 실패, MINA SSHD 교체, 그리고 함수 하나하나의 선택 이유

## kafka-gw-data-integrity

원문: [글 파일](src/posts/kafka-gw-data-integrity.md)

- title: 쪼개진 원천 테이블과 달라진 PK 사이 — Kafka 서비스 도메인 GW에서 데이터 정합성 지키기
- date: 2025-02-10
- tags: Kafka, Java, Spring, Operations
- summary: 차세대 전환으로 원천 테이블이 쪼개지고 PK 체계가 바뀌면서 pub/sub 데이터가 어긋나기 시작했다 — 중간에서 형상을 맞춰주는 GW의 구조, 이벤트 토픽 등록 절차, 업무키 매핑, 그리고 엑셀로 DML을 만들어 불일치를 보정하던 운영 기록

## mybatis-builder-parallel-refactoring

원문: [글 파일](src/posts/mybatis-builder-parallel-refactoring.md)

- title: 10분짜리 API를 30초 이내로 — 100만 건 대용량 조회 성능 개선과 병렬 스트림
- date: 2024-11-27
- tags: Java, Spring, MyBatis, Performance
- summary: 1만 건에서는 드러나지 않던 청구·가입 목록 조회의 MyBatis selectList 반복 호출 지연이 100만 건 테스트 데이터에서 10분짜리 API가 된 사건 — 병렬 스트림 처리로 응답 시간을 30초 이내로 단축한 과정과 그 해결의 한계까지 돌아본 기록

## oracle-hint-subquery-fullscan

원문: [글 파일](src/posts/oracle-hint-subquery-fullscan.md)

- title: 인덱스가 있는데 왜 안 타지 — 실행계획으로 좁혀간 슬로우 쿼리 튜닝기
- date: 2023-01-10
- tags: SQL, Oracle, Performance
- summary: 스칼라 서브쿼리가 행마다 TABLE ACCESS FULL을 반복하던 조회 쿼리 — Trusted Orange로 플랜을 열고, 묵시적 형변환이라는 원인을 찾고, 인덱스 접근과 쿼리 재작성으로 고쳐간 기록. 그리고 그 과정을 기존 소스와 DBA 보고서에서 배웠다는 이야기

## portfolio-blog-audit-report

원문: [글 파일](src/posts/portfolio-blog-audit-report.md)

- title: 포트폴리오·기술 블로그·면접 자료 정합성 검토 보고서
- date: 2026-10-25
- tags: Review, Retrospective, Portfolio, Interview
- summary: 2026-11-03 기준 경력 프로젝트 3개·블로그 24편·활성 도식 5개를 재검토한 결과 — 완료 항목, 수정한 기술 설명, 구현 근거 확인 과제를 구분한 현행 보고서

## portfolio-refactoring

원문: [글 파일](src/posts/portfolio-refactoring.md)

- title: 포트폴리오 사이트 구조 리팩터링 기록
- date: 2026-08-11
- tags: React, Refactoring
- summary: 콘텐츠와 화면을 분리하고, 페이지 파일 복제를 단일 라우트로 통합한 과정 정리

## redis-permission-cache-ttl

원문: [글 파일](src/posts/redis-permission-cache-ttl.md)

- title: 화면마다 권한을 DB에 묻던 시스템 — Redis 캐시의 TTL과 무효화 정책
- date: 2025-01-07
- tags: Java, Spring, Redis, Performance
- summary: 반복되는 권한 조회를 Redis 캐시로 바꾼 기록 — 고정 TTL과 세션 만료 시각의 차이, 로그아웃·권한 변경 시 무효화의 역할과 남은 검증 과제

## sxssf-vs-xssf-excel-download

원문: [글 파일](src/posts/sxssf-vs-xssf-excel-download.md)

- title: XSSFWorkbook vs SXSSFWorkbook — 수작업 엑셀 업무를 기능으로 만들며 정리한 선택 기준
- date: 2025-11-20
- tags: Java, POI, Excel, Performance
- summary: 운영자가 매번 DB를 조회해 손으로 만들던 추출 대장·통계 엑셀을 다운로드 기능으로 구현한 기록 — 건수에 따라 XSSF와 SXSSF를 가르는 기준과 스트리밍 방식의 함정들

## portfolio-content-consistency-review

원문: [글 파일](src/posts/portfolio-content-consistency-review.md)

- title: 포트폴리오를 다시 읽으며 — 소개·핵심 역량·프로젝트·블로그 사이의 설명 맞추기
- date: 2026-11-04
- tags: Portfolio, Review, Retrospective, Career
- summary: 소개·역량·프로젝트·이력서의 표현 차이를 점검하고 권한 캐시·조회 성과·자격 날짜·공유 설명을 보완했다. 도메인 API·청구 산정 SQL 구현 범위와 남은 확인 과제를 정리한 기록
