---
title: 슬개기술연구소 — 화분의 보상에도 서버 추첨과 장부가 필요했다
date: 2026-11-21
createdAt: 2026-11-21T21:57:51+09:00
tags: Spring Boot, PostgreSQL, Phaser, TypeScript
summary: 식물 행운의 스키마 확장과 서버 추첨·쿨다운·일일 한도를 구현한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

화분을 흔드는 짧은 연출에 가끔 동전이 떨어지는 보상을 붙였다. 로그 30·31번의 V8 확장 `bf80013`과 기능 `ad3dab0`을 대조했다. 후속 점검에서 #53·#54의 main 병합을 확인했다. 운영 V8 적용·배포 결과는 미확인이다.

## 공통코드도 먼저 준비하기

동전 장부의 사유는 공통코드를 참조한다. 서버가 새 보상 사유를 기록하기 전에 DB에 그 코드가 있어야 한다. `backend/src/main/resources/db/migration/V8__plant_luck.sql`의 변경이다.

```sql
INSERT INTO lab.common_codes (code_group, code, name, sort_order) VALUES
    ('COIN_REASON', 'PLANT_LUCK', '식물 행운', 5);
```

새 테이블이 없어도 확장 → 마이그레이션 → 사용 순서를 지킨다. 코드 한 행이라도 준비를 생략하면 외래키 오류로 보상이 실패할 수 있다.

## 화면은 흔들고 서버는 당첨을 결정하기

클라이언트는 흔들기 요청만 보내고 서버가 5% 확률과 1~3원 금액을 결정한다. 화면이 당첨을 정해 요청을 조작하는 일을 막기 위해서다.

구현 커밋의 `backend/src/main/java/kr/seulgae/techlab/inventory/InventoryService.java`에서 발췌했다.

```java
        long now = clock.getAsLong();
        Long last = lastShake.put(member, now);
        if (last != null && now - last < PLANT_COOLDOWN_MS) return new PlantResult(0, store.coins(member));
        if (store.countToday(member, PLANT_LUCK) >= PLANT_DAILY_WINS || random.nextDouble() >= PLANT_LUCK_CHANCE) return new PlantResult(0, store.coins(member));
        int amount = PLANT_LUCK_MIN + random.nextInt(PLANT_LUCK_MAX - PLANT_LUCK_MIN + 1);
        return store.changeCoins(member, amount, PLANT_LUCK).map(coins -> new PlantResult(amount, coins))
            .orElseGet(() -> new PlantResult(0, store.coins(member)));
```

2초 쿨다운은 회원별 요청 시각을 메모리에 둔다. 거절된 연타도 마지막 시각을 갱신하므로 계속 누르는 동안에는 다시 추첨되지 않는다. 재시작하면 이 기록은 사라지지만 하루 당첨 횟수는 한국 날짜 기준 DB 장부로 센다.

하루 10회와 최대 3원의 조합은 설계상 하루 최대 30원을 의도한다. 다만 횟수 조회와 보상 쓰기가 별개이므로 여러 서버·동시 요청에서도 엄격한 일일 상한이 보장되는지는 **확인하지 못함**이다. 서버 추첨이라고 화분 근처에 있는지까지 검증한 구조도 아니다.

## 테스트에서는 추첨을 고정하기

서비스는 난수 생성기와 시계를 주입받는다. 운영에서는 SecureRandom을 사용하고 테스트에서는 당첨·금액·시간을 정해 결과를 재현한다. 확률 기능을 ‘충분히 많이 돌리면 가끔 성공’으로만 검사하지 않게 한 선택이다.

같은 커밋의 `frontend/src/features/inventory/inventoryStore.ts`는 서버 결과에 따라 기존 동전 연출을 재사용한다.

```ts
        set({ ...state, coins })
        globalThis.dispatchEvent?.(new CustomEvent(COIN_EVENT, { detail: { amount: won } }))
        return won
```

비회원은 보상 API에서 거부되지만 흔들기 그림은 볼 수 있다. 로그에는 백엔드 86개·프런트 120개 테스트와 타입 검사 통과가 남아 있다. 회원 기능의 실제 화면과 운영 V8 적용은 당시 확인하지 못했고 실행하지 않았다.

## 배운 점

새 공통코드 값도 참조하는 기능보다 먼저 배포돼야 했다.
추첨과 시계를 주입하면 무작위 보상을 결정적인 테스트로 확인할 수 있었다.
서버 추첨·쿨다운·일일 한도는 각각 다른 보장 범위를 가진 규칙이었다.
