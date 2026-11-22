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

---

## 면접 연습 Q3 — 당시 연동 역할과 Kafka 원리 연결

### Q3. Kafka의 토픽이 무엇이고, 시스템 간 연계는 어떻게 이루어졌나요?

#### 현재 준비한 답변 — 원문 보존

> 네, Kafka에서 토픽은 메시지를 업무나 종류별로 구분해서 저장하는 논리적인 공간이라고 이해하고 있습니다.
>
> Kafka는 메시지를 발행하는 Producer와 메시지를 구독하여 처리하는 Consumer로 구성됩니다.
>
> 제가 경험한 통신사 시스템에서는 원천 시스템이 Producer 역할을 수행하여 변경된 데이터를 Kafka 토픽에 발행하고, 응용 시스템이 Consumer 역할을 수행하여 해당 데이터를 가져와 처리하는 구조였습니다.
>
> 예를 들어 원천 시스템에서 특정 데이터가 변경되면 변경 이벤트를 Kafka 토픽에 발행하고, 응용 시스템에서는 해당 이벤트를 구독하여 필요한 데이터를 반영하는 방식입니다.
>
> Kafka는 데이터를 직접 다른 데이터베이스에 반영하는 것이 아니라 메시지를 저장하고 전달하는 역할을 하며, 실제 데이터 검증과 반영은 Consumer 측에서 처리합니다.
>
> 다만 저는 Kafka 자체를 구축하거나 튜닝한 것은 아니고, 시스템 간 연동 과정에서 발생하는 데이터 불일치와 처리 오류를 분석하고 담당 파트와 협업하여 해결하는 업무를 수행했습니다.

#### 기술적 검증

| 구분 | 확인 내용 |
| --- | --- |
| [검증 완료: 일반 원리] | Topic·Partition·Producer·Consumer·Group·offset은 위 본문과 공식 문서로 복습한 개념 |
| [실무 경험] | 원천 이벤트를 GW가 구독하고 키·컬럼을 변환해 응용 DB에 반영한 구조라는 기존 기록 |
| [확인 필요] | 당시 Topic/Partition 수, group.id, 실제 재시도·offset commit 순서, 예외 격리 방식 |
| 원문 보완 | 응용 시스템 전체를 Consumer라 부르는 설명보다, 논리적인 구독·변환 역할을 GW로 표시하면 담당 경계가 명확함 |
| 경험의 범위 | Kafka 인프라 구축·튜닝·전체 exactly-once 설계 경험으로 확대하지 않음 |

#### 업무 데이터 흐름과 예제

```text
원천 시스템의 이벤트 발행 → Kafka Topic의 Partition
  → GW의 구독·키/컬럼 매핑 → 응용 DB 반영
  → 오류 수집·담당 파트 조치 → 모니터링 재검증
```

이 그림은 [기존 GW 경험 기록](/blog/kafka-gw-data-integrity)의 논리 흐름이다. 실제 토폴로지·비동기 실행기·배포 구성을 새로 확인한 것은 아니다. 소스 발행 확인, Kafka 저장, Consumer 수신, 대상 DB commit은 서로 다른 관측 지점이다.

**[사후 학습]** 처리 후 DB commit과 offset commit 사이에서 중단되면 재수신·중복 반영 가능성을 조사해야 한다. 반대로 처리보다 먼저 소비 위치를 확정하면 처리 누락 위험을 검토해야 한다. 이것이 당시 코드의 실제 순서였다는 뜻은 아니다. 현재 소유한 자료에는 운영 Consumer 코드가 없어 실제 코드를 인용하지 않는다.


**[사후 학습: 미실행 의사 코드]** 아래는 한 파티션을 순차 처리할 때의 단순 비교 모델이다. 실제 Consumer 코드나 설정이 아니다.

```text
record 수신
→ 업무 키·형상 검증
→ DB 트랜잭션에서 반영하고 commit
→ 성공한 record 다음 offset을 확정
실패 시: 해당 파티션의 완료 위치를 실패 record 너머로 앞당기지 않음
```

이 순서에도 DB commit 뒤 offset 확정 전 장애가 나면 같은 record를 다시 받을 수 있다. 따라서 업무 반영의 멱등성이 별도로 필요하다. 여러 파티션·병렬 처리·재시도 토픽을 섞는 구현은 이 단순 모델만으로 검증할 수 없다.

#### 최종 면접 답변

> 토픽은 메시지를 종류별로 구분하는 논리 단위이고, 실제 저장과 순서의 기본 단위는 파티션이라고 이해합니다. 당시 구조는 원천에서 이벤트를 발행하고 GW가 구독해 키와 컬럼을 변환한 뒤 응용 DB에 반영하는 흐름이었습니다. Kafka가 대상 업무 테이블에 직접 INSERT하는 것은 아닙니다. 저는 연동 개발·운영 중 데이터 불일치와 오류 대응을 맡았고 Kafka 인프라를 구축하거나 튜닝하지는 않았습니다. 실제 그룹 설정이나 DB 반영과 offset commit의 순서는 당시 자료로 확인해야 합니다.

#### 예상 꼬리 질문과 답변

- **Topic과 Partition은 같은 건가요?** “Topic은 논리 분류이고 저장·순서는 파티션 단위로 봅니다. 전체 Topic의 순서 보장을 가정하지 않습니다.”
- **Consumer Group을 직접 설정했나요?** “이번 자료로 당시 설정을 확인하지 못했습니다. 같은 그룹이 파티션을 나눠 소비하는 원리는 사후 학습으로 설명하겠습니다.”
- **Kafka가 DB까지 알아서 반영하나요?** “대상 DB 반영은 Consumer 역할을 하는 GW·연동 코드의 책임이었습니다. 별도 connector 도입 여부는 추정하지 않겠습니다.”
- **메시지를 다시 받으면 어떻게 되나요?** “같은 업무 효과가 중복되지 않도록 설계해야 합니다. 당시 GW의 멱등 처리 방식은 원본 코드 확인이 필요합니다.”

#### 관련 글

[기업 면접 Q&A 매핑](/blog/interview-mnwise-ts-prep), [GW 오류 관리 Q1·Q2](/blog/billing-gw-integration-error-interview-review), [전달 보장과 멱등성](/blog/message-delivery-idempotency).
