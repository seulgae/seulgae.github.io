import { lazy, Suspense } from "react";
import "../styles/architectureDark.css";
import ArchitectureDiagrams from "./ArchitectureDiagrams";

const BillingArchitecture = lazy(() => import("./BillingArchitecture"));
const ProjectArchitecture = lazy(() => import("./ProjectArchitecture"));

export default function InlineProjectArchitecture({ slug, label, figureIds, showHelp = true }) {
  return (
    <section className="project-inline-architecture" aria-label={`${label} 시스템 아키텍처 및 데이터 흐름`}>
      <h3>{label === "전체 시스템 구성" ? "전체 시스템 구성도" : `${label} 시스템 아키텍처 · 데이터 흐름`}</h3>
      <Suspense fallback={<p role="status">다이어그램을 불러오는 중입니다.</p>}>
        {figureIds ? <ArchitectureDiagrams slug={slug} figureIds={figureIds} expandable={false} showContext={false} showHelp={showHelp} /> : slug === "lgu-billing-gw"
          ? <BillingArchitecture expanded />
          : <ProjectArchitecture slug={slug} expanded />}
      </Suspense>
    </section>
  );
}
