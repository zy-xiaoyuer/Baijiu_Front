const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      "/apis": {
        target: "http://47.108.118.219:9000", // 对应自己的接口
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/apis": "",
        },
      },
    },
  },
});
