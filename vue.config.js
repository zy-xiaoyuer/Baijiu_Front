const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   port: 9001,
  //   proxy: {
  //     "/": {
  //       target: "http://localhost:9000", // 对应自己的接口
  //       changeOrigin: true,
  //       ws: false,
  //       // pathRewrite: {
  //       //   "^/apis": "",
  //       // },
  //     },
  //   },
  // },
});
