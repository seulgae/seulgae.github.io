---
title: Java 객체지향 01 — 클래스와 객체, 참조를 구분하기
date: 2022-06-07
tags: Java, OOP, Study
summary: 객체지향의 네 가지 개념부터 클래스·인스턴스·참조 변수·객체 배열까지, 객체를 만드는 코드의 의미 정리
category: java
---

객체지향을 처음 공부할 때는 클래스를 설계도, 객체를 제품으로 외웠다. 출발점으로는 도움이 되지만, 실제 코드에서는 **객체의 상태를 누가 바꾸고 어떤 참조로 접근하는지**까지 설명할 수 있어야 한다.

2022년 티스토리에 작성한 객체지향 학습 노트를 주제별로 옮기면서 설명과 예제를 보완했다. 시리즈 날짜는 학습 기록 기준으로 유지하며, 예제는 Java 8~17에서 사용할 수 있는 기본 문법을 기준으로 한다.

## 시리즈 읽는 순서

| 순서 | 주제 |
| --- | --- |
| 01 | 클래스와 객체, 참조 — 현재 글 |
| 02 | [변수·메서드·호출 스택](/blog/java-oop-02-fields-and-methods) |
| 03 | [값 전달과 static 메서드](/blog/java-oop-03-pass-by-value-and-static) |
| 04 | [오버로딩·생성자·초기화](/blog/java-oop-04-overloading-and-constructors) |
| 05 | [상속·포함·오버라이딩](/blog/java-oop-05-inheritance-and-composition) |
| 06 | [패키지·접근 제어·추상화](/blog/java-oop-06-packages-and-encapsulation) |
| 07 | [다형성·형변환·객체 컬렉션](/blog/java-oop-07-polymorphism-and-casting) |

## 객체는 상태와 행동을 함께 가진다

TV의 채널 번호는 상태이고, 채널을 바꾸는 기능은 행동이다. Java에서는 상태를 필드로, 행동을 메서드로 표현할 수 있다. 클래스는 이런 객체의 구조와 동작을 정의하며, 클래스에서 생성한 객체를 그 클래스의 인스턴스라고 부른다. [Oracle 객체 개념 안내](https://docs.oracle.com/javase/tutorial/java/concepts/object.html)

객체는 반드시 현실의 물건을 복제한 것일 필요는 없다. 주문, 결제 정책, 요청 처리기처럼 프로그램에 필요한 개념도 객체로 표현할 수 있다.

### 네 가지 개념은 어떤 문제를 해결하는가

| 개념 | 핵심 질문 | 예시 |
| --- | --- | --- |
| 캡슐화 | 상태를 아무 곳에서나 바꾸지 못하게 하려면? | 채널 필드를 숨기고 유효한 범위만 받는 메서드 제공 |
| 추상화 | 사용자가 알아야 할 기능은 무엇인가? | 내부 회로 대신 채널 변경 기능 제공 |
| 상속 | 기존 타입의 계약을 이어받는 관계인가? | TV의 기능을 확장하는 자막 TV |
| 다형성 | 같은 요청을 다른 구현이 처리하게 하려면? | 같은 재생 요청을 각 기기가 다르게 수행 |

클래스에 코드를 넣는 것만으로 유지보수성이 좋아지지는 않는다. 관련 없는 책임이 한 클래스에 몰리거나 내부 상태가 모두 공개되면 변경 영향을 줄이기 어렵다. 이 네 개념은 문법 목록보다 **변경과 사용의 경계를 정하는 도구**로 이해하는 편이 도움이 된다.

## 참조 변수 선언과 객체 생성은 다르다

`Tv tv;`는 참조 변수를 선언한 것이다. `new Tv()`는 객체를 생성하는 표현식이고, `tv = new Tv();`는 생성된 객체의 참조를 변수에 저장한다.

원문에서는 참조를 주소로 설명했지만, Java 코드에서 물리적인 메모리 주소를 직접 다루는 것은 아니다. **참조 변수에는 객체 자체가 아니라 객체를 가리키는 참조 값이 들어간다.**

`Tv other = tv;`는 TV를 복제하지 않는다. 두 변수가 같은 객체를 가리키므로 한쪽을 통해 상태를 바꾸면 다른 쪽에서도 그 결과를 보게 된다. 반면 `new Tv()`를 두 번 실행하면 별개의 객체가 생긴다. [Oracle 객체 생성·사용 안내](https://docs.oracle.com/javase/tutorial/java/javaOO/objects.html)

## 실행 예제 — 두 참조와 하나의 객체

`ObjectExample.java`로 저장해 실행한다.

```java
public class ObjectExample {
    static class Tv {
        private int channel = 1;

        void changeChannel(int channel) {
            if (channel < 1 || channel > 99) {
                throw new IllegalArgumentException("채널 범위: 1~99");
            }
            this.channel = channel;
        }

        int getChannel() {
            return channel;
        }
    }

    public static void main(String[] args) {
        Tv first = new Tv();
        Tv same = first;
        Tv another = new Tv();

        same.changeChannel(7);
        System.out.println(first.getChannel());   // 7
        System.out.println(another.getChannel()); // 1
        System.out.println(first == same);        // true
        System.out.println(first == another);     // false

        Tv[] televisions = new Tv[2];
        System.out.println(televisions[0] == null); // true
        televisions[0] = first;
        televisions[1] = another;
        System.out.println(televisions[0].getChannel()); // 7
    }
}
```

```text
first ─┐
       ├─> Tv 객체 A (channel = 7)
same ──┘
another ─> Tv 객체 B (channel = 1)
```

`==`는 위 코드에서 두 참조가 같은 객체를 가리키는지 비교한다. 객체의 내용이 같은지를 판단하는 `equals()`와는 구분해야 한다.

## 객체 배열은 배열과 각 요소를 따로 만든다

`new Tv[2]`는 두 TV를 생성하는 코드가 아니라, **TV 참조 두 개를 저장할 배열을 만드는 코드**다. 각 요소의 초기값은 `null`이므로, 객체를 넣기 전에 `televisions[0].getChannel()`을 호출하면 `NullPointerException`이 발생한다.

`Tv[] televisions = { new Tv(), new Tv() };`처럼 배열 생성과 요소 초기화를 함께 작성할 수도 있다. 배열도 Java에서는 객체다. [Java 언어 명세의 객체·배열 정의](https://docs.oracle.com/javase/specs/jls/se17/html/jls-4.html#jls-4.3.1)

## 복습할 질문

- `Tv first = new Tv(); Tv second = first;`에서 TV 객체는 몇 개인가? **한 개**다.
- 참조 변수의 타입과 실제 객체의 클래스는 항상 같아야 하는가? 아니다. 상위 타입으로 하위 객체를 참조할 수 있으며, 07편에서 다룬다.
- 클래스의 필드를 모두 공개해도 캡슐화가 되는가? 데이터와 메서드를 묶는 것에 더해 **유효한 상태를 지키는 접근 경계**가 필요하다.

원문: [객체지향 프로그래밍 6장 — 티스토리 학습 노트](https://doltae.tistory.com/182)

다음: [02 — 변수·메서드·호출 스택](/blog/java-oop-02-fields-and-methods)
