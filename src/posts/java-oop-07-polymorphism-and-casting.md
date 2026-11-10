---
title: Java 객체지향 07 — 다형성은 같은 호출을 다른 구현으로 연결한다
date: 2022-06-07
tags: Java, OOP, Study
summary: 참조 타입과 실제 객체의 역할, 동적 메서드 호출·안전한 형변환·매개변수 다형성과 컬렉션 예제 정리
category: java
---

원문에서는 다형성을 상위 타입 참조로 하위 객체를 다루는 것, 형변환을 리모컨 바꾸기로 정리했다. 여기서 한 단계 더 나아가야 할 질문은 **같은 메서드를 호출했는데 어떤 구현이 실행되는가**이다. [전체 시리즈](/blog/java-oop-01-classes-and-objects)

## 참조 타입과 실제 객체는 서로 다른 역할을 한다

`Product product = new Tv();`에서 컴파일러는 `Product`에 허용된 기능을 기준으로 호출 가능 여부를 확인한다. 하지만 오버라이딩된 인스턴스 메서드를 호출하면 실제 객체인 `Tv`의 구현이 실행된다.

다형성을 사용할 수 있는 멤버의 **개수**로만 설명하면 이 차이를 놓치게 된다. 핵심은 상위 타입이 정한 계약을 여러 구현이 각자 수행한다는 점이다. 필드 접근과 `static` 메서드 선택은 같은 방식의 동적 디스패치가 아니다. [Oracle 다형성 설명](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html)

## 실행 예제 — 구매자는 제품의 구체 타입을 몰라도 된다

원문의 제품·구매자 예제를 단순화하고, 저장 개수가 고정된 배열 대신 `List`로 보완했다. `PolymorphismExample.java`로 저장한다. 금액은 학습용 정수이며 실제 결제 처리를 구현한 예제는 아니다.

```java
import java.util.ArrayList;
import java.util.List;

public class PolymorphismExample {
    interface Product {
        int price();
        String name();
    }

    static class Tv implements Product {
        public int price() { return 100; }
        public String name() { return "TV"; }
        void showCaption() { System.out.println("caption on"); }
    }

    static class Computer implements Product {
        public int price() { return 200; }
        public String name() { return "Computer"; }
    }

    static class Buyer {
        private int money = 500;
        private final List<Product> purchased = new ArrayList<>();

        void buy(Product product) {
            java.util.Objects.requireNonNull(product);
            int price = product.price();
            if (price < 0 || money < price) {
                throw new IllegalArgumentException("가격 또는 잔액 확인 필요");
            }
            money -= price;
            purchased.add(product);
        }

        void printSummary() {
            for (Product product : purchased) {
                System.out.println(product.name());
            }
            System.out.println("balance=" + money);
        }
    }

    public static void main(String[] args) {
        Buyer buyer = new Buyer();
        buyer.buy(new Tv());
        buyer.buy(new Computer());
        buyer.printSummary();

        Product product = new Tv();
        // product.showCaption(); // Product에 없는 기능이므로 컴파일 오류
        if (product instanceof Tv) {
            Tv tv = (Tv) product;
            tv.showCaption();
        }
        System.out.println(product instanceof Computer); // false
        System.out.println(null instanceof Product);     // false
    }
}
```

```text
TV
Computer
balance=200
caption on
false
false
```

`Buyer`는 TV별·컴퓨터별 구매 메서드를 만들지 않는다. `Product`가 제공하는 가격과 이름만 사용하며, `name()`의 구현은 실제 객체에 따라 달라진다. 이것이 매개변수 다형성과 여러 타입의 객체를 한 컬렉션에 담는 이유다.

새 제품을 추가할 때도 해당 계약을 구현하면 구매자의 기본 흐름을 재사용할 수 있다. 단, 구매 규칙 자체가 달라지는 경우까지 수정 없이 처리된다는 뜻은 아니다.

## 형변환은 객체를 바꾸지 않는다

상위 타입으로 다루는 업캐스팅은 보통 명시적 캐스트 없이 가능하다. 하위 타입으로 접근하는 다운캐스팅은 실제 객체가 그 타입과 호환되는지 확인해야 한다.

예를 들어 `Product product = new Computer();` 뒤에서 `(Tv) product`를 수행하면 컴파일이 되더라도 실행 중 `ClassCastException`이 발생한다. 캐스트를 쓴다고 컴퓨터 객체가 TV로 바뀌는 것은 아니다.

`instanceof`로 확인한 뒤 필요한 경우에만 다운캐스팅한다. 단, `null instanceof Tv`는 `false`이지만 `(Tv) null` 자체는 허용된다. 이후 null 참조로 인스턴스 메서드를 호출하면 `NullPointerException`이 발생한다. [Java 형변환·instanceof 규칙](https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.16)

타입마다 `instanceof` 분기가 계속 늘어난다면 공통 동작을 인터페이스의 메서드로 표현할 수 있는지 다시 검토한다. 반대로 자막 기능처럼 정말 특정 타입에만 필요한 동작까지 억지로 공통 계약에 넣을 필요는 없다.

## 오버로딩과 오버라이딩의 선택 시점

| 구분 | 주된 선택 기준 |
| --- | --- |
| 오버로딩 | 컴파일 시 인수 표현식의 타입 등으로 호출할 선언을 선택 |
| 오버라이딩 | 선택된 인스턴스 메서드의 구현을 실행 시 실제 객체에 따라 결정 |

`print(Product)`와 `print(Tv)`가 함께 있다면, `Product product = new Tv();`를 `print(product)`로 전달할 때 실제 객체가 TV라는 이유만으로 `print(Tv)`가 선택되지는 않는다. 먼저 참조 표현식의 타입으로 오버로드를 판단한다. [Java 메서드 호출 규칙](https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.12)

## 객체지향 학습을 마치며

클래스·생성자·상속을 개별 문법으로 외우는 것에서 시작했지만, 결국 연결되는 질문은 세 가지다. **누가 상태를 소유하는가, 어떤 동작을 외부에 허용하는가, 호출자는 어느 구현까지 알아야 하는가.**

이 질문으로 코드를 읽으면 캡슐화는 상태의 보호, 추상화는 사용 계약, 다형성은 구현의 교체라는 흐름으로 이어진다. 설계 원칙을 안다고 항상 좋은 구조가 되는 것은 아니므로, 작은 예제에서 참조와 호출 결과를 직접 확인하는 연습이 필요하다.

원문: [다형성·형변환·매개변수와 객체 배열](https://doltae.tistory.com/189)

이전: [06 — 패키지·캡슐화](/blog/java-oop-06-packages-and-encapsulation) · [시리즈 처음으로](/blog/java-oop-01-classes-and-objects)
