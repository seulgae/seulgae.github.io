/**
 * git log를 읽어 src/data/commitHistory.js를 생성합니다.
 * Architecture 페이지의 커밋 목록을 손으로 관리하면 항상 실제 이력보다 뒤처지므로,
 * 배포 전에 `npm run sync:history`로 갱신합니다.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = join(projectRoot, "src", "data", "commitHistory.js");

const raw = execFileSync(
  "git",
  ["log", "--date=short", "--pretty=format:%ad | %h | %s"],
  { cwd: projectRoot, encoding: "utf8" },
);

const commits = raw
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

const body = `// 이 파일은 scripts/generate-commit-history.mjs가 생성합니다. 직접 수정하지 마세요.
// 갱신: npm run sync:history
const commitHistory = ${JSON.stringify(commits, null, 2)};

export default commitHistory;
`;

writeFileSync(outputPath, body, "utf8");
console.log(`commitHistory.js 생성 완료 (${commits.length}건)`);
