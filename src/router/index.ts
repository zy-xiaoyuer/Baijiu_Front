import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    // 登录重定向
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/login",
      name: "loginPage",
      component: () => import("../views/login/LoginPage.vue"),
    },
    // 主页
    {
      path: "/main",
      name: "/main",
      component: () => import("../views/MainPage.vue"),
      meta: { requireAuth: true },
      children: [
        {
          path: "/main",
          name: "main",
          component: () => import("../views/index/IndexPage.vue"),
        },
        // 首页
        {
          path: "/index",
          name: "index",
          meta: {
            title: "首页",
            icon: "House",
          },
          component: () => import("../views/index/IndexPage.vue"),
        },
        // 赋酒诗词
        {
          path: "/winePoetry",
          name: "winePoetry",
          meta: {
            title: "赋酒诗词",
            icon: "WinePoetry",
          },
          component: () => import("../views/winePoetry/WinePoetry.vue"),
        },
        // 赋酒诗词子页面
        {
          path: "/winePoetryDetail",
          name: "winePoetryDetail",
          meta: {
            title: "赋酒诗词细节",
            icon: "WinePoetryDetail",
          },
          component: () => import("../views/winePoetry/WinePoetryDetail.vue"),
        },
        // 酒器
        {
          path: "/wineVessel",
          name: "wineVessel",
          meta: {
            title: "酒器",
            icon: "WineVessel",
          },
          component: () => import("../views/wineVessel/WineVessel.vue"),
        },
        // 酒器子页面
        {
          path: "/wineVesselDetail",
          name: "wineVesselDetail",
          meta: {
            title: "酒器子页面",
            icon: "WineVesselDetail",
          },
          component: () => import("../views/wineVessel/WineVesselDetail.vue"),
        },
        // 酒画
        {
          path: "/winePainting",
          name: "winePainting",
          meta: {
            title: "酒画",
            icon: "WinePainting",
          },
          component: () => import("../views/winePainting/WinePainting.vue"),
        },
        // 酒画子页面
        {
          path: "/winePaintingDetail",
          name: "winePaintingDetail",
          meta: {
            title: "酒画子页面",
            icon: "WinePaintingDetail",
          },
          component: () =>
            import("../views/winePainting/WinePaintingDetail.vue"),
        },
        // 酒诗图谱
        {
          path: "/winePoretyGraph",
          name: "winePoretyGraph",
          meta: {
            title: "酒诗图谱",
            icon: "House",
          },
          component: () =>
            import("../views/winePoretyGraph/WinePoretyGraph.vue"),
        },
        // 酒诗图赏
        {
          path: "/winePoetryAppreciation",
          name: "winePoetryAppreciation",
          meta: {
            title: "酒诗图赏",
            icon: "House",
          },
          component: () =>
            import(
              "../views/winePoetryAppreciation/WinePoetryAppreciation.vue"
            ),
        },
      ],
    },
  ],
});

export default router;
