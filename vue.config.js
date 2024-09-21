const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  /* 아래 부분 추가 */
  chainWebpack: (config) => {
    config.module
      .rule("*.md")
      .test(/\.md?$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
});