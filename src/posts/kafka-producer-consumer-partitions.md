---
title: Kafka의 Topic·Partition·Consumer Group
date: 2026-11-22
createdAt: 2026-11-22T13:13:41+09:00
tags: Kafka, Producer, Consumer, Interview
summary: 기록의 저장·소비 단위와 순서·offset·리밸런싱을 연결하고 빌링 GW 운영 경험과 구분한다.
category: kafka-di
---

## 1. 학습 배경

빌링 GW 경험은 연동 오류를 분석하고 일일 집계·공유 체계를 만든 운영 경험이다. Kafka 클러스터 전체나 소비 프로토콜을 단독 설계했다는 뜻은 아니다. 이 글은 Apache Kafka 4.1 문서를 기준으로 기본 구조를 복습한다. 당시 버전·실제 설정은 확인 필요다.

## 2. 핵심 개념

Producer는 레코드를 보내고 Broker는 이를 저장·제공하며 Consumer는 읽는다. Topic은 논리적 분류이고 Partition은 저장·순서·병렬 소비의 기본 단위다. offset은 파티션 안에서 레코드의 위치를 가리키며 전체 시스템의 업무 식별자와는 다르다.

Consumer Group은 파티션을 나눠 소비하는 협력 단위다. 일반적인 소비자 그룹에서 한 파티션은 한 시점에 같은 그룹의 한 소비자에게 할당된다. 다른 그룹은 같은 Topic을 독립적으로 읽을 수 있다.

## 3. 동작 원리

```text
Producer → 키·partitioning 정책 → Topic의 Partition
  → Broker 저장·복제 → Group의 Consumer poll
  → 업무 처리 → 소비 위치 commit
```

순서는 전체 Topic보다 파티션 안에서 설명해야 한다. 같은 키가 같은 파티션으로 가도록 하더라도 파티션 수·분배 정책이 바뀌는 영향은 별도다. 애플리케이션에서 병렬 처리하면 처리 완료 순서도 다시 관리해야 한다. 구조와 전달 의미는 [Kafka 설계 문서](https://kafka.apache.org/41/design/design/)를 참고한다.

소비 위치와 commit 위치는 다를 수 있다. commit을 처리 완료의 안전한 기준과 맞추지 않으면 유실·중복 위험이 생긴다. 그룹 변경·실패로 리밸런싱이 발생하면 할당과 진행 중 작업을 확인한다. [Consumer 설정](https://kafka.apache.org/41/configuration/consumer-configs/)에서 자동 commit과 poll 관련 조건을 대조한다.

## 4. 실무 활용

**학습용 예제:** 고객별 순서가 중요하면 고객 키를 분배 기준으로 검토한다. 다만 특정 고객의 트래픽이 몰리면 파티션 편중이 생길 수 있다. 소비 지연이 늘면 생산량·처리 시간·실패 재시도·파티션 분포를 함께 본다. 소비자 수만 늘린다고 한 파티션의 처리량이 무한히 늘지는 않는다.

## 5. 주의사항 및 오개념

소비했다고 레코드가 즉시 삭제되는 일반 작업 큐 모델로 이해하지 않는다. 보관·압축 정책과 소비 위치는 별개다. `acks=all`은 모든 소비자의 업무 완료를 기다리는 설정이 아니다. 생산 측 내구성과 소비 측 처리 성공은 다른 관측 대상이다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| Partition을 나누는 이유는? 순서·병렬성 | “저장과 소비를 분산하기 위해서예요. 순서 보장 단위도 파티션이라 업무 키 설계와 함께 봐야 해요.” | 소비자가 더 많으면? |
| offset commit은 무엇인가? 재시작 위치 | “그룹이 다시 읽을 위치를 남기는 기준이에요. 업무 처리 전후 어느 시점에 확정하는지에 따라 실패 복구가 달라져요.” | 처리 후 commit 전에 죽으면? |
| lag가 늘면 무엇을 보나? 장애 분석 | “생산량, 실제 처리 속도, 실패·재시도, 파티션 편중과 리밸런싱을 같이 보겠습니다.” | 느린 외부 API가 원인이면? |

## 7. 핵심 요약

Topic·Partition·Group·offset을 구별한다. 과거 오류 감소 경험을 Kafka 내부 설계 경험으로 확대하지 않는다.

## 8. 참고 자료

- [Apache Kafka 4.1 — Design](https://kafka.apache.org/41/design/design/)
- [Apache Kafka 4.1 — Consumer Configs](https://kafka.apache.org/41/configuration/consumer-configs/)
- [Apache Kafka 4.1 — Producer Configs](https://kafka.apache.org/41/configuration/producer-configs/)

---

[이전 복습](/blog/messaging-sync-async-ums-flow) · [다음 복습](/blog/message-delivery-idempotency)
