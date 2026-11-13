const categories = [
  ["backend", "백엔드"],
  ["database", "DB · 캐시"],
  ["messaging", "메시지 연계"],
  ["frontend", "화면 기술"],
  ["runtime", "서버 환경"],
  ["tools", "개발 · 배포 도구"],
  ["monitoring", "모니터링"],
  ["ai", "AI 활용 도구"],
];

export function groupProjectTechnologies(skills) {
  const groups = new Map(categories.map(([id, label]) => [id, { id, label, items: [] }]));
  const seen = new Set();
  skills.forEach((group) => {
    group.value.split(",").map((token) => token.trim()).filter(Boolean).forEach((token) => {
      if (seen.has(token)) return;
      seen.add(token);
      let id = "tools";
      if (/AI/.test(group.label)) id = "ai";
      else if (/Kafka/i.test(token)) id = "messaging";
      else if (/^(Oracle|MySQL|CUBRID|Redis)\b/i.test(token)) id = "database";
      else if (/^(React|JSP|JSTL|JavaScript|jQuery|HTML|CSS)\b/i.test(token)) id = "frontend";
      else if (/^(Linux|Apache Tomcat|Tomcat|JBoss)\b/i.test(token)) id = "runtime";
      else if (/WhaTap|CodeRay|모니터링/i.test(token + group.label)) id = "monitoring";
      else if (/^(Java|Spring|eGovFrame|MyBatis|Jasypt)\b/i.test(token)) id = "backend";
      groups.get(id).items.push(token);
    });
  });
  return [...groups.values()].filter((group) => group.items.length);
}
