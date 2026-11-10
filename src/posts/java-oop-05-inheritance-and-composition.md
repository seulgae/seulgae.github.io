---
title: Java 객체지향 05 — 상속보다 먼저 관계를 판단하기
date: 2022-06-07
tags: Java, OOP, Study
summary: is-a와 has-a로 상속·포함을 구분하고, super·오버라이딩·Object의 역할과 재정의 조건 이해
category: java
---

중복 코드를 줄이려고 상속부터 선택하면, 실제로는 서로 다른 개념이 부모·자식으로 묶일 수 있다. 원문의 상속·포함 예제를 바탕으로 **같은 종류인지, 다른 객체를 이용하는 관계인지**부터 살펴본다. [전체 시리즈](/blog/java-oop-01-classes-and-objects)

## is-a와 has-a는 출발점이다

자동차는 탈것이지만 자동차가 엔진인 것은 아니다. 자동차와 탈것은 상속 후보이고, 자동차와 엔진은 포함 관계로 표현하는 편이 자연스럽다.

| 관계 | 표현 방식 | 확인할 것 |
| --- | --- | --- |
| is-a | `Car extends Vehicle` | 하위 객체가 상위 타입의 약속을 지키는가 |
| has-a | `Car`가 `Engine` 필드를 가짐 | 필요한 기능을 별도 객체에 위임할 수 있는가 |

원문의 상속 10%·포함 90%는 언어 규칙이나 보편적인 통계가 아니다. 비율 대신 관계와 변경 영향을 기준으로 판단한다. 또한 참조 필드가 있다는 사실만으로 UML의 엄밀한 합성 관계, 즉 소유권과 생명주기까지 결정되는 것은 아니다.

## Java 클래스는 하나의 클래스만 상속한다

클래스의 직접 상위 클래스는 하나다. 여러 인터페이스를 구현할 수 있지만, 이를 여러 클래스의 상태를 상속하는 것과 동일하게 보아서는 안 된다.

**생성자는 상속되지 않으며, 상위 클래스의 private 멤버도 하위 클래스에 상속되지 않는다.** 상위 부분의 상태가 객체 안에 존재한다는 것과 하위 클래스에서 직접 접근할 수 있다는 것은 다르다. 접근 가능한 상위 메서드를 통해 그 상태를 사용할 수는 있다. [Oracle 상속 안내](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html)

## 실행 예제 — 상속과 포함을 함께 사용하기

`InheritanceExample.java`로 저장한다.

```java
public class InheritanceExample {
    static class Vehicle {
        private final String name;

        Vehicle(String name) {
            this.name = name;
        }

        String description() {
            return name;
        }
    }

    static class Engine {
        String start() {
            return "engine running";
        }
    }

    static class Car extends Vehicle {
        private final Engine engine;

        Car(String name, Engine engine) {
            super(name);
            this.engine = java.util.Objects.requireNonNull(engine);
        }

        @Override
        String description() {
            return "Car[" + super.description() + "]";
        }

        String start() {
            return engine.start();
        }
    }

    public static void main(String[] args) {
        Car car = new Car("demo", new Engine());
        Vehicle vehicle = car;
        System.out.println(vehicle.description()); // Car[demo]
        System.out.println(car.start());            // engine running
    }
}
```

`super(name)`은 상위 생성자를 호출한다. `super.description()`은 상위 구현을 사용한다. `super`가 별도의 부모 객체를 새로 만드는 것은 아니다.

예제의 클래스들은 하나의 실행 파일로 묶기 위한 중첩 클래스다. 중첩 클래스 사이의 특별한 접근 허용과 상속 규칙은 구분해야 하며, 여기서는 상위의 private 필드를 직접 읽지 않고 메서드를 사용했다.

## 오버라이딩 조건을 정확히 구분하기

오버라이딩은 상속받은 인스턴스 메서드를 하위 클래스에서 재정의하는 것이다. 단순히 선언 전체가 완전히 같아야 한다는 설명보다 다음처럼 나누는 편이 정확하다.

- 이름과 매개변수 구성이 재정의 대상과 맞아야 한다. 제네릭에는 추가 규칙이 있다.
- 기본형 반환 타입은 같아야 하고, 참조형은 공변 반환 타입 규칙에 따라 더 구체적인 타입을 반환할 수 있다.
- 접근 범위를 더 좁힐 수 없다.
- 검사 예외(checked exception)는 상위 선언보다 넓게 던질 수 없다. 예외 선언의 **개수**로 판단하는 규칙은 아니다.
- `final` 메서드는 재정의할 수 없고, `private` 메서드는 상속되지 않는다. `static` 메서드는 오버라이딩이 아니라 숨김(hiding)의 대상이다.

`@Override`를 붙이면 의도와 달리 새 메서드를 선언한 실수를 컴파일 단계에서 발견하기 쉽다. [Oracle 오버라이딩·숨김 안내](https://docs.oracle.com/javase/tutorial/java/IandI/override.html)

## Object는 공통 출발점이다

`Object`를 제외한 모든 클래스는 직접 또는 간접으로 `Object`를 상위 클래스로 가진다. `toString()`, `equals()`, `hashCode()` 같은 공통 동작을 여기서 만난다.

`toString()`을 재정의하면 객체의 표현을 제공할 수 있다. `equals()`로 논리적 동등성을 정의한다면 같은 객체로 판단되는 값의 `hashCode()`도 같아야 한다는 계약을 함께 지켜야 한다. 단순히 메서드 개수를 외우는 것보다 이 계약이 컬렉션 동작에 미치는 영향을 이해해야 한다. [Object API 계약](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html)

## 배운 점

상속은 재사용과 함께 상위 타입에 대한 의존도 만든다. 부모의 동작 변경이 자식에 영향을 줄 수 있으므로, 중복 코드가 있다는 이유만으로 결정하지 않는다. **하위 타입으로서 약속을 지킬 수 있는지**를 먼저 보고, 기능 이용만 필요하다면 포함과 위임을 검토한다.

원문: [상속·포함·오버라이딩·super](https://doltae.tistory.com/187)

이전: [04 — 생성자·초기화](/blog/java-oop-04-overloading-and-constructors) · 다음: [06 — 패키지·캡슐화](/blog/java-oop-06-packages-and-encapsulation)
