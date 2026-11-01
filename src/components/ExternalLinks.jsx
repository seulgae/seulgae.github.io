import { assetUrl } from "../utils/text";
import "../styles/externalLinks.css";

/**
 * 외부 링크 버튼 묶음. target/rel 조합을 한곳에서만 관리하기 위해 공용화했습니다.
 * links: [{ label, href }] — http(s) 외부 주소와 public/ 정적 파일 경로 모두 지원합니다.
 */
function ExternalLinks({ links = [], label = "" }) {
  if (!links.length) {
    return null;
  }

  return (
    <div className="external-links">
      {label ? <p className="external-links-label">{label}</p> : null}
      <div className="external-links-row">
        {links.map((link) => {
          const href = /^https?:\/\//.test(link.href)
            ? link.href
            : assetUrl(link.href);

          return (
            <a
              key={link.href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default ExternalLinks;
