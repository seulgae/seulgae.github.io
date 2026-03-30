# Seulgae Portfolio

개인 포트폴리오 사이트입니다. React + Vite 기반으로 구성되어 있으며, 프로젝트 경험, 교육, 수상, 자격, 출력용 이력서, 아키텍처 문서를 포함합니다.

## Stack

- React 19
- Vite 8
- React Router DOM 6
- Framer Motion
- GitHub Pages

## Local Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

```bash
npm run deploy
```

## Main Pages

- `/` : 홈
- `/ProjectsList` : 국토교통부 프로젝트
- `/ProjectsList2` : CloudXper 프로젝트
- `/ProjectsList3` : LG U+ 프로젝트
- `/EducationList` : 교육 이력
- `/Awards` : 수상 이력
- `/Licenses` : 자격 이력
- `/ResumePrint` : 출력용 이력서
- `/Architecture` : 프로젝트 구조 및 유지보수 문서

## Update Notes

- 2026-03-31 : Architecture 페이지에 라우팅, 패키지 버전, 유지보수 가이드, 커밋 이력 문서화
- 2026-03-31 : ResumePrint를 A4 출력용 표 기반 문서 레이아웃으로 재구성
- 2026-03-31 : ResumePrint에 최신순 정렬, 생년월일/만 나이, 프로젝트별 주요 업무 3개 / 주요 성과 3개 구성 반영
- 2026-03-30 : 이력서 출력 페이지 추가, Awards/Licenses 내용 수정
- 2026-03-26 : BrowserRouter 변경 및 포트폴리오 구조 개선
- 2025-06-27 : SQLD 자격 정보 및 README 업데이트
