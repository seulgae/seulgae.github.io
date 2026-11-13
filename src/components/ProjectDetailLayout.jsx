import { cloneElement, useEffect, useRef, useState } from "react";
import "../styles/projectDetailNav.css";
import ProjectDetailActions from "./ProjectDetailActions";

const overview = { id: "overview", label: "프로젝트 소개" };
const features = { id: "features", label: "주요 기능" };
const results = { id: "results", label: "결과 및 성과" };
const jeonseSections = [overview, features, { id: "architecture", label: "시스템 아키텍처" }, { id: "cases", label: "문제 해결 사례" }, results];
const abacusSections = [overview, features, { id: "architecture", label: "아키텍처·개선 사례" }, results];

export default function ProjectDetailLayout({ slug, children }) {
  const sections = slug === "jeonse-support-system" ? jeonseSections : abacusSections;
  const [active, setActive] = useState(sections[0].id);
  const lockUntil = useRef(0);
  const [isCompact, setIsCompact] = useState(() => window.matchMedia?.("(max-width: 1024px)").matches ?? false);

  useEffect(() => {
    const query = window.matchMedia?.("(max-width: 1024px)");
    if (!query) return undefined;
    const update = () => setIsCompact(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (Date.now() < lockUntil.current) return;
      const trigger = window.innerWidth <= 1024 ? 160 : 130;
      let current = sections[0].id;
      sections.forEach(({ id }) => {
        if (document.getElementById(id)?.getBoundingClientRect().top <= trigger) current = id;
      });
      const end = document.documentElement.scrollHeight - window.innerHeight;
      if (end > 0 && window.scrollY >= end - 20) current = sections.at(-1).id;
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  const navigate = (event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    setActive(id);
    lockUntil.current = Date.now() + 700;
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#${id}`);
    target.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="project-detail-layout">
      <aside className="project-detail-sidebar">
        <p className="project-detail-nav-label">이 프로젝트</p>
        <nav aria-label="프로젝트 상세 목차">
          {sections.map(({ id, label }, index) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={(event) => navigate(event, id)}><span aria-hidden="true">0{index + 1}</span>{label}</a>)}
        </nav>
        {!isCompact && <ProjectDetailActions slug={slug} />}
      </aside>
      {cloneElement(children, { showMobileBack: isCompact })}
    </div>
  );
}
