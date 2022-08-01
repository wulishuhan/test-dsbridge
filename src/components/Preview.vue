<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">
      {{ buttonText }}
    </el-button>
    <el-dialog width="1136px" :visible.sync="dialogVisible">
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
              </div>
              <div class="show-thing">
                <div class="carouselContainer justify-between">
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
                        height="496px"
                        :interval="3000"
                        arrow="never"
                        ref="carousel"
                        indicator-position="none"
                        @change="carouselChange"
                        :autoplay="true"
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
                    <div class="up swiper-container-button">
                      <i class="ortur-icon-arrow-up"></i>
                    </div>
                    <div class="down swiper-container-button">
                      <i class="ortur-icon-arrow-down"></i>
                    </div>
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
                  xxxxxxxxxxx xxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxx
                  xxxxxxxxxxxxxxx xxxxxxxx xxxxxxxxx xxxxxx xxxxxxxxx xxxxxxx
                  xxxxxxxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxxx xxxxxxxxxx
                  xxxxxxxxxxx xxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxx
                </show-more>
              </el-tab-pane>
              <el-tab-pane label="Tutorial" name="step">
                <show-more :showHeight="showHeight" v-if="activeName == 'step'">
                  xxxxxxxxxxxxxxx xxxxxxxx xxxxxxxxx xxxxxx xxxxxxxxx xxxxxxx
                  xxxxxxxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxxx xxxxxxxxxx
                  xxxxxxxxxxx xxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxx
                </show-more>
              </el-tab-pane>
              <!-- <el-tab-pane label="Makes" name="third">makes</el-tab-pane> -->
            </el-tabs>
          </div>
          <div class="bottom-content-right">
            <label-card></label-card>
          </div>
        </div>
        <ElImageViewer
          ref="test"
          class="imageViewer"
          :on-close="closeViewer"
          :url-list="urlList"
          :initialIndex="imgActiveIndex"
          v-show="showViewer"
          :zIndex="imageViewerIndex"
        ></ElImageViewer>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import ElImageViewer from "@/components/ImageViewer.vue";
import { getUserInfoByThingId } from "@/api/thing";
import ShowMore from "@/components/ShowMore.vue";
import LabelCard from "@/components/LabelCard.vue";
export default {
  name: "Preview",
  components: { LabelCard, ShowMore, ElImageViewer },
  props: {
    buttonText: {
      type: String,
      default: "预览文本",
    },
  },
  data() {
    return {
      dialogVisible: false,
      imageList: [],
      showImg: [],
      waitImg: [],
      user: {},
      showViewer: false, // 显示查看器
      urlList: [], //大图列表
      imgActiveIndex: 0, // 当前移动图片的索引值
      activeName: "description",
      showHeight: 200,
      imageViewerIndex: 9999,
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
    };
  },
  methods: {
    openImageView() {
      this.urlList = this.imageList.map((item) => {
        return item.url;
      });
      this.showViewer = true;
    },
    closeViewer() {
      this.showViewer = false;
    },
    changeImg(index) {
      console.log("changeImg", index);
      this.$refs.carousel.setActiveItem(index);
      this.imgActiveIndex = index;
    },
    carouselChange() {
      this.imgActiveIndex = this.$refs.carousel.activeIndex;
      this.mySwiper.activeIndex = this.imgActiveIndex;
      this.mySwiper.slideTo(this.$refs.carousel.activeIndex, 1000, false);
      console.log(
        "carouselChange",
        this.imgActiveIndex,
        this.mySwiper.activeIndex
      );
    },
    arrowClick(val) {
      if (val === "down") {
        this.$refs.carousel.next();
      } else {
        this.$refs.carousel.prev();
      }
      console.log("refs:", this.$refs.carousel.activeIndex);
      this.imgActiveIndex = this.$refs.carousel.activeIndex;
    },
    setActiveItem(index) {
      this.$refs.carousel.setActiveItem(index);
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
    });
  },
  mounted() {
    console.log("imageViewer:", this);
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
::v-deep .el-dialog {
  background: #f5f5f5;
}
.center-container {
  margin: 0 auto;
  width: 1024px;
}
.el-tabs--border-card {
  background: #f5f5f5;
  border: none;
  box-shadow: none;
}
.description-tutorial-makes {
  width: 100%;
  background-color: #f5f5f5;
  margin-top: 0px;
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
  width: 328px;
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
  cursor: pointer;
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
.show-thing {
  width: 100%;
}
.carouselContainer {
  display: flex;
}

.carousel {
  position: relative;
  width: 807px;
  height: 496px;

  img {
    width: 100%;
    height: 100%;
  }
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

.right-carousel {
  display: flex;
  width: 184px;
  text-align: center;
  flex-direction: column;
  position: relative;
  margin-left: 32px;
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
.imageViewer {
  z-index: 9999;
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
    right: 515px;
  }

  ::v-deep .el-image-viewer__img {
    width: 1084px;
    height: 660px;
  }
}
::v-deep .el-dialog__header {
  padding: 0px;
}
</style>
