import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
import { createPinia } from "pinia";
import * as echarts from "echarts";

const app = createApp(App);

function getServerConfig() {
  return new Promise<void | undefined>((resolve, reject) => {
    axios
      .get("/config.json")
      .then((res) => {
        app.config.globalProperties.$config = res.data;
        resolve(undefined);
      })
      .catch((error) => {
        console.log(error);
        reject(undefined);
      });
  });
}
async function init() {
  await getServerConfig();
}
app.use(init);
export const globals = app.config.globalProperties;

app.use(store);
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.$axios = axios;
const pinia = createPinia();
app.use(pinia);
app.config.globalProperties.$echarts = echarts;
app.mount("#app");
