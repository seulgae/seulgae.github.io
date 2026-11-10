import CMS from "@sveltia/cms";
import { adminConfig } from "./config";
import { readPost, writePost } from "./format";

CMS.registerCustomFormat("portfolio-post", "md", {
  fromFile: readPost,
  toFile: writePost,
});

await CMS.init({ config: adminConfig });
