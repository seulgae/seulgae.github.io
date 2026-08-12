---
title: XSSFWorkbook vs SXSSFWorkbook — 수작업 엑셀 업무를 기능으로 만들며 정리한 선택 기준
date: 2025-11-20
tags: Java, POI, Excel, Performance
summary: 운영자가 매번 DB를 조회해 손으로 만들던 추출 대장·통계 엑셀을 다운로드 기능으로 구현한 기록 — 건수에 따라 XSSF와 SXSSF를 가르는 기준과 스트리밍 방식의 함정들
---

운영 업무 중에 정기적으로 반복되는 일이 있었다. 담당자가 DB를 직접 조회해서
결과를 복사하고, 엑셀에 붙여 넣고, 서식을 정리해서 보고용 대장과 주간 통계를
만드는 것. 조회 조건이 매번 비슷하고 산출물 양식이 정해져 있는데도 사람 손을
거치니 시간이 들고, 복사 과정에서 실수도 났다. 이걸 **관리자 화면에서 조회
조건을 걸고 버튼 한 번으로 내려받는 엑셀 다운로드 기능**으로 만들었다.

구현 자체는 Apache POI로 하는 흔한 작업이다. 흔하지 않았던 건 데이터
규모였다 — 추출 대상이 **수만~수십만 행**이라, POI의 두 클래스
`XSSFWorkbook`과 `SXSSFWorkbook` 중 무엇을 쓰느냐가 기능의 생사를 갈랐다.

## XSSF vs SXSSF — 차이의 본질은 "어디에 들고 있느냐"

둘 다 .xlsx를 만든다. 차이는 **작성 중인 워크북을 어디에 유지하느냐**다.

| | XSSFWorkbook | SXSSFWorkbook |
|---|---|---|
| 데이터 위치 | 전체를 **힙 메모리**(DOM)에 유지 | 최근 N행만 메모리, 나머지는 **디스크 임시파일**로 flush |
| 메모리 사용 | 행 수에 비례해 증가 | window 크기만큼 **일정** |
| 이미 쓴 행 접근 | 자유 (수정, 재조회 가능) | flush된 행은 **접근 불가** |
| autoSizeColumn | 자유 | 기본 불가 (컬럼 추적을 켜야 하고, 켜면 스트리밍 이점 상쇄) |
| 뒷정리 | close()만 | **dispose() 필수** (임시파일 삭제) |
| 적합 규모 | 수천~1만 행 내외 | 수만 행 이상 |

XSSF는 셀 하나가 객체 하나다. 30개 컬럼 × 10만 행이면 셀 객체만 300만 개가
힙에 쌓인다. 스타일·문자열 캐시까지 더하면 수십만 행에서 힙이 수 GB로 치솟고,
운영 WAS처럼 힙이 제한된 환경에서는 **다운로드 버튼 하나가 OOM으로 서버를
쓰러뜨릴 수 있다.**

SXSSF는 생성자에 준 window 크기만큼의 행만 메모리에 유지하고, 그보다 오래된
행은 디스크 임시파일에 순차 기록한다. 100만 행을 써도 메모리 사용량은
window만큼으로 일정하다. 대신 "이미 흘려보낸 행"으로는 돌아갈 수 없다 —
스트리밍이라는 이름 그대로다.

## 건수별 선택 기준

이 시스템에서는 다운로드를 두 종류로 이원화했다.

- **일반 다운로드 (수백~수천 건)** — `XSSFWorkbook`. 목록 화면의 검색 결과
  내려받기 수준이면 메모리 부담이 없고, `autoSizeColumn` 같은 편의 기능을
  자유롭게 쓸 수 있어 산출물 품질을 챙기기 좋다.
- **대용량 추출 (수만 건 이상)** — `SXSSFWorkbook`. 전 건 추출 대장처럼
  행 수 상한을 예측할 수 없는 기능은 처음부터 스트리밍으로 갔다.

기준을 한 줄로 줄이면 이렇다. **"최대 몇 행까지 커질 수 있는가"를 예측할 수
없다면 SXSSF다.** XSSF의 한계는 평균이 아니라 최악의 케이스에서 터지고,
운영 데이터는 언제나 예상보다 많아진다.

## 구현 — 스트리밍을 무력화하는 함정들

대용량 쪽 코드의 뼈대는 이렇다.

