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
var oMeta = document.createElement("meta");
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
  mounted() {
    let width = document.documentElement.clientWidth;
    oMeta.content = `width=device-width, initial-scale=0,user-scalable=yes,maximum-scale=1.0`;
    if (
      /(iPhone|iPad|iOS|Mac|iphone|mac|ipad|ios|)/.test(navigator.userAgent)
    ) {
      oMeta.content = `width=1440, initial-scale=0,user-scalable=yes,maximum-scale=1.0`;
    }
    oMeta.name = "viewport";
    document.getElementsByTagName("head")[0].appendChild(oMeta);
  },
};
</script>
