<template>
  <div id="detail-top" class="container" @click="closeButtonPanel">
    <div class="center-container">
      <div class="show">
        <el-row>
          <el-col>
            <div class="show-header">
              <div class="show-header-left">
                <div class="show-header-left-thing-name">
                  {{ detail.title }}
                </div>
                <div class="flex">
                  <el-avatar
                    :size="40"
                    :src="avatar"
                    @click.native="toUserProfileView"
                  ></el-avatar>
                  <div
                    class="flex flex-column user-name-update-time"
                    @click="toUserProfileView"
                  >
                    <span class="user-name">{{ detail.creator.name }}</span>
                    <span class="update-time">
                      {{ $d(new Date(detail.update_time), "long") }}</span
                    >
                  </div>
                </div>
              </div>
              <div
                v-if="userInfo.user_id !== detail.creator.id"
                class="flex justify-between"
                style="width: 456px"
              >
                <StarButton
                  :starNum="detail.like_count"
                  :isStar="comfirmLike"
                  @click="like"
                ></StarButton>
                <div class="collected-box">
                  <CollectButton
                    :isCollect="comfirmCollection"
                    :collectionNum="detail.collect_count"
                    @click="collect"
                  >
                  </CollectButton>
                  <CollectedOption
                    :show="openCollectedOption"
                    :folders="folders"
                    @close="closeCollectedOption"
                    @moveFolder="moveCollectedOption"
                    @addFolder="addFolder"
                    class="collected-option"
                  ></CollectedOption>
                </div>
                <DownLoadButton
                  :isShowDownPanel="isShowDownPanel"
                  :fileList="detail.files"
                  :fileNum="detail.files.length"
                  :downLoadNum="downloadNumber"
                  :resourceName="detail.title"
                  @click="openShowDownPanel"
                ></DownLoadButton>
              </div>
              <div v-else class="flex justify-between" style="width: 300px">
                <el-button @click="toUpload">
                  <i class="ortur-icon-pen"></i>
                </el-button>
                <DownLoadButton
                  :isShowDownPanel="isShowDownPanel"
                  :fileList="detail.files"
                  :fileNum="detail.files.length"
                  :downLoadNum="downloadNumber"
                  :resourceName="detail.title"
                  @click="openShowDownPanel"
                ></DownLoadButton>
              </div>
            </div>
            <div class="show-thing">
              <div
                class="carousel-box flex justify-between"
                @mouseenter="enterCarousel"
                @mouseleave="leaveCarousel"
              >
                <div>
                  <div class="carousel">
                    <transition name="carousel-button-fade">
                      <div v-show="mouseEnterCarousel">
                        <button
                          class="ortur-icon-enlarge"
                          @click="openImageView()"
                        ></button>
                        <button
                          class="el-icon-arrow-up upCarousel"
                          @click="arrowClick()"
                        ></button>
                        <button
                          class="el-icon-arrow-down downCarousel"
                          @click="arrowClick('down')"
                        ></button>
                      </div>
                    </transition>
                    <el-carousel
                      direction="vertical"
                      height="496px"
                      :interval="3000"
                      arrow="hover"
                      ref="carousel"
                      indicator-position="none"
                      :autoplay="false"
                      @change="carouselChange"
                    >
                      <el-carousel-item
                        v-for="(item, index) in imageList"
                        :name="'' + index"
                        :key="item.id"
                        indicator-position="outside"
                        autoplay="true"
                      >
                        <img :src="item.url" />
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
                <div v-swiper:mySwiper="swiperOptions">
                  <div class="swiper-wrapper">
                    <div
                      class="swiper-slide"
                      v-for="(item, index) in imageList"
                      :key="item.id"
                    >
                      <img
                        @click="changeImg(index)"
                        :class="
                          index === imgActiveIndex ? 'img-activeBorder' : ''
                        "
                        :src="item.url"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="swiper-scrollbar"></div>
                  <transition name="carousel-button-fade">
                    <div v-show="mouseEnterCarousel">
                      <div class="up swiper-container-button">
                        <i class="ortur-icon-arrow-up"></i>
                      </div>
                      <div class="down swiper-container-button">
                        <i class="ortur-icon-arrow-bottom"></i>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="flex justify-between bottom-content">
        <div class="bottom-content-left">
          <el-tabs
            class="description-tutorial-makes"
            type="border-card"
            v-model="activeName"
            :stretch="true"
          >
            <el-tab-pane label="Description" name="description">
              <show-more
                :showHeight="showHeight"
                v-if="activeName == 'description'"
                :content="contentText"
              >
              </show-more>
            </el-tab-pane>
            <el-tab-pane label="Tutorial" name="steps">
              <show-more :showHeight="showHeight" v-if="activeName == 'steps'">
                <tutorial :step="detail.tutorials"></tutorial>
              </show-more>
            </el-tab-pane>
            <el-tab-pane
              v-if="JSON.stringify(detail.ancestor) === '{}'"
              label="Remixes"
              name="third"
            >
              <remixes></remixes>
            </el-tab-pane>
            <el-tab-pane label="Makes" name="fourth">
              <Makes></Makes>
            </el-tab-pane>
          </el-tabs>
          <div class="split-line"></div>
          <MoreByCreator
            :moreList="moreCreateList"
            @openViewAllDialog="openViewAllDialog"
          ></MoreByCreator>

          <similar @openViewAllDialog="openViewAllDialog"></similar>
          <div class="split-line"></div>
          <div class="comment-box">
            <Reply></Reply>
            <comment></comment>
          </div>
        </div>
        <div class="bottom-content-right">
          <div
            v-if="JSON.stringify(detail.ancestor) !== '{}'"
            class="source-box"
          >
            <div class="source-box-source-text">Source</div>
            <div class="source-box-info">
              <img :src="detail.ancestor.image" />
              <div class="source-box-info-title-name">
                <p class="source-box-info-title">
                  {{ detail.ancestor ? detail.ancestor.title : "" }}
                </p>
                <p class="source-box-info-name">
                  By
                  {{
                    detail.ancestor.creator ? detail.ancestor.creator.name : ""
                  }}
                </p>
              </div>
            </div>
            <div class="flex license-box">
              <div v-if="licenseIcon.length > 0">
                <i v-for="item in licenseIcon" :key="item" :class="item"></i>
              </div>
              <div v-else>
                <img v-for="item in licenseImg" :key="item" :src="item" />
              </div>
            </div>
          </div>
          <label-card :LabelArr="detail.tags"></label-card>
          <div class="share-content">
            <div class="bottom-content-right-box-title">Share</div>
            <div class="share">
              <a class="share-icon" @click="share(shareLink.facebook)">
                <i class="ortur-icon-facebook ortur-icon"></i>
              </a>
              <a class="share-icon" @click="share(shareLink.twitter)">
                <i class="ortur-icon-twitter ortur-icon"></i>
              </a>
              <a class="share-icon" @click="share(shareLink.whatsapp)">
                <i class="ortur-icon-whats-app ortur-icon"></i>
              </a>
              <a class="share-icon" @click="share(shareLink.instagram)">
                <i class="ortur-icon-ins ortur-icon"></i>
              </a>
            </div>
          </div>
          <div
            class="license-container"
            v-if="JSON.stringify(detail.ancestor) === '{}'"
          >
            <div class="bottom-content-right-box-title">License</div>
            <div class="flex license-box">
              <div v-if="licenseIcon.length > 0">
                <i v-for="item in licenseIcon" :key="item" :class="item"></i>
              </div>
              <div v-else>
                <img v-for="item in licenseImg" :key="item" :src="item" />
              </div>
            </div>
            <div class="license-info">
              {{ detail.title }} by {{ detail.creator.name }} is licensed under
              the
              <a :href="licenseUrl" target="_blank"> {{ detail.license }} </a>
              license
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ElImageViewer
        class="imageViewer"
        v-if="showViewer"
        :on-close="closeViewer"
        :url-list="urlList"
        :initialIndex="imgActiveIndex"
      ></ElImageViewer>
    </div>
    <el-dialog :visible.sync="dialogTabsVisible" width="1136px">
      <el-tabs class="more-dialog" v-model="viewMoreActive" :stretch="true">
        <el-tab-pane label="More by this creator" name="view-creator">
          <view-more
            v-if="viewMoreActive === 'view-creator'"
            :creator="detail.creator"
            :name="'view-creator'"
          ></view-more>
        </el-tab-pane>
        <el-tab-pane label="Similar with this" name="view-similar">
          <view-more
            v-if="viewMoreActive === 'view-similar'"
            :name="'view-similar'"
          ></view-more>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <sroll-top-button></sroll-top-button>
  </div>
