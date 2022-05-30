<template>
  <div>
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
  /* eslint-disable */
  name: "Layout",
  components: { NavBar },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
