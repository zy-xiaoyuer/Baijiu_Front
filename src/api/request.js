import router from "@/router";
import axios from "axios";
import { globals } from "@/main";

const serveUrl = globals.$config?.serverUrl || "http://localhost:9000";

const request = axios.create({
  baseURL: serveUrl,
  timeout: 30000,
});

//response拦截器
//发送请求时统一处理，如加token
request.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=utf-8";
    let user = JSON.parse(localStorage.getItem("hon-admin") || "{}");
    config.headers["token"] = user.token; //设置请求头
    return config;
  },
  (error) => {
    console.error("request error: " + error);
    return Promise.reject(error);
  }
);

//response拦截器
//接口响应后统一处理结果
request.interceptors.response.use(
  (response) => {
    let res = response.data;
    //兼容服务端返回的字符串数据
    if (typeof res === "string") {
      res = res ? JSON.parse(res) : res;
    }
    //没有权限跳转到登录
    if (res.code === "401") {
      router.push("/login");
    }
    return res;
  },
  (error) => {
    console.error("response error:" + error);
    return Promise.reject(error);
  }
);

export default request;
