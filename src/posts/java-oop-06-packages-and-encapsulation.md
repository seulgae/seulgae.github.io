---
title: Java 객체지향 06 — 패키지와 접근 제어로 경계 만들기
date: 2022-06-07
tags: Java, OOP, Study
summary: 패키지·import·클래스패스와 접근 제어, final·abstract·인터페이스를 객체의 사용 경계 관점으로 정리
category: java
---

객체의 필드를 `private`으로 바꾸고 getter·setter를 만들면 캡슐화가 끝난 것처럼 보인다. 하지만 모든 값을 그대로 받아 주는 setter라면 잘못된 상태를 막지 못한다. **어떤 동작만 허용할 것인지**가 중요하다. [전체 시리즈](/blog/java-oop-01-classes-and-objects)

## 패키지·import·클래스패스는 역할이 다르다

| 구분 | 역할 |
| --- | --- |
| 패키지 | 타입의 이름 공간과 접근 경계 구성 |
| import | 소스에서 타입·정적 멤버의 이름을 짧게 쓰도록 함 |
| 클래스패스 | 컴파일·실행 도구가 클래스 파일 등을 찾을 위치 지정 |

`import java.util.*`는 `java.util`의 타입을 대상으로 하며 하위 패키지까지 가져오지 않는다. `import`를 썼다고 객체를 생성하거나 라이브러리 전체를 메모리에 적재하는 것도 아니다. `static import`는 정적 멤버를 클래스 이름 없이 사용할 때 쓴다. 같은 이름이 많아지면 오히려 출처를 알기 어려워진다. [Oracle 패키지 사용 안내](https://docs.oracle.com/javase/tutorial/java/package/usepkgs.html)

`com.example`과 `com.example.internal`은 이름이 연결돼 보여도 서로 다른 패키지다. 하위 패키지라는 이유로 package-private 접근이 허용되지 않는다.

클래스패스는 `CLASSPATH` 환경변수뿐 아니라 `-cp` 옵션이나 빌드 도구로도 지정한다. 경로 구분자는 Windows의 `;`, Linux·macOS의 `:`가 다르다. 일반적인 클래스 실행은 `.java` 확장자 대신 완전한 클래스 이름을 사용한다. 소스 파일 실행 모드는 별개의 기능이다. [Java 실행 도구 안내](https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html)

## 접근 범위는 필요한 만큼만 연다

| 접근 수준 | 기본 의미 |
| --- | --- |
| `private` | 선언 클래스 내부가 기본 경계이며, 중첩 타입에는 별도 접근 규칙이 있음 |
| package-private | 접근 제어자를 생략했을 때 같은 패키지에서 접근 |
| `protected` | 같은 패키지 또는 상속 규칙에 따른 하위 클래스에서 접근 |
| `public` | 공개 접근. 모듈을 쓰는 경우 모듈의 공개 규칙도 적용 |

`protected`는 모든 하위 클래스에서 아무 부모 객체로나 접근할 수 있다는 뜻이 아니다. 다른 패키지의 하위 클래스에서는 접근 대상 참조의 타입 등에 추가 제약이 있다. 또한 최상위 클래스에는 `public` 또는 package-private을 사용하고, 멤버 클래스에는 다른 접근 제어자도 사용할 수 있다. [Oracle 접근 제어 설명](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html), [언어 명세의 protected 규칙](https://docs.oracle.com/javase/specs/jls/se17/html/jls-6.html#jls-6.6.2)

## 실행 예제 — 잘못된 시간을 만들지 못하게 하기

아래 코드는 `src/study/oop/TimeExample.java`로 저장한다. 일반적인 `javac` 파일 구성에서는 public 최상위 클래스 이름과 파일명을 맞춘다.

```java
package study.oop;

public class TimeExample {
    static final class Time {
        private final int hour;
        private final int minute;

        Time(int hour, int minute) {
            if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
                throw new IllegalArgumentException("유효하지 않은 시간");
            }
            this.hour = hour;
            this.minute = minute;
        }

        String display() {
            return String.format(java.util.Locale.ROOT, "%02d:%02d", hour, minute);
        }
    }

    public static void main(String[] args) {
        Time time = new Time(12, 30);
        System.out.println(time.display()); // 12:30
        try {
            new Time(25, 0);
        } catch (IllegalArgumentException exception) {
            System.out.println(exception.getMessage()); // 유효하지 않은 시간
        }
    }
}
```

```shell
javac -encoding UTF-8 -d out src/study/oop/TimeExample.java
java -cp out study.oop.TimeExample
```

무조건 setter를 제공하지 않고, 생성할 때 유효한 범위를 확인한 뒤 변경을 허용하지 않았다. 읽는 쪽에는 시간을 표현하는 동작만 제공한다. 이런 **불변식, 즉 객체가 지켜야 하는 조건**을 보호하는 것이 캡슐화의 실질적인 목적이다.

## final은 객체 전체를 불변으로 만드는 키워드가 아니다

`final` 필드는 한 번 대입한 뒤 다시 대입할 수 없다. 하지만 참조형이라면 그 참조가 가리키는 객체 내부까지 자동으로 불변이 되지는 않는다. `final List<String>`도 리스트 구현이 변경을 허용하면 요소를 추가할 수 있다.

`final` 메서드는 오버라이딩을 막고, `final` 클래스는 상속을 막는다. 예제의 `Time`은 상속을 막고 상태를 기본형 final 필드로만 구성했으며, 변경 메서드도 제공하지 않았다. [Java final 변수 규칙](https://docs.oracle.com/javase/specs/jls/se17/html/jls-4.html#jls-4.12.4)

## 추상 클래스와 인터페이스는 어떤 계약을 드러내는가

추상화는 무조건 추상 클래스를 만드는 행위가 아니다. 사용하는 쪽에 필요한 기능을 드러내고 구현 세부를 감추는 설계다.

| 선택 | 어울리는 상황 |
| --- | --- |
| 추상 클래스 | 공통 상태·생성 과정·일부 구현을 공유하며 확장 지점을 제공 |
| 인터페이스 | 구현 방식과 분리된 역할을 타입으로 정의 |

추상 클래스는 직접 인스턴스화할 수 없지만 생성자와 구현된 메서드를 가질 수 있다. 추상 메서드가 없는 추상 클래스도 가능하다. [Oracle 추상 클래스 안내](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html)

인터페이스는 여러 개를 구현할 수 있다. 메서드가 전부 구현 없는 선언뿐인 것은 아니며, Java 8의 `default`·`static` 메서드처럼 구현을 제공하는 기능도 있다. 다음 편에서는 호출자가 구체 클래스 대신 역할을 바라보는 예제로 연결한다. [Oracle 인터페이스 정의 안내](https://docs.oracle.com/javase/tutorial/java/IandI/interfaceDef.html)

원문: [패키지·제어자·캡슐화](https://doltae.tistory.com/188)

이전: [05 — 상속·오버라이딩](/blog/java-oop-05-inheritance-and-composition) · 다음: [07 — 다형성·형변환](/blog/java-oop-07-polymorphism-and-casting)
