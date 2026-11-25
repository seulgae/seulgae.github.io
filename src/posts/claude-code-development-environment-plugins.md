---
title: AI 툴 활용법 · Claude 01 — 개발 환경 구축 및 필수 플러그인 정리
date: 2026-11-24
createdAt: 2026-11-24T21:34:31+09:00
tags: Claude, Claude Code, AI, MCP, LSP
summary: Claude Code에서 플러그인과 MCP를 설정하는 방법, 29개 확장 기능의 역할, 설계부터 검증까지 단계별 활용 계획을 정리했다.
category: ai-tools
---

[보안 점검에 Claude를 활용했을 때](/blog/claude-assisted-security-remediation)는 취약점 유형별로 세션을 나눠 조치안을 검토하고, 수정 후 브라우저에서 기능을 함께 확인했다. 이후 직접 재테스트하고 기존 데이터와 대조했다. AI가 코드를 읽고 화면을 확인하는 동안에도, 어떤 동작과 데이터를 검증해야 하는지는 개발자가 정해야 했다.

이번에는 그 방식을 사이드 프로젝트와 기술 학습에도 적용할 수 있도록 Claude 개발 환경을 구성했다. **요구사항을 정리하고, 프로젝트 버전에 맞는 근거를 찾고, 변경한 코드가 의도대로 동작하는지 확인하는 과정**에 각각 어떤 도구를 쓸지 정리했다. 학습할 때는 설계에 영향을 주는 핵심 로직을 직접 구현하고, 선택 이유를 설명할 수 있는지도 확인할 계획이다.

## Claude 확장 기능은 어디에 쓰이는가

| 구성 요소 | 역할 |
| --- | --- |
| 플러그인(Plugin) | 스킬, 서브에이전트, 훅, MCP 서버나 언어 서버 설정 등을 묶어서 배포한다. |
| 커넥터(Connector) | GitHub나 Google Workspace처럼 외부 서비스의 데이터와 기능을 Claude에서 사용할 수 있게 연결한다. |
| MCP | Claude 같은 클라이언트가 서버가 제공하는 도구와 리소스 등을 사용할 때 따르는 표준 프로토콜이다. |
| 스킬(Skill) | 특정 작업에서 참고할 지침, 예제, 절차를 제공한다. |
| 서브에이전트(Subagent) | 코드 탐색이나 리뷰처럼 역할이 정해진 작업을 별도의 컨텍스트에서 수행한다. |
| 훅(Hook) | 세션 시작이나 파일 편집 같은 이벤트에 맞춰 설정한 작업을 실행한다. |
| 명령(Command) | `/` 명령으로 기능이나 워크플로를 직접 호출한다. 스킬도 `/` 명령으로 호출할 수 있다. |
| LSP | 개발 도구와 언어 서버 사이의 통신 규약이다. 정의 위치, 참조, 진단 정보를 얻는 데 사용한다. |

