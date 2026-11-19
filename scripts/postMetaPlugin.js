import { readFile } from "node:fs/promises";

const META_QUERY = "?meta";
const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/;

/**
 * `*.md?meta`로 가져온 Markdown에서 frontmatter 블록만 문자열로 내보냅니다.
 * 블로그 목록·사이드바는 메타데이터만 필요하므로 본문을 공통 번들에 싣지 않기 위해 사용합니다.
 * 본문은 src/lib/posts.js에서 `?raw` 지연 로딩으로 글마다 별도 청크에 담깁니다.
 */
export default function postMetaPlugin() {
  return {
    name: "post-meta",
    enforce: "pre",
    async load(id) {
      if (!id.endsWith(`.md${META_QUERY}`)) {
        return null;
      }

      const file = id.slice(0, -META_QUERY.length);
      const raw = await readFile(file, "utf8");
      const frontmatter = raw.match(FRONTMATTER)?.[0] ?? "";

      return `export default ${JSON.stringify(frontmatter)};`;
    },
  };
}
