---
title: JDBC에서 MyBatis까지 — SQL은 어떻게 실행되는가
date: 2026-11-22
createdAt: 2026-11-22T13:09:56+09:00
tags: JDBC, MyBatis, SQL, Interview, 데이터 접근
summary: 연결·문장·결과 처리와 Mapper 실행을 연결하고 파라미터 바인딩·세션·트랜잭션 경계를 복습한다.
category: spring-mybatis
---

# JDBC에서 MyBatis까지 — SQL은 어떻게 실행되는가

## 1. 학습 배경

SQL 조회·적재와 MyBatis 관련 기존 기록을 이해할 기반을 정리한다. 구체적인 연결 풀·드라이버·캐시 설정은 프로젝트마다 다르므로 과거 업무의 설정으로 단정하지 않는다.

## 2. 핵심 개념

JDBC는 Java가 DB와 상호작용하는 API이고 DB별 드라이버가 프로토콜 처리를 구현한다. MyBatis는 개발자가 작성한 SQL과 Java 메서드·결과 객체를 연결하는 SQL 매핑 도구다. SQL을 숨기는 것이 아니라 반복적인 파라미터 설정과 결과 매핑을 줄이는 데 목적이 있다.

## 3. 동작 원리

```text
Mapper 메서드 → statement 식별·동적 SQL 구성
  → 파라미터 바인딩 → JDBC 실행 → 결과 매핑 → 반환
```

JDBC의 기본 자원은 Connection, Statement 계열, ResultSet이다. DataSource로 연결을 얻고 PreparedStatement에 값을 설정해 실행한 뒤 결과를 읽고 자원을 정리한다. [JDBC 처리 안내](https://docs.oracle.com/javase/tutorial/jdbc/basics/processingsqlstatements.html)의 기본 흐름이다.

MyBatis의 `#{value}`는 PreparedStatement의 값 파라미터로 연결한다. `${value}`는 SQL 문자열에 직접 치환하므로 같은 보호를 제공하지 않는다. 테이블·열 이름 같은 SQL 식별자는 값 바인딩으로 대체할 수 없어, 필요하면 허용된 이름을 서버에서 선택해야 한다. [Mapper XML 문서](https://mybatis.org/mybatis-3/sqlmap-xml.html)에 동작 차이가 설명돼 있다.

## 4. 실무 활용

**학습용 Mapper 발췌:** 객체·테이블은 예시이며 실행하지 않았다.

```xml
<select id="findMessage" resultType="map">
  SELECT message_id, status
  FROM example_message
  WHERE message_id = #{messageId}
</select>
```

복잡한 JOIN·DB별 SQL·명시적인 실행계획 관리가 중요하면 MyBatis가 후보가 된다. SQL이 보인다는 이유만으로 성능이 자동 개선되는 것은 아니다. 로그의 실제 SQL·바인딩 값·실행 횟수·플랜을 함께 검사한다.

## 5. 주의사항 및 오개념

SqlSession은 작업 단위의 세션이며 일반적으로 여러 스레드가 직접 공유하면 안 된다. Spring 통합에서는 관리되는 세션·트랜잭션 방식을 따른다. MyBatis도 캐시가 있으므로 “캐시가 전혀 없다”는 설명은 피한다. 캐시 범위·설정과 DB 변경의 반영 조건을 확인한다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| JDBC와 MyBatis 관계는? 계층 이해 | “MyBatis가 SQL 매핑과 반복 코드를 줄여 주지만 실제 DB 통신은 JDBC·드라이버를 통해 진행돼요.” | 연결은 누가 관리하나? |
| #{}와 ${} 차이는? SQL 구조·값 | “#{}는 값 바인딩이고 ${}는 문자열 치환이에요. 정렬 열처럼 바인딩할 수 없는 부분은 허용 목록으로 골라야 해요.” | 숫자 입력이면 무조건 안전한가? |
| MyBatis가 자동 트랜잭션인가? 경계 | “어떤 세션과 트랜잭션 관리자를 쓰는지 봐야 해요. Mapper 호출 몇 개가 자동으로 한 원자적 업무가 되는 건 아니에요.” | 같은 Connection을 쓰는지 어떻게 확인하나? |

## 7. 핵심 요약

SQL 구성·바인딩·실행·매핑·자원 수명을 나눠 이해한다. [JPA와 MyBatis 비교](/blog/jpa-mybatis-selection-tradeoffs)는 이 경로를 이해한 뒤 읽는다.

## 8. 참고 자료

- [Oracle — Processing SQL Statements with JDBC](https://docs.oracle.com/javase/tutorial/jdbc/basics/processingsqlstatements.html): JDBC 기본 개념, JDK 8 튜토리얼.
- [MyBatis 3 — Mapper XML](https://mybatis.org/mybatis-3/sqlmap-xml.html)
- [MyBatis 3 — Java API](https://mybatis.org/mybatis-3/java-api.html)

---

[이전 복습](/blog/spring-aop-transactional-proxy) · [다음 복습](/blog/orm-jpa-hibernate-relationship)
