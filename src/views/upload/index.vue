<template>
  <div>
    <h1 class="header-title">Create project</h1>
    <div class="upload-wrapper">
      <div class="select-area">
        <i class="ortur-icon-file" style="font-size: 60px"></i>
        <span>Drag your file & photo here (&lt;12MB)</span>
        <span>Or</span>
        <el-button>Select file</el-button>
      </div>

      <div class="list-area">
        <el-divider></el-divider>
        <div class="list-wrapper">
          <h5 class="list-wrapper-title">文件列表</h5>
          <ul>
            <li>
              <div class="fileinfo-wrapper">
                <div class="fileicon">
                  <i class="ortur-icon-file" style="font-size: 40px"></i>
                </div>
                <div class="fileinfo">
                  <span class="filename">3D cyclesdfdfsdfsfsf</span>
                  <div class="fileinfo-tag">
                    <span class="filesize">128kb</span>
                    <span class="filetype">PNG</span>
                  </div>
                </div>
              </div>
              <el-progress :percentage="40" :format="format"></el-progress>
            </li>
            <li>
              <div class="fileinfo-wrapper">
                <div class="fileicon">
                  <i class="ortur-icon-file" style="font-size: 40px"></i>
                </div>
                <div class="fileinfo">
                  <span class="filename">3D cycle</span>
                  <div class="fileinfo-tag">
                    <span class="filesize">128kb</span>
                    <span class="filetype">PNG</span>
                  </div>
                </div>
              </div>
              <el-progress :percentage="40" :format="format"></el-progress>
            </li>
            <li>
              <div class="fileinfo-wrapper">
                <div class="fileicon">
                  <i class="ortur-icon-file" style="font-size: 40px"></i>
                </div>
                <div class="fileinfo">
                  <span class="filename">3D cycle</span>
                  <div class="fileinfo-tag">
                    <span class="filesize">128kb</span>
                    <span class="filetype">PNG</span>
                  </div>
                </div>
              </div>
              <el-progress :percentage="40" :format="format"></el-progress>
            </li>
          </ul>
        </div>
      </div>
      <div class="list-area">
        <el-divider></el-divider>
        <div class="list-wrapper">
          <h5 class="list-wrapper-title">封面</h5>
          <!-- <draggable
            draggable=".swiper-slide"
            tag="swiper"
            ref="mySwiper"
            :component-data="getComponentData()"
          >
            <swiper-slide class="swiper-no-swiping">
              <div style="height: 120px; width: 180px; text-align: center">
                <img
                  src="http://dummyimage.com/180x120/ef79f2/FFF&text=yqqmj1"
                />
              </div>
            </swiper-slide>
            <swiper-slide class="swiper-no-swiping">
              <img src="http://dummyimage.com/180x120/ef79f2/FFF&text=yqqmj2" />
            </swiper-slide>
            <swiper-slide class="swiper-no-swiping">
              <img src="http://dummyimage.com/180x120/ef79f2/FFF&text=yqqmj3" />
            </swiper-slide>
            <swiper-slide class="swiper-no-swiping">
              <img src="http://dummyimage.com/180x120/ef79f2/FFF&text=yqqmj" />
            </swiper-slide>
            <swiper-slide class="swiper-no-swiping">
              <img src="http://dummyimage.com/180x120/ef79f2/FFF&text=yqqmj" />
            </swiper-slide>
            <swiper-slide class="swiper-no-swiping">
              <img src="http://dummyimage.com/180x120/ef79f2/FFF&text=yqqmj" />
            </swiper-slide>
            <swiper-slide class="swiper-no-swiping">
              <img src="http://dummyimage.com/180x120/ef79f2/FFF&text=yqqmj" />
            </swiper-slide>
            <swiper-slide class="swiper-no-swiping">
              <img src="http://dummyimage.com/180x120/ef79f2/FFF&text=yqqmj" />
            </swiper-slide>
            <swiper-slide class="swiper-no-swiping">
              <img src="http://dummyimage.com/180x120/ef79f2/FFF&text=yqqmj" />
            </swiper-slide>
          </draggable> -->
          <div v-swiper:mySwiper="swiperOptions" @someSwiperEvent="callback">
            <draggable class="swiper-wrapper">
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj11"
                />
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqm22"
                />
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj33"
                />
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj44"
                />
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj55"
                />
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj66"
                />
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj77"
                />
              </div>
            </draggable>
            <div class="swiper-button-prev swiper-button-black"></div>
            <!-- 白色 -->
            <div class="swiper-button-next swiper-button-black"></div>
            <!-- 黑色 -->
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <div class="support-file-area">
        <el-divider></el-divider>
        <div class="support-file-area__text">
          <span>Supported Files: jpg、png、svg、dxf、.gc、.nc</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  // eslint-disable-next-line
  name: "upload",
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      swiperOptions: {
        slidesPerView: 5,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // Some Swiper option/callback...
      },

      groups: [],
      myArray: [
        {
          id: 1,
          url: "https://cdn.thingiverse.com/renders/ce/96/2a/78/ba/bc48f4232048053be71efddd58a1464e_thumb_tiny.jpg",
          name: "MakePrintable Thing App",
          author: "MixedDimensions",
        },
        {
          id: 2,
          url: "https://cdn.thingiverse.com/renders/28/31/42/14/6c/2a4816a865281bdd135e770afd5c6507_thumb_tiny.jpg",
          name: "KiriMoto",
          author: "stewartallen",
        },
      ],
      value: "",
      apps: 0,
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper;
    },
  },
  mounted() {
    console.log("Current Swiper instance object", this.mySwiper);
  },
  methods: {
    callback() {},
    getComponentData() {
      return {
        attrs: {},
        props: {
          options: this.swiperOptions,
        },
      };
    },
    handleStart(event) {
      event.preventDefault();
      console.log(event);
    },
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    handlePreview() {
      console.log("preview");
    },
    handlechange() {
      console.log(this.myArray);
    },
    handleExceed(files, fileList) {
      console.log(files, fileList);
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    dropboxUpload() {
      console.log("dropboxUpload");
    },
    handleSuccess(res, file) {
      console.log("handleSuccess", file);
    },
    publicThing() {
      console.log("public", this.form);
      console.log("public refs", this.$refs.informationContent);
    },
  },
};
</script>

