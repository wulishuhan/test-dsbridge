<template>
  <div class="container">
    <div class="center-container">
      <div class="show">
        <el-row>
          <el-col>
            <div class="show-header">
              <div class="show-header-left">
                <div class="show-header-left-thing-name">
                  {{ user.thingName }}
                </div>
                <div class="flex align-center">
                  <el-avatar :size="30" :src="user.avatar"></el-avatar>
                  <span class="user-name">{{ user.name }}</span>
                </div>
              </div>
              <div class="flex justify-between" style="width: 335px">
                <StarButton></StarButton>
                <BaseButton style="width: 90px">
                  <div class="flex justify-around">
                    <i class="ortur-icon-share"></i>
                    <span>0k</span>
                  </div>
                </BaseButton>
                <DownLoadButton></DownLoadButton>
              </div>
            </div>
            <div class="show-thing">
              <div class="carouselContainer">
                <div>
                  <div class="carousel">
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
                    <el-carousel
                      direction="vertical"
                      height="372px"
                      :interval="3000"
                      arrow="never"
                      ref="carousel"
                      indicator-position="none"
                      :autoplay="false"
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
                <div class="right-carousel">
                  <button
                    class="el-icon-arrow-up"
                    @click="trunImageLeft()"
                  ></button>
                  <ul class="img-ul">
                    <li
                      v-for="(item, index) in showImg"
                      class="img-li"
                      :key="item.id + index"
                      @click="changeImg(item, index)"
                    >
                      <img
                        :class="
                          item.index === imgActiveIndex
                            ? 'img-activeBorder'
                            : ''
                        "
                        :src="item.url"
                      />
                    </li>
                  </ul>
                  <button
                    class="el-icon-arrow-down"
                    @click="trunImageRight()"
                  ></button>
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
          >
            <el-tab-pane label="Description" name="description">
              <show-more
                :showHeight="showHeight"
                v-if="activeName == 'description'"
              >
                xxxxxxxxxxxxxxx xxxxxxxx xxxxxxxxx xxxxxx xxxxxxxxx xxxxxxx
                xxxxxxxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxxx xxxxxxxxxx
                xxxxxxxxxxx xxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxx xxxxxxxxxxxxxxx
                xxxxxxxx xxxxxxxxx xxxxxx xxxxxxxxx xxxxxxx xxxxxxxxxxxxxx
                xxxxxxxxxxxxxx xxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxx xxxxxxxxx
                xxxxxxxxxxxxxx xxxxxxxxxxx
              </show-more>
            </el-tab-pane>
            <el-tab-pane label="Tutorial" name="step">
              <show-more :showHeight="showHeight" v-if="activeName == 'step'">
                xxxxxxxxxxxxxxx xxxxxxxx xxxxxxxxx xxxxxx xxxxxxxxx xxxxxxx
                xxxxxxxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxxx xxxxxxxxxx
                xxxxxxxxxxx xxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxx
              </show-more>
            </el-tab-pane>
            <el-tab-pane label="Makes" name="third">makes</el-tab-pane>
          </el-tabs>
          <div>
            <div style="display: flex; justify-content: space-between">
              <h2 class="more-font">More by this creator</h2>
              <a class="view-more" @click="dialogTabsVisible = true"
                >View all</a
              >
            </div>
            <div class="flex justify-between more-image-box">
              <el-image
                class="more-image"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              ></el-image>
              <el-image
                class="more-image"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              ></el-image>
              <el-image
                class="more-image"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              ></el-image>
            </div>
          </div>

          <div>
            <div class="flex justify-between" style="margin-top: 35px">
              <h2 class="more-font">Similar with this</h2>
              <a class="view-more" @click="dialogTabsVisible = true"
                >View all</a
              >
            </div>
            <div class="flex justify-between more-image-box">
              <el-image
                class="more-image"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              ></el-image>
              <el-image
                class="more-image"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              ></el-image>
              <el-image
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
    <el-dialog :visible.sync="dialogTabsVisible" width="852px">
      <el-tabs v-model="viewMoreActive">
        <el-tab-pane label="More by this creator" name="view-more">
          <view-more></view-more>
        </el-tab-pane>
        <el-tab-pane label="Similar with this" name="view-similar">
          <view-more></view-more>
        </el-tab-pane>
        <el-tab-pane label="Makes from others" name="view-makes">
          <view-more></view-more>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { getUserInfoByThingId } from "@/api/thing";
