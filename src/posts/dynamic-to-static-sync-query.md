---
title: MyBatis를 JPA처럼 쓰던 연계 로직 — 범용 동적 쿼리를 정적 쿼리로 되돌리기
date: 2026-08-12
tags: Java, MyBatis, SQL, Security
summary: 테이블명·컬럼명을 문자열 치환으로 조립하던 망간 데이터 동기화 로직을 테이블별 정적 쿼리로 재작성한 기록 — SQL 삽입 사전 차단과 범용성의 트레이드오프
---

내부망과 외부망(인터넷망)에 각각 DB를 두고 게시물·첨부파일을 양방향으로
동기화하는 연계 로직이 있었다. 정적분석(코드레이)을 돌리기 **전에** 이 코드를
먼저 손봤는데, 결과적으로 스캐너에서 SQL 삽입 검출이 0건으로 나왔다.
사전 조치라 조치 목록에는 남지 않은, 그래서 따로 기록해 두고 싶은 작업이다.

## 원래 구조 — MyBatis로 만든 "만능 저장소"

처음 이 매퍼를 열었을 때 감탄과 걱정이 동시에 들었다. 어떤 테이블이든
동기화할 수 있는 **범용 SELECT와 범용 MERGE가 단 두 개의 statement**로
구현되어 있었다.

```xml
<!-- 어떤 테이블이든 조회 -->
<select id="selectSyncInfo" resultType="map">
    SELECT * FROM ${targetTable} WHERE ROW_ID = #{rowId}
</select>

<!-- 어떤 테이블이든 저장: 컬럼 목록을 Java에서 조립해서 전달 -->
<update id="updateSyncInfoReg">
    MERGE INTO ${targetTable} USING DUAL
    ON (ROW_ID = #{rowId})
    WHEN MATCHED THEN UPDATE SET
        <foreach collection="updateList" item="item" separator=",">
            ${item.columnName} = #{item.columnValue}
        </foreach>
    WHEN NOT MATCHED THEN INSERT (...동일한 foreach...)
</update>
```

Java 쪽에서 대상 테이블명과 컬럼 목록(메타데이터)을 만들어 넘기면, 매퍼가
그걸 문자열로 끼워 넣어 SQL을 완성한다. 새 테이블을 연계 대상에 추가할 때
**SQL을 한 줄도 안 써도 되는** 구조 — MyBatis를 사실상 JPA의 범용
리포지토리처럼 쓰고 있었던 셈이다. 설계자의 의도는 이해가 갔다. 연계 대상
테이블이 계속 늘어나는 시스템에서 반복 작업을 없애고 싶었을 것이다.

## 무엇이 위험했나

MyBatis에서 `#{}`는 PreparedStatement 바인딩 변수가 되지만, **`${}`는 단순
문자열 치환**이다. 위 구조에서 문자열로 치환되는 것은 세 가지 — 테이블명,
UPDATE 컬럼명들, INSERT 컬럼명들. 즉 **SQL의 뼈대 전체가 런타임에 문자열로
조립**되고 있었다.

- 당장은 테이블명·컬럼명이 내부 코드에서만 오지만, 이 DAO를 호출하는 경로가
  하나라도 외부 입력과 닿는 순간 그대로 SQL 삽입이 된다. "지금은 안전한
  ${}"는 리팩터링 한 번, 재사용 한 번에 무너지는 전제다.
- 실행될 SQL이 소스 어디에도 완성형으로 존재하지 않는다. 정적분석 도구도,
  코드 리뷰어도, 6개월 뒤의 나도 **이 코드가 실제로 무슨 SQL을 날리는지
  읽을 수 없다.**
- `SELECT *`와 동적 컬럼 목록은 스키마 변경에 조용히 휩쓸린다. 컬럼이
  추가되면 어느 날부터 의도치 않은 컬럼까지 동기화되고, 그걸 알아챌 지점이 없다.

## 개선 — 테이블을 아는 쿼리로 되돌리기

방향은 "범용 1개"를 버리고 **"테이블별 정적 statement"** 로 가는 것이었다.
연계 대상 테이블마다 select와 merge를 명시적으로 작성했다.

```xml
<!-- 테이블별 정적 statement: 전부 바인딩 변수, 컬럼 명시 -->
<select id="select_TB_BOARD_A" resultType="map">
    SELECT POST_ID, TITLE, CONTENT, ATTACH_ID, USE_YN, ROW_ID, ...
    FROM   TB_BOARD_A
    WHERE  ROW_ID = #{rowId}
</select>

<update id="merge_TB_BOARD_A">
    MERGE INTO TB_BOARD_A USING DUAL
    ON (ROW_ID = #{rowId})
    WHEN MATCHED THEN UPDATE SET TITLE = #{title}, CONTENT = #{content}, ...
    WHEN NOT MATCHED THEN INSERT (...) VALUES (#{postId}, #{title}, ...)
</update>
```

