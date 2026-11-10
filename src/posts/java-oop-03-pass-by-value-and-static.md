---
title: Java 객체지향 03 — 참조형도 값으로 전달된다
date: 2022-06-07
tags: Java, OOP, Study
summary: 기본형·참조형 매개변수와 객체 변경·재대입의 차이, 복사와 static 메서드의 접근 범위 정리
category: java
---

기본형은 읽기 전용이고 참조형은 읽기·쓰기가 가능하다고 외우면, 메서드 안에서 객체를 바꿨을 때와 새 객체를 대입했을 때의 차이를 설명하기 어렵다.

**Java의 인수 전달은 항상 값 전달(pass-by-value)이다.** 기본형은 그 값을, 참조형은 참조 값을 복사해서 매개변수에 전달한다. [Oracle 매개변수 전달 설명](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html)

2022년 학습 노트의 기본형·참조형 매개변수와 `static` 설명을 이 기준으로 보완했다. [전체 시리즈](/blog/java-oop-01-classes-and-objects)

## 값을 바꾸는 것과 객체를 바꾸는 것

| 메서드 내부의 작업 | 호출자에게 보이는 영향 |
| --- | --- |
| 기본형 매개변수에 새 값 대입 | 호출자가 가진 원래 변수에는 영향 없음 |
| 참조형 매개변수로 객체의 필드 변경 | 같은 객체를 참조하므로 변경 결과가 보임 |
| 참조형 매개변수에 새 객체 대입 | 호출자가 가진 원래 참조는 바뀌지 않음 |

참조형 매개변수를 받는다고 객체가 무조건 수정 가능한 것은 아니다. `String`처럼 불변 객체는 내부 상태를 변경하는 방식으로 사용할 수 없다. 접근 제어와 객체가 제공하는 동작도 함께 봐야 한다.

## 실행 예제 — 변경과 재대입 비교

`ArgumentExample.java`로 저장한다.

```java
public class ArgumentExample {
    static class Data {
        int value;

        Data(int value) {
            this.value = value;
        }
    }

    static void changeNumber(int number) {
        number = 100;
    }

    static void changeObject(Data data) {
        data.value = 100;
    }

    static void replaceObject(Data data) {
        data = new Data(999);
    }

    static Data copy(Data original) {
        return new Data(original.value);
    }

    public static void main(String[] args) {
        int number = 10;
        changeNumber(number);
        System.out.println(number);       // 10

        Data original = new Data(10);
        changeObject(original);
        System.out.println(original.value); // 100
        replaceObject(original);
        System.out.println(original.value); // 100

        Data copied = copy(original);
        copied.value = 200;
        System.out.println(original.value); // 100
        System.out.println(copied.value);   // 200
        System.out.println(original == copied); // false
    }
}
```

`replaceObject`의 매개변수는 호출자의 참조 값으로 초기화된 **별개의 변수**다. 그 변수에 새 객체를 대입해도 호출자의 `original`을 다시 대입한 것이 아니다.

```text
호출 직후
original ─┐
          ├─> Data A
data ─────┘

replaceObject 안에서 재대입 후
original ───> Data A
data ───────> Data B
```

## 객체를 반환해도 자동으로 복사되지는 않는다

`return original;`은 기존 객체의 참조를 반환한다. 위 예제의 `copy()`는 `new Data(...)`를 실행했기 때문에 새 객체를 반환한다.

이 예제의 필드는 `int` 하나라 복사가 단순하다. 필드가 다른 가변 객체를 참조한다면 필드 대입만으로는 내부 객체까지 분리되지 않는다. 이를 얕은 복사와 깊은 복사를 구분하는 출발점으로 삼을 수 있다. 깊은 복사가 필요한지는 객체의 변경 가능성과 공유 의도에 따라 결정해야 한다.

## static 메서드는 인스턴스 멤버를 전혀 못 쓸까

원문의 “static 메서드는 인스턴스 멤버를 사용할 수 없다”는 설명은 **대상 객체 없이 직접 사용할 수 없다**는 의미로 좁혀야 정확하다.

위 코드의 `changeObject()`는 `static`이지만 `data.value`를 변경한다. 매개변수로 대상 객체를 받았기 때문이다. 반면 현재 인스턴스를 뜻하는 `this`는 사용할 수 없다. [Oracle static 메서드 설명](https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html)

| 인스턴스 메서드 | static 메서드 |
| --- | --- |
| 호출 대상 객체가 있음 | 특정 인스턴스 없이 호출 가능 |
| `this`로 현재 객체 접근 가능 | `this` 사용 불가 |
| 현재 객체의 상태를 다루는 동작에 적합 | 전달받은 값으로 수행하는 계산·변환 등에 활용 가능 |

인스턴스 필드를 사용하지 않는다고 반드시 `static`으로 만들어야 하는 것은 아니다. 구현 교체나 다형성이 필요한 책임인지도 판단해야 한다. 반대로 `static`을 붙였다는 이유만으로 순수 함수나 스레드 안전한 함수가 되는 것도 아니다.

## 복습할 질문

- 두 객체의 참조를 메서드에 전달한 뒤 매개변수끼리 교환하면 호출자의 두 변수도 교환되는가? **아니다.**
- 배열을 전달한 뒤 요소를 바꾸면 호출자에게 보이는가? 같은 배열 객체의 변경이므로 **보인다.**
- 새 객체를 반환받아 호출자의 참조를 바꾸고 싶다면? 반환값을 호출자의 변수에 **다시 대입**해야 한다.

원문: [기본형·참조형 매개변수와 static](https://doltae.tistory.com/184)

이전: [02 — 변수·메서드](/blog/java-oop-02-fields-and-methods) · 다음: [04 — 오버로딩·생성자](/blog/java-oop-04-overloading-and-constructors)
