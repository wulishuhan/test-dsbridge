<template>
  <div id="top" class="main">
    <header class="groups-header">
      <el-carousel indicator-position="outside">
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
            <resource-card
              :thing="item"
              :isLike="likeList.includes(item.id)"
              :isCollected="collectedList.includes(item.id)"
              @openCollection="openCollection"
              @deleteCollection="deleteCollection"
            ></resource-card>
          </el-col>
        </div>
      </el-row>
      <p v-if="loading">loading...</p>
      <p v-if="noMore">no more</p>
      <sroll-top-button :to="'#top'"></sroll-top-button>
    </div>
    <CollectedOption
      :style="collectionStyle"
      :show="openCollectedOption"
      :folders="folders"
      @close="closeCollectedOption"
      @moveFolder="moveCollectedOption"
      @addFolder="addFolder"
    ></CollectedOption>
  </div>
</template>
<script>
import ResourceCard from "@/components/ResourceCard";
import CollectedOption from "@/components/CollectedOption";
import SrollTopButton from "@/components/SrollTopButton";
import { throttle } from "@/utils/cache.js";
// import { getThingList } from "@/api/thing";
import { getResourceList } from "@/api/resource";
import { getBanner } from "@/api/banner";
import { getLikelist } from "@/api/like";
import { mapGetters } from "vuex";
import {
  getCollectionResourceList,
  getCollectionList,
  addCollection,
  addResourceToCollection,
  deleteCollectionResource,
} from "@/api/collection";
export default {
  // eslint-disable-next-line
  name: "Main",
  components: { ResourceCard, SrollTopButton, CollectedOption },
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
      collectedList: [],
      openCollectedOption: false,
      collectionStyle: {
        position: "absolute",
        left: "0px",
        top: "0px",
      },
      folders: [],
      prepareCollectedResId: 0,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },

  watch: {
    "$store.getters.isLogin": function () {
      console.log("change login status");
      if (this.$store.getters.isLogin) {
        getLikelist({
          userId: this.userInfo.user_id,
        })
          .then((res) => {
            for (let i = 0; i < res.data.rows.length; i++) {
              const element = res.data.rows[i];
              this.likeList.push(element.id);
            }
          })
          .then(() => {
            getCollectionResourceList({
              userId: this.userInfo.user_id,
            }).then((res) => {
              for (let i = 0; i < res.data.rows.length; i++) {
                const element = res.data.rows[i];
                this.collectedList.push(element.id);
              }
            });
          });
      } else {
        this.$router.go(0);
      }
    },
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
      })
      .then(() => {
        getCollectionResourceList({
          userId: this.userInfo.user_id,
        }).then((res) => {
          for (let i = 0; i < res.data.rows.length; i++) {
            const element = res.data.rows[i];
            this.collectedList.push(element.id);
          }
        });
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
              Math.ceil(this.resourcesTotal / this.pagination.pageSize)
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
          console.log("getResourceList:", res);
          let resource = res.data.rows;
          this.resources.push(...resource);
          this.resourcesTotal = res.data.total;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.noMore = true;
        });
    },
    openCollection(id, left, top) {
      this.openCollectedOption = true;
      this.collectionStyle.left = left + "px";
      this.collectionStyle.top = top + "px";
      this.prepareCollectedResId = id;
      getCollectionList({
        userId: this.$store.getters.userInfo.user_id,
      }).then((res) => {
        this.folders = res.data.data;
      });
    },
    deleteCollection(id) {
      this.openCollectedOption = false;
      deleteCollectionResource({
        userId: this.$store.getters.userInfo.user_id,
        resourceId: id,
      }).then(() => {
        this.$message({
          message: "cancel collected successfully",
          type: "success",
        });
        for (let i = 0; i < this.collectedList.length; i++) {
          if (this.collectedList[i] === id) {
            this.collectedList.splice(i, 1);
          }
        }
      });
    },
    closeCollectedOption() {
      this.openCollectedOption = false;
    },
    moveCollectedOption(folderObject) {
      this.openCollectedOption = false;
      addResourceToCollection({
        resourceId: this.prepareCollectedResId,
        collectionId: folderObject.id,
      }).then(() => {
        this.$message({
          message: "move successfully",
          type: "success",
        });
        this.collectedList.push(this.prepareCollectedResId);
      });
    },
    addFolder(folderName) {
      addCollection({
        name: folderName,
        userId: this.$store.getters.userInfo.user_id,
      })
        .then(() => {
          this.$message({
            message: "add folder successfully",
            type: "success",
          });
        })
        .then(() => {
          getCollectionList({
            userId: this.$store.getters.userInfo.user_id,
          }).then((res) => {
            this.folders = res.data.data;
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  /* text-align: center; */
  /* background-color: #f5f5f5; */
  background: #f0f3fa;
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
  color: #f0f3fa;
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
  background: #f0f3fa;
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
