<template>
  <div class="content">
    <!-- <app-Tabbar :title="title" hasBack></app-Tabbar> -->
    <van-nav-bar :title="title" left-arrow @click-left="goBack"> </van-nav-bar>
    <router-view></router-view>
  </div>
</template>
<script>
/* eslint-disable */
import { NavBar, Icon } from "vant";
import { mapGetters } from "vuex";
export default {
  name: "layout",
  components: { [NavBar.name]: NavBar, [Icon.name]: Icon },
  computed: {
    ...mapGetters(["title"]),
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  background: #f1f5fe;
}
</style>
