const RELOAD_KEY = "vite-module-reload-at";
const RELOAD_COOLDOWN_MS = 30_000;
const MODULE_LOAD_ERROR = /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|unable to preload css/i;

/** 지연 로딩 파일을 받지 못하면 현재 주소를 다시 열어 최신 배포 파일을 요청한다. */
export function recoverModuleLoad(event, browser = window) {
  if (!MODULE_LOAD_ERROR.test(event.payload?.message ?? "")) return;

  const now = Date.now();
  try {
    const lastReload = browser.sessionStorage.getItem(RELOAD_KEY);
    if (lastReload !== null && now - Number(lastReload) < RELOAD_COOLDOWN_MS) return;
    // 새로고침 이후에도 요청이 실패할 때 자동 새로고침이 반복되지 않게 한다.
    browser.sessionStorage.setItem(RELOAD_KEY, String(now));
  } catch {
    return;
  }

  browser.location.reload();
}
