import "../styles/externalLinks.css";

/**
 * 외부 링크 버튼 묶음. target/rel 조합을 한곳에서만 관리하기 위해 공용화했습니다.
 * links: [{ label, href }]
 */
function ExternalLinks({ links = [], label = "" }) {
  if (!links.length) {
    return null;
  }

  return (
    <div className="external-links">
      {label ? <p className="external-links-label">{label}</p> : null}
      <div className="external-links-row">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default ExternalLinks;
