import { useCallback, useEffect, useRef, useState } from "react";
import { getHashTarget } from "../utils/text";

const SYNC_EVENT = "portfolio:section-change";

function resolveHashSection(hash, sectionIds) {
  if (!hash) {
    return null;
  }
  const clean = getHashTarget(hash);
  if (sectionIds.includes(clean)) {
    return clean;
  }
  if (clean.startsWith("project-") && sectionIds.includes("projects")) {
    return "projects";
  }
  return null;
}

/**
 * 지정한 섹션 ID 배열을 기준으로 현재 스크롤 위치에 해당하는 활성 섹션을 추적합니다.
 * - 사용자가 직접 스크롤하면 화면 상단 기준선을 통과한 포스터로 커서가 즉시 이동합니다.
 * - 메뉴 클릭으로 부드러운 스크롤이 진행되는 동안에는 목표 메뉴에 커서를 고정해 깜빡임을 막습니다.
 */
export function useScrollSpy(sectionIds, enabled = true) {
  const [activeId, setActiveId] = useState(() => {
    const fromHash =
      typeof window !== "undefined"
        ? resolveHashSection(window.location.hash, sectionIds)
        : null;
    return fromHash || sectionIds[0] || "";
  });

  const lockUntilRef = useRef(0);

  const computeActive = useCallback(() => {
    if (!enabled || !sectionIds.length) {
      return;
    }

    if (Date.now() < lockUntilRef.current) {
      return;
    }

    if (window.scrollY <= 24) {
      setActiveId(sectionIds[0]);
      return;
    }

    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable > 40 && window.scrollY >= scrollable - 28) {
      setActiveId(sectionIds[sectionIds.length - 1]);
      return;
    }

    const triggerOffset = Math.min(window.innerHeight * 0.32, 220);
    let current = sectionIds[0];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) {
        return;
      }

      const { top } = element.getBoundingClientRect();
      if (top <= triggerOffset) {
        current = id;
      }
    });

    setActiveId(current);
  }, [enabled, sectionIds]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const fromHash = resolveHashSection(window.location.hash, sectionIds);
    if (fromHash) {
      lockUntilRef.current = Date.now() + 500;
      setActiveId(fromHash);
    } else {
      computeActive();
    }

    const handleSync = (event) => {
      const targetId = event.detail?.sectionId;
      if (targetId && sectionIds.includes(targetId)) {
        lockUntilRef.current = Date.now() + 550;
        setActiveId(targetId);
      }
    };

    const onScrollOrResize = () => {
      computeActive();
    };

    window.addEventListener(SYNC_EVENT, handleSync);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [computeActive, enabled, sectionIds]);

  const navigateToSection = useCallback((sectionId) => {
    lockUntilRef.current = Date.now() + 550;
    setActiveId(sectionId);
    window.dispatchEvent(
      new CustomEvent(SYNC_EVENT, { detail: { sectionId } }),
    );

    if (sectionId === "about") {
      window.history.replaceState(null, "", "/");
      if (typeof window.scrollTo === "function") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      window.history.replaceState(null, "", `/#${sectionId}`);
      if (typeof target.scrollIntoView === "function") {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return [activeId, navigateToSection];
}