```java
// window 크기만큼만 메모리에 유지, 초과분은 디스크로
SXSSFWorkbook workbook = new SXSSFWorkbook(1000);

try {
    SXSSFSheet sheet = workbook.createSheet(sheetName);

    // (1) 스타일은 루프 밖에서 1회만 생성
    CellStyle headerStyle = defaultCellStyle(workbook.createCellStyle(), true);
    CellStyle bodyStyle   = defaultCellStyle(workbook.createCellStyle(), false);

    // 헤더
    Row headerRow = sheet.createRow(rowNo++);
    for (int i = 0; i < headerFields.length; i++) {
        Cell cell = headerRow.createCell(i, CellType.STRING);
        cell.setCellValue(headerFields[i]);
        cell.setCellStyle(headerStyle);
    }

    // (2) autoSizeColumn 대신 고정 컬럼 너비
    for (int i = 0; i < headerFields.length; i++) {
        sheet.setColumnWidth(i, FIXED_COLUMN_WIDTH);
    }

    // 데이터 바인딩 — 행을 만들며 지나가면 window 밖 행은 디스크로 flush
    for (Map<String, String> rowData : dataList) {
        Row row = sheet.createRow(rowNo++);
        ...
    }

    workbook.write(response.getOutputStream());
} finally {
    workbook.dispose();   // (3) 디스크 임시파일 삭제 — 잊으면 서버에 쌓인다
    workbook.close();
}
```

번호를 단 세 곳이 이번 구현에서 배운 함정들이다.

**(1) CellStyle을 루프 안에서 만들면 안 된다.** 스타일은 셀이 아니라 워크북
소속이고, 워크북당 개수 제한(6만여 개)이 있다. 행마다 `createCellStyle()`을
호출하는 코드는 소량에서는 멀쩡하다가 대량에서 스타일 한도 초과로 깨진다.
헤더용/본문용 스타일을 **루프 밖에서 한 번만 만들어 재사용**했다.

**(2) autoSizeColumn은 스트리밍의 적이다.** 컬럼 폭 자동 조절은 "그 컬럼의
모든 셀"을 봐야 하는 연산이다. SXSSF에서 쓰려면 전 컬럼 추적
(`trackAllColumnsForAutoSizing`)을 켜야 하는데, 그러면 flush한 행의 정보를
계속 들고 있어야 해서 **스트리밍으로 아낀 메모리를 도로 쓰는 꼴**이 된다.
대용량 쪽은 자동 조절을 포기하고 고정 너비로 갔다 — 산출물 양식이 정해져
있어서 가능한 트레이드오프였다.

**(3) dispose()는 close()와 다르다.** SXSSF가 흘려보낸 행들은 서버 디스크의
임시파일에 있다. `close()`는 스트림을 닫을 뿐 이 파일을 지우지 않는다.
`dispose()`를 finally에서 호출하지 않으면 다운로드가 실행될 때마다
임시파일이 쌓여, 언젠가 디스크가 가득 찬다. 조용히 진행되는 종류의 장애라
코드 리뷰에서 반드시 잡아야 하는 지점이다.

## 검증 — 힙 로그로 눈으로 확인하기

"메모리가 일정하다"를 믿음이 아니라 측정으로 확인하고 싶어서, 개발 단계에
1,000행 처리마다 힙 사용량을 찍는 로깅을 넣고 대량 데이터로 돌려봤다.

```java
private void logHeap(String label) {
    Runtime rt = Runtime.getRuntime();
    long used = (rt.totalMemory() - rt.freeMemory()) / 1024 / 1024;
    logger.info("[HEAP] {} | used={}MB, max={}MB", label, used, rt.maxMemory() / 1024 / 1024);
}
```

XSSF로 대량을 쓰면 행 수에 비례해 used가 우상향하는 그래프가 나오고, SXSSF는
window 크기 수준에서 톱니 모양으로 일정하게 유지된다. 이 로그 덕에 "수십만
건이 와도 힙은 평평하다"를 확인하고 기능을 열 수 있었다.

## 결과

- 담당자가 DB 조회 → 복사 → 엑셀 서식 정리로 처리하던 정기 산출물(추출 대장
  2종, 주간 통계)이 **화면에서 조건 선택 후 버튼 한 번**으로 바뀌었다.
  건당 수십 분씩 걸리고 실수 여지가 있던 작업이 다운로드 대기 시간으로
  줄었다.
- 산출물 양식이 코드로 고정되면서 "만드는 사람에 따라 달라지는 엑셀"이
  사라졌다 — 자동화는 시간만이 아니라 일관성도 산출물이다.

## 배운 점

- **라이브러리의 클래스 선택이 곧 용량 설계다.** XSSF/SXSSF는 기능이 아니라
  메모리 모델이 다른 클래스다. "몇 건까지 감당해야 하는 기능인가"라는 질문
  없이 예제 코드를 복사하면, 소량 테스트를 통과하고 운영에서 터진다.
- **스트리밍의 대가는 되돌아갈 수 없다는 것.** autoSizeColumn 포기, flush된
  행 접근 불가, dispose 책임 — 메모리를 아끼는 방식에는 항상 교환 조건이
  있고, 그걸 알고 선택하는 것과 모르고 겪는 것은 다르다.
- **성능 주장은 로그로 증명한다.** 힙 로깅 몇 줄이 "아마 괜찮을 것"을
  "측정해서 평평한 것"으로 바꿔줬다. 대용량 기능은 열기 전에 최악 케이스를
  눈으로 봐야 한다.