<style lang="scss">
.header-title {
  margin: 50px auto 30px;
  font-weight: 300;
  text-align: center;
}

.swiper-slide {
  cursor: move;
}
.upload-wrapper {
  width: 1080px;
  padding: 40px;
  margin: 0 auto;
  min-height: 500px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .select-area {
    height: 300px;
    font-size: 24px;
    color: #777;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .el-button {
      width: 160px;
      font-size: 18px;
      padding: 20px;
    }
  }

  .list-area {
    .list-wrapper {
      .list-wrapper-title {
        color: #777;
        margin-bottom: 30px;
        font-weight: 300;
      }
      ul {
        li {
          display: flex;
          margin-bottom: 20px;
          align-items: center;
          flex-direction: row;
          justify-content: space-between;
          .fileinfo-wrapper {
            width: 40%;
            display: flex;
            align-items: center;
            .fileinfo {
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              .filename {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .fileinfo-tag {
                width: 100%;
                display: flex;
                align-items: center;
                .filesize {
                  color: #777;
                  width: 40px;
                  display: inline-block;
                  margin-right: 20px;
                }
                .filetype {
                  display: inline-block;
                  width: 40px;
                  height: 20px;
                  line-height: 20px;
                  background: #000;
                  color: #fff;
                  font-size: 12px;
                  text-align: center;
                  border-radius: 4px;
                }
              }
            }
          }

          .el-progress {
            width: 60%;
          }
        }
      }
    }
  }
  .support-file-area {
    .support-file-area__text {
      text-align: center;
      color: #777;
    }
  }
}
</style>
