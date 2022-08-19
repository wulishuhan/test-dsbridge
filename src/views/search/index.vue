<template>
  <div class="search-wrapper">
    <div class="search-keywords-wrapper">
      <span>{{ $t(searchText) }}</span>
    </div>
    <el-divider></el-divider>
    <el-tabs v-model="currentTab">
      <el-tab-pane name="grid">
        <el-button slot="label">
          <i class="el-icon-s-fold"></i> &nbsp; Content
          <span v-if="currentTab == 'grid'">({{ resources.length }})</span>
        </el-button>
        <el-row class="row">
          <div v-for="item in resources" :key="item.id">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
              <resource-card
                :thing="item"
                :isLike="likeList.includes(item.id)"
                :isCollected="collectedList.includes(item.id)"
              ></resource-card>
            </el-col>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane name="list">
        <el-button slot="label">
          <i class="el-icon-s-custom"></i> &nbsp; Author
          <span v-if="currentTab == 'list'">({{ resources.length }})</span>
        </el-button>
        <el-row class="row">
          <div v-for="item in resources" :key="item.id">
            <resource-line
              :thing="item"
              :isLike="likeList.includes(item.id)"
              :isCollected="collectedList.includes(item.id)"
            ></resource-line>
            <el-divider></el-divider>
          </div>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <sroll-top-button :to="'#top'"></sroll-top-button>
  </div>
</template>
<script>
import { getResourceList } from "@/api/resource";
import { getLikelist } from "@/api/like";
import { getCollectionResourceList } from "@/api/collection";
import { mapGetters } from "vuex";
import ResourceCard from "@/components/ResourceCard";
import ResourceLine from "@/components/ResourceLine";
import SrollTopButton from "@/components/SrollTopButton";
export default {
  // eslint-disable-next-line
  name: "search",
  data() {
    return {
      resources: [],
      likeList: [],
      collectedList: [],
      currentTab: "grid",
    };
  },
  components: { ResourceCard, SrollTopButton, ResourceLine },
  computed: {
    ...mapGetters(["userInfo"]),
    searchText() {
      return 'Result for "' + this.$route.query.keywords + '"';
    },
  },
  mounted() {},
  created() {
    getResourceList().then((res) => {
      console.log(res);
      this.resources = res.data.rows;
    });

    if (this.isLogin) {
      //获取点赞列表
      getLikelist({
        userId: this.userInfo.user_id,
      }).then((res) => {
        console.log(res, "获取点赞列表");
        for (let i = 0; i < res.data.rows.length; i++) {
          const element = res.data.rows[i];
          this.likeList.push(element.id);
        }
      });
      //获取收藏列表
      getCollectionResourceList({
        userId: this.userInfo.user_id,
      }).then((res) => {
        console.log(res, "获取收藏列表");
        for (let i = 0; i < res.data.rows.length; i++) {
          const element = res.data.rows[i];
          this.collectedList.push(element.id);
        }
      });
    }
    console.log(this.$route);
  },
};
</script>
<style lang="scss" scoped>
.search-wrapper {
  width: 1420px;
  margin: auto;
  .search-keywords-wrapper {
    margin-top: 20px;
    color: #1a1a1a;
    font-size: 16px;
  }
  ::v-deep .el-tabs__active-bar {
    display: none;
  }
  .el-tabs__item {
    .el-button {
      font-size: 12px;
      border: none;
      background: none;
    }
  }
  .el-tabs__item.is-active {
    .el-button {
      background: #8ab5ef;
      border: none;
      color: #fff;
    }
  }

  ::v-deep .el-tabs__nav-wrap::after {
    display: none;
  }
}
</style>
