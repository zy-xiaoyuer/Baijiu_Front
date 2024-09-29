const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9000,
    proxy: {
      "/apis": {
        target: "http://172.27.0.40:9000", // 对应自己的接口
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/apis": "",
        },
      },
    },
  },
});
