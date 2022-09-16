<template>
  <div>
    <!-- <nav-bar></nav-bar> -->
    <app-header></app-header>
    <keep-alive>
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import AppHeader from "@/components/AppHeader";
import OrturFooter from "@/components/OrturFooter";
export default {
  /* eslint-disable */
  name: "Layout",
  components: { NavBar, OrturFooter, AppHeader },
  data() {
    return {};
  },
  methods: {},
};
</script>