</template>
<script>
/* eslint-disable */
// import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import ElImageViewer from "@/components/ImageViewer";
import { getUserInfoByThingId } from "@/api/thing";
import {
  getResource,
  getResourceListById,
  getMoreByThisCreator,
} from "@/api/resource";
import { getLikelist, addLike, deleteLike } from "@/api/like";
import { mapGetters } from "vuex";
import {
  getCollectionResourceList,
  getCollectionList,
  addCollection,
  addResourceToCollection,
  deleteCollectionResource,
} from "@/api/collection";
import DownLoadButton from "@/components/DownLoadButton.vue";
import StarButton from "@/components/StarButton.vue";
import CollectButton from "@/components/CollectButton.vue";
import LabelCard from "@/components/LabelCard.vue";
import Comment from "@/components/Comment/CommentWidget.vue";
import ShowMore from "@/components/ShowMore.vue";
import Reply from "@/components/Comment/ReplyWidget.vue";
import ViewMore from "./ViewMore.vue";
import SrollTopButton from "@/components/SrollTopButton";
import Tutorial from "./components/Tutorial.vue";
import CollectedOption from "@/components/CollectedOption";
import Makes from "./components/Makes.vue";
import Remixes from "./components/Remixes.vue";
import Similar from "./components/Similar.vue";
import MoreByCreator from "./components/MoreByCreator.vue";
import { generatorDefaultAvator } from "@/utils/generateImage";
export default {
  name: "Thing",
  components: {
    ElImageViewer,
    StarButton,
    CollectButton,
    DownLoadButton,
    LabelCard,
    Comment,
    ShowMore,
    Reply,
    ViewMore,
    SrollTopButton,
    Tutorial,
    CollectedOption,
    Makes,
    Remixes,
    Similar,
    MoreByCreator,
  },
  data() {
    return {
      dialogPostRemix: false,
      showViewer: false, // 显示查看器
      urlList: [], //大图列表
      activeName: "description",
      imgActiveIndex: 0, // 当前移动图片的索引值
      imageList: [],
      viewModel: false,
      isLike: false,
      isCollected: false,
      showHeight: 50,
      dialogTabsVisible: false,
      viewMoreActive: "view-more",
      moreCreateList: [],
      shareLink: {
        // text文本后边可以传要分享的url，注意后期修改
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
        twitter: `https://twitter.com/share?url=${window.location.href}`,
        whatsapp: `https://web.whatsapp.com/send?text=${window.location.href}`,
        instagram: `https://www.instagram.com/`,
      },
      swiperOptions: {
        loop: true,
        direction: "vertical",
        mousewheel: true,
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 16,
        navigation: {
          nextEl: ".down",
          prevEl: ".up",
        },
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      },
      mouseEnterCarousel: false,
      likeList: [],
      detail: {
        ancestor: {},
        collect_count: "",
        creator: {
          avatar: "",
          name: "",
        },
        description: "",
        files: [],
        id: "",
        images: "",
        license: "",
        like_count: 0,
        collect_count: 0,
        tags: [],
        title: "",
        tutorials: [],
        update_time: "1990-01-01",
      },
      contentText: "",
      collectedList: [],
      openCollectedOption: false,
      folders: [],
      likeDisabled: false,
      isShowDownPanel: false,
      licenseImg: [],
      licenseIcon: [],
    };
  },
  computed: {
    ...mapGetters(["isLogin", "userInfo"]),
    downloadNumber() {
      return this.detail.files.reduce((pre, cur) => {
        return pre + cur.downloadCount;
      }, 0);
    },
    licenseUrl() {
      let license = this.detail.license;
      let licenseUrl = "";
      if (license === "Creative Commons - Attribution") {
        licenseUrl = "https://creativecommons.org/licenses/by/4.0/";
        this.licenseIcon = ["ortur-icon-cc", "ortur-icon-user-info"];
      } else if (license === "Creative Commons - Attribution - Share Alike") {
        licenseUrl = "https://creativecommons.org/licenses/by-sa/4.0/";
        this.licenseIcon = [
          "ortur-icon-cc",
          "ortur-icon-user-info",
          "ortur-icon-reload",
        ];
      } else if (
        license === "Creative Commons - Attribution - No Derivatives"
      ) {
        licenseUrl = "https://creativecommons.org/licenses/by-nd/4.0/";
        this.licenseIcon = [
          "ortur-icon-cc",
          "ortur-icon-user-info",
          "ortur-icon-no-derivatives",
        ];
      } else if (
        license === "Creative Commons - Attribution - Non-Commercial"
      ) {
        licenseUrl = "https://creativecommons.org/licenses/by-nc/4.0/";
        this.licenseIcon = [
          "ortur-icon-cc",
          "ortur-icon-user-info",
          "ortur-icon-no-money",
        ];
      } else if (
        license ===
        "Creative Commons - Attribution - Non-Commercial - Share Alike"
      ) {
        licenseUrl = "https://creativecommons.org/licenses/by-nc-sa/4.0/";
        this.licenseIcon = [
          "ortur-icon-cc",
          "ortur-icon-user-info",
          "ortur-icon-no-money",
          "ortur-icon-reload",
        ];
      } else if (
        license ===
        "Creative Commons - Attribution - Non-Commercial - No Derivatives "
      ) {
        licenseUrl = "https://creativecommons.org/licenses/by-nc-nd/4.0/";
        this.licenseIcon = [
          "ortur-icon-cc",
          "ortur-icon-user-info",
          "ortur-icon-no-money",
          "ortur-icon-no-derivatives",
        ];
      } else if (license === "Creative Commons - Public Domain Dedication") {
        licenseUrl =
          "https://creativecommons.org/share-your-work/public-domain/cc0/";
        this.licenseImg = [
          "/license-img/Creative Commons - Public Domain Dedication.png",
        ];
      } else if (license === "GNU - GPL") {
        licenseUrl = "https://www.gnu.org/licenses/gpl-3.0.html";
        this.licenseImg = ["/license-img/GNU - GPL.png"];
      } else if (license === "GNU - LGPL ") {
        licenseUrl = "https://www.gnu.org/licenses/lgpl-3.0.html";
        this.licenseImg = ["/license-img/GNU - LGPL.png"];
      } else if ((license = "BSD License")) {
        licenseUrl = "https://opensource.org/licenses/BSD-3-Clause";
        this.licenseImg = ["/license-img/BSD.png"];
      }
      return licenseUrl;
    },
    avatar() {
      return this.detail.creator.avatar
        ? this.detail.creator.avatar
        : generatorDefaultAvator(
            this.detail.creator.name,
            this.detail.creator.id
          );
    },
    comfirmLike() {
      return this.$store.getters.myLikesList.some((item) => {
        return item.id === this.detail.id;
      });
    },
    comfirmCollection() {
      return this.$store.getters.myCollectionslist.some((item) => {
        return item.id === this.detail.id;
      });
    },
  },
  methods: {
    openMake() {
      this.showMake = true;
      document.documentElement.style.overflowY = "hidden";
    },
    closeMake() {
      this.showMake = false;
      document.documentElement.style.overflowY = "scroll";
    },
    openImageView() {
      this.urlList = this.imageList.map((item) => {
        return item;
      });
      this.showViewer = true;
      document.documentElement.style.overflowY = "hidden";
    },
    // 关闭查看器
    closeViewer() {
      this.showViewer = false;
      document.documentElement.style.overflowY = "scroll";
    },
    arrowClick(val) {
      if (val === "down") {
        this.$refs.carousel.next();
      } else {
        this.$refs.carousel.prev();
      }
      this.imgActiveIndex = this.$refs.carousel.activeIndex;
    },
    changeImg(index) {
      this.$refs.carousel.setActiveItem(index);
      this.imgActiveIndex = index;
    },
    like() {
      if (this.likeDisabled) {
        return;
      }
      this.likeDisabled = true;
      if (this.isLike) {
        deleteLike({
          resId: this.detail.id,
        })
          .then(() => {
            this.$message({
              message: "delete likes successfully",
              type: "success",
            });
            this.likeDisabled = false;
            this.isLike = false;
            this.detail.like_count = this.detail.like_count - 1;
            this.$store.commit(
              "user/SET_LIKESLIST",
              this.$store.getters.myLikesList.filter((item) => {
                return item.id !== this.detail.id;
              })
            );
          })
          .catch((err) => {
            this.likeDisabled = false;
            console.log(err);
          });
      } else {
        addLike({
          resId: this.detail.id,
        })
          .then(() => {
            this.$message({
              message: "add likes successfully",
              type: "success",
            });
            this.likeDisabled = false;
            this.isLike = true;
            this.detail.like_count = this.detail.like_count + 1;
            this.$store.commit("user/SET_LIKESLIST", [
              ...this.$store.getters.myLikesList,
              { id: this.detail.id },
            ]);
          })
          .catch((err) => {
            this.likeDisabled = false;
            console.log(err);
          });
      }
    },
    collect() {
      if (!this.isLogin) {
        let payload = { loginDialogVisible: true, isLoginForm: true };
        this.$store.dispatch("user/switchLoginRegisteForm", payload);
        return;
      }
      if (this.isCollected) {
        this.deleteCollection();
      } else {
        if (this.openCollectedOption) {
          this.openCollectedOption = false;
          return;
        }
        this.addCollection();
      }
    },
    toUserProfileView() {
      console.log("test");
      this.$router.push(`/design/${this.detail.creator.id}`);
    },
    openViewAllDialog(name) {
      this.viewMoreActive = name;
      this.dialogTabsVisible = true;
    },
    carouselChange() {
      this.imgActiveIndex = this.$refs.carousel.activeIndex;
      this.mySwiper.slideTo(this.$refs.carousel.activeIndex, 1000, false);
    },
    enterCarousel() {
      this.mouseEnterCarousel = true;
    },
    leaveCarousel() {
      this.mouseEnterCarousel = false;
    },
    share(url) {
      let name = ""; //网页名称，可为空;
      let iWidth = 500; //弹出窗口的宽度;
      let iHeight = 670; //弹出窗口的高度;
      //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
      let iTop = (window.screen.height - iHeight) / 2; //获得窗口的垂直位置;
      let iLeft = (window.screen.width - iWidth) / 2; //获得窗口的水平位置;
      let strWindowFeatures = `top=${iTop},left=${iLeft},height= ${iHeight} ,innerHeight= ${iHeight} ,width= ${iWidth} ,innerWidth=${iWidth} ,toolbar=no,menubar=no,scrollbars=auto,resizable=no,location=no,status=no`;
      window.open(url, name, strWindowFeatures);
    },
    toMore(id) {
      this.$router.push(`/thing/${id}`);
    },
    addCollection() {
      this.openCollectedOption = true;
      this.isShowDownPanel = false;
      getCollectionList({
        userId: this.$store.getters.userInfo.user_id,
      }).then((res) => {
        console.log("getCollectionList", res);
        this.folders = res.data.data;
      });
    },
    deleteCollection() {
      this.openCollectedOption = false;
      deleteCollectionResource({
        userId: this.$store.getters.userInfo.user_id,
        resourceId: this.detail.id,
      }).then((res) => {
        this.$message({
          message: "cancel collected successfully",
          type: "success",
        });
        this.isCollected = false;
        this.detail.collect_count -= 1;
        this.$store.commit(
          "user/SET_COLLECTIONSLIST",
          this.$store.getters.myCollectionslist.filter((item) => {
            return item.id !== this.detail.id;
          })
        );
      });
    },
    closeCollectedOption() {
      this.openCollectedOption = false;
    },
    moveCollectedOption(folderObject) {
      // this.isCollected = true;
      this.openCollectedOption = false;
      addResourceToCollection({
        resourceId: this.detail.id,
        collectionId: folderObject.id,
      }).then((res) => {
        console.log(res);
        this.$message({
          message: "move successfully",
          type: "success",
        });
        this.detail.collect_count += 1;
        this.isCollected = true;
        this.$store.commit("user/SET_COLLECTIONSLIST", [
          ...this.$store.getters.myCollectionslist,
          { id: this.detail.id },
        ]);
      });
    },
    addFolder(folderName) {
      addCollection({
        name: folderName,
        userId: this.$store.getters.userInfo.user_id,
      })
        .then((res) => {
          console.log("addCollection", res);
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
    openShowDownPanel() {
      if (!this.isShowDownPanel) {
        this.openCollectedOption = false;
      }
      this.isShowDownPanel = !this.isShowDownPanel;
    },
    closeButtonPanel() {
      this.isShowDownPanel = false;
      this.openCollectedOption = false;
    },
    getIndex(index) {
      console.log(index);
      this.index = index;
    },
    toUpload() {
      this.$router.push(`/upload/${this.$route.params.thingId}`);
    },
  },
  created() {
    getLikelist({ userId: this.userInfo.user_id })
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
        getResource(this.$route.params.thingId)
          .then((res) => {
            this.detail = res.data.data;
            this.imageList = res.data.data.images;
            this.isLike = this.likeList.includes(res.data.data.id);
            this.contentText = this.detail.description;
            this.isCollected = this.collectedList.includes(res.data.data.id);
            return this.detail.creator.id;
          })
          .then((id) => {
            getMoreByThisCreator({
              pageSize: 3,
              pageNum: 1,
              resId: this.$route.params.thingId,
              userId: id,
            }).then((res) => {
              console.log("creator", res);
              this.moreCreateList = res.data.rows;
            });
          });
      });
  },
};
</script>
<style lang="scss" scoped>
.swiper-container {
  width: 184px;
  height: 496px;
  margin: 0;
  .swiper-wrapper {
    height: 496px;
    width: 184px;
    .swiper-slide {
      width: 184px;
      img {
        height: 112px;
        width: 100%;
        cursor: pointer;
        object-fit: contain;
      }
    }
  }
  .swiper-container-button {
    text-align: center;
    width: 100%;
    height: 24px;
    background: rgba(26, 26, 26, 0.3);
    opacity: 0.3;
    z-index: 15;
    position: absolute;
    i {
      color: #fff;
      opacity: 1;
      font-size: 16px;
    }
  }
  .up {
    top: 0px;
    border-radius: 10px 10px 0px 0px;
  }
  .down {
    border-radius: 0px 0px 10px 10px;
    bottom: 0px;
  }
}
.carousel-button-fade-enter,
.carousel-button-fade-leave-to {
  opacity: 0;
}
.carousel-button-fade-enter-to,
.carousel-button-fade-leave {
  opacity: 1;
}
.carousel-button-fade-enter-active,
.carousel-button-fade-leave-active {
  transition: all 0.3s;
}

.el-avatar {
  cursor: pointer;
}

.share-icon {
  font-size: 38px;
  display: block;
  width: 56px;
  height: 56px;
  text-align: center;
  cursor: pointer;
  background: #e8ebf4;
  line-height: 60px;
  border-radius: 8px;
}

.share {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top: 21px;
}

a {
  color: #1e78f0;
}

.flex {
  display: flex;
}

.user-name-update-time {
  margin-left: 7px;
}
.update-time {
  font-size: 12px;
  color: #999999;
}

.flex-column {
  flex-direction: column;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.align-center {
  align-items: center;
}

.user-name {
  font-size: 16px;
  color: #1a1a1a;
}

.bottom-content {
  width: 1024px;
  margin: 0 auto;
  margin-top: 32px;
}

.bottom-content-left {
  width: 637px;
}

.bottom-content-right {
  width: 259px;
}

.split-line {
  border: solid #ccc 1px;
  height: 1px;
  margin-top: 40px;
}

.comment-box {
  margin-top: 40px;
}

.share-content {
  margin-top: 40px;
}

.bottom-content-right-box-title {
  font-size: 20px;
  color: #1a1a1a;
}

.license-box {
  margin-top: 17px;
  font-size: 35px;
  i {
    font-size: 46px;
    margin-right: 24px;
  }
}

.license-info {
  font-size: 16px;
  color: #9e9e9e;
  line-height: 25px;
  margin-top: 22px;
}
.license-container {
  margin-top: 32px;
}

.imageViewer {
}
::v-deep .el-button.is-disabled {
  background-color: none;
}
.container {
  /* background-color: #f5f5f5; */
  height: 100%;
  font-family: Source Han Sans CN;
  font-weight: 400;
  .model-button-group {
    background-color: #fff;
  }
  .show-thing {
    margin-top: 30px;
  }
}

.center-container {
  margin: 0 auto;
  width: 1024px;
}

.el-tabs {
  margin-top: 15px;
}

.img-activeBorder {
  border: 1px solid #248bfb;
}

.el-icon-arrow-up {
  display: inline-block;
  cursor: pointer;
  border: none;
  padding: 0;
  position: absolute;
  width: 184px;
  height: 24px;
  background: #1a1a1a;
  opacity: 0.3;
  border-radius: 8px 8px 0px 0px;
  z-index: 8;
  color: white;
}

.el-icon-arrow-down {
  display: inline-block;
  cursor: pointer;
  border: none;
  padding: 0;
  position: absolute;
  width: 184px;
  height: 24px;
  background: #1a1a1a;
  opacity: 0.3;
  border-radius: 8px 8px 0px 0px;
  bottom: 0px;
  z-index: 8;
  color: white;
}

.downCarousel {
  width: 184px;
  height: 48px;
  background: #1a1a1a;
  opacity: 0.3;
  border-radius: 8px;
  left: 50%;
  bottom: 16px;
  margin-left: -92px;
}

.upCarousel {
  width: 184px;
  height: 48px;
  background: #1a1a1a;
  opacity: 0.3;
  border-radius: 8px;
  left: 50%;
  top: 16px;
  margin-left: -92px;
}

.ortur-icon-enlarge {
  width: 48px;
  height: 48px;
  background: #1a1a1a;
  opacity: 0.3;
  border-radius: 6px;
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 8;
  cursor: pointer;
}

.carousel {
  border: #ccc 1px solid;
  position: relative;
  /* width: 805px; */
  width: 807px;
  height: 496px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;
    /* border: 1px solid #f0f3fa; */
  }
  /* img:hover {
    border: 1px solid #ccc;
  } */
}

.like-red {
  color: red;
}

.el-icon-check {
  color: #248bfb;
}

.description-tutorial-makes {
  width: 100%;
  background-color: #f0f3fa;
  margin-top: 0px;
}

.el-tabs--border-card {
  background: #f0f3fa;
  border: none;
  box-shadow: none;
}

.ortur-icon {
  color: #000;
}

::v-deep .app-header__search {
  width: 100%;
  height: 42px;
  border: 1px solid #cccccc !important;
}

::v-deep .el-tabs--border-card > .el-tabs__content {
  padding-top: 20px;
  padding-left: 0px;
  padding-right: 0px;
}

::v-deep .comment-wrapper {
  width: 100%;
}
::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #fff;
  background-color: #f0f3fa;
  border-right-color: #f0f3fa;
  border-left-color: #f0f3fa;
  width: 120px;
  height: 40px;
  background: #1e78f0;
  border-radius: 8px;
}
::v-deep .el-tabs--border-card > .el-tabs__header {
  border: none;
  background: #f0f3fa;
}
::v-deep .el-tabs--border-card {
  background: #f0f3fa;
  border: none;
}
::v-deep .el-tabs__header .is-top {
  width: 510px;
  font-size: 16px;
}

