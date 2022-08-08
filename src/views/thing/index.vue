<template>
  <div id="detail-top" class="container">
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
                    :src="detail.creator.avatar"
                    :fit="'cover'"
                  ></el-avatar>
                  <div class="flex flex-column user-name-update-time">
                    <span class="user-name">{{ detail.creator.name }}</span>
                    <span class="update-time"> {{ detail.update_time }}</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-between" style="width: 424px">
                <StarButton :isStar="isLike" @click="like"></StarButton>
                <CollectButton
                  :isCollect="isCollected"
                  @click="collect"
                ></CollectButton>
                <DownLoadButton></DownLoadButton>
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
                      :autoplay="true"
                      @change="carouselChange"
                    >
                      <el-carousel-item
                        v-for="(item, index) in imageList"
                        :name="'' + index"
                        :key="item"
                        indicator-position="outside"
                        autoplay="true"
                      >
                        <img :src="item" />
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
                <div v-swiper:mySwiper="swiperOptions">
                  <div class="swiper-wrapper">
                    <div
                      class="swiper-slide"
                      v-for="(item, index) in imageList"
                      :key="item"
                    >
                      <img
                        @click="changeImg(index)"
                        :class="
                          index === imgActiveIndex ? 'img-activeBorder' : ''
                        "
                        :src="item"
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
                        <i class="ortur-icon-arrow-down"></i>
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
              >
                {{ detail.description }}
              </show-more>
            </el-tab-pane>
            <el-tab-pane label="Tutorial" name="steps">
              <show-more :showHeight="showHeight" v-if="activeName == 'steps'">
                <tutorial :step="detail.tutorials"></tutorial>
              </show-more>
            </el-tab-pane>
            <el-tab-pane label="Makes" name="third">
              <div>
                <div class="flex justify-between">
                  <a class="more-font">
                    <i class="el-icon-plus"></i>
                    Post a make
                  </a>
                  <a class="view-more" @click="openViewAllDialog('view-makes')">
                    View all
                  </a>
                </div>
                <div class="flex justify-between" style="flex-wrap: wrap">
                  <el-image
                    v-for="i in 6"
                    :key="i"
                    class="more-image"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  ></el-image>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="split-line"></div>
          <div style="margin-top: 42px">
            <div style="display: flex; justify-content: space-between">
              <h2 class="more-font">More by this creator</h2>
              <a class="view-more" @click="openViewAllDialog('view-creator')">
                View all
              </a>
            </div>
            <div class="flex justify-between more-image-box">
              <el-image
                v-for="item in moreCreateList"
                :key="item.id"
                class="more-image"
                :src="item.image"
              ></el-image>
            </div>
          </div>

          <div>
            <div class="flex justify-between" style="margin-top: 35px">
              <h2 class="more-font">Similar with this</h2>
              <a class="view-more" @click="openViewAllDialog('view-similar')">
                View all
              </a>
            </div>
            <div class="flex justify-between more-image-box">
              <el-image
                v-for="i in 3"
                :key="i"
                class="more-image"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              ></el-image>
            </div>
          </div>
          <div class="split-line"></div>
          <div class="comment-box">
            <Reply></Reply>
            <comment></comment>
          </div>
        </div>
        <div class="bottom-content-right">
          <label-card></label-card>
          <div class="share-content">
            <div class="bottom-content-right-box-title">Share</div>
            <div class="share">
              <a class="share-icon" :href="shareLink.facebook">
                <i class="ortur-icon-facebook ortur-icon"></i>
              </a>
              <a class="share-icon" :href="shareLink.twitter">
                <i class="ortur-icon-twitter ortur-icon"></i>
              </a>
              <a class="share-icon" :href="shareLink.whatsapp">
                <i class="ortur-icon-whats-app ortur-icon"></i>
              </a>
              <a class="share-icon" href="mailto:nowhere@mozilla.org">
                <i class="ortur-icon-ins ortur-icon"></i>
              </a>
            </div>
          </div>
          <div style="margin-top: 32px">
            <div class="bottom-content-right-box-title">License</div>
            <div class="flex justify-between license-box">
              <i class="ortur-icon-cc"></i>
              <i class="ortur-icon-reload"></i>
              <i class="ortur-icon-user-info"></i>
            </div>
            <div class="license-info">
              OpenRC F1 car - 1:10 RC Car by barspin is licensed under the
              <a href=""> xxxxxxxxx </a>
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
          ></view-more>
        </el-tab-pane>
        <el-tab-pane label="Similar with this" name="view-similar">
          <view-more v-if="viewMoreActive === 'view-similar'"></view-more>
        </el-tab-pane>
        <el-tab-pane label="Makes from others" name="view-makes">
          <view-more v-if="viewMoreActive === 'view-makes'"></view-more>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <sroll-top-button :to="'#detail-top'"></sroll-top-button>
  </div>
