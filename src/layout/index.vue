<template>
  <div>
    <nav-bar></nav-bar>
    <router-view :key="$route.fullPath" />
    <ortur-footer></ortur-footer>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import OrturFooter from "@/components/OrturFooter";
export default {
  /* eslint-disable */
  name: "Layout",
  components: { NavBar, OrturFooter },
  data() {
    return {};
  },
  methods: {},
};
</script>