.more-dialog {
  ::v-deep .el-tabs__header .is-top {
    width: 520px;
  }
}

.show-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.show-header-left {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  color: #1a1a1a;
}

.show-header-left-thing-name {
  font-size: 24px;
  color: #1a1a1a;
}

.collected-box {
  position: relative;
  .collected-option {
    position: absolute;
    right: 0px;
  }
}
.ortur-icon-ins:hover {
  background: linear-gradient(to left bottom, #8c3aaa, #d82d7e, #fa8f21);
  -webkit-background-clip: text;
  color: transparent;
}
.ortur-icon-whats-app:hover {
  color: #45d354;
}
.ortur-icon-facebook:hover {
  color: #1976d2;
}
.ortur-icon-twitter:hover {
  color: #0a93e2;
}
.makes-mask {
  position: absolute;
  bottom: 3px;
  width: 184px;
  height: 32px;
  background-color: rgba(34, 34, 34, 0.5);
  text-align: center;
  line-height: 32px;
  .ortur-icon-message {
    position: relative;
    top: 2px;
  }
  .makes-mask-font-container {
    color: #fff;
    font-size: 16px;
    margin-left: 25px;
  }
}
.post-make {
  cursor: pointer;
}
.post-remix {
  cursor: pointer;
}
.source-box {
  background: #c9daf0;
  width: 280px;
  height: 200px;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 51px;
  font-family: Source Han Sans CN;
  .source-box-source-text {
    border-bottom: 1px solid #ccc;
    padding-bottom: 19px;
    font-weight: 400;
    color: #1a1a1a;
  }
  .source-box-info {
    display: flex;
    margin-top: 15px;
    img {
      width: 83px;
      height: 55px;
    }
    .source-box-info-title-name {
      margin-left: 23px;
      .source-box-info-title {
        color: #1a1a1a;
        font-weight: 400;
      }
      .source-box-info-name {
        font-size: 14px;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
</style>
