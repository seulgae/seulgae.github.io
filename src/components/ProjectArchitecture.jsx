import { Link } from "react-router-dom";
import { paths } from "../routes";
import architectureBySlug from "../data/projectArchitecture";
import ArchitectureDiagrams from "./ArchitectureDiagrams";
import "../styles/billingArchitecture.css";

export default function ProjectArchitecture({ slug }) {
  const data = architectureBySlug[slug];
  if (!data) return null;
  const headingId = `${slug}-architecture-title`;

  return (
    <div className="billing-overview">
      <section aria-label="대표 성과" className="billing-metrics">
        {data.metrics.map((metric) => (
          <div className="billing-metric" key={metric.label}>
            <span>{metric.label}</span><strong>{metric.value}</strong><p>{metric.detail}</p>
          </div>
        ))}
      </section>
      <section className="project-block billing-architecture" aria-labelledby={headingId}>
        <div className="billing-section-heading">
          <h3 id={headingId}>시스템 한눈에 보기</h3>
          <span className="billing-label">강조 영역: 담당 업무</span>
        </div>
        <p className="billing-intro">{data.headline}</p>
        <p className="billing-caption">{data.caption}</p>
        <ArchitectureDiagrams slug={slug} />
        {data.details.map((detail) => (
          <details key={detail.title} className="billing-details" open={detail.open}>
            <summary>{detail.title}</summary>
            <div className="billing-columns">
              {detail.items.map((item) => <div key={item.title}><h4>{item.title}</h4><p>{item.body}</p></div>)}
            </div>
          </details>
        ))}
        <div className="billing-source">
          <p>경험을 정리한 논리 구조입니다. 강조 영역은 담당 업무 범위를 나타냅니다.</p>
          <ul className="architecture-source-list">
            {data.sources.map((source) => <li key={source.slug}><Link to={paths.blogPost(source.slug)}>{source.label} →</Link></li>)}
          </ul>
        </div>
      </section>
      <section className="project-block">
        <h3>대표 개선 사례</h3>
        <dl className="billing-steps">
          <div><dt>문제</dt><dd>{data.caseStudy.problem}</dd></div>
          <div><dt>담당 업무</dt><dd>{data.caseStudy.action}</dd></div>
          <div><dt>결과</dt><dd><strong>{data.caseStudy.result}</strong></dd></div>
        </dl>
      </section>
    </div>
  );
}
