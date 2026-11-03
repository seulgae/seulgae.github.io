---
title: 화면마다 권한을 DB에 묻던 시스템 — Redis 캐시의 TTL과 무효화 정책
date: 2025-01-07
tags: Java, Spring, Redis, Performance
summary: 반복되는 권한 조회를 Redis 캐시로 바꾼 기록 — 고정 TTL과 세션 만료 시각의 차이, 로그아웃·권한 변경 시 무효화의 역할과 남은 검증 과제
---

권한 관리가 화면 단위로 촘촘한 시스템이 있었다. OAuth 기반으로 로그인한 사용자라도
권한에 따라 **같은 화면의 셀렉트 박스에 보이는 항목이 달랐다** — 일반 사용자는 자기 부서·테넌트
코드만, 관리자는 전체 코드가 보이는 식이다. 문제는 이걸 구현한 방식이었다.

## AS-IS — 렌더링할 때마다 권한 테이블로

화면이 열릴 때마다, 셀렉트 박스가 그려질 때마다 서버는 DB의 권한 테이블을
조회했다.

```java
// 설명용 MVC 예시이며 CloudXper의 React/REST 실제 Controller 원본은 아니다.
// AS-IS — 화면 요청마다 반복되던 권한 조회 패턴
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

권한 조회 쿼리는 사용자-역할-권한-코드를 잇는 다중 조인이라 가볍지 않았고,
셀렉트 박스와 필터가 대여섯 개인 관리 화면은 열릴 때마다 그 조인을 연달아 실행했다.
데이터가 쌓인 환경에서는 **메뉴 이동과 초기 렌더링에만 최대 10초 가까이 지연**이
발생했다. 사용자 입장에선 화면 하나 이동할 때마다 같은 질문을 DB에 반복하는
구조다. 자주 읽고 드물게 바뀌는 권한을 캐시할 여지가 있었다. 다만 로그인 중에도 관리자 변경으로 권한이 달라질 수 있으므로 무효화 정책이 필요했다.

## TO-BE — 권한 조회 결과를 Redis에 캐싱하기

권한 데이터의 성질을 먼저 정리했다.

- **읽기는 매우 잦다** — 모든 화면 이동과 렌더링이 읽는다.
- **변경은 매우 드물다** — 관리자가 권한을 바꾸는 이벤트는 하루에 몇 번도 안 된다.
- **사용자별로 다르며, 로그인 중에도 변경될 수 있다.** 변경 이벤트와 캐시 만료를 함께 다뤄야 한다.

읽기 압도적 + 변경 희소 + 세션 단위 일관성 — 캐시에 딱 맞는 프로필이다.
이때 인메모리 로컬 캐시(Caffeine, Ehcache) 대신 **Redis 분산 캐시**를 선택했다.
다중 인스턴스 환경에서 로컬 캐시를 쓰면 관리자가 특정 사용자의 권한을 회수하거나
사용자가 로그아웃했을 때 다른 서버 메모리에 예전 권한이 남을 수 있지만, Redis를
공유 저장소로 두면 인스턴스별 캐시를 각각 지울 필요가 줄기 때문이다. 다만 삭제 전에 읽은 요청과 진행 중인 DB 조회가 있어, 삭제 한 번만으로 모든 요청의 즉시 일관성이 보장되는 것은 아니다.

원문 경험에는 로그인 시 적재가 서술되어 있다. 아래 `@Cacheable` 예제 자체가 보여주는 것은 **첫 메서드 호출에서 캐시가 없으면 DB를 조회하는 지연 적재**다. 로그인 핸들러에서 이 메서드를 호출했는지는 실제 코드 확인이 필요하다.

```java
// TO-BE — 권한 조회에 캐시를 씌운다
@Cacheable(value = "userPermissions", key = "#username + ':' + #codeGroup")
public List<CodeVO> getAllowedCodes(String username, String codeGroup) {
    return permissionDAO.selectAllowedCodes(username, codeGroup); // 캐시 미스일 때만 실행
}
```

```java
// 설명용 고정 TTL 설정 — 세션의 실제 만료 시각을 자동 추적하지 않는다
@Bean
public RedisCacheManager cacheManager(RedisConnectionFactory factory) {
    RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(30))   // 저장 시점부터 30분: 실제 운영 설정값 확인 필요
            .serializeValuesWith(SerializationPair.fromSerializer(
                    new GenericJackson2JsonRedisSerializer()));
    return RedisCacheManager.builder(factory)
            .withCacheConfiguration("userPermissions", config)
            .build();
}
```

## 핵심 설계 — 같은 기간과 같은 만료 시각은 다르다

당시에는 세션 만료 정책을 참고해 캐시 수명을 정했다. 하지만 위 코드의 고정 TTL은 **캐시 저장 시점부터 30분**이다. 로그인 10분 후 캐시를 만들면 로그인 시점부터 40분에 만료될 수 있고, 활동으로 세션이 연장되어도 단순 캐시 조회가 TTL을 자동 연장하지 않는다.

따라서 이 예제로 토큰의 `exp`와 캐시 만료 시각이 자동 동기화됐다고 설명할 수 없다. 실제 동기화를 구현했다면 남은 유효 시간 계산과 갱신 처리가 별도로 있어야 한다. 해당 구현은 저장소에 없어 확인 필요로 남긴다. 고정 TTL은 오래된 캐시가 남는 시간을 제한할 뿐, 인증 유효성 검사나 권한 변경 즉시 반영을 대신하지 않는다. [Spring Data Redis의 TTL 설명](https://docs.spring.io/spring-data/redis/reference/redis/redis-cache.html)을 기준으로 표현을 바로잡았다.

경계 이벤트도 같은 원칙으로 처리했다.

- **로그아웃**: 세션 무효화와 함께 해당 사용자의 캐시 키를 즉시 삭제
  (`@CacheEvict` / 로그아웃 핸들러에서 키 삭제). TTL이 남아 있어도 세션이
  끝나면 캐시도 끝난다.
- **관리자가 권한을 변경**: 대상 사용자의 캐시 키를 evict. 그 사용자는
  다음 캐시 미스에서 최신 권한을 다시 조회하도록 의도했다. 삭제 실패·경합에 대한 검증 기록은 확인이 필요하다.

키는 `userPermissions::{username}:{codeGroup}` 형태로 잡아, 사용자 한 명의
권한을 코드 그룹별로 구분했다. 사용자명만 지정한 `@CacheEvict`는 이 복합 키 전체를 지워주지 않는다. 해당 사용자의 모든 코드 그룹 키를 삭제하는 실제 구현과 다중 세션·테넌트 구분은 확인 필요다. 전체 flush는 다른 사용자 캐시도 지우므로 별도 정책이 필요하다.

## 결과

- 화면 하나를 그릴 때 나가던 권한 조인 쿼리 여러 건이 **로그인 후 첫 조회
  이후 캐시 히트에서는 0건**이 됐다. 만료·삭제 후에는 DB 조회가 다시 발생한다. 권한 조회가 DB 다중 조인 왕복에서 Redis 메모리 조회로
  바뀌면서, 셀렉트 박스가 집중된 관리 화면 기준으로 **약 10초까지 지연되던 페이지
  전환·렌더링 응답 속도가 0.10초 이내**로 단축됐다고 기록했다. 측정 시작·종료 지점, 반복 횟수, 동시 사용자 수와 원본 로그는 저장소에 없어 확인이 필요하며 Redis 자체 명령 지연과 동일한 수치로 해석하지 않는다.
- DB 입장에서는 접속자 수 × 화면 이동 수만큼 반복되던 동일 조인이
  사라졌다 — 캐시는 응답 속도만이 아니라 **DB의 여유**를 만드는 장치였다.

## 배운 점

- **캐시 설계의 절반은 TTL과 무효화 정책이다.** "Redis를 붙였다"가 아니라
  "캐시 수명을 무엇에 정렬했고, 어떤 이벤트에 지우는가"가 설계의 실체였다.
  권한처럼 민감한 데이터일수록 TTL은 성능 파라미터가 아니라 정합성 규칙이다.
- **캐시하기 좋은 데이터부터 골라야 한다.** 읽기 빈도, 변경 빈도, 일관성
  요구 수준을 먼저 따져보면 권한/코드성 데이터가 1순위로 나온다. 반대로
  실시간성이 필요한 데이터에 같은 패턴을 쓰면 사고가 된다.
- **만료와 무효화는 다른 책임이다.** 고정 TTL, 명시적 로그아웃, 세션 자연 만료, 관리자 권한 변경을 나눠 검증해야 한다. 권한을 확인할 수 없는 장애 상황에서 허용으로 처리해서는 안 된다.
