<template>
  <div id="top" class="main" @click="closeCollectedOptionBox">
    <header class="groups-header">
      <el-carousel height="392px" indicator-position="outside">
        <el-carousel-item v-for="item in bannerImages" :key="item.title">
          <a :href="item.url">
            <img :src="item.image" alt="" />
            <div class="learn-more">{{ $t("main.barnerViewMore") }}</div>
          </a>
        </el-carousel-item>
      </el-carousel>
    </header>
    <div class="content" id="content">
      <el-row class="filter">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="8">
          <div class="select-box">
            <i class="ortur-icon-hourglass icon-hourglass"></i>
            <el-select v-model="value" @change="selectChange" class="select">
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
              :isLike="comfirmLike(item.id)"
              :isCollected="comfirmCollection(item.id)"
              @openCollection="openCollection"
              @deleteCollection="deleteCollection"
            ></resource-card>
          </el-col>
        </div>
      </el-row>
      <p v-if="loading">loading...</p>
      <p v-if="noMore">no more</p>
      <sroll-top-button></sroll-top-button>
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
        // {
        //   value: "folowing",
        //   label: "Only folowing",
        // },
      ],
      value: "popular",
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
      if (this.$store.getters.isLogin) {
        getLikelist({
          userId: this.userInfo.user_id,
        })
          .then((res) => {
            this.likeList = res.data.rows;
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
    this.getResourceList();
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
    getBanner().then((res) => {
      this.bannerImages = res.data.data;
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.load);
  },
  methods: {
    comfirmLike(id) {
      return this.$store.getters.myLikesList.some((item) => {
        return item.id === id;
      });
    },
    comfirmCollection(id) {
      return this.$store.getters.myCollectionslist.some((item) => {
        return item.id === id;
      });
    },
    getResourceList() {
      getResourceList({ ...this.pagination, sort: this.value })
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
        this.$store.commit(
          "user/SET_COLLECTIONSLIST",
          this.$store.getters.myCollectionslist.filter((item) => {
            return item.id !== this.prepareCollectedResId;
          })
        );
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
        this.$store.commit("user/SET_COLLECTIONSLIST", [
          ...this.$store.getters.myCollectionslist,
          { id: this.prepareCollectedResId },
        ]);
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
    selectChange(value) {
      this.value = value;
      this.resources = [];
      this.pagination.pageNum = 1;
      this.getResourceList();
    },
    closeCollectedOptionBox() {
      this.closeCollectedOption();
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
  /* width: 1200px; */
  width: 1440px;
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
  /* width: 1200px; */
  width: 1440px;
  height: 392px;
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
  font-size: 14px;
  height: 48px;
}
::v-deep .el-input__inner:hover {
  border: none;
}
::v-deep .el-input__inner::before {
  content: "\e93f";
}
::v-deep .el-input__inner::placeholder {
  text-align: center;
  color: #1a1a1a;
  font-size: 11px;
}
.select-box {
  position: relative;
  height: 48px;
}
.icon-hourglass {
  position: absolute;
  top: 12px;
  left: 10px;
  z-index: 2;
  font-size: 22px;
}
.select {
  width: 160px;
  height: 36px;
  border-radius: 5px;
  font-size: 12px;
  position: absolute;
  top: 0px;
  left: 0px;
}
::v-deep .el-input__inner {
  background: #f0f3fa;
  text-align: center;
}
.select:hover {
  border: 1px solid #c2c4cc;
}
.option {
  width: 150px;
  height: 48px;
  margin: 0 auto;
  border-radius: 6px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  box-sizing: border-box;
  text-align: center;
  padding: 0px;
  overflow: visible;
  line-height: 48px;
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
