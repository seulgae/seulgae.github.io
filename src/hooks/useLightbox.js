import { useCallback, useState } from "react";

/** 확대 보기 대상 이미지 상태만 담당하는 훅. Credential / Education 목록에서 함께 사용합니다. */
export function useLightbox() {
  const [zoomed, setZoomed] = useState(null);

  const open = useCallback((src, alt = "") => setZoomed({ src, alt }), []);
  const close = useCallback(() => setZoomed(null), []);

  return { zoomed, open, close };
}

export default useLightbox;
