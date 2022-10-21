<template>
  <div class="help-container">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      class="search"
      @click="routeTo('search')"
    >
      <template #left-icon>
        <img src="@/assets/icon-search.png" alt="" class="search-img" />
      </template>
    </van-search>
    <question-categorize></question-categorize>
    <FAQ></FAQ>
    <div class="fadeback-container">
      <van-button
        color="#1E78F0"
        class="fadeback-button"
        @click="routeTo('suggest')"
        >意见反馈</van-button
      >
      <van-button
        color="#1E78F0"
        plain
        class="fadeback-button"
        @click="routeTo('history')"
      >
        历史反馈
      </van-button>
    </div>
  </div>
</template>
<script>
import { Grid, GridItem, Search, Icon, Button } from "vant";
import QuestionCategorize from "./components/QuestionCategorize.vue";
import FAQ from "./components/FAQ.vue";
export default {
  name: "index",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Search.name]: Search,
    [Icon.name]: Icon,
    [Button.name]: Button,
    QuestionCategorize,
    FAQ,
  },
  data() {
    return {
      value: "",
      searchIcon: require("@/assets/icon-search.png"),
    };
  },
  methods: {
    routeTo(page) {
      if (page == "search") {
        this.$router.push(`/result`);
      } else if (page == "history") {
        this.$dsbridge.call("routeTo", "history");
      } else if (page == "suggest") {
        this.$dsbridge.call("routeTo", "suggest");
      }
    },
  },
  mounted() {
    console.log("mounted", this.$dsbridge);
  },
};
</script>
<style lang="less" scoped>
.help-container {
  padding: 0 30px;
}
.search {
  margin-top: 32px;
}
::v-deep .van-field__control {
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #999999;
}
::v-deep .van-icon-search {
  font-size: 30px;
}
.search-img {
  width: 30px;
  height: 30px;
  position: relative;
  top: 10px;
}
.fadeback-container {
  display: flex;
  justify-content: space-between;
  margin-top: 56px;
}
.fadeback-button {
  padding: 30px 98px;
  font-size: 30px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  border-radius: 12px;
}
</style>