그리고 DAO는 테이블명으로 SQL을 조립하는 대신, **statement id를 선택**한다.

```java
// 테이블명은 이제 SQL 조각이 아니라 "실행할 statement의 이름"일 뿐이다
public EgovMap selectSyncInfo(SyncVO syncInfo) {
    return selectOne("SyncDAO.select_" + syncInfo.getTargetTable().toUpperCase(), syncInfo);
}
public int mergeSyncInfo(SyncVO syncInfo, EgovMap targetInfo) {
    return update("SyncDAO.merge_" + syncInfo.getTargetTable().toUpperCase(), targetInfo);
}
```

이 한 줄의 의미가 이번 개선의 핵심이다. 테이블명이 이상한 값이면 예전 구조에서는
**그 값이 SQL에 박혀 실행**됐지만, 지금은 **존재하지 않는 statement id라서
실행 자체가 거부**된다. 매퍼에 정의된 테이블만 동작하는, 사실상의 화이트리스트가
된 것이다. 인터페이스(Service, 스케줄러, 호출부)는 그대로 두고 DAO와 매퍼만
바꿨기 때문에 연계 흐름 전체를 재작성하지 않아도 됐다.

정리하면서 곁가지 버그도 하나 잡았다. 원본 조회 결과가 없을 때도 merge가
실행되어 **반대편 데이터가 전부 NULL로 덮일 수 있는** 경로가 있어서,
"원본이 있을 때만 merge, 없으면 skip + 로그" 가드를 넣었다.

## 잘한 점, 아쉬운 점

**잘한 점.**

- 스캐너가 돌기 전에 구조적 위험을 스스로 찾아 조치했다. 정적분석은 `${}`를
  잘 찍지만, "이 구조가 왜 만들어졌고 어떻게 바꿔야 호출부가 안 깨지는지"는
  사람이 판단해야 하는 영역이었다.
- SQL이 소스에 완성형으로 존재하게 됐다. 리뷰 가능하고, 스캔 가능하고,
  스키마가 바뀌면 매퍼 수정이 강제되므로 변경이 드러난다.
- 인터페이스를 유지한 채 내부만 교체해서 영향 범위를 DAO 계층으로 가뒀다.

**아쉬운 점.**

- **범용성의 편의는 잃었다.** 이제 연계 테이블을 추가하려면 select와 merge
  statement 두 개를 손으로 작성해야 한다. 원래 구조가 없애려던 반복 작업이
  되살아난 것이고, 이건 명백한 트레이드오프다.
- statement id를 문자열 연결로 찾는 방식은 여전히 **런타임에야 오류를 안다.**
  등록 안 된 테이블명이 오면 실행은 안 되지만, 컴파일 타임에 잡히는 것도
  아니다. enum으로 대상 테이블을 정의해 타입 수준에서 강제하는 것까지 갔어야
  했는데, 일정상 거기까지는 못 갔다.
- `SELECT *`를 명시 컬럼으로 바꾸는 과정은 순수 수작업이었다. 테이블마다
  컬럼 목록을 옮겨 적으며 오타 하나가 곧 동기화 누락이 되는 작업이라,
  양쪽 DB 실데이터로 왕복 동기화를 검증하는 데 시간이 많이 들었다.

## 배운 점

- **"어떤 테이블이든 되는 코드"는 "무슨 SQL이 나가는지 아무도 모르는 코드"의
  다른 이름이었다.** 추상화가 SQL 텍스트 자체를 숨기기 시작하면, 편의가
  보안·가시성 비용으로 전환된다. MyBatis를 쓰기로 한 프로젝트라면 SQL이
  보이는 것이 MyBatis의 존재 이유다.
- `${}`와 `#{}`의 차이는 문법이 아니라 본질이다 — 하나는 SQL을 만들고,
  하나는 값을 바인딩한다. "지금은 내부값이라 안전하다"는 코드의 현재만 보는
  판단이고, 구조는 미래의 호출자까지 책임져야 한다.
- 보안 조치에도 트레이드오프 명세가 필요하다. 이번 선택으로 무엇을 얻고
  무엇을 포기했는지(편의 ↔ 안전·가시성)를 기록해 둬야, 다음 사람이 "왜
  이렇게 번거롭게 해놨지"라며 범용 구조로 되돌리는 일을 막을 수 있다.
