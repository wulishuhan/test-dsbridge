import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/home/index"),
        name: "index",
        meta: {
          title: "帮助与反馈",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/test",
    name: "test",
    component: Layout,
    children: [
      {
        path: "/test",
        component: () => import("@/views/test/index"),
        name: "test",
        meta: {
          title: "test",
          hidden: true,
        },
      },
    ],
  },
  {
    path: "/result",
    name: "result",
    component: Layout,
    children: [
      {
        path: "/result",
        component: () => import("@/views/result/index"),
        name: "result",
        meta: {
          title: "result",
          hidden: true,
        },
      },
    ],
  },
  {
    path: "/catelog/:catelogId",
    name: "catelog",
    component: Layout,
    children: [
      {
        path: "/catelog/:catelogId",
        component: () => import("@/views/catelog/index"),
        name: "catelog",
        meta: {
          title: "catelog",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/detail/:questionId",
    name: "detail",
    component: Layout,
    children: [
      {
        path: "/detail/:questionId",
        component: () => import("@/views/detail/index"),
        name: "detail",
        meta: {
          title: "问题详情",
          hidden: false,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
