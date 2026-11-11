import { useEffect, useState } from "react";
import licenses, { getVisibleLicenses } from "../data/licenses";

export function useVisibleLicenses() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const refresh = () => setNow(Date.now());
    const currentTime = Date.now();
    const nextRelease = Math.min(...licenses
      .filter((license) => license.visibleFrom)
      .map((license) => Date.parse(license.visibleFrom))
      .filter((timestamp) => timestamp > now));
    // 긴 예약은 브라우저 타이머의 최대 지연 시간을 넘지 않게 나눠 기다린다.
    const timer = Number.isFinite(nextRelease)
      ? window.setTimeout(refresh, Math.max(0, Math.min(nextRelease - currentTime, 2_147_483_647)))
      : null;

    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      if (timer !== null) window.clearTimeout(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [now]);

  return getVisibleLicenses(now);
}
