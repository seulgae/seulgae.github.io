import { useEffect, useRef } from "react";
import "../styles/lightbox.css";

/**
 * 이미지 확대 보기 공용 레이어.
 * Awards / Licenses / Education이 각각 복제해서 쓰던 모달을 하나로 합친 컴포넌트입니다.
 * Esc 닫기, 배경 클릭 닫기, 열릴 때 닫기 버튼으로 포커스 이동까지 여기서 처리합니다.
 */
function Lightbox({ src, alt = "", onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="lightbox" role="presentation" onClick={onClose}>
      <div
        className="lightbox-panel"
        role="dialog"
        aria-modal="true"
        aria-label={alt || "이미지 확대 보기"}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          ref={closeButtonRef}
          className="lightbox-close"
          aria-label="닫기"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

export default Lightbox;
