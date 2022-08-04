<template>
  <div id="top" class="main">
    <header class="groups-header">
      <el-carousel>
        <el-carousel-item v-for="item in bannerImages" :key="item.title">
          <a :href="item.url">
            <img :src="item.image" alt="" />
            <div class="learn-more">了解更多</div>
          </a>
        </el-carousel-item>
      </el-carousel>
    </header>
    <div class="content" id="content">
      <el-row class="filter">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="8">
          <div class="select-box">
            <i class="ortur-icon-hourglass icon-hourglass"></i>
            <el-select v-model="value" placeholder="The Popular" class="select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="font-size: 12px"
                class="option"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4"> </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4"> </el-col>
      </el-row>
      <el-row class="row">
        <div v-for="item in resources" :key="item.id">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            <resource-card :thing="item"></resource-card>
          </el-col>
        </div>
      </el-row>
      <p v-if="loading">loading...</p>
      <p v-if="noMore">no more</p>
      <sroll-top-button :to="'#top'"></sroll-top-button>
    </div>
  </div>
</template>
<script>
import ResourceCard from "@/components/ResourceCard";
import SrollTopButton from "@/components/SrollTopButton";
import { throttle } from "@/utils/cache.js";
// import { getThingList } from "@/api/thing";
import { getResourceList } from "@/api/resource";
import { getBanner } from "@/api/banner";
import { getLikelist } from "@/api/like";
import { mapGetters } from "vuex";
export default {
  // eslint-disable-next-line
  name: "Main",
  components: { ResourceCard, SrollTopButton },
  data() {
    return {
      total: 0,
      pagination: {
        pageSize: 10,
        pageNum: 1,
      },
      options: [
        {
          value: "popular",
          label: "The popular",
        },
        {
          value: "newest",
          label: "The newest",
        },
        {
          value: "folowing",
          label: "Only folowing",
        },
      ],
      value: "",
      load: () => {},
      resources: [],
      loading: false,
      resourcesTotal: 0,
      noMore: false,
      bannerImages: [],
      likeList: [],
    };
  },
  computed: {
    ...mapGetters(["isLogin", "userInfo"]),
  },
  mounted() {
    getLikelist({
      userId: this.userInfo.user_id,
    })
      .then((res) => {
        for (let i = 0; i < res.data.rows.length; i++) {
          const element = res.data.rows[i];
          this.likeList.push(element.id);
        }
        console.log("========", res, this.likeList);
      })
      .then(() => {
        this.getResourceList();
      })
      .then(() => {
        this.load = throttle(() => {
          // 距离底部200px时加载一次
          let bottomOfWindow =
            document.documentElement.offsetHeight -
              document.documentElement.scrollTop -
              window.innerHeight <=
            200;
          if (bottomOfWindow && !this.loading && !this.noMore) {
            this.pagination.pageNum++;
            if (
              this.pagination.pageNum <=
              this.resourcesTotal / this.pagination.pageSize + 1
            ) {
              this.getResourceList();
            }
          }
        }, 1000);
        window.addEventListener("scroll", this.load);
      });
    getBanner().then((res) => {
      this.bannerImages = res.data.data;
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.load);
  },
  methods: {
    getResourceList() {
      getResourceList(this.pagination)
        .then((res) => {
          let resource = res.data.rows;
          for (let i = 0; i < resource.length; i++) {
            if (this.likeList.includes(resource[i].id)) {
              resource[i].isLike = true;
            } else {
              resource[i].isLike = false;
            }
          }
          this.resources.push(...resource);
          this.resourcesTotal = res.data.total;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.noMore = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  /* text-align: center; */
  background-color: #f5f5f5;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
.filter {
  margin: 20px auto;
}
a {
  text-decoration-line: none;
  color: #303133;
}
p {
  text-align: center;
}
.groups-header {
  width: 1200px;
  height: 300px;
  margin: 0 auto;
  color: #f5f5f5;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  a {
    position: relative;
    .learn-more {
      position: absolute;
      width: 84px;
      height: 36px;
      background: #1a1a1a;
      opacity: 0.3;
      border-radius: 5px;
      bottom: 12px;
      right: 12px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
    }
  }
}
::v-deep .el-input__inner,
.el-input,
.el-select {
  font-size: 12px;
  height: 36px;
}
::v-deep .el-input__inner:hover {
  border: none;
}
::v-deep .el-input__inner::placeholder {
  text-align: right;
  color: #1a1a1a;
  font-size: 11px;
}
.select-box {
  position: relative;
  height: 36px;
}
.icon-hourglass {
  position: absolute;
  top: 12px;
  left: 2px;
  z-index: 2;
  font-size: 15px;
}
.select {
  width: 120px;
  height: 36px;
  border-radius: 5px;
  font-size: 12px;
  position: absolute;
  top: 0px;
  left: 0px;
}
::v-deep .el-input__inner {
  background: #f5f5f5;
}
.select:hover {
  border: 1px solid #c2c4cc;
}
.option {
  width: 108px;
  height: 42px;
  margin: 0 auto;
  border-radius: 6px;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  box-sizing: border-box;
  text-align: center;
  padding: 0px;
  overflow: visible;
}
.option:hover {
  background: #8ab5ef;
  color: #ffffff;
}

@media screen and (max-width: 768px) {
  .content {
    width: 100%;
  }
}
</style>
