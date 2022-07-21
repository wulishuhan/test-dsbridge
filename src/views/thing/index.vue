<template>
  <div class="container">
    <div class="center-container">
      <div class="show">
        <el-row>
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <div class="author">
              <el-avatar :size="50" :src="user.avatar"></el-avatar>
              <div>
                <span class="thing-name">{{ user.thingName }}</span>
                <span>
                  by
                  <a @click="toUserProfileView">
                    {{ user.name }}
                  </a>
                  {{ user.publicTime }}
                </span>
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
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="Thing Details" name="first">
          <thing-details></thing-details>
        </el-tab-pane>
        <el-tab-pane label="Thing Files" name="second">
          <thing-files></thing-files>
        </el-tab-pane>
        <el-tab-pane label="Comments" name="third">
          <comments></comments>
        </el-tab-pane>
        <el-tab-pane label="Makes" name="fourth">
          <makes></makes>
        </el-tab-pane>
      </el-tabs>
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
  </div>
</template>
<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
// import ViewModel from "./components/ViewModel";
import ThingDetails from "./ThingDetails";
import ThingFiles from "./ThingFiles";
import Comments from "./Comments";
import Makes from "./Makes";
// import ShareSocialMedia from "@/components/ShareSocialMedia";
import { getUserInfoByThingId } from "@/api/thing";
export default {
  name: "Thing",
  components: {
    // ViewModel,
    ThingDetails,
    ThingFiles,
    Comments,
    Makes,
    // ShareSocialMedia,
    ElImageViewer,
  },
  data() {
    return {
      showViewer: false, // 显示查看器
      urlList: [], //大图列表
      activeName: "first",
      user: {},
      imgActiveIndex: 0, // 当前移动图片的索引值
      imageList: [],
      showImg: [],
      waitImg: [],
      viewModel: false,
      isLike: false,
      isCollected: false,
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
      console.log("userinfo:", res);
      this.user = res.data.data;
      this.isLike = this.user.isLike;
      this.isCollected = this.user.isCollected;
      console.log("this.user", this.user);
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
  }
}
.container {
  background-color: #f2f2f2;
  height: 100%;
  .model-button-group {
    background-color: #fff;
    /* width: 700px; */
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
  .author {
    margin-top: 10px;
    /* width: 700px; */
    height: 63px;
    background-color: #fff;
    display: flex;
    align-items: center;
    color: #555;
    div {
      display: flex;
      font-size: 12px;
      flex-direction: column;
      margin-left: 16px;
      a {
        color: #248bfb;
        text-decoration: none;
      }
      .thing-name {
        font-size: 18px;
      }
    }
  }
  .show-thing {
    /* width: 700px; */
    background-color: #fff;
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
  .user-active {
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
    .active-box {
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      padding: 5px;
      width: 100%;
      min-height: 41px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #555;
      cursor: pointer;
      span {
        margin-left: 3px;
        font-size: 12px;
      }
      i {
        font-size: 14px;
      }
      .el-icon-right {
        margin-right: 5px;
      }
    }
  }
  .share-thing {
    width: 100%;
    height: 255px;
    color: #555;
    background-color: #fff;
    margin-top: 10px;
    padding: 10px 0px 10px 10px;
    box-sizing: border-box;
    span {
      font-size: 16px;
    }
    .social-icon {
      margin-top: 10px;
      svg {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        margin-top: 10px;
      }
    }
    .send-email {
      margin-top: 20px;
      span {
        font-size: 12px;
        padding: 10px;
      }
      .el-input {
        margin-top: 20px;
      }
    }
  }
  .filter-box {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
}
.center-container {
  margin: 0 auto;
  width: 970px;
}
.el-tabs {
  margin-top: 15px;
}
.img-ul {
  position: relative;
  display: flex;
  flex-direction: column;
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
  width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
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
  z-index: 10;
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
  z-index: 10;
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
  z-index: 10;
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
  .author {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
