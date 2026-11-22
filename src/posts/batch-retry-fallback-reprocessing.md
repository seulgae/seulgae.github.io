---
title: 배치 재처리와 대체 발송을 구분하기
date: 2026-11-22
createdAt: 2026-11-22T13:13:41+09:00
tags: Batch, Retry, Fallback, Messaging, Interview
summary: 배치 단위·재시작·재시도·채널 대체를 구별하고 발송 결과 미확인 상태의 중복 위험을 정리한다.
category: kafka-di
---

## 1. 학습 배경

NURI2 대상 추출과 발송 데이터 적재, 미발송 건 재처리 경로를 개발한 경험을 복습한다. 운영 중 실제 발송 실패가 있었던 것으로 기억하지 않으며, 재처리는 장애 해결 실적보다 실패 가능성을 고려한 설계로 설명한다. Spring Batch 사용 여부도 확인 없이 주장하지 않는다.

## 2. 핵심 개념

배치는 데이터를 일정 단위로 모아 처리하는 방식이고 스케줄링은 실행 시점을 정하는 기능이다. Spring Batch는 배치를 구성·재시작·관측하는 프레임워크이지 배치라는 개념 자체가 아니다.

Retry는 같은 작업의 재시도, 재시작은 중단된 실행의 진행 상태를 고려한 복구, fallback은 다른 수단으로의 전환이다. 알림톡 실패 후 SMS/LMS 발송은 같은 채널을 다시 시도하는 것과 다르다.

## 3. 동작 원리

```text
대상 선택 → 처리 권한 확보 → 변환·검증 → 결과 적재
  → 진행·결과 상태 기록 → 다음 단위
```

Spring Batch의 chunk 모델은 Reader·선택적 Processor·Writer와 커밋 단위를 연결한다. 전체 데이터가 반드시 하나의 트랜잭션인 것은 아니다. [Chunk 처리 문서](https://docs.spring.io/spring-batch/reference/step/chunk-oriented-processing.html)는 학습 비교 자료이며 실제 NURI2 배치 구현과 구분한다.

재시도는 일시 오류에서 회복 가능성이 있을 때 횟수·간격·최대 시간·최종 실패 처리를 정한다. 잘못된 수신자나 유효하지 않은 데이터 같은 영구 오류를 무한 반복하지 않는다. [Retry 문서](https://docs.spring.io/spring-batch/reference/retry.html)도 일시 실패를 설명한다. 재시도 구현 API는 버전별 차이가 있어 이 글에서는 고정하지 않는다.

## 4. 실무 활용

**학습용 상태 모델:** READY → PROCESSING → SUCCESS/FAILED/UNKNOWN을 구분한다. 발송 여부 N만으로 즉시 재처리하지 않는다. 아직 예약 중이거나 처리 중, 결과 미확인일 수 있기 때문이다.

여러 배치가 동시에 실행될 수 있다면 대상 점유를 원자적으로 하고, 중단 뒤 점유 해제·복구 조건을 정한다. 체크포인트만 저장해도 외부 전송이 중복될 수 있어 업무 키와 결과 대사가 필요하다. 이 상태 모델과 점유 방식이 당시 구현돼 있었다는 뜻은 아니다.

## 5. 주의사항 및 오개념

재시도를 빠르게 반복하면 장애 서비스의 부하를 키울 수 있다. backoff와 필요시 jitter를 검토한다. 채널 대체는 비용·동의·중복·템플릿 요구가 달라 업무 정책 확인이 필요하다. 직접 구현한 배치와 솔루션이 제공한 예약·대체 기능을 답변에서 나눈다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| Retry와 fallback 차이는? 복구 전략 | “같은 작업을 다시 하는 것과 다른 수단으로 바꾸는 차이예요. NURI2 채널 대체는 솔루션 기능이었어요.” | 전환 중 중복은 어떻게 보나? |
| 미발송이면 다시 보내나? 상태 의미 | “N이라는 값만 보지 않고 예약·처리 중·실패·결과 미확인을 구분해야 해요. 기존 요청 결과를 먼저 대조하겠습니다.” | 결과 조회도 실패하면? |
| 배치가 중간에 죽으면? 재시작 경계 | “완료 단위와 체크포인트, 재실행 시 중복 효과를 같이 보겠습니다. 프레임워크 재시작만으로 업무 멱등성이 생기지는 않아요.” | chunk 크기는 어떻게 고르나? |

## 7. 핵심 요약

언제 다시 할지보다 무엇을 다시 해도 되는지 먼저 정한다. 과거 기록과 새로 학습한 개선안을 명확히 나눈다.

## 8. 참고 자료

- [Spring Batch — Chunk-oriented Processing](https://docs.spring.io/spring-batch/reference/step/chunk-oriented-processing.html)
- [Spring Batch — Retry](https://docs.spring.io/spring-batch/reference/retry.html)
- [NURI2 배치 실무 복기](/blog/nuri2-message-batch-interview-review)

---

[이전 복습](/blog/message-delivery-idempotency) · [다음 복습](/blog/linux-process-service-log-analysis)
