---
title: 같은 한글인데 왜 길이 초과가 날까 — GW 메타데이터와 Java 바이트 길이 보정
date: 2026-11-11
tags: Kafka, Java, Oracle, MySQL, Encoding
summary: 발행 데이터가 응용 DB의 바이트 제한을 넘는 문제를 Java 문자열 보정 함수와 GW 메타데이터의 변환 규칙으로 대응한 경험
category: kafka-di
---

Kafka GW 연동을 운영하면서, 발행 화면에서는 정상적으로 입력된 문자열이 응용 파트의 DB에는 들어가지 않는 경우를 다뤘다. 키나 컬럼 매핑이 틀린 것이 아니라 **대상 컬럼이 허용하는 바이트 길이를 넘는 문제**였다.

[기존 GW 글](/blog/kafka-gw-data-integrity)에서는 원천 테이블 분할, PK·컬럼 매핑, 대사와 보정을 정리했다. 이 글에서는 그중 **문자열의 길이 기준이 다른 시스템 사이에서 데이터를 어떻게 맞췄는지**에 집중한다.

## 화면에서는 들어갔는데, 연동에서는 실패했다

발행 파트와 응용 파트는 서로 다른 데이터 형식과 저장 제약을 가지고 있었다. 원천에서 허용한 문자열이라고 해서 응용 DB에서도 그대로 받아 줄 수 있는 것은 아니었다. 한글이 포함된 값은 글자 수가 같더라도 인코딩에 따라 필요한 바이트 수가 달라졌다.

당시 사용한 MySQL의 저장 문자셋은 UTF-8이었다. 화면 쪽 인코딩이 MS949였을 가능성은 있지만, DB 저장 문자셋과 화면·전송 구간의 인코딩은 별개의 설정이다. 화면의 입력 길이 검증이 어떤 인코딩을 기준으로 했는지도 따로 봐야 한다. 따라서 화면이 MS949였다는 가능성만으로 길이 초과의 원인을 확정하지는 않는다.

이 글에서 다루는 실제 대응은 응용 컬럼에 맞춘 Java 길이 보정과 메타데이터 적용이다. 아래의 MS949·UTF-8 비교는 그 원리를 설명하는 예시이며, Oracle의 실제 문자셋이나 당시 화면 설정을 복원한 것은 아니다.

## 한글 2바이트와 3바이트는 모두 가능한 이야기다

