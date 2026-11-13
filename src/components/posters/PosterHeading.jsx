import { useEffect, useId, useRef, useState } from "react";

/**
 * 포스터 섹션 공통 헤더.
 * 섹션 번호와 제목을 간결하게 표시하고, 부가 설명은 우측 도움말(?) 버튼을 통해
 * 데스크톱 호버 및 모바일 터치(토글) 툴팁으로 노출합니다.
 * 외부 영역 터치/클릭 시 자동으로 닫힙니다.
 */
function PosterHeading({ index, titleId, title, helpText }) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  const wrapRef = useRef(null);

  // 모바일 등에서 외부 영역을 탭했을 때 툴팁을 닫도록 처리
  useEffect(() => {
    if (!visible) return;

    function handlePointerDownOutside(event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setVisible(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDownOutside);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, [visible]);

  return (
    <div className="poster-heading">
      {index && <span className="poster-index">{index}</span>}
      <div className="poster-title-row">
        <h2 id={titleId}>{title}</h2>

        {helpText ? (
          <span
            ref={wrapRef}
            className="poster-help-wrap"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            <button
              type="button"
              className={`poster-help-btn ${visible ? "active" : ""}`}
              aria-label={`${title} 도움말`}
              aria-describedby={visible ? tooltipId : undefined}
              aria-expanded={visible}
              onClick={(e) => {
                e.stopPropagation();
                setVisible((prev) => !prev);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setVisible(false);
                }
              }}
            >
              ?
            </button>

            <span
              id={tooltipId}
              role="tooltip"
              aria-hidden={!visible}
              className={`poster-help-tooltip ${visible ? "visible" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              {helpText}
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default PosterHeading;