</template>
<script>
/* eslint-disable */
// import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import ElImageViewer from "@/components/ImageViewer";
import { getUserInfoByThingId } from "@/api/thing";
import { getResource, getResourceListById } from "@/api/resource";
import { getLikelist } from "@/api/like";
import { mapGetters } from "vuex";
import DownLoadButton from "@/components/DownLoadButton.vue";
import StarButton from "@/components/StarButton.vue";
import CollectButton from "@/components/CollectButton.vue";
import LabelCard from "@/components/LabelCard.vue";
import ShareCard from "@/components/ShareCard";
import Comment from "@/components/Comment/CommentWidget.vue";
import ShowMore from "@/components/ShowMore.vue";
import Reply from "@/components/Comment/ReplyWidget.vue";
import ViewMore from "./ViewMore.vue";
import SrollTopButton from "@/components/SrollTopButton";
import Tutorial from "./components/Tutorial.vue";
export default {
  name: "Thing",
  components: {
    ElImageViewer,
    StarButton,
    CollectButton,
    DownLoadButton,
    LabelCard,
    ShareCard,
    Comment,
    ShowMore,
    Reply,
    ViewMore,
    SrollTopButton,
    Tutorial,
  },
  data() {
    return {
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
        facebook: `https://www.facebook.com/sharer/sharer.php?u=localhost:8080${this.$route.path}`,
        twitter: `https://twitter.com/share?url=localhost:8080${this.$route.path}`,
        whatsapp: `https://web.whatsapp.com/send?text=localhost:8080${this.$route.path}`,
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
        collect_count: "",
        creator: {
          avatar: "",
          name: "",
        },
        description: "",
        files: "",
        id: "",
        images: "",
        license: "",
        like_count: "",
        tags: "",
        title: "",
        tutorials: "",
        update_time: "",
      },
    };
  },
  computed: {
    ...mapGetters(["isLogin", "userInfo"]),
  },
  methods: {
    openImageView() {
      this.urlList = this.imageList.map((item) => {
        return item;
      });
      this.showViewer = true;
    },
    // 关闭查看器
    closeViewer() {
      this.showViewer = false;
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
      this.isLike = !this.isLike;
    },
    collect() {
      this.isCollected = !this.isCollected;
    },
    toUserProfileView() {
      this.$router.push(`/design/Favorites/${this.detail.creator.id}`);
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
  },
  created() {
    getLikelist({ userId: this.userInfo.user_id })
      .then((res) => {
        for (let i = 0; i < res.data.rows.length; i++) {
          const element = res.data.rows[i];
          this.likeList.push(element.id);
        }
        console.log("like list======", this.likeList);
      })
      .then(() => {
        getResource(this.$route.params.thingId)
          .then((res) => {
            this.detail = res.data.data;
            this.imageList = res.data.data.images;
            this.isLike = this.likeList.includes(res.data.data.id);
            console.log("this.detail", this.detail);
            return this.detail.creator.id;
          })
          .then((id) => {
            getResourceListById({
              userId: id,
              pageSize: 3,
              pageNum: 1,
            }).then((res) => {
              console.log("get more:", res, id);
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
        object-fit: fill;
      }
    }
  }
  .swiper-container-button {
    text-align: center;
    width: 100%;
    height: 24px;
    background: #1a1a1a;
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
}

.share {
  display: flex;
  flex-flow: row wrap;
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
  margin-top: 24px;
}

.bottom-content-left {
  width: 637px;
}

.bottom-content-right {
  width: 259px;
}

.view-more {
  font-size: 15px;
  cursor: pointer;
}

.more-font {
  font-size: 18px;
  color: #1a1a1a;
  font-weight: 400;
}

.more-image-box {
  margin-top: 31px;
}

.more-image {
  width: 184px;
  height: 112px;
  margin-top: 5px;
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
  font-size: 18px;
  color: #1a1a1a;
}

.license-box {
  width: 145px;
  margin-top: 17px;
  font-size: 35px;
}

.license-info {
  font-size: 15px;
  color: #9e9e9e;
  line-height: 23px;
}

.imageViewer {
  ::v-deep .el-image-viewer__prev {
    background-color: black;
  }

  ::v-deep .el-image-viewer__btn {
    border-radius: 6px;
  }

  ::v-deep .el-icon-close:before {
    font-family: "icomoon";
    content: "\e922";
    color: #fff;
  }

  ::v-deep .el-icon-arrow-left:before {
    content: "\e6e1";
  }

  ::v-deep .el-icon-arrow-right:before {
    content: "\e6df";
  }

  ::v-deep .el-image-viewer__actions {
    display: none;
  }

  ::v-deep .el-image-viewer__prev {
    width: 324px;
    height: 60px;
    background: #1a1a1a;
    opacity: 0.3;
    border-radius: 6px;
    transform: translateX(-50%);
    left: 50%;
    top: 12px;
  }

  ::v-deep .el-image-viewer__next {
    width: 324px;
    height: 60px;
    background: #1a1a1a;
    opacity: 0.3;
    border-radius: 6px;
    // transform: translateX(-50%);
    // left: 50%;
    transform: translateX(-50%);
    left: 50%;
    bottom: 12px;
    top: auto;
  }

  ::v-deep .el-image-viewer__close {
    width: 60px;
    height: 60px;
    background: #1a1a1a;
    opacity: 0.3;
    border-radius: 6px;
    top: 12px;
    right: 13px;
  }

  ::v-deep .el-image-viewer__img {
    width: 1084px;
    height: 660px;
  }
}

.container {
  background-color: #f5f5f5;
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
  position: relative;
  width: 807px;
  height: 496px;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}

.like-red {
  color: red;
}

.el-icon-check {
  color: #248bfb;
}

.description-tutorial-makes {
  width: 100%;
  background-color: #f5f5f5;
  margin-top: 0px;
}

.el-tabs--border-card {
  background: #f5f5f5;
  border: none;
  box-shadow: none;
}

::v-deep .ortur-icon {
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
  background-color: #f5f5f5;
  border-right-color: #f5f5f5;
  border-left-color: #f5f5f5;
  width: 120px;
  height: 40px;
  background: #1e78f0;
  border-radius: 8px;
}
::v-deep .el-tabs--border-card > .el-tabs__header {
  border: none;
  background-color: #f5f5f5;
}
::v-deep .el-tabs--border-card {
  background: #f5f5f5;
  border: none;
}
::v-deep .el-tabs__header .is-top {
  width: 360px;
}

.more-dialog {
  ::v-deep .el-tabs__header .is-top {
    width: 477px;
  }
}

.show-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 30px;
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
</style>
