---
title: Java 객체지향 02 — 변수의 소속과 메서드의 실행 흐름
date: 2022-06-07
tags: Java, OOP, Study
summary: 인스턴스 변수·클래스 변수·지역 변수를 구분하고, 매개변수·반환값·호출 스택으로 메서드의 흐름 이해
category: java
---

같은 클래스에 선언한 변수라도 객체마다 따로 갖는 값과 함께 사용하는 값이 있다. 변수 이름보다 **어디에 선언했고 누구에게 속하는지**를 먼저 보면 `static`과 메서드 호출을 이해하기 쉬워진다.

2022년 학습 노트의 변수·메서드 내용을 보완한 글이다. [전체 시리즈](/blog/java-oop-01-classes-and-objects)에서 순서를 확인할 수 있다.

## 인스턴스 변수·클래스 변수·지역 변수

| 구분 | 선언 위치 | 소속과 사용 | 초기값 |
| --- | --- | --- | --- |
| 인스턴스 변수 | 클래스 안, `static` 없음 | 객체마다 따로 보유 | 타입별 기본값 제공 |
| 클래스 변수 | 클래스 안, `static` 있음 | 해당 런타임 클래스에 소속 | 타입별 기본값 제공 |
| 지역 변수 | 메서드·생성자·블록 안 | 선언의 유효 범위에서 사용 | 읽기 전에 대입 필요 |
| 매개변수 | 메서드·생성자 선언부 | 호출할 때 전달받는 변수 | 호출 인수의 값으로 초기화 |

필드의 기본값은 정수형 `0`, 실수형 `0.0`, `boolean`의 `false`, 참조형의 `null` 등이다. 지역 변수는 같은 방식으로 기본값을 제공받지 않는다. `int result;`만 선언한 뒤 읽으면 컴파일 오류가 난다. [Java 변수의 초기값 규칙](https://docs.oracle.com/javase/specs/jls/se17/html/jls-4.html#jls-4.12.5)

지역 변수의 유효 범위와 객체의 생명주기도 다르다. 메서드 안에서 만든 객체라도 다른 곳에서 참조하고 있다면 메서드 종료와 함께 사라지는 것은 아니다.

## 함께 쓰는 값이라고 모두 static이어야 할까

카드의 무늬와 번호는 카드마다 다르므로 인스턴스 변수로 표현할 수 있다. 모든 카드에 같은 규격을 적용한다면 그 규격은 클래스 변수로 표현할 수 있다.

다만 `static`은 단순한 편의 기능이 아니라 **공유 상태를 만드는 선택**이다. 사용자별 정보를 `static` 필드에 두면 서로의 값에 영향을 줄 수 있다. 변하지 않는 공통 값이라면 `static final` 상수를 먼저 고려할 수 있다. 클래스 변수는 `객체.필드`보다 `클래스.필드`로 접근하는 편이 소속을 분명히 드러낸다. [Oracle 클래스 멤버 설명](https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html)

## 메서드는 입력·처리·결과를 정의한다

`int add(int left, int right)`에서 `left`, `right`는 **매개변수(parameter)**이고, `add(3, 5)`의 `3`, `5`는 **인수(argument)**다.

반환 타입과 매개변수 유무는 독립적이다. 매개변수가 없어도 값을 반환할 수 있고, `void` 메서드도 매개변수를 받을 수 있다. 원문에서 인수 없는 출력 예제를 설명하며 두 조건을 연결했던 부분을 구분했다.

`return`은 현재 메서드의 실행을 종료한다. `void`에서는 `return;`을 쓸 수 있고 마지막에 생략할 수도 있다. 값을 반환하는 메서드는 정상적으로 끝나는 경로에 반환값이 있어야 한다. 예외를 던지는 경로까지 무조건 `return`이 필요한 것은 아니다. [Oracle 메서드 정의 안내](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html)

## 실행 예제 — 공유 값과 개별 값

`MethodExample.java`로 저장한다.

```java
public class MethodExample {
    static class Counter {
        static int createdCount;
        private int value;

        Counter() {
            createdCount++;
        }

        void increment(int amount) {
            if (amount <= 0) {
                return;
            }
            value += amount;
        }

        int getValue() {
            return value;
        }
    }

    static int add(int left, int right) {
        return left + right;
    }

    public static void main(String[] args) {
        Counter first = new Counter();
        Counter second = new Counter();
        first.increment(add(2, 3));
        second.increment(-1);

        System.out.println(first.getValue());    // 5
        System.out.println(second.getValue());   // 0
        System.out.println(Counter.createdCount); // 2
    }
}
```

`createdCount`는 두 객체가 공유하지만 `value`는 객체마다 따로 존재한다. 이 예제의 단순 증가 연산은 스레드 안전성을 제공하지 않는다. 여기서는 변수의 소속만 비교한다.

## 호출 스택으로 실행 순서를 따라가기

위 코드에서 `first.increment(add(2, 3))`은 먼저 `add`의 결과를 계산한 뒤 그 값을 `increment`에 전달한다.

```text
main 실행
  → add 호출: 2 + 3 계산
  ← 5 반환
  → increment(5) 호출: first의 value 변경
  ← increment 종료
main의 다음 문장 실행
```

JVM의 스택 프레임은 호출별 지역 변수, 연산에 필요한 정보 등을 관리한다. 호출이 완료되면 해당 프레임이 제거된다. 이 흐름을 객체가 저장되는 공간과 혼동하지 않아야 한다. 지나치게 깊은 재귀 호출은 `StackOverflowError`를 일으킬 수 있다. [JVM 스택 프레임 명세](https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-2.html#jvms-2.6)

## 정리

변수는 객체별 값인지 공유 값인지, 메서드는 어떤 입력을 받아 무엇을 바꾸거나 반환하는지 설명할 수 있어야 한다. 단순히 코드 줄 수를 줄이기보다 **하나의 책임과 의미 있는 이름**으로 묶는 것이 메서드를 나누는 기준이다.

원문: [클래스·변수·메서드](https://doltae.tistory.com/183), [return·호출 스택](https://doltae.tistory.com/184)

이전: [01 — 클래스와 객체](/blog/java-oop-01-classes-and-objects) · 다음: [03 — 값 전달과 static](/blog/java-oop-03-pass-by-value-and-static)
