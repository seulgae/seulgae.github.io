---
title: Java 객체지향 04 — 오버로딩과 생성자, 초기화 순서
date: 2022-06-07
tags: Java, OOP, Study
summary: 메서드 오버로딩의 선택 기준과 기본 생성자·this·this()의 차이, 클래스·인스턴스 초기화 순서 정리
category: java
---

같은 이름의 메서드를 여러 개 만드는 오버로딩과 객체의 초기 상태를 정하는 생성자는 닮아 보이지만 역할이 다르다. 특히 **인수의 타입으로 어떤 선언이 선택되는지**와 **생성할 때 유효한 상태가 보장되는지**를 나눠서 봐야 한다.

2022년 생성자·초기화 학습 노트를 보완했다. [전체 시리즈](/blog/java-oop-01-classes-and-objects)

## 반환 타입만 바꾸면 오버로딩이 아니다

오버로딩은 같은 이름의 메서드를 매개변수의 개수·타입·타입 순서로 구분하는 것이다. 매개변수 이름이나 반환 타입만 다른 선언은 구분할 수 없다.

`add(int, long)`과 `add(long, int)`만 있을 때 `add(1, 2)`를 호출하면 어느 쪽이 더 적합한지 결정하지 못해 모호성 오류가 발생할 수 있다. “알아서 가장 비슷한 메서드를 호출한다”로 외우기보다, 호출 인수의 타입과 적용 가능한 선언을 비교해야 한다. [Oracle 메서드 오버로딩 설명](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html)

반환 타입만 다르게 선언한 `int add(int a, int b)`와 `long add(int a, int b)`를 함께 두는 것은 컴파일 오류다. 반환값을 받을 변수의 타입으로 이 둘을 구분하지 않는다.

## 생성자는 객체를 사용할 수 있는 상태로 만든다

생성자는 클래스와 이름이 같고 반환 타입을 선언하지 않는다. 초기화에 관여하지만 일반 메서드와 같은 것은 아니므로 `void`도 붙이지 않는다.

**기본 생성자(default constructor)**는 일반 클래스에 생성자 선언이 하나도 없을 때 컴파일러가 제공하는 생성자다. 개발자가 직접 작성한 매개변수 없는 생성자는 무인수 생성자이며, 엄밀히는 컴파일러가 제공한 기본 생성자와 구분한다. 생성자를 하나라도 선언하면 무인수 생성자는 자동으로 추가되지 않는다. [Oracle 생성자 안내](https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html)

원문에는 “기본 생성자를 항상 넣는 습관”이라고 적었지만, 필수 입력 없이 만들면 유효하지 않은 객체가 되는 경우에는 오히려 무인수 생성자를 제공하지 않는 편이 낫다. 프레임워크가 요구하는 경우와 도메인의 생성 규칙을 구분해야 한다.

## this와 this()는 다르다

| 표현 | 의미 |
| --- | --- |
| `this.color` | 현재 객체의 필드에 접근 |
| `this("white")` | 같은 클래스의 다른 생성자를 호출 |
| `super(...)` | 상위 클래스의 생성자를 호출 |

이 시리즈에서 기준으로 삼는 Java 8~17에서는 명시적인 `this(...)` 또는 `super(...)` 호출이 생성자 본문의 첫 문장이어야 한다. `this(...)`로 생성자를 연결하면 초기화 로직을 한곳에 모을 수 있다. 서로 순환해서 호출하는 생성자 연결은 허용되지 않는다. [Java 17 생성자 명세](https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.8)

## 실행 예제 — 기본값을 한 생성자로 모으기

`ConstructorExample.java`로 저장한다.

```java
public class ConstructorExample {
    static class Car {
        private final String color;
        private final int doors;

        Car() {
            this("white", 4);
        }

        Car(String color) {
            this(color, 4);
        }

        Car(String color, int doors) {
            if (color == null || color.isEmpty() || doors <= 0) {
                throw new IllegalArgumentException("색상과 문 개수를 확인하세요.");
            }
            this.color = color;
            this.doors = doors;
        }

        String description() {
            return color + ":" + doors;
        }
    }

    static int add(int left, int right) {
        return left + right;
    }

    static long add(long left, long right) {
        return left + right;
    }

    public static void main(String[] args) {
        System.out.println(new Car().description());       // white:4
        System.out.println(new Car("blue").description()); // blue:4
        System.out.println(add(3, 5));                     // 8
        System.out.println(add(3L, 5L));                   // 8
    }
}
```

무인수 생성자는 유효한 기본값이 있는 예제로 작성했다. 어떤 생성자로 들어와도 최종 생성자에서 같은 유효성 검사를 거친다.

## 로딩과 초기화는 같은 단계가 아니다

원문의 “클래스가 메모리에 올라가면 초기화된다”는 표현은 지나치게 단순하다. 클래스 로딩·링킹·초기화는 구분되는 단계다. 클래스의 준비 단계에서는 정적 필드에 기본값이 마련되며, 초기화 단계에서 정적 필드 초기화식과 `static` 블록이 실행된다. 상수 변수 등에는 별도 규칙이 있다. [Java 실행·초기화 명세](https://docs.oracle.com/javase/specs/jls/se17/html/jls-12.html#jls-12.3)

일반적인 클래스 초기화와 객체 생성의 흐름은 다음처럼 정리할 수 있다.

| 대상 | 주요 흐름 |
| --- | --- |
| 클래스 초기화 | 필요한 상위 클래스 초기화 → 해당 클래스의 정적 필드 초기화식·정적 블록을 소스 순서로 실행 |
| 객체 생성 | 인스턴스 필드 기본값 설정 → 상위 생성 과정 → 해당 클래스의 필드 초기화식·인스턴스 블록 → 생성자 본문의 나머지 실행 |

클래스 초기화는 같은 런타임 클래스에 대해 한 번 진행되고, 인스턴스 초기화는 새 객체마다 진행된다. `this(...)`로 생성자를 연결한다고 같은 객체의 필드 초기화식·초기화 블록이 중복 실행되지는 않는다. [Oracle 필드 초기화 안내](https://docs.oracle.com/javase/tutorial/java/javaOO/initial.html)

## 복습할 질문

- 생성자에 `return` 타입이 있는가? 없다. `void`를 붙이면 생성자 선언이 아니다.
- 생성자가 초기 상태를 검사한다면 어떤 이점이 있는가? 잘못된 상태의 객체가 나중 단계로 전달되는 것을 줄일 수 있다.
- 오버로딩과 오버라이딩은 같은가? 아니다. **호출 형태를 늘리는 것**과 **상속받은 동작을 재정의하는 것**의 차이다.

원문: [오버로딩·생성자·변수 초기화](https://doltae.tistory.com/185)

이전: [03 — 값 전달·static](/blog/java-oop-03-pass-by-value-and-static) · 다음: [05 — 상속·포함](/blog/java-oop-05-inheritance-and-composition)
