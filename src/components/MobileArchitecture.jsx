export default function MobileArchitecture({ figure, selectedId, connected, onSelect, uid }) {
  const groups = figure.zones.map((zone) => ({ ...zone, nodes: [] }));
  const other = { label: "연결 대상", nodes: [] };
  figure.nodes.forEach((node) => {
    const x = node.x + node.w / 2;
    const y = node.y + node.h / 2;
    const zone = groups.filter((group) => x >= group.x && x <= group.x + group.w && y >= group.y && y <= group.y + group.h)
      .sort((a, b) => a.w * a.h - b.w * b.h)[0];
    (zone || other).nodes.push(node);
  });
  const nodes = new Map(figure.nodes.map((node) => [node.id, node]));
  const flows = new Map();
  figure.edges.forEach((edge) => {
    const key = JSON.stringify([edge.from, edge.to, edge.label, edge.type, edge.both]);
    if (flows.has(key)) flows.get(key).count += 1;
    else flows.set(key, { ...edge, count: 1 });
  });

  return (
    <div className="arch-mobile-layout" aria-label={`${figure.title} 모바일 구성도`}>
      <p className="arch-mobile-summary">{figure.summary}</p>
      <div className="arch-mobile-zones">{[...groups, other].filter((group) => group.nodes.length).map((group) => (
        <section className="arch-mobile-zone" key={group.label}>
          <h5>{group.label}</h5>
          {group.nodes.map((node) => (
            <div key={node.id} className={`arch-mobile-component${selectedId && !connected.has(node.id) ? " arch-mobile-muted" : ""}`}>
              <button type="button" className="arch-mobile-node" aria-label={`${node.title} 역할 보기`} aria-expanded={node.id === selectedId} aria-controls={node.id === selectedId ? `${uid}-mobile-${node.id}` : undefined} onClick={() => onSelect(node.id)}>
                <span className="arch-mobile-node-heading">{node.logo && <img src={`/tech-logos/${node.logo}.svg`} alt="" width="22" height="22" loading="lazy" />}<strong>{node.title}</strong>{node.owned && <small>담당 개선</small>}</span>
                <span className="arch-mobile-node-lines">{node.lines.join(" · ")}</span>
              </button>
              {node.id === selectedId && <p id={`${uid}-mobile-${node.id}`} className="arch-mobile-detail">{node.detail}</p>}
            </div>
          ))}
        </section>
      ))}</div>
      <section className="arch-mobile-connections" aria-label="구성 요소 연결 흐름">
        <h5>연결 흐름</h5>
        <ul>{[...flows.entries()].map(([key, flow]) => (
          <li key={key} className={selectedId && flow.from !== selectedId && flow.to !== selectedId ? "arch-mobile-muted" : undefined}>
            {flow.label && <span className="arch-mobile-flow-label">{flow.label}</span>}
            <div className="arch-mobile-flow"><span>{nodes.get(flow.from)?.title}</span><b aria-label={flow.both ? "양방향" : "전달"}>{flow.both ? "↔" : "→"}</b><span>{nodes.get(flow.to)?.title}</span>{flow.count > 1 && <small>×{flow.count}</small>}</div>
          </li>
        ))}</ul>
      </section>
    </div>
  );
}
