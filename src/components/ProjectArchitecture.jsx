import { paths } from "../routes";
import architectureBySlug from "../data/projectArchitecture";
import ArchitectureDiagrams from "./ArchitectureDiagrams";
import "../styles/billingArchitecture.css";

export default function ProjectArchitecture({ slug, expanded = false }) {
  const data = architectureBySlug[slug];
  if (!data) return null;
  const headingId = `${slug}-architecture-title`;

  return (
    <div className="billing-overview">
      <section className="project-block billing-architecture" aria-labelledby={headingId}>
        <div className="billing-section-heading">
          <h3 id={headingId}>시스템 한눈에 보기</h3>
          <span className="billing-label">강조 영역: 담당 업무</span>
        </div>
        <p className="billing-intro">{data.headline}</p>
        <p className="billing-caption">{data.caption}</p>
        <ArchitectureDiagrams slug={slug} expandable={!expanded} />
        {data.details.map((detail) => (
          <details key={detail.title} className="billing-details" open={expanded || detail.open}>
            <summary>{detail.title}</summary>
            <div className="billing-columns">
              {detail.items.map((item) => (
                <div key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </details>
        ))}
        <div className="billing-source">
          <p>관련 기술 블로그</p>
          <ul className="architecture-source-list">
            {data.sources.map((source) => (
              <li key={source.slug}>
                <a
                  href={paths.blogPost(source.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
