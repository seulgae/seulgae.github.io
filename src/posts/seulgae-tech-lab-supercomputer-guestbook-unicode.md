---
title: 슬개기술연구소 — 연구 기록을 옮기고 짧은 방명록의 입력 계약을 맞추기
date: 2026-11-17
createdAt: 2026-11-17T19:38:32+09:00
tags: Phaser, React, Spring Boot, PostgreSQL, Unicode
summary: 공유 맵으로 연구 기록 위치를 옮기고 방명록의 글자 수 제한을 화면·서버·DB에 적용한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

로비 컴퓨터가 연구 아이디어를 여는 역할을 맡고 있었지만 연구 활동은 개발 연구실에 두는 편이 공간의 의미에 맞았다. PR #45의 V6 확장과 #46의 `f4651b6`에서는 연구 기록을 슈퍼컴퓨터로 옮기고 로비에는 짧은 방명록을 만들었다.

## 창을 고치지 않고 기능의 위치를 바꾸기

공유 맵은 상호작용의 종류와 위치를 가진다. 연구 기록을 여는 종류는 유지하고 개발 연구실의 가운데 장비로 위치를 옮겼다. React 연구 기록 창을 복제할 필요가 없었다. 빌드 정보는 작업대로, 방명록은 로비 키오스크로 역할을 나눴다.

새 슈퍼컴퓨터는 여러 캐비닛이 이어진 텍스처와 불빛으로 표현했다. 중요한 것은 외형을 바꾸는 동안 충돌·의자·상호작용 영역을 함께 확인하는 일이었다. 실제 그림과 E 대상의 위치가 다르면 사용자는 장비가 고장 났다고 느낀다.

## 짧은 입력도 글자 수의 의미부터 맞추기

방명록은 제목 8자, 내용 130자로 제한했다. 문자열의 length를 쓰면 이모지처럼 UTF-16 두 코드 단위를 쓰는 문자가 다르게 계산될 수 있다.

현재 `frontend/src/features/guestbook/guestbookApi.ts`의 처리다.

```ts
export const charCount = (value: string) => Array.from(value.trim()).length
/** 입력값을 최대 글자 수까지만 남긴다(앞 공백은 그대로 두어 입력 중 커서가 튀지 않게 한다). */
export const clip = (value: string, max: number) => Array.from(value).slice(0, max).join('')
```

보낼 값의 유효성은 앞뒤 공백을 제외해 검사하지만 입력 중에는 앞 공백을 보존한다. 사용자가 쓰는 도중 커서가 갑자기 움직이지 않게 하기 위해서다.

서버도 같은 코드 포인트 기준을 사용한다. `backend/src/main/java/kr/seulgae/techlab/lobby/guestbook/GuestbookService.java`의 검사다.

```java
        String stripped = value == null ? "" : value.strip();
        if (stripped.isEmpty() || stripped.codePointCount(0, stripped.length()) > max) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " must be 1-" + max + " characters");
        }
        return stripped;
```

이 기준은 기본적인 서로게이트 쌍을 맞추지만 결합 문자나 여러 코드 포인트가 합쳐진 이모지까지 ‘사람이 보는 한 글자’로 세는 규칙은 아니다. 코드 포인트와 시각적 문자 단위를 같다고 확대하면 안 된다.

프런트의 요청 전 검사도 같은 제한을 사용한다.

```ts
export const validEntry = (title: string, content: string) =>
  charCount(title) >= 1 && charCount(title) <= GUESTBOOK_TITLE_MAX && charCount(content) >= 1 && charCount(content) <= GUESTBOOK_CONTENT_MAX
```

V6에는 DB CHECK도 넣었다. 화면 제한을 우회한 요청에도 서버와 저장소가 계약을 지키게 한다. 계층별 모든 Unicode 공백의 동일 판정은 확인하지 않았다.

## 맵을 바꾸면 테스트의 출발점도 달라진다

기존 Scene 테스트의 플레이어 시작 위치가 새 작업대 범위 안에 들어가 E가 연구 기록 대신 빌드 정보를 열었다. 기능 연결 오류가 아니라 맵 변경 뒤 테스트 좌표가 다른 대상을 가리킨 문제였다. 실제 스폰과 구별해 테스트 시작 위치를 문 앞으로 옮겼다.

로그에는 로컬에서 방명록 입력 제한·등록, 9자 제목 API 거부, 슈퍼컴퓨터의 연구 기록 연결을 확인했다고 남아 있다. V6 운영 적용 후 확인은 당시 남은 항목이었다. 운영 결과는 **확인하지 못함**이다.

## 배운 점

상호작용 종류와 위치를 데이터로 나누면 UI를 복제하지 않고 기능을 옮길 수 있었다.
글자 수는 화면과 서버가 어떤 단위를 세는지 먼저 합의해야 했다.
공간 변경 뒤 실패한 테스트는 대상 선택 좌표부터 다시 확인해야 했다.
