---
title: 슬개기술연구소 — 간식 구매를 동전과 기력의 하나의 거래로 다루기
date: 2026-11-17
createdAt: 2026-11-17T20:41:19+09:00
tags: Spring Boot, PostgreSQL, React, Game Economy
summary: HP·피로도 스키마 확장과 조건부 차감·회복, 실패 시 결제 복원을 연결한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

무료 연출이던 로비 간식에 가격과 회복 역할을 붙였다. 로그 26·27번은 PR #48의 V7 확장과 #49의 `3e88e61`로 이어진다. 회원은 업무와 오락에 기력을 쓰고 케이크와 커피로 회복한다. 동전과 능력치를 따로 바꾸다 실패하면 돈만 줄어드는 문제가 생길 수 있어 거래의 경계를 먼저 정했다.

## 현재 값과 최대치를 함께 저장하기

HP와 피로도는 기본 최대 50으로 시작한다. 이 프로젝트의 피로도는 남은 기력처럼 높을수록 좋은 값이다. 누적 피로와 방향이 다르다.

`backend/src/main/resources/db/migration/V7__vitals.sql`의 범위 제약이다.

```sql
    ADD CONSTRAINT inventories_hp_range CHECK (hp BETWEEN 0 AND hp_max),
    ADD CONSTRAINT inventories_fatigue_range CHECK (fatigue BETWEEN 0 AND fatigue_max);
```

최대치도 회원별 열로 두어 기본값과 현재 상한을 구별했다.  열 추가의 실제 운영 잠금 시간은 이번 기록에서 확인하지 않았다.

## 범위 검사는 갱신문에도 들어가야 한다

일과 오락은 HP 3, 피로도 5를 사용한다. 회복은 최대치에서 멈추고 차감은 0 아래로 내려가지 않아야 한다. 현재 `backend/src/main/java/kr/seulgae/techlab/inventory/JdbcInventoryStore.java`의 SQL이다.

```sql
            UPDATE lab.inventories SET hp = LEAST(hp_max, hp + :hp), fatigue = LEAST(fatigue_max, fatigue + :fatigue), updated_at = CURRENT_TIMESTAMP
            WHERE member_id = :m AND hp + :hp >= 0 AND fatigue + :fatigue >= 0 RETURNING hp, hp_max, fatigue, fatigue_max
```

사전 조회는 안내에 필요하지만 그 뒤 상태가 바뀔 수 있다. 실제 차감에도 조건을 걸고 DB CHECK를 마지막 방어로 둔다. 화면은 고정 회복량을 그대로 표시하지 않고 서버 응답의 변화량을 사용한다. 47에서 최대 50으로 회복했다면 +10 대신 실제 +3을 보여 주는 방식이다.

## 결제 중간에 실패하면 되돌리기

현재 `backend/src/main/java/kr/seulgae/techlab/inventory/InventoryService.java`의 오락실 결제다.

```java
    @Transactional
    public int playArcade(UUID member) {
        ensureFit(member);
        int coins = store.changeCoins(member, -ARCADE_COST, ARCADE_PLAY)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT, "Not enough coins"));
        spend(member);
        return coins;
    }
```

기력 확인 뒤 동전을 차감하고 기력을 줄인다. 마지막 차감이 실패하면 앞선 결제도 롤백해야 한다. 간식은 케이크 3원에 HP 10, 커피 2원에 피로도 5를 회복한다. 이미 가득한 상태와 동전 부족, 기력 부족을 각각 다른 상태 코드로 구분해 화면이 원인에 맞는 안내를 고르게 했다.

가득 찼는지 읽은 뒤 동시 구매가 들어오는 경우까지 직렬화했는지는 별도 검토가 필요하다. 트랜잭션만으로 모든 경쟁 조건을 해결했다고 표현하지 않았다.

비회원은 기존처럼 무료로 즐기고 회원에게만 지속되는 능력치와 결제를 적용한다. 서버와 화면 모두 이 구분을 따른다.

기록에는 차감·회복·상한, 가득할 때 구매 거부, 지친 상태의 오락 거부와 잔액 유지, 커피 뒤 복구 테스트가 남아 있다. 회원 화면은 당시 로컬에서 확인하지 못했고 이번에도 운영 구매 결과는 **확인하지 못함**이다.

## 배운 점

재화와 능력치를 함께 바꾸는 행동은 하나의 거래로 정의해야 했다.
사용자 안내용 조회와 실제 데이터 보호용 조건부 갱신은 역할이 달랐다.
상태 이름과 수치의 방향, 실제 변화량까지 UI 계약에 포함해야 했다.