import DownLoadButton from "@/components/DownLoadButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import StarButton from "@/components/StarButton.vue";
import LabelCard from "@/components/LabelCard.vue";
import ShareCard from "@/components/ShareCard";
import Comment from "@/components/Comment/CommentWidget.vue";
import ShowMore from "@/components/ShowMore.vue";
import Reply from "@/components/Comment/ReplyWidget.vue";
import ViewMore from "./ViewMore.vue";
export default {
  name: "Thing",
  components: {
    ElImageViewer,
    StarButton,
    BaseButton,
    DownLoadButton,
    LabelCard,
    ShareCard,
    Comment,
    ShowMore,
    Reply,
    ViewMore,
  },
  data() {
    return {
      showViewer: false, // 显示查看器
      urlList: [], //大图列表
      activeName: "description",
      user: {},
      imgActiveIndex: 0, // 当前移动图片的索引值
      imageList: [],
      showImg: [],
      waitImg: [],
      viewModel: false,
      isLike: false,
      isCollected: false,
      showHeight: 50,
      dialogTabsVisible: false,
      viewMoreActive: "view-more",
      shareLink: {
        // text文本后边可以传要分享的url，注意后期修改
        facebook:
          "https://www.facebook.com/sharer/sharer.php?u=test.leadiffer.com",
        twitter: "https://twitter.com/share?url=test.leadiffer.com",
        whatsapp: "https://web.whatsapp.com/send?text=test.leadiffer.com",
      },
    };
  },
  methods: {
    openImageView() {
      this.urlList = this.imageList.map((item) => {
        return item.url;
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
    },
    setActiveItem(index) {
      this.$refs.carousel.setActiveItem(index);
    },
    showModel() {
      this.viewModel = true;
    },
    closeModel() {
      this.viewModel = false;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeImg(item) {
      this.$refs.carousel.setActiveItem(item.index);
      this.imgActiveIndex = item.index;
    },
    trunImageLeft() {
      let currentShowImgLast = this.showImg.pop();
      this.waitImg.unshift(currentShowImgLast);
      this.showImg.unshift(this.waitImg.pop());
    },
    trunImageRight() {
      let currentShowImgFirst = this.showImg.shift();
      this.waitImg.push(currentShowImgFirst);
      this.showImg.push(this.waitImg.shift());
    },
    like() {
      this.isLike = !this.isLike;
    },
    collect() {
      this.isCollected = !this.isCollected;
    },
    toUserProfileView() {
      this.$router.push(`/design/Favorites/${this.user.id}`);
    },
  },
  created() {
    getUserInfoByThingId({
      thingId: this.$route.params.thingId,
      userId: this.$store.getters.userId,
    }).then((res) => {
      this.user = res.data.data;
      this.isLike = this.user.isLike;
      this.isCollected = this.user.isCollected;
      this.imageList = this.user.image;
      for (let i = 0; i < this.imageList.length; i++) {
        let obj = {
          ...this.imageList[i],
          index: i,
        };
        i < 8 ? this.showImg.push(obj) : this.waitImg.push(obj);
      }
    });
  },
};
</script>
<style lang="scss" scoped>
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
  font-size: 12px;
  color: #999999;
  margin-left: 7px;
}

.bottom-content {
  width: 768px;
  margin: 0 auto;
  margin-top: 24px;
}

.bottom-content-left {
  width: 478px;
}

.bottom-content-right {
  width: 194px;
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
  width: 138px;
  height: 84px;
}

.split-line {
  border: solid #ccc 1px;
  height: 1px;
  margin-top: 30px;
}

.comment-box {
  margin-top: 30px;
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

.dialog-view-more {
  width: 852px;
  height: 738px;
  background: #ffffff;
  border-radius: 9px;
}

.imageViewer {
  ::v-deep .el-image-viewer__prev {
    background-color: black;
  }

  .ortur-iconb {
    font-size: 56px;
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
    top: 210px;
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
    bottom: 210px;
    top: auto;
  }

  ::v-deep .el-image-viewer__close {
    width: 60px;
    height: 60px;
    background: #1a1a1a;
    opacity: 0.3;
    border-radius: 6px;
    top: 210px;
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

  .show {
    margin-top: 20px;
  }

  .tip {
    width: 700px;
    height: 41px;
    background-color: #fca833;
    color: #fff;
    font-size: 14px;
    line-height: 41px;
  }

  .show-thing {
    margin-top: 30px;

    .switchImage {
      width: 700px;
      height: 66px;
      background-color: #fff;

      img {
        margin-left: 6px;
        cursor: pointer;
        margin-top: 5px;
      }
    }
  }
}

.center-container {
  margin: 0 auto;
  width: 768px;
}

.el-tabs {
  margin-top: 15px;
}

.img-ul {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 372px;
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  list-style: none;
  margin: 0;
}

.img-ul::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 2px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.img-ul::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.img-ul::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.img-li {
  cursor: pointer;

  img {
    width: 138px;
    height: 84px;
  }
}

.img-activeBorder {
  border: 1px solid #248bfb;
}

.right-carousel {
  display: flex;
  width: 138px;
  text-align: center;
  flex-direction: column;
  position: relative;
  margin-left: 24px;
}

.el-icon-arrow-up {
  display: inline-block;
  cursor: pointer;
  border: none;
  padding: 0;
  position: absolute;
  width: 138px;
  height: 18px;
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
  width: 138px;
  height: 18px;
  background: #1a1a1a;
  opacity: 0.3;
  border-radius: 8px 8px 0px 0px;
  bottom: 0px;
  z-index: 8;
  color: white;
}

.downCarousel {
  width: 138px;
  height: 36px;
  background: #1a1a1a;
  opacity: 0.3;
  border-radius: 6px;
  left: 50%;
  bottom: 12px;
  margin-left: -64px;
}

.upCarousel {
  width: 138px;
  height: 36px;
  background: #1a1a1a;
  opacity: 0.3;
  border-radius: 6px;
  left: 50%;
  top: 12px;
  margin-left: -64px;
}

.ortur-icon-enlarge {
  width: 60px;
  height: 60px;
  background: #1a1a1a;
  opacity: 0.3;
  border-radius: 6px;
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 8;
}

.carouselContainer {
  display: flex;
}

.carousel {
  position: relative;
  width: 605px;
  height: 372px;

  img {
    width: 100%;
    height: 100%;
  }
}

.like-red {
  color: red;
}

.el-icon-check {
  color: #248bfb;
}

.description-tutorial-makes {
  width: 318px;
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

/* ::v-deep .share-box {
  background: #f5f5f5;
  box-shadow: none;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 180px;
  height: 84px;
}
::v-deep .share-icon-box {
  width: 42px;
  height: 42px;
  margin-right: 12px;
  margin-top: 12px;
  line-height: 42px;
  text-align: center;
  box-sizing: border-box;
  padding: 7px;
  background: #e8ebf4;
  border-radius: 6px;
} */
::v-deep .app-header__search {
  width: 100%;
  height: 42px;
  border: 1px solid #cccccc !important;
}

::v-deep .el-tabs--border-card>.el-tabs__content {
  padding-top: 20px;
  padding-left: 0px;
}

::v-deep .comment-wrapper {
  width: 100%;
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
  font-size: 18px;
  color: #1a1a1a;
}

@media screen and (max-width: 768px) {
  .carousel {
    width: 100%;
    height: 524px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .center-container {
    margin: 0 auto;
    width: 100%;
  }

  .show-thing {
    width: 100%;
  }
}
</style>