MS949는 Java에서 지원하는 인코딩 이름이다. Java의 정식 문자셋 이름은 `x-windows-949`이고 `MS949`로도 지정할 수 있다. [Java 지원 인코딩 문서](https://docs.oracle.com/en/java/javase/11/intl/supported-encodings.html?locale=en-US)

다음은 완성형 한글 문자열 `가나다`를 각각 인코딩했을 때의 길이다.

| 인코딩 | `가` | `가나다` | 특징 |
| --- | --- | --- | --- |
| MS949 | 2바이트 | 6바이트 | 모든 유니코드 문자를 표현하지는 못함 |
| UTF-8 | 3바이트 | 9바이트 | 영문 ASCII는 1바이트, 일반적인 이모지는 4바이트 |
| UTF-16BE | 2바이트 | 6바이트 | BOM 없이 비교한 값이며, 보조 문자는 4바이트 |

예를 들어 대상 컬럼의 한도가 **8바이트**라면, `가나다`는 MS949에서는 들어가지만 UTF-8에서는 9바이트가 필요하다. 화면에서 세 글자로 보인다는 사실만으로 저장 가능 여부를 판단할 수 없는 이유다.

Oracle의 `AL32UTF8`은 UTF-8이고 `AL16UTF16`은 UTF-16이다. 일반 문자 컬럼과 국가 문자 컬럼은 사용하는 문자셋도 다를 수 있다. Oracle 12.2 이후 OUI·DBCA로 생성하는 DB의 기본 문자셋은 `AL32UTF8`이지만, 이것이 모든 기존 운영 DB의 설정을 뜻하지는 않는다. [Oracle 유니코드 지원 문서](https://docs.oracle.com/en/database/oracle/oracle-database/19/nlspg/supporting-multilingual-databases-with-unicode.html)

MySQL에서는 DB·컬럼·접속 구간의 문자셋을 구분해야 한다. 지원 문자셋에는 `euckr`, `utf8mb4` 등이 있고, 화면에서 본 MS949 설정을 그대로 MySQL 컬럼의 문자셋 이름으로 옮겨 적으면 부정확하다. [MySQL 지원 문자셋 문서](https://dev.mysql.com/doc/refman/8.0/en/charset-charsets.html)

## 개별 연동마다 자르지 않고, 메타데이터의 변환 규칙에 연결했다

내가 구현한 것은 **응용 파트가 받을 수 있는 길이에 맞춰 문자열을 보정하는 Java 함수 모듈**이었다. 이 함수를 중간 매핑 메타데이터의 변환 규칙에 연결해, 원천 값을 응용 컬럼에 맞추는 과정에서 적용했다.

시스템은 Redis에서 조회하는 컬럼 매핑과 메타 테이블의 변환 규칙을 연결하는 구조였다. 매핑을 `id → gw_id → entr_id`처럼 표현하면, **중간 매핑 항목인 `gw_id`에 Java로 만든 함수명을 등록**할 수 있었다. GW는 연동을 처리할 때 해당 매핑에 등록된 함수를 호출하고, 보정한 값을 응용 측 컬럼으로 전달했다.

여기서 `id`, `gw_id`, `entr_id`는 매핑 단계를 설명하기 위한 예시 이름이다. 실제 업무키를 잘랐다는 의미가 아니라, **컬럼별 매핑에 변환 함수를 연결하는 방식**을 나타낸다.

```text
발행 데이터 → Kafka → GW
                      ├─ Redis에서 컬럼 매핑 조회
                      └─ 메타 테이블의 등록 함수 확인
                                  ↓
             원천 id → 중간 gw_id → 응용 entr_id
                            │
                      등록된 Java 함수 호출
                      대상 바이트 길이에 맞게 보정
                            │
                            └─ 보정한 값을 응용 컬럼에 반영
```

핵심은 Kafka 메시지 자체를 바꾸는 것이 아니라, **응용 DB에 반영할 값을 만드는 단계에서 대상 컬럼의 제약을 맞추는 것**이다. 토픽별 업무 로직에 비슷한 문자열 처리를 흩어 놓는 대신, 메타데이터에서 호출할 수 있는 공통 변환 기능으로 묶었다.

이 처리는 단순한 문자셋 변환과도 구분해야 한다. 문자를 올바른 인코딩으로 바꾸어도 대상 컬럼의 길이를 넘을 수 있다. 반대로 길이만 맞추려고 바이트 배열을 중간에서 잘라 버리면 한글이 깨질 수 있다.

## 문자 경계를 지키면서 대상 바이트 수에 맞추기

다음 코드는 당시 소스가 아니라 **처리 원리를 설명하기 위해 재구성한 예제**다. UTF-8과 MS949를 대상으로, 표현할 수 없는 문자는 오류로 구분하고 완전한 문자 단위로 앞부분을 남긴다.

```java
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public final class ByteLengthExample {
    private static final Charset MS949 = Charset.forName("MS949");

    public static String fitToBytes(String value, int maxBytes,
                                    Charset targetCharset) {
        if (maxBytes < 0) {
            throw new IllegalArgumentException("음수 길이는 허용하지 않습니다.");
        }
        if (value == null) {
            return null;
        }
        if (!StandardCharsets.UTF_8.equals(targetCharset)
                && !MS949.equals(targetCharset)) {
            throw new IllegalArgumentException("예제는 UTF-8과 MS949만 지원합니다.");
        }

        // 물음표 등으로 조용히 치환하지 않도록 원문 전체를 먼저 검사한다.
        if (!targetCharset.newEncoder().canEncode(value)) {
            throw new IllegalArgumentException("대상 인코딩으로 표현할 수 없습니다.");
        }

        int usedBytes = 0;
        int end = 0;
        while (end < value.length()) {
            int codePoint = value.codePointAt(end);
            String character = new String(Character.toChars(codePoint));
            int size = character.getBytes(targetCharset).length;
            if (size > maxBytes - usedBytes) {
                break;
            }
            usedBytes += size;
            end += Character.charCount(codePoint);
        }
        return value.substring(0, end);
    }
}
```

`String.length()`는 인코딩 후의 바이트 수가 아니다. 위 예제는 한 문자씩 대상 인코딩의 길이를 합산하므로 UTF-8 한글의 일부 바이트만 남기거나 이모지의 서로게이트 쌍을 반으로 자르지 않는다. 단, 결합 문자나 여러 코드 포인트로 구성된 이모지 전체를 하나의 표시 단위로 보존하는 기능까지 구현한 것은 아니다.

`CharsetEncoder.canEncode()`는 해당 문자열을 대상 인코딩으로 표현할 수 있는지 검사한다. 이 예제에서는 잘라 낼 뒷부분까지 포함한 원문 전체가 표현 가능해야 한다. 따라서 MS949로 표현할 수 없는 이모지가 있으면 단순히 잘라서 숨기는 대신 오류로 구분한다. [Java CharsetEncoder 문서](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/charset/CharsetEncoder.html)

| 원문 | 대상 인코딩 | 한도 | 예제의 결과 |
| --- | --- | --- | --- |
| 가나다 | UTF-8 | 7바이트 | 가나 — 6바이트 |
| 가나다 | MS949 | 5바이트 | 가나 — 4바이트 |
| A가B | UTF-8 | 4바이트 | A가 — 4바이트 |
| A😀B | UTF-8 | 4바이트 | A — 1바이트 |
| A😀B | UTF-8 | 5바이트 | A😀 — 5바이트 |
| A😀B | MS949 | 10바이트 | 표현 불가능 문자 오류 |

이 코드는 동작 이해를 위한 구현이다. 문자마다 임시 문자열과 바이트 배열을 만들기 때문에 대량 처리에 적용할 때는 처리량을 확인하고 버퍼 기반 구현 등을 비교할 필요가 있다.

## 실제 설정은 화면이 아니라 DB와 컬럼에서 확인해야 한다

같은 문제를 다시 진단한다면 먼저 아래처럼 설정을 조회하겠다. `SAMPLE_TABLE`은 설명용 이름이다.

```sql
-- Oracle: 일반 문자셋과 국가 문자셋을 구분한다.
SELECT parameter, value
FROM nls_database_parameters
WHERE parameter IN ('NLS_CHARACTERSET', 'NLS_NCHAR_CHARACTERSET');

-- CHAR_USED: B는 BYTE 기준, C는 CHAR 기준이다.
SELECT column_name, data_type, data_length, char_length, char_used
FROM user_tab_columns
WHERE table_name = 'SAMPLE_TABLE';
```

Oracle은 `DATA_LENGTH`로 바이트 길이, `CHAR_LENGTH`와 `CHAR_USED`로 문자 길이와 길이 기준을 확인할 수 있다. **바이트 제한인지 문자 수 제한인지부터 구분해야 한다.** [Oracle 컬럼 메타데이터 문서](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/ALL_TAB_COLUMNS.html)

```sql
-- MySQL: 접속 구간의 설정과 실제 컬럼 설정을 따로 확인한다.
SHOW SESSION VARIABLES LIKE 'character_set%';

SELECT column_name, character_set_name, collation_name,
       character_maximum_length, character_octet_length
FROM information_schema.columns
WHERE table_schema = DATABASE()
  AND table_name = 'SAMPLE_TABLE';
```

MySQL의 `VARCHAR(n)`에서 `n`은 문자 수 기준이다. Oracle의 `VARCHAR2(n BYTE)`와 같은 의미로 해석해서는 안 된다. 전체 저장 한도 등 다른 제약도 함께 봐야 한다. [MySQL CHAR·VARCHAR 문서](https://dev.mysql.com/doc/refman/8.0/en/char.html)

## 결과와 배운 점

프로젝트에서는 문자열 보정과 연동 검증 로직의 공통화를 통해 인코딩 관련 오류를 줄였다. 포트폴리오에 정리한 결과는 **인코딩 오류 약 95% 감소, 신규 연동 실패율 5% 미만 유지**다. 이 수치를 문자열 자르기 함수 하나만의 효과로 분리해서 해석하지는 않는다.

### 공통 함수를 만들었지만, 모든 컬럼에 적용하지는 못했다

길이 초과 오류가 발생하는 컬럼마다 해당 함수를 메타데이터에 등록해 적용하는 것이 대응 방향이었다. 하지만 **데이터 관리 체계의 제약으로 모든 대상 컬럼에 규칙을 등록할 수는 없었다.** 공통 함수가 존재한다고 해서 모든 연동 컬럼에 자동으로 적용되는 것은 아니었고, 등록하지 못한 컬럼에서는 같은 유형의 오류가 남을 수 있었다. 따라서 인코딩 관련 오류를 줄였지만, 오류율을 0%로 만들지는 못했다.

이 한계는 함수의 구현과 적용 범위를 구분해서 봐야 한다는 점을 보여 줬다. 변환 기능을 만드는 것과, 필요한 컬럼 전체에 그 규칙을 반영하는 것은 별개의 작업이었다.

### 저장 제약도 연동 규칙의 일부였다

이 경험으로 **원천에서 유효한 데이터와 대상 시스템에 저장 가능한 데이터는 다르다**는 점을 배웠다. 컬럼 이름과 PK를 맞추는 것뿐 아니라, 문자셋·길이 기준 같은 저장 제약도 연동 규칙의 일부였다.

다만 길이를 맞추기 위해 모든 문자열을 잘라서는 안 된다. 지금 같은 기능을 설계한다면, 축약 가능한 설명 필드와 원문 보존이 필요한 업무키·식별값을 구분하겠다. 후자는 임의로 잘라 적재하지 않고 발행 파트의 수정·재발행이나 대상 스키마 검토로 연결해야 한다. **적재 성공이 곧 데이터 정합성 확보는 아니기 때문이다.**

전체 GW 구조와 대사·보정 과정은 [원천 분할·PK 변환 및 데이터 정합성 대응](/blog/kafka-gw-data-integrity), 담당 파트의 조치로 연결한 운영 방법은 [일일 오류 보고 체계를 만든 경험](/blog/gw-daily-error-reporting-workflow)에 따로 정리했다.
