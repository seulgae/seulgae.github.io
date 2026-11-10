import { parseFrontmatter } from "../lib/posts";

const fields = ["title", "date", "tags", "summary", "category"];

export function readPost(raw) {
  const { meta, body } = parseFrontmatter(raw);
  return { ...meta, body: body.replace(/^\r?\n/, "") };
}

export function writePost(data) {
  const lines = fields.flatMap((field) => {
    const value = String(data[field] ?? "");
    if (/[\r\n]/.test(value)) {
      throw new Error(`${field} 항목은 한 줄로 입력해 주세요.`);
    }
    return value ? [`${field}: ${value}`] : [];
  });
  return `---\n${lines.join("\n")}\n---\n\n${String(data.body ?? "").replace(/^\r?\n/, "")}`;
}
