---
title: 화면마다 권한을 DB에 묻던 시스템 — Redis 캐시와 "세션과 같은 TTL"
date: 2025-01-07
tags: Java, Spring, Redis, Performance
summary: 셀렉트 박스 하나 그릴 때마다 권한 테이블을 조회하던 구조를 Redis 캐시로 바꾸고, TTL을 로그아웃(세션 만료) 시간과 일치시켜 정합성과 속도를 함께 잡은 기록
---

권한 관리가 화면 단위로 촘촘한 시스템이 있었다. 같은 조회 화면이라도 사용자
권한에 따라 **셀렉트 박스에 보이는 항목이 달랐다** — 일반 사용자는 자기 부서
코드만, 관리자는 전체 코드가 보이는 식이다. 문제는 이걸 구현한 방식이었다.

## AS-IS — 렌더링할 때마다 권한 테이블로

화면이 열릴 때마다, 셀렉트 박스가 그려질 때마다 서버는 DB의 권한 테이블을
조회했다.

```java
// AS-IS — 화면 컨트롤러마다 반복되던 패턴
@GetMapping("/board/list")
public String boardList(Model model, Principal principal) {
    // 이 사용자가 볼 수 있는 코드 목록을 매번 DB에서
    List<CodeVO> deptCodes = permissionService.getAllowedCodes(principal.getName(), "DEPT");
    List<CodeVO> typeCodes = permissionService.getAllowedCodes(principal.getName(), "TYPE");
    model.addAttribute("deptCodes", deptCodes);
    model.addAttribute("typeCodes", typeCodes);
    ...
}
```

권한 조회 쿼리는 사용자-역할-권한-코드를 잇는 조인이라 가볍지 않았고,
셀렉트 박스가 대여섯 개인 화면은 열릴 때마다 그 조인을 대여섯 번씩 실행했다.
사용자 입장에선 **화면 하나 이동할 때마다 같은 질문을 DB에 반복**하는
구조다. 답은 뻔했다 — 로그인해 있는 동안 이 사용자의 권한은 바뀌지 않는데,
왜 매번 묻는가.

## TO-BE — 로그인할 때 한 번 묻고, Redis에 올려두기

권한 데이터의 성질을 먼저 정리했다.

- **읽기는 매우 잦다** — 모든 화면 렌더링이 읽는다.
- **변경은 매우 드물다** — 관리자가 권한을 바꾸는 이벤트는 하루에 몇 번도 안 된다.
- **사용자별로 다르지만, 세션 동안에는 같다.**

읽기 압도적 + 변경 희소 + 세션 단위 일관성 — 캐시에 딱 맞는 프로필이다.
로그인 시점에 권한을 조회해 Redis에 올리고, 이후 렌더링은 전부 캐시에서
읽도록 바꿨다.

```java
// TO-BE — 권한 조회에 캐시를 씌운다
@Cacheable(value = "userPermissions", key = "#username + ':' + #codeGroup")
public List<CodeVO> getAllowedCodes(String username, String codeGroup) {
    return permissionDAO.selectAllowedCodes(username, codeGroup); // 캐시 미스일 때만 실행
}
```

```java
// Redis 캐시 설정 — TTL을 세션 만료 시간과 동일하게
@Bean
public RedisCacheManager cacheManager(RedisConnectionFactory factory) {
    RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(30))   // ← 세션 타임아웃과 같은 값
            .serializeValuesWith(SerializationPair.fromSerializer(
                    new GenericJackson2JsonRedisSerializer()));
    return RedisCacheManager.builder(factory)
            .withCacheConfiguration("userPermissions", config)
            .build();
}
```

## 핵심 설계 — 왜 TTL을 로그아웃 시간과 맞췄나

이 작업에서 코드보다 중요한 게 TTL 값의 결정이었다. 캐시 TTL을
**세션 만료(로그아웃) 시간과 동일하게** 잡았는데, 이유는 이렇다.

- **TTL이 세션보다 길면**: 사용자가 로그아웃하고 권한이 변경된 뒤 재로그인해도
  낡은 권한이 캐시에 살아 있을 수 있다. 권한 데이터에서 이건 성능 문제가
  아니라 **보안 문제**다.
- **TTL이 세션보다 짧으면**: 로그인 중인 사용자의 캐시가 중간에 증발해
  다시 DB를 두드린다. 캐시 미스가 잦아져 효과가 반감된다.
- **TTL = 세션이면**: "한 세션 동안의 권한은 로그인 시점 기준으로 고정"이라는
  규칙이 된다. 이건 원래부터 이 시스템의 암묵적 동작이기도 했다 — 권한이
  바뀌어도 재로그인해야 반영되는 게 사용자에게도 자연스럽다. 캐시 수명을
  세션 수명에 정렬함으로써, **캐시가 만든 새로운 불일치가 하나도 없는**
  상태를 만들었다.

경계 이벤트도 같은 원칙으로 처리했다.

- **로그아웃**: 세션 무효화와 함께 해당 사용자의 캐시 키를 즉시 삭제
  (`@CacheEvict` / 로그아웃 핸들러에서 키 삭제). TTL이 남아 있어도 세션이
  끝나면 캐시도 끝난다.
- **관리자가 권한을 변경**: 대상 사용자의 캐시 키를 evict. 그 사용자는
  다음 요청(또는 재로그인)부터 새 권한을 받는다.

키는 `userPermissions::{username}:{codeGroup}` 형태로 잡아, 사용자 한 명의
권한만 정확히 지울 수 있게 했다. 전체 flush는 권한 체계 개편 같은 예외
상황에만 쓰는 것으로 정리했다.

## 결과

- 화면 하나를 그릴 때 나가던 권한 조인 쿼리 여러 건이 **로그인 후 첫 조회
  이후에는 0건**이 됐다. 권한 조회가 DB 왕복에서 Redis 메모리 조회(밀리초
  미만)로 바뀌면서 화면 체감 렌더링이 눈에 띄게 빨라졌고, 특히 셀렉트
  박스가 많은 관리 화면일수록 개선 폭이 컸다.
- DB 입장에서는 접속자 수 × 화면 이동 수만큼 반복되던 동일 조인이
  사라졌다 — 캐시는 응답 속도만이 아니라 **DB의 여유**를 만드는 장치였다.

## 배운 점

- **캐시 설계의 절반은 TTL과 무효화 정책이다.** "Redis를 붙였다"가 아니라
  "캐시 수명을 무엇에 정렬했고, 어떤 이벤트에 지우는가"가 설계의 실체였다.
  권한처럼 민감한 데이터일수록 TTL은 성능 파라미터가 아니라 정합성 규칙이다.
- **캐시하기 좋은 데이터부터 골라야 한다.** 읽기 빈도, 변경 빈도, 일관성
  요구 수준을 먼저 따져보면 권한/코드성 데이터가 1순위로 나온다. 반대로
  실시간성이 필요한 데이터에 같은 패턴을 쓰면 사고가 된다.
- **기존 시스템의 암묵적 규칙을 명시적 규칙으로.** "권한 변경은 재로그인해야
  반영된다"는 원래 있던 동작을 TTL 정책으로 문서화한 셈이 됐다. 캐시를
  도입하면서 시스템의 동작 계약이 오히려 분명해졌다.
