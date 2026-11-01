import { useId, useState } from "react";

/**
 * 포스터 섹션 공통 헤더.
 * 섹션 번호와 제목을 간결하게 표시하고, 부가 설명은 우측 도움말(?) 버튼에
 * 마우스를 올렸을 때만 툴팁으로 노출해 화면 밀도를 깔끔하게 유지합니다.
 */
function PosterHeading({ index, titleId, title, helpText }) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();

  return (
    <div className="poster-heading">
      <span className="poster-index">{index}</span>
      <div className="poster-title-row">
        <h2 id={titleId}>{title}</h2>

        {helpText ? (
          <span
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
              onFocus={() => setVisible(true)}
              onBlur={() => setVisible(false)}
              onClick={() => setVisible((prev) => !prev)}
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
