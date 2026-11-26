import { afterEach, expect, test, vi } from "vitest";
import { recoverModuleLoad } from "./recoverModuleLoad";

const failedImport = {
  payload: new TypeError("Failed to fetch dynamically imported module: https://example.com/assets/post.js"),
};

afterEach(() => {
  sessionStorage.clear();
  vi.useRealTimers();
});

test("지연 로딩 실패 후 다시 실패해도 자동 새로고침을 반복하지 않는다", () => {
  const browser = { sessionStorage, location: { reload: vi.fn() } };
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-26T12:00:00Z"));

  recoverModuleLoad(failedImport, browser);
  recoverModuleLoad(failedImport, browser);
  expect(browser.location.reload).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(31_000);
  recoverModuleLoad(failedImport, browser);
  expect(browser.location.reload).toHaveBeenCalledTimes(2);
});

test("일반 코드 오류나 재시도 기록을 저장할 수 없는 경우에는 새로고침하지 않는다", () => {
  const browser = { sessionStorage, location: { reload: vi.fn() } };
  recoverModuleLoad({ payload: new TypeError("Cannot read properties of undefined") }, browser);
  recoverModuleLoad(failedImport, {
    ...browser,
    sessionStorage: { getItem: () => null, setItem: () => { throw new Error("Storage unavailable"); } },
  });

  expect(browser.location.reload).not.toHaveBeenCalled();
});
