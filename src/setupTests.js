import "@testing-library/jest-dom/vitest";
import { configure } from "@testing-library/react";
import { vi } from "vitest";

// findBy*·waitFor의 기본 대기 시간(1000ms)을 늘립니다.
// 블로그·이력서·프로젝트 상세는 React.lazy 라우트라 첫 진입 시 모듈 변환·로딩을 기다리는데,
// GitHub Actions 러너에서는 이 시간이 1초를 넘어 테스트가 간헐적으로 실패했습니다. (로컬은 약 150ms)
// 조건을 만족하면 즉시 통과하므로 정상적인 테스트는 느려지지 않습니다.
configure({ asyncUtilTimeout: 4000 });

window.scrollTo = vi.fn();