예를 들어 문서 조회 기능을 담은 플러그인을 설치하면, 플러그인에 포함된 MCP 설정을 통해 조회 도구가 Claude Code에 연결될 수 있다. LSP는 프로젝트 소스에서 심볼이 어디에 선언되고 어떻게 참조되는지 살필 때 사용한다. [Claude Code 확장 기능 안내](https://code.claude.com/docs/en/features-overview) · [MCP 소개](https://modelcontextprotocol.io/) · [LSP 명세](https://microsoft.github.io/language-server-protocol/)

## 터미널에서 시작하고 연결 상태 확인하기

1. 운영체제에 맞는 방법으로 Claude Code를 설치한다. 새 터미널에서 `claude --version`을 실행해 버전이 출력되는지 확인한 다음, 프로젝트 루트에서 `claude`를 실행하고 로그인한다. [Claude Code 빠른 시작](https://code.claude.com/docs/en/quickstart)
2. Claude Code 세션에서 `/plugin`을 열고 **Discover**에서 필요한 플러그인을 찾는다. 설치할 때 **User**는 여러 프로젝트에 적용할 개인 설정, **Project**는 팀과 공유할 프로젝트 설정, **Local**은 해당 프로젝트에서만 쓰는 개인 설정에 해당한다. 설치 후 반영 안내가 나오면 `/reload-plugins`를 실행하고 **Installed**에서 상태를 확인한다. [Claude Code 플러그인 설치와 관리](https://code.claude.com/docs/en/plugins/install)
3. 외부 서비스 커넥터는 Claude의 커넥터 설정에서 인증하고, 별도로 연결하는 MCP 서버는 제공자의 설치 문서를 따른다. 터미널 세션에서는 `/mcp`를 열어 서버와 인증 상태를 확인한다. Claude 웹에서 연결한 커넥터를 터미널에서 불러오려면 Claude 구독 계정으로 로그인해야 한다. [Claude Code MCP 설정](https://code.claude.com/docs/en/mcp)
4. 연결한 도구를 작게 시험해 본다. Context7에는 프로젝트 의존성 버전에 맞는 문서 한 건을, LSP에는 이미 위치를 아는 메서드의 정의와 참조를 물어본다. GitHub는 접근 권한이 있는 저장소의 PR 조회부터, 브라우저 도구는 개발 서버에서 페이지 이동과 입력 확인부터 시작할 수 있다.

Claude Code 세션에서 아래 명령을 실행하면 공식 마켓플레이스의 `feature-dev` 플러그인을 이름으로 설치할 수 있다. [Anthropic 공식 플러그인 저장소](https://github.com/anthropics/claude-plugins-official)

```text
/plugin install feature-dev@claude-plugins-official
/reload-plugins
```

## 11월 24일 기준 설치 기록

| 구분 | 수량 |
| --- | ---: |
| 커넥터 및 MCP 서버 | 11개 |
| 그 밖의 플러그인 | 18개 |
| 합계 | 29개 |

기본 포함 기능을 제외하고, 2026년 11월 24일에 구성한 개인 환경의 항목을 세었다. 프로젝트에서는 작업에 필요한 기능을 골라 활성화할 계획이다.

### 코드와 문서, 브라우저를 연결하는 도구

| 도구 | 사용 목적 |
| --- | --- |
| Claude in Chrome | 로그인 상태가 필요한 화면을 열어 보고, 입력과 페이지 이동을 따라가며 UI 동작을 확인한다. [Chrome 연동 문서](https://code.claude.com/docs/en/chrome) |
| Context7 | 라이브러리나 프레임워크 문서와 예제를 가져온다. 예를 들어 빌드 파일에서 Spring Boot 버전을 확인한 뒤 해당 버전에 맞는 트랜잭션 관리 문서와 원문 링크를 요청할 수 있다. [Context7](https://github.com/upstash/context7) |
| GitHub | 저장소, 이슈, PR을 조회해 변경 배경을 파악한다. 수정이나 생성처럼 상태를 바꾸는 작업의 범위는 연결한 계정과 도구에 부여된 권한에 달려 있다. [GitHub MCP 서버](https://github.com/github/github-mcp-server) |
| Playwright | 페이지 이동, 클릭, 입력 등을 수행해 사용자 시나리오를 확인한다. 지속적으로 검증할 흐름은 기대 결과를 명시한 Playwright 테스트 코드로 남길 계획이다. [Playwright MCP](https://github.com/microsoft/playwright-mcp) |
| Serena | 클래스와 메서드의 정의 및 참조를 찾아 기존 코드의 호출 흐름을 좁힌다. 공통 메서드를 고치기 전에 영향받는 호출부를 찾는 데 활용할 수 있다. [Serena](https://github.com/oraios/serena) |

Google Workspace는 개발 문서와 학습 기록을 관리하는 용도로 연결했다. 아래 여섯 가지는 11개 집계에 포함된다. 드라이브의 파일 검색과 개별 문서 편집은 서비스별 커넥터의 역할과 사용 중인 Claude 환경에 따라 달라진다. [Google Workspace 커넥터 안내](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors)

| 서비스 | 사용 목적 |
| --- | --- |
| Gmail | 이메일에서 업무 맥락과 관련 자료를 찾는다. |
| Google Calendar | 개발 일정과 학습 계획을 확인한다. |
| Google Docs | 기술 문서, 회고, 트러블슈팅 기록을 정리한다. |
| Google Drive | 프로젝트 자료와 문서를 검색하고 관리한다. |
| Google Sheets | 프로젝트 진척도와 데이터를 정리한다. |
| Google Slides | 기술 발표와 프로젝트 소개 자료를 정리한다. |

### 요구사항부터 변경 검토까지

| 플러그인 | 어떤 작업에 쓸 것인가 |
| --- | --- |
| Superpowers | 요구사항에 모호한 부분이 있으면 먼저 질문을 정리한다. 설계 대안과 구현 계획을 세우고, 테스트 주도 개발이나 체계적인 디버깅이 필요한 작업에 절차를 적용한다. [Superpowers](https://github.com/obra/superpowers) |
| `feature-dev` | 기존 기능과 맞물리는 신규 기능에서 진입점과 의존 관계를 조사하고, 설계 대안을 검토한 뒤 구현한다. |
| `claude-code-setup` | 프로젝트의 기술 스택과 폴더 구조를 바탕으로 어떤 MCP 서버, 스킬, 훅, 서브에이전트가 필요한지 검토한다. |
| `claude-md-management` | 변경을 반복하며 확인한 빌드 방법이나 프로젝트 작업 규칙을 `CLAUDE.md`에 정리한다. |
| `commit-commands` | 변경 범위를 살피고 커밋 메시지나 PR 설명을 작성한다. |
| `code-review` | 변경점에서 버그 가능성이나 프로젝트 규칙과 어긋난 부분을 검토한다. |
| `code-simplifier` | 중복된 분기나 읽기 어려운 구조를 다듬는다. 변경 후에는 관련 테스트로 기존 동작을 확인한다. |
| `pr-review-toolkit` | 테스트 누락, 조용히 무시되는 오류, 타입 불변 조건, 주석의 정확성 등 PR에서 놓치기 쉬운 부분을 관점별로 점검한다. |

Superpowers와 `feature-dev`는 계획 단계에서 겹치는 부분이 있다. 요구사항부터 다시 좁혀야 할 때는 Superpowers의 질문과 계획 절차를, 기존 코드에 기능을 덧붙이는 작업에서는 `feature-dev`의 코드 탐색과 설계 검토를 출발점으로 삼을 계획이다. [Anthropic 공식 플러그인 목록](https://github.com/anthropics/claude-plugins-official/blob/main/.claude-plugin/marketplace.json)

### 보안 검토에 쓰는 도구

| 플러그인 | 역할 |
| --- | --- |
| Security Guidance(`security-guidance`) | 파일을 편집할 때 주의가 필요한 코드 패턴을 훅으로 경고한다. |
| `claude-security` | 관리하는 저장소에서 인증·인가, 입력값 처리, 민감 정보 노출 등 잠재적인 문제를 코드 맥락과 함께 검토한다. [Claude Security 플러그인](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-security) |
| Semgrep Guardian(`semgrep`) | Semgrep 검사 결과를 코드를 작성하는 과정에 전달한다. 사용할 수 있는 검사 범위는 계정과 서비스 설정에 따라 달라진다. [Semgrep Guardian](https://semgrep.dev/guardian/) |

같은 변경에서 경고가 겹칠 수 있다. 검토할 때는 발견 건수보다 문제로 지목된 코드의 위치, 해당 입력이 실제로 들어오는 경로, 영향받는 동작을 먼저 확인할 계획이다. [Security Guidance 플러그인](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/security-guidance)

### 언어별 코드 탐색과 진단

| 플러그인 | 대상 언어 | 기반 언어 서버 |
| --- | --- | --- |
| `jdtls-lsp` | Java | Eclipse JDT Language Server |
| `pyright-lsp` | Python | Pyright |
| `typescript-lsp` | JavaScript, TypeScript | TypeScript Language Server |

Serena와 LSP 모두 심볼을 탐색하는 데 쓸 수 있다. 예를 들어 공통 메서드의 변경 영향은 호출부를 찾아 검토하고, 수정 직후 타입 오류나 진단 메시지는 언어 서버에서 확인할 수 있다. 플러그인에 따라 언어 서버 실행 파일이나 런타임을 별도로 준비해야 하므로, 설치 후 프로젝트 안에서 정의 탐색과 진단이 동작하는지 확인한다. [Claude Code의 코드 인텔리전스](https://code.claude.com/docs/en/features-overview)

### 프론트엔드, 기술 학습, 확장 기능 개발

| 플러그인 | 어떤 작업에 쓸 것인가 |
| --- | --- |
| `frontend-design` | 반응형 화면의 레이아웃과 컴포넌트를 설계하고, 프로젝트 전반의 시각적 일관성을 살핀다. |
| `learning-output-style` | 세션 시작 훅으로 설명과 실습을 유도한다. 사이드 프로젝트에서 핵심 로직을 직접 작성하고, 구현 선택과 예외 상황을 설명하는 연습에 활용할 계획이다. [Learning Style 플러그인](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/learning-output-style) |
| `playground` | 조작할 수 있는 HTML 실험 화면을 만든다. 인덱스 탐색 경로나 트랜잭션 격리 수준을 예제로 모델링하고, 모델의 가정은 실제 DB의 실행계획이나 동시 트랜잭션 결과와 대조할 계획이다. [Playground 플러그인](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/playground) |
| `plugin-dev` | 프로젝트별 반복 작업을 스킬이나 훅으로 만들어 보고, 필요한 명령과 서브에이전트, MCP 설정을 플러그인으로 묶는 데 활용할 계획이다. |

## 개발 단계별로 남길 결과

| 단계 | 활용할 도구 | 확인하거나 남길 결과 |
| --- | --- | --- |
| 요구사항·조사 | Superpowers, Context7 | 요구사항, 제약, 사용 중인 버전과 근거 문서 |
| 설계·코드 분석 | `feature-dev`, Serena, LSP | 수정할 진입점과 호출부, 설계 대안과 선택 이유 |
| 구현·학습 | `feature-dev`, `frontend-design`, `learning-output-style`, `playground` | 구현 변경점, 직접 작성한 핵심 로직, 실험 결과 |
| 테스트 | Superpowers, Playwright | 단위·통합 테스트 결과와 브라우저에서 확인한 사용자 흐름 |
| 리뷰·보안 | `code-review`, `pr-review-toolkit`, `code-simplifier`, `claude-security`, Semgrep Guardian | 회귀 가능성, 누락된 테스트, 보안 검토와 조치 근거 |
| 형상 관리·문서화 | GitHub, `commit-commands`, Google Docs, `claude-md-management` | 변경 이유를 담은 PR과 이후 다시 적용할 프로젝트 규칙 |

## 바로 활용할 프롬프트

### 신규 기능 설계

> 기존 프로젝트에서 관련 기능의 진입점과 호출 관계를 찾아 줘. Context7으로 현재 의존성 버전에 맞는 문서를 확인하고, Superpowers와 feature-dev를 활용해 설계 대안과 각각의 장단점을 정리해 줘. 코드 작성 전에 변경할 범위와 테스트 전략을 먼저 제시해 줘.

### 장애 및 오류 분석

> 먼저 오류가 발생하는 조건과 기대 동작을 정리해 줘. Serena로 관련 메서드와 호출부를 추적하고, 원인으로 판단한 근거와 추가로 확인할 가설을 알려 줘. 같은 실패를 재현하는 테스트와 수정 방안을 제안해 줘.

### 기술 원리 학습

> 공식 문서를 근거로 이 기능의 실행 흐름과 예외 상황을 설명해 줘. 동시성이나 성능에 영향을 주는 설계 결정을 짚고, 내가 직접 구현할 핵심 로직을 남겨 줘. 구현 후 선택 이유를 설명할 수 있도록 면접 질문과 후속 질문을 만들어 줘.

### 변경점 리뷰와 보안 검토

> 현재 변경한 코드에서 기존 동작의 회귀, 테스트 누락, 예외 처리와 보안 문제를 검토해 줘. 발견한 항목마다 코드 위치, 발생 조건, 영향, 심각도와 조치 방향을 적어 줘. 변경을 적용하기 전에 검토 결과를 먼저 보여 줘.

## 다음 글에서 살펴볼 것

이번 글은 설치 시점의 구성과 프로젝트 적용 계획을 정리한 기록이다. 다음에는 MCP 요청이 어떻게 흘러가는지 살펴보고, `CLAUDE.md`에 둘 지침과 스킬이나 훅으로 옮길 반복 작업을 실제 사이드 프로젝트에서 골라 볼 예정이다.

효과는 결과를 검토하는 데 든 시간과 다음 작업에 남긴 근거를 함께 보고 판단하려고 한다. 생성한 코드는 직접 읽고 관련 테스트로 검증하며, 인증 정보는 프로젝트 지침이나 프롬프트에 넣지 않는다. 앞으로는 어떤 문서와 테스트가 설계 판단에 도움이 됐는지, 어느 단계에서 직접 확인하는 편이 효율적이었는지 기록할 계획이다.
