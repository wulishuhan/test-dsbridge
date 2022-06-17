import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/main",
    children: [
      {
        path: "/main",
        component: () => import("@/views/main/index"),
      },
    ],
  },
  {
    path: "/education",
    name: "education",
    component: Layout,
    children: [
      {
        path: "/education",
        component: () => import("@/views/education/index"),
      },
    ],
  },
  {
    path: "/designer",
    name: "designer",
    component: Layout,
    children: [
      {
        path: "/designer",
        component: () => import("@/views/designer/index"),
      },
    ],
  },
  {
    path: "/groups",
    name: "groups",
    component: Layout,
    children: [
      {
        path: "/groups",
        component: () => import("@/views/groups/index"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Layout,
    children: [
      {
        path: "/login",
        component: () => import("@/views/login/index"),
      },
    ],
  },
  {
    path: "/editProfile",
    name: "editProfile",
    component: Layout,
    children: [
      {
        path: "/editProfile",
        component: () => import("@/views/editProfile/index"),
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: Layout,
    children: [
      {
        path: "/register",
        component: () => import("@/views/register/index"),
      },
    ],
  },
  {
    path: "/upload",
    name: "upload",
    component: Layout,
    children: [
      {
        path: "/upload",
        component: () => import("@/views/upload/index"),
      },
    ],
  },
  {
    path: "/customizer",
    name: "customizer",
    component: Layout,
    children: [
      {
        path: "/customizer",
        component: () => import("@/views/customizer/index"),
      },
    ],
  },
  {
    path: "/thing/:thingId",
    name: "thing",
    component: Layout,
    children: [
      {
        path: "/thing/:thingId",
        component: () => import("@/views/thing/index"),
      },
    ],
  },
  {
    path: "/design/:userId",
    name: "design",
    component: Layout,
    children: [
      {
        path: "/design/:userId",
        component: () => import("@/views/design/index"),
        children: [
          {
            path: "/design/Likes/:userId",
            component: () => import("@/views/design/components/Likes"),
          },
          {
            path: "/design/Collections/:userId",
            component: () => import("@/views/design/components/Collections"),
          },
          {
            path: "/design/Favorites/:userId",
            component: () => import("@/views/design/components/Favorites"),
          },
          {
            path: "/design/Makes/:userId",
            component: () => import("@/views/design/components/Makes"),
          },
          {
            path: "/design/Designs/:userId",
            component: () => import("@/views/design/components/Designs"),
          },
        ],
      },
    ],
  },
  {
    path: "/message/:userName/:userId",
    name: "message",
    component: Layout,
    children: [
      {
        path: "/message/:userName/:userId",
        component: () => import("@/views/message/index"),
      },
    ],
  },
  {
    path: "/following/:userId",
    name: "following",
    component: Layout,
    children: [
      {
        path: "/following/:userId",
        component: () => import("@/views/following/index"),
      },
    ],
  },
  {
    path: "/groupDetail",
    name: "groupDetail",
    component: Layout,
    children: [
      {
        path: "/groupDetail",
        component: () => import("@/views/groupDetail/index"),
        children: [
          {
            path: "/groupDetail/things/:groupId",
            component: () => import("@/views/groupDetail/components/Things"),
          },
          {
            path: "/groupDetail/members/:groupId",
            component: () => import("@/views/groupDetail/components/Members"),
          },
          {
            path: "/groupDetail/forums/:groupId",
            component: () => import("@/views/groupDetail/components/Forums"),
          },
          {
            path: "/groupDetail/about/:groupId",
            component: () => import("@/views/groupDetail/components/About"),
          },
        ],
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
