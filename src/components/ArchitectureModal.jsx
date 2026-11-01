import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import BillingArchitecture from "./BillingArchitecture";
import ProjectArchitecture from "./ProjectArchitecture";

/**
 * 프로젝트별 시스템 아키텍처 & 데이터 흐름 다이어그램을 넓은 화면으로 보여주는 팝업 모달.
 * 2단 컬럼 폭에 갇히지 않고 960px SVG 구성도와 상세 설명을 쾌적하게 열람할 수 있습니다.
 */
function ArchitectureModal({ project, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }
      // 내부 SVG '크게 보기' 네이티브 <dialog>가 열려 있을 때는 내부 다이얼로그만 닫히도록 양보
      if (document.querySelector("dialog[open]")) {
        return;
      }
      onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!project) {
    return null;
  }

  const titleId = `arch-modal-title-${project.slug}`;

  return createPortal(
    <div
      className="arch-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="arch-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="arch-modal-header">
          <div className="arch-modal-title-group">
            <span className="arch-modal-eyebrow">
              System Architecture · {project.period}
            </span>
            <h2 id={titleId} className="arch-modal-title">
              {project.title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="arch-modal-close"
            aria-label="아키텍처 팝업 닫기"
            onClick={onClose}
          >
            닫기 ×
          </button>
        </header>

        <div className="arch-modal-body">
          {project.slug === "lgu-billing-gw" ? (
            <BillingArchitecture />
          ) : (
            <ProjectArchitecture slug={project.slug} />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ArchitectureModal;
