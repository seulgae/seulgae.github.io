import { useId, useRef, useState } from "react";
import diagramsBySlug from "../data/architectureDiagrams";
import "../styles/architectureDiagrams.css";

function Tech({ name, logo }) {
  return <span className="arch-tech">{logo && <img src={`/tech-logos/${logo}.svg`} alt="" loading="lazy" width="22" height="22" />}<span>{name}</span></span>;
}

function Diagram({ figure, theme }) {
  const [selectedId, setSelectedId] = useState(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const uid = useId().replace(/:/g, "");
  const selected = figure.nodes.find((node) => node.id === selectedId);
  const connected = new Set([selectedId]);
  figure.edges.forEach((edge) => {
    if (edge.from === selectedId || edge.to === selectedId) { connected.add(edge.from); connected.add(edge.to); }
  });
  const select = (id) => setSelectedId((previous) => previous === id ? null : id);

  function canvas(suffix) {
    const prefix = `${uid}-${suffix}`;
    return (
      <svg viewBox={`0 0 960 ${figure.height}`} className="arch-canvas" role="group" aria-label={figure.summary}>
        <title>{figure.title}</title><desc>{figure.summary}</desc>
        <defs>
          {["data", "lookup", "retry"].map((type) => <marker key={type} id={`${prefix}-${type}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" className={`arch-arrowhead arch-${type}`} /></marker>)}
          <pattern id={`${prefix}-grid`} width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#dce4ed" /></pattern>
        </defs>
        <rect width="960" height={figure.height} fill={`url(#${prefix}-grid)`} />
        {figure.zones.map((zone) => <g key={zone.label} className={zone.owned ? "arch-zone arch-zone-owned" : "arch-zone"}>
          <rect x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx="14" />
          <text x={zone.x + 16} y={zone.y + 27}>{zone.label}</text>
        </g>)}
        {figure.edges.map((edge, index) => <g key={index} className={`arch-edge arch-${edge.type}${selectedId && edge.from !== selectedId && edge.to !== selectedId ? " arch-dim" : ""}`}>
          <path d={edge.d} markerEnd={`url(#${prefix}-${edge.type})`} markerStart={edge.both ? `url(#${prefix}-${edge.type})` : undefined} />
          {edge.label && <text x={edge.x} y={edge.y} textAnchor="middle">{edge.label}</text>}
        </g>)}
        {figure.nodes.map((node) => <g key={node.id} transform={`translate(${node.x} ${node.y})`} className={`arch-node${node.owned ? " arch-node-owned" : ""}${selectedId && !connected.has(node.id) ? " arch-dim" : ""}`} role="button" tabIndex={0} aria-pressed={node.id === selectedId} aria-label={`${node.title} 역할 보기`} onClick={() => select(node.id)} onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(node.id); }
        }}>
          <rect className="arch-node-bg" width={node.w} height={node.h} rx="10" />
          {node.logo ? <image href={`/tech-logos/${node.logo}.svg`} x="14" y="12" width={node.logo === "oracle" ? "68" : "29"} height="29" aria-hidden="true" /> : node.kind === "database" ? <g className="arch-glyph" aria-hidden="true"><path d="M15 19 V35 C15 42 43 42 43 35 V19" /><ellipse cx="29" cy="19" rx="14" ry="5" /><path d="M15 27 C15 34 43 34 43 27" /></g> : <g className="arch-glyph" aria-hidden="true"><rect x="15" y="14" width="29" height="23" rx="4" /><path d="M20 22 H38 M20 29 H33" /></g>}
          {node.owned && <text className="arch-ownership" x={node.w - 12} y="29" textAnchor="end">담당 개선</text>}
          <text className="arch-node-title" x="14" y="59">{node.title}</text>
          {node.lines.map((line, index) => <text className="arch-node-line" key={line} x="14" y={80 + index * 17}>{line}</text>)}
        </g>)}
      </svg>
    );
  }

  return <figure className={`arch-figure arch-theme-${theme}`}>
    <div className="arch-figure-heading"><h4>{figure.title}</h4><button type="button" ref={trigger} onClick={() => dialog.current.showModal()}>크게 보기 ↗</button></div>
    <div className="arch-scroll" tabIndex={0} role="region" aria-label={`${figure.title} · 좁은 화면에서 좌우 스크롤 가능`}>{canvas("inline")}</div>
    <figcaption>
      <div className="arch-legend">{figure.notes.map((note) => <span key={note}>{note}</span>)}</div>
      <p className="arch-help">구성 요소를 누르면 연결된 흐름과 역할을 볼 수 있습니다. 작은 화면에서는 그림을 좌우로 이동하거나 크게 보기를 이용하세요.</p>
      <div className="arch-selection" aria-live="polite"><strong>{selected ? selected.title : "그림 읽는 순서"}</strong><p>{selected ? selected.detail : figure.summary}</p></div>
      <ol className="arch-reading-guide">{figure.guide.map(([title, body]) => <li key={title}><strong>{title}</strong><p>{body}</p></li>)}</ol>
    </figcaption>
    <dialog className={`arch-dialog arch-theme-${theme}`} ref={dialog} aria-label={`${figure.title} 확대`} onClose={() => trigger.current?.focus()} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className="arch-dialog-heading"><strong>{figure.title}</strong><button type="button" onClick={() => dialog.current.close()}>닫기 ×</button></div>
      <div className="arch-scroll">{canvas("expanded")}</div>
      <div className="arch-selection" aria-live="polite"><strong>{selected ? selected.title : "구성 요소를 눌러 역할 확인"}</strong><p>{selected ? selected.detail : figure.summary}</p></div>
    </dialog>
  </figure>;
}

export default function ArchitectureDiagrams({ slug }) {
  const data = diagramsBySlug[slug];
  if (!data) return null;
  return <div className="architecture-diagrams">
    <p className="arch-intro">{data.intro}</p>
    {data.providers && <div className="arch-providers"><span>통합 관리 대상 클라우드</span><div>{data.providers.map(([name, logo]) => <Tech key={name} name={name} logo={logo} />)}</div><small>클라우드별 수집 API·실제 호스팅 배치 정보는 생략</small></div>}
    {data.figures.map((figure) => <Diagram key={figure.id} figure={figure} theme={data.theme} />)}
    <div className="arch-tool-context"><h4>이 흐름을 개발·운영할 때 사용한 도구</h4><div className="arch-tool-groups">{data.supporting.map((group) => <section key={group.title}><h5>{group.title}</h5><div className="arch-tool-list">{group.tools.map(([name, logo]) => <Tech key={name} name={name} logo={logo} />)}</div><p>{group.text}</p></section>)}</div></div>
  </div>;
}
