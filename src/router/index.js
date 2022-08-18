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
    meta: {
      title: "ortur library",
    },
    children: [
      {
        path: "/main",
        meta: {
          title: "ortur library",
        },
        component: () => import("@/views/main/index"),
      },
      {
        path: "/upload/:sourceId?",
        meta: {
          title: "upload",
        },
        component: () => import("@/views/upload/index"),
      },
      {
        path: "/search/index",
        meta: {
          title: "search",
        },
        component: () => import("@/views/search/index"),
      },
    ],
  },
  {
    path: "/education",
    name: "education",
    component: Layout,
    meta: {
      title: "education",
    },
    children: [
      {
        path: "/education",
        meta: {
          title: "education",
        },
        component: () => import("@/views/education/index"),
      },
    ],
  },
  {
    path: "/designer",
    name: "designer",
    component: Layout,
    meta: {
      title: "designer",
    },
    children: [
      {
        path: "/designer",
        meta: {
          title: "designer",
        },
        component: () => import("@/views/designer/index"),
      },
    ],
  },
  {
    path: "/groups",
    name: "groups",
    component: Layout,
    meta: {
      title: "groups",
    },
    children: [
      {
        path: "/groups",
        meta: {
          title: "groups",
        },
        component: () => import("@/views/groups/index"),
      },
      {
        path: "create",
        meta: {
          title: "create",
        },
        component: () => import("@/views/groups/create"),
      },
    ],
  },
  {
    path: "/editProfile",
    name: "editProfile",
    component: Layout,
    meta: {
      title: "editProfile",
    },
    children: [
      {
        path: "/editProfile",
        meta: {
          title: "editProfile",
        },
        component: () => import("@/views/editProfile/index"),
      },
    ],
  },
  {
    path: "/upload",
    name: "upload",
    component: Layout,
    meta: {
      title: "upload",
    },
    children: [
      {
        path: "/upload",
        name: "uploadIndex",
        meta: {
          title: "upload",
        },
        component: () => import("@/views/upload/index"),
      },
    ],
  },
  {
    path: "/customizer",
    name: "customizer",
    component: Layout,
    meta: {
      title: "customizer",
    },
    children: [
      {
        path: "/customizer",
        meta: {
          title: "customizer",
        },
        component: () => import("@/views/customizer/index"),
      },
    ],
  },
  {
    path: "/thing/:thingId",
    name: "thing",
    component: Layout,
    meta: {
      title: "thing",
    },
    children: [
      {
        path: "/thing/:thingId",
        meta: {
          title: "thing",
        },
        component: () => import("@/views/thing/index"),
      },
    ],
  },
  {
    path: "/design/:userId",
    name: "design",
    component: Layout,
    meta: {
      title: "design",
    },
    children: [
      {
        path: "/design/:userId",
        component: () => import("@/views/design/index"),
        meta: {
          title: "design",
        },
      },
    ],
  },
  {
    path: "/message/:userName/:userId",
    name: "message",
    component: Layout,
    meta: {
      title: "message",
    },
    children: [
      {
        path: "/message/:userName/:userId",
        meta: {
          title: "message",
        },
        component: () => import("@/views/message/index"),
      },
    ],
  },
  {
    path: "/following/:userId",
    name: "following",
    component: Layout,
    meta: {
      title: "following",
    },
    children: [
      {
        path: "/following/:userId",
        meta: {
          title: "following",
        },
        component: () => import("@/views/following/index"),
      },
    ],
  },
  {
    path: "/groupDetail",
    name: "groupDetail",
    component: Layout,
    meta: {
      title: "groupDetail",
    },
    children: [
      {
        path: "/groupDetail",
        component: () => import("@/views/groupDetail/index"),
        meta: {
          title: "groupDetail",
        },
        children: [
          {
            path: "/groupDetail/things/:groupId",
            meta: {
              title: "groupDetail-things",
            },
            component: () => import("@/views/groupDetail/Things"),
          },
          {
            path: "/groupDetail/members/:groupId",
            meta: {
              title: "groupDetail-members",
            },
            component: () => import("@/views/groupDetail/Members"),
          },
          {
            path: "/groupDetail/forums/:groupId",
            meta: {
              title: "groupDetail-forums",
            },
            component: () => import("@/views/groupDetail/Forums"),
          },
          {
            path: "/groupDetail/about/:groupId",
            meta: {
              title: "groupDetail-about",
            },
            component: () => import("@/views/groupDetail/About"),
          },
        ],
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: Layout,
    meta: {
      title: "about",
    },
    children: [
      {
        path: "/about",
        meta: {
          title: "about",
        },
        component: () => import("@/views/about/index"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Layout,
    meta: {
      title: "dashboard",
    },
    children: [
      {
        path: "/dashboard",
        meta: {
          title: "dashboard",
        },
        component: () => import("@/views/dashboard/index"),
      },
      {
        path: "recommend",
        meta: {
          title: "recommend",
        },
        component: () => import("@/views/dashboard/RecommendDesinger"),
      },
    ],
  },
  {
    path: "/preview/zwy",
    name: "zwy",
    component: () => import("@/views/preview/zwy"),
    meta: {
      title: "preview",
    },
  },
  {
    path: "/preview/csh",
    name: "csh",
    component: () => import("@/views/preview/csh"),
    meta: {
      title: "preview",
    },
  },
  {
    path: "/preview/hzy",
    name: "hzy",
    component: () => import("@/views/preview/hzy"),
    meta: {
      title: "preview",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
