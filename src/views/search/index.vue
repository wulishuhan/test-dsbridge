<template>
  <div class="search-wrapper">
    <div class="search-keywords-wrapper">
      <span>{{ $t(searchText) }}</span>
    </div>
    <el-divider></el-divider>
    <el-tabs v-model="currentTab">
      <el-tab-pane name="source">
        <el-button slot="label" @click="searchSource">
          <i class="el-icon-s-fold"></i> &nbsp; Content
          <span v-if="currentTab == 'source'">({{ total }})</span>
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
      <el-tab-pane name="author">
        <el-button slot="label" @click="searchAuthor">
          <i class="el-icon-s-custom"></i> &nbsp; Author
          <span v-if="currentTab == 'author'">({{ total }})</span>
        </el-button>
        <el-row class="row">
          <div v-for="item in authors" :key="item.id">
            <resource-line :authorInfo="item"></resource-line>
            <el-divider></el-divider>
          </div>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <sroll-top-button></sroll-top-button>
  </div>
</template>
<script>
import { getResourceList, getAuthorList } from "@/api/resource";
import { getLikelist } from "@/api/like";
import { getCollectionResourceList } from "@/api/collection";
import { mapGetters } from "vuex";
import ResourceCard from "@/components/ResourceCard";
import ResourceLine from "@/components/ResourceLine";
import SrollTopButton from "@/components/SrollTopButton";
import { debounce } from "@/utils/common";
export default {
  // eslint-disable-next-line
  name: "search",
  data() {
    return {
      resources: [],
      authors: [],
      likeList: [],
      collectedList: [],
      currentTab: "source",
      pageNum: 1,
      total: 0,
      pageSize: 12,
    };
  },
  components: { ResourceCard, SrollTopButton, ResourceLine },
  computed: {
    ...mapGetters(["userInfo"]),
    searchText() {
      return 'Result for  "' + this.$route.query.w + '"';
    },
  },
  mounted() {},

  beforeDestroy() {
    window.removeEventListener("scroll", this._debounce);
  },
  created() {
    this.searchSource();
  },
  methods: {
    handleSourceScroll() {
      var totalPage = Math.ceil(this.total / this.pageSize);
      if (this.pageNum >= totalPage) {
        window.removeEventListener("scroll", this._debounce);
        return;
      }
      var scrollTop = parseInt(
        document.documentElement.scrollTop || document.body.scrollTop
      );
      var rollupHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (rollupHeight - scrollTop <= 20) {
        getResourceList({
          keywords: this.$route.query.w,
          pageNum: ++this.pageNum,
          pageSize: 12,
        }).then((res) => {
          // this.resources = res.data.rows;
          // Array.prototype.push.apply(this.resources, res.data.rows);
          this.resources = this.resources.concat(res.data.rows);
          console.log("当前分页数据:" + this.pageNum, this.resources);
        });
      }
    },
    searchSource() {
      this.total = 0;
      this.pageNum = 1;
      window.removeEventListener("scroll", this._debounce);
      this._debounce = debounce(this.handleSourceScroll, 1000);
      window.addEventListener("scroll", this._debounce);
      getResourceList({
        keywords: this.$route.query.w,
        pageNum: 1,
        pageSize: this.pageSize,
      }).then((res) => {
        this.resources = res.data.rows;
        this.total = res.data.total;
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
    },
    handleAuthorScroll() {
      var totalPage = Math.ceil(this.total / this.pageSize);
      if (this.pageNum >= totalPage) {
        window.removeEventListener("scroll", this._debounce);
        return;
      }
      var scrollTop = parseInt(
        document.documentElement.scrollTop || document.body.scrollTop
      );
      var rollupHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (rollupHeight - scrollTop <= 20) {
        getAuthorList({
          keywords: this.$route.query.w,
          pageNum: ++this.pageNum,
          pageSize: this.pageSize,
        }).then((res) => {
          this.authors = this.authors.concat(res.data.rows);
        });
      }
    },
    searchAuthor() {
      this.pageNum = 1;
      this.total = 0;
      window.removeEventListener("scroll", this._debounce);
      this._debounce = debounce(this.handleAuthorScroll, 1000);
      window.addEventListener("scroll", this._debounce);
      getAuthorList({
        keywords: this.$route.query.w,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then((res) => {
        this.authors = res.data.rows;
        this.total = res.data.total;
      });
    },
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
