import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { getVisibleLicenses } from "../data/licenses";
import { useVisibleLicenses } from "./useVisibleLicenses";

const release = Date.parse("2026-12-18T10:00:00+09:00");
const hasEngineer = (list) => list.some((item) => item.id === "engineer-information-processing");

afterEach(() => vi.useRealTimers());

test("한국 시간 공개 직전에는 숨기고 공개 시각부터 표시한다", () => {
  expect(hasEngineer(getVisibleLicenses(release - 1))).toBe(false);
  expect(hasEngineer(getVisibleLicenses(release))).toBe(true);
  expect(hasEngineer(getVisibleLicenses(new Date("2026-12-18T01:00:00Z")))).toBe(true);
  expect(getVisibleLicenses(release - 1).map((item) => item.id)).toEqual(["sqld", "web-design"]);
});

test("페이지를 열어 둔 상태에서도 공개 시각에 목록을 갱신한다", () => {
  vi.useFakeTimers();
  vi.setSystemTime(release - 1000);
  const { result, unmount } = renderHook(() => useVisibleLicenses());
  expect(hasEngineer(result.current)).toBe(false);
  act(() => vi.advanceTimersByTime(1000));
  expect(hasEngineer(result.current)).toBe(true);
  unmount();
  expect(vi.getTimerCount()).toBe(0);
});

test("장기간 예약도 타이머 한도 내에서 기다린 후 공개한다", () => {
  vi.useFakeTimers();
  vi.setSystemTime("2026-11-11T00:00:00+09:00");
  const { result, unmount } = renderHook(() => useVisibleLicenses());
  act(() => vi.advanceTimersByTime(2_147_483_647));
  expect(hasEngineer(result.current)).toBe(false);
  act(() => vi.advanceTimersByTime(release - Date.now()));
  expect(hasEngineer(result.current)).toBe(true);
  unmount();
});

test("절전 후 돌아온 페이지도 현재 시각으로 갱신한다", () => {
  vi.useFakeTimers();
  vi.setSystemTime(release - 1000);
  const { result, unmount } = renderHook(() => useVisibleLicenses());
  act(() => {
    vi.setSystemTime(release + 1000);
    window.dispatchEvent(new Event("focus"));
  });
  expect(hasEngineer(result.current)).toBe(true);
  unmount();
});
