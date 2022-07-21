<template>
  <div class="upload-container">
    <h1 class="header-title">Create project</h1>
    <div class="upload-wrapper">
      <div class="select-area">
        <el-upload
          action="/dev-api/user/receiveImg"
          :show-file-list="showFile"
          drag
        >
          <i class="ortur-icon-file" style="font-size: 60px"></i>
          <span>Drag your file & photo here (&lt;12MB)</span>
          <span>Or</span>
          <el-button size="small" type="primary">Select file</el-button>
        </el-upload>
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
          <div v-swiper:mySwiper="swiperOptions" @someSwiperEvent="callback">
            <draggable class="swiper-wrapper" handle=".handle">
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj11"
                />
                <i class="handle el-icon-s-operation"></i>
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqm22"
                />
                <i class="handle el-icon-s-operation"></i>
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj33"
                />
                <i class="handle el-icon-s-operation"></i>
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj44"
                />
                <i class="handle el-icon-s-operation"></i>
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj55"
                />
                <i class="handle el-icon-s-operation"></i>
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj66"
                />
                <i class="handle el-icon-s-operation"></i>
              </div>
              <div class="swiper-slide swiper-no-swiping">
                <img
                  src="http://dummyimage.com/150x90/ef79f2/FFF&text=yqqmj77"
                />
                <i class="handle el-icon-s-operation"></i>
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

    <el-form
      ref="form"
      :model="baseinfoForm"
      :rules="baseinfoFormRules"
      label-position="top"
      label-width="80px"
      style="margin: 20px auto"
    >
      <el-form-item label="Title" prop="title">
        <el-input v-model="baseinfoForm.title"></el-input>
      </el-form-item>
      <el-form-item label="Tags" prop="tags">
        <el-input v-model="baseinfoForm.tags"></el-input>
      </el-form-item>
      <el-form-item label="License" prop="license">
        <el-select
          v-model="baseinfoForm.license"
          placeholder="Select license"
          style="width: 100%"
        >
          <el-option
            v-for="(licenseItem, licenseKey) in licenseSelectList"
            :label="licenseItem.label"
            :value="licenseItem.value"
            :key="licenseKey"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Description" prop="desc">
        <el-input type="textarea" v-model="baseinfoForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="Tutorial">
        <draggable
          class="tutorial"
          draggable=".tutorial-item"
          handle=".drag-btn"
          @change="tutorialChange()"
          v-model="tutorialForm"
        >
          <div
            class="tutorial-item"
            v-for="(tutorialItem, tutorialKey) in tutorialForm"
            :key="tutorialKey"
          >
            <el-form :modal="tutorialItem">
              <el-form-item prop="desc">
                <el-input
                  v-model="tutorialItem.desc"
                  placeholder="标题1"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-upload
                  action="/dev-api/user/receiveImg"
                  list-type="picture-card"
                  :file-list="tutorialItem.fileList"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </el-form-item>
              <el-form-item label="" prop="desc">
                <el-input
                  type="textarea"
                  v-model="tutorialItem.desc"
                ></el-input>
              </el-form-item>
              <el-button class="drag-btn"
                ><i class="el-icon-s-grid"></i
              ></el-button>

              <el-button class="add-btn" @click="addTutorialItem(tutorialKey)">
                <i class="el-icon-plus"></i>
              </el-button>
              <el-button
                class="remove-btn"
                @click="removeTutorialItem(tutorialKey)"
                ><i class="el-icon-minus"></i
              ></el-button>
            </el-form>
          </div>
        </draggable>
      </el-form-item>
    </el-form>
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
      showFile: false,
      dialogImageUrl: "",
      dialogVisible: false,
      baseinfoFormRules: {
        title: [{ required: true, message: "title不能为空" }],
        tags: [{ required: true, message: "tags不能为空" }],
        license: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        desc: [{ required: true, message: "请选择活动区域" }],
      },
      baseinfoForm: {
        title: "",
        tags: "",
        license: "GNU - LGPL",
        desc: "",
      },

      licenseSelectList: [
        {
          label: "Creative Commons - Attribution",
          value: "Creative Commons - Attribution",
        },
        {
          label: "Creative Commons - Attribution - Share Alike",
          value: "Creative Commons - Attribution - Share Alike",
        },
        {
          label: "Creative Commons - Attribution - No Derivatives",
          value: "Creative Commons - Attribution - No Derivatives",
        },
        {
          label: "Creative Commons - Attribution - Non-Commercial",
          value: "Creative Commons - Attribution - Non-Commercial",
        },
        {
          label:
            "Creative Commons - Attribution - Non-Commercial - Share Alike",
          value:
            "Creative Commons - Attribution - Non-Commercial - Share Alike",
        },
        {
          label:
            "Creative Commons - Attribution - Non-Commercial - No Derivatives ",
          value:
            "Creative Commons - Attribution - Non-Commercial - No Derivatives ",
        },
        {
          label: "Creative Commons - Public Domain Dedication",
          value: "Creative Commons - Public Domain Dedication",
        },
        {
          label: "GNU - GPL",
          value: "GNU - GPL",
        },
        {
          label: "GNU - LGPL ",
          value: "GNU - LGPL ",
        },
        {
          label: "BSD License",
          value: "BSD License",
        },
      ],
      tutorialForm: [
        {
          id: 1,
          desc: "test1",
          fileList: [
            {
              name: "food.jpeg",
              url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
            },
            {
              name: "food2.jpeg",
              url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
            },
          ],
        },
        {
          id: 2,
          desc: "test2",
          fileList: [
            {
              name: "food.jpeg",
              url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
            },
            {
              name: "food2.jpeg",
              url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
            },
            {
              name: "food2.jpeg",
              url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
            },
          ],
        },
      ],
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

    let handleEl = document.querySelector(".handle");
    console.log("===========", handleEl);
  },
  methods: {
    tutorialChange() {
      console.log(this.tutorialForm);
    },
    addTutorialItem(tutorialKey) {
      console.log(this.tutorialForm);

      this.tutorialForm.splice(tutorialKey + 1, 0, {
        id: Date.now(),
        desc: "test3",
      });
    },
    removeTutorialItem(tutorialKey) {
      this.tutorialForm.splice(tutorialKey, 1);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
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
  position: relative;
  .handle {
    position: absolute;
    bottom: 10px;
    right: 60px;
    font-size: 20px;
    cursor: move;
    color: #444;
  }
  img {
    margin: 0px auto;
  }
}
.upload-container {
  width: 1080px;
  margin: 0px auto;
}
.upload-wrapper {
  width: 1080px;
  padding: 40px;
  margin: 20px auto;
  min-height: 500px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .select-area {
    font-size: 24px;
    color: #777;
    .el-upload {
      width: 100%;
      .el-upload-dragger {
        height: 300px;
        width: 100%;
        border: 1px dashed #fff;
        background: #fff;
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
      .el-upload-dragger:hover {
        border-color: #409eff;
      }
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
.el-textarea {
  ::v-deep .el-textarea__inner {
    min-height: 300px !important;
  }
}
.tutorial {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  .tutorial-item {
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin: 20px auto;
    .drag-btn {
      position: absolute;
      left: -80px;
      top: 50%;
    }
    .add-btn {
      position: absolute;
      right: -80px;
      bottom: 10px;
    }
    .remove-btn {
      position: absolute;
      right: -80px;
      top: 50%;
    }
  }
}
</style>
