<template>
  <div class="content" ref="content">
    <!-- <app-Tabbar :title="title" hasBack></app-Tabbar> -->
    <van-nav-bar
      v-if="!navHidden"
      :title="title"
      left-arrow
      @click-left="goBack"
    >
    </van-nav-bar>
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
    ...mapGetters(["title", "navHidden"]),
  },
  data() {
    return {};
  },
  mounted() {
    this.$refs.content.style.minHeight = window.screen.height + "px";
  },
  methods: {
    goBack() {
      if (this.title == "帮助与反馈") {
        this.$dsbridge.call("routeTo", "backUrl");
      }
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  background: #f1f5fe;
  /* height: 1206px; */
}
::v-deep .van-nav-bar__content {
  height: 88px;
}
::v-deep .van-nav-bar__title {
  font-size: 36px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #121212;
  line-height: 88px;
}
::v-deep .van-icon-arrow-left:before {
  font-size: 48px;
  /* border: dashed 1px #999; */
}
</style>
