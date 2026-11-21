---
title: 슬개기술연구소 — 움직이는 NPC와 저녁 포장마차의 시간을 분리하기
date: 2026-11-21
createdAt: 2026-11-21T22:53:30+09:00
tags: Phaser, TypeScript, Spring Boot, PostgreSQL, Game Economy
summary: V9 확장과 시민·아이·낚시꾼 NPC, 저녁 물고기 판매를 연결한 PR #57·#58을 코드와 기록으로 정리했다.
category: seulgae-tech-lab
---

정적인 방에 산책하는 시민과 청소하는 NPC를 더하고, 저녁에 물고기를 파는 포장마차를 연결하는 작업이다. 첫 점검 때 #58은 Draft였지만 최종 확인에서 main 병합을 확인했다. 최종 구현 `c44d6ab`을 기준으로 읽었으며 운영 반영 확인과는 구분한다. 로컬 작업 중 수정은 인용하지 않았다.

## 고정 맵에 움직이는 대상을 억지로 넣지 않기

공유 맵의 상호작용은 고정 위치를 전제로 한다. NPC가 걸으면 매 프레임 접근 위치도 바뀌어야 한다. RoomFx가 현재 대상을 반환하고 Scene이 기존 대상 선택 경로에서 거리를 비교하게 확장했다.

해당 커밋의 `frontend/src/game/npc/Npc.ts`는 현재 좌표에서 대상 영역을 만든다.

```ts
  target(): RoomInteraction {
    return { id: this.def.id, kind: 'npc', label: `${this.def.name}에게 말 걸기`, x: this.x, y: this.y - 20, width: 24, height: 40, range: this.def.fixed ? 22 : 30 }
  }
```

NPC는 정해진 경로를 걷다가 쉬고, 말을 걸면 멈춰 상대를 본다. 청소 NPC는 혼잣말도 한다. 경로와 대사는 데이터로 나누고 걷기·말풍선은 객체가 관리한다. 경로 선분을 따라 장애물과 겹치는지 검사해 바위 모서리를 스치는 배치를 잡았다는 기록도 있다.

## 그림의 겹침은 충돌 영역만으로 찾을 수 없다

처음 포장마차는 참나무 수관에 가려졌다. 나무의 물리 영역은 작은 밑동이지만 실제 그림은 위로 넓기 때문이다. 통행에 적합한 자리와 그림이 읽히는 자리는 다르다. 중간에는 흙길 교차점으로 옮겼고 최종 커밋은 호수 오른쪽 가운데 풀밭에 놓았다. 아이 둘과 고정 낚시꾼도 추가하고, 문 앞 흙길을 넓혀 풀·꽃이 출입구를 가리지 않게 했다.

펫의 이름표 가림과 같은 맥락이다. 충돌 테스트가 통과해도 시각적 배치까지 보장하지 않으므로 실제 화면을 별도로 확인해야 한다.

## 판매 가격은 서버가 다시 계산하기

화면은 예상 가격을 보여 주지만 요청 금액을 그대로 받지 않는다. `backend/src/main/java/kr/seulgae/techlab/inventory/InventoryService.java`의 가격 계산 일부다.

```java
        double ratio = Math.max(0, Math.min(1, (cm - size[0]) / (double) (size[1] - size[0])));
        long value = Math.round(price[0] + ratio * (price[1] - price[0]));
        return (int) Math.max(1, Math.min(FISH_PRICE_MAX, value));
```

어종별 크기와 가격 구간으로 비례 계산하고 한 마리 최대 30원으로 제한한다. 판매는 현재 주인의 물고기를 조건부 삭제한 뒤 동전을 지급하는 트랜잭션이다. 가격 미리보기와 최종 소유권·보상 결정을 분리했다.

장부의 새 사유는 기능보다 먼저 준비했다. `backend/src/main/resources/db/migration/V9__fish_sale.sql`이다.

```sql
INSERT INTO lab.common_codes (code_group, code, name, sort_order) VALUES
    ('COIN_REASON', 'FISH_SALE', '물고기 판매', 6);
```

## 브라우저의 저녁과 서버의 저녁은 다를 수 있다

화면은 브라우저 시계로 18시 이후 포장마차를 보여 주고 서버는 Asia/Seoul 기준으로 판매를 허용한다. 한국 시간대가 아닌 브라우저에서는 가게 표시와 서버 허용이 어긋날 수 있다. 로그의 ‘같은 18시’는 모든 시간대에서 같은 순간이라는 뜻이 아니다.

PR에는 백엔드 93개·프런트 130개 테스트와 타입 검사·빌드, NPC·저녁 포장마차의 로컬 화면 확인이 기록돼 있다. 18시 등장 연출과 회원의 실제 판매는 확인하지 못했다. main 병합은 확인했지만 운영 판매·V9 실제 적용은 **확인하지 못함**이다.

## 배운 점

움직이는 대상은 고정 맵과 다른 위치 제공 경로가 필요했다.
그림의 가림과 물리 충돌은 별도 기준으로 검증해야 했다.
영업시간은 화면 시계와 서버 시간대가 같은 전제인지 확인해야 했다.
