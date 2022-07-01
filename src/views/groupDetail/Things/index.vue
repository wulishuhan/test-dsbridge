<template>
  <div>
    <el-row class="header" type="flex" justify="space-between">
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        class="post-thing-button"
      >
        <el-button type="primary" class="el-icon-plus">
          <b>JOIN</b> TO POST A THING
        </el-button>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        class="button-position-box"
      >
        <el-button type="text">NEWEST</el-button>
        <el-button type="text">POPULAR</el-button>
        <el-input
          placeholder="search"
          prefix-icon="el-icon-search"
          v-model="keywords"
          class="search-input"
        ></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="8"
        v-for="item in things"
        :key="item.groupId"
      >
        <things-card :things="item"></things-card>
      </el-col>
    </el-row>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore" style="text-align: center">没有更多了</p>
  </div>
</template>
<script>
import ThingsCard from "./components/ThingsCard";
import { getGroupThings } from "@/api/groups";
import { throttle } from "@/utils/cache.js";
export default {
  // eslint-disable-next-line
  name: "Things",
  components: { ThingsCard },
  mounted() {
    getGroupThings({
      ...this.pagination,
      groupId: this.$route.params.groupId,
    }).then((res) => {
      this.things = res.data.data;
    });
    this.load = throttle(() => {
      // 距离底部200px时加载一次
      let bottomOfWindow =
        document.documentElement.offsetHeight -
          document.documentElement.scrollTop -
          window.innerHeight <=
        200;
      if (bottomOfWindow && !this.loading && !this.noMore) {
        this.pagination.currentPage++;
        getGroupThings({
          ...this.pagination,
          groupId: this.$route.params.groupId,
        })
          .then((res) => {
            console.log(res);
            this.things.push(...res.data.data);
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
            this.noMore = true;
          });
      }
    }, 1500);
    window.addEventListener("scroll", this.load);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.load);
  },
  data() {
    return {
      keywords: "",
      things: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
      },
      noMore: false,
      loading: false,
      load: () => {},
    };
  },
};
</script>
<style lang="scss" scoped>
.header {
  flex-wrap: wrap;
  margin-top: 15px;
  padding-top: 15px;
}
.button-position-box {
  display: flex;
  justify-content: space-between;
  width: 50%;
}
.search-input {
  margin-left: 20px;
  width: 50%;
}
.el-row {
  margin-top: 20px;
}
@media screen and (max-width: 768px) {
  .search-input {
    margin-left: 20px;
    width: 100%;
    margin-left: 0px;
  }
  .button-position-box {
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .post-thing-button {
    text-align: center;
  }
  .el-button {
    width: 100%;
    margin-left: 0px;
  }
  .el-row {
    margin-top: 30px;
  }
}
</style>
