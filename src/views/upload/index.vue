<template>
  <div class="upload-container">
    <h1 class="header-title">Create project</h1>
    <div class="upload-wrapper">
      <div class="select-area">
        <el-upload
          action="/dev-api/user/receiveImg"
          :show-file-list="showFile"
          :file-list="sourceList"
          drag
          multiple
          :on-change="handleSourceChange"
          :on-progress="handleSourceProgress"
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
            <li v-for="source in sourceList" :key="source.uid">
              <div class="fileinfo-wrapper">
                <div class="fileicon">
                  <i class="ortur-icon-file" style="font-size: 40px"></i>
                </div>
                <div class="fileinfo">
                  <span class="filename">{{ source.name }}</span>
                  <div class="fileinfo-tag">
                    <span class="filesize">{{
                      formatFileSize(source.size)
                    }}</span>
                    <span class="filetype">{{
                      source.name.substring(source.name.lastIndexOf(".") + 1)
                    }}</span>
                  </div>
                </div>
              </div>
              <el-progress
                :percentage="source.percentage"
                :format="format"
              ></el-progress>
            </li>
          </ul>
        </div>
      </div>
      <div class="list-area">
        <el-divider></el-divider>
        <div class="list-wrapper">
          <h5 class="list-wrapper-title">封面</h5>
          <div v-swiper:coverSwiper="swiperOptions" @someSwiperEvent="callback">
            <draggable
              class="swiper-wrapper"
              handle=".handle"
              v-model="coverList"
            >
              <div
                class="swiper-slide swiper-no-swiping"
                v-for="(coverItem, coverKey) in coverList"
                :key="coverKey"
              >
                <img :src="coverItem.url" />
                <i class="ortur-icon-minus" @click="removeCover(coverKey)">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                <i class="handle el-icon-s-operation"></i>
                <el-upload
                  class="cover-edit"
                  action="/dev-api/user/receiveImg"
                  :show-file-list="showFile"
                  :on-success="handleCoverEditSuccess"
                >
                  <i
                    class="el-icon-edit"
                    @click="currentEditIndex(coverKey)"
                  ></i>
                </el-upload>
              </div>
              <div class="swiper-slide">
                <el-upload
                  action="/dev-api/user/receiveImg"
                  :show-file-list="showFile"
                  class="cover-add"
                  :on-success="handleCoverAddSuccess"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </draggable>
            <div class="swiper-button-prev swiper-button-black"></div>
            <!-- 白色 -->
            <div class="swiper-button-next swiper-button-black"></div>
            <!-- 黑色 -->
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
        <el-tag
          :key="index"
          v-for="(tag, index) in baseinfoForm.tags"
          closable
          :disable-transitions="true"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          placeholder="添加标签"
          class="input-new-tag"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
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
              <el-form-item prop="desc" style="margin-bottom: 20px">
                <el-input
                  v-model="tutorialItem.step_title"
                  placeholder="添加步骤标题"
                ></el-input>
              </el-form-item>
              <el-form-item style="margin: 20px auto">
                <div
                  v-swiper:[tutorialSwiper+tutorialKey]="tutorialSwiperOptions"
                  @someSwiperEvent="callback"
                >
                  <draggable
                    class="swiper-wrapper"
                    handle=".handle"
                    v-model="tutorialItem.fileList"
                  >
                    <div
                      class="swiper-slide swiper-no-swiping"
                      v-for="(
                        tutorialImgItem, tutorialImgKey
                      ) in tutorialItem.fileList"
                      :key="tutorialImgKey"
                    >
                      <img :src="tutorialImgItem.url" />
                      <i
                        class="ortur-icon-minus"
                        @click="removeTutorialImg(tutorialKey, tutorialImgKey)"
                      >
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <i class="handle el-icon-s-operation"></i>
                      <el-upload
                        class="cover-edit"
                        action="/dev-api/user/receiveImg"
                        :show-file-list="showFile"
                        :on-success="handleTutorialEditSuccess"
                      >
                        <i
                          class="el-icon-edit"
                          @click="
                            currentTutorialEditIndex(
                              tutorialKey,
                              tutorialImgKey
                            )
                          "
                        ></i>
                      </el-upload>
                    </div>
                    <div class="swiper-slide">
                      <el-upload
                        action="/dev-api/user/receiveImg"
                        :show-file-list="showFile"
                        class="cover-add"
                        :on-success="handleTutorialAddSuccess"
                      >
                        <i
                          class="el-icon-plus"
                          @click="currentTutorialEditIndex(tutorialKey, -1)"
                        ></i>
                      </el-upload>
                    </div>
                  </draggable>
                  <div class="swiper-button-prev swiper-button-black"></div>
                  <!-- 白色 -->
                  <div class="swiper-button-next swiper-button-black"></div>
                  <!-- 黑色 -->
                </div>
              </el-form-item>
              <el-form-item label="" prop="desc">
                <el-input
                  type="textarea"
                  autosize
                  v-model="tutorialItem.desc"
                  placeholder="添加步骤说明"
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
                v-if="tutorialForm.length != 1"
                ><i class="el-icon-delete"></i
              ></el-button>
            </el-form>
          </div>
        </draggable>
      </el-form-item>
      <el-form-item>
        <div class="action-btn">
          <el-button type="primary" @click="handleSave()">Save</el-button>
          <el-button>Preview</el-button>
          <el-button @click="resetForm()">Reset</el-button>
        </div>
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
      tutorialSwiper: "tutorialSwiper",
      showFile: false,
      dialogImageUrl: "",
      inputValue: "",
      sourceList: [],
      coverList: [],
      tutorialImgList: [],
      dialogVisible: false,
      baseinfoFormRules: {
        title: [{ required: true, message: "title不能为空" }],
        tags: [{ required: true, message: "tags不能为空" }],
        license: [{ required: true, message: "不能为空", trigger: "change" }],
        desc: [{ required: true, message: "不能为空" }],
      },
      baseinfoForm: {
        title: "",
        tags: ["标签一", "标签二", "标签三"],
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
          step_title: "",
          desc: "",
          fileList: [
            {
              name: "food.jpeg",
              url: "http://dummyimage.com/150x90/ef79f2/FFF&text=1",
            },
            {
              name: "food2.jpeg",
              url: "http://dummyimage.com/150x90/ef79f2/FFF&text=2",
            },
          ],
        },
      ],
      swiperOptions: {
        observer: true,
        slidesPerView: 5,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      tutorialSwiperOptions: {
        observer: true,
        slidesPerView: 5,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
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
    resetForm() {
      this.baseinfoForm = this.$options.data().baseinfoForm;
      this.tutorialForm = this.$options.data().tutorialForm;
      this.sourceList = this.$options.data().sourceList;
      this.coverList = this.$options.data().coverList;
      this.tutorialImgList = this.$options.data().tutorialImgList;
    },
    handleClose(tag) {
      this.baseinfoForm.tags.splice(this.baseinfoForm.tags.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.baseinfoForm.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    removeCover(removeKey) {
      console.log(removeKey);
      this.coverList.splice(removeKey, 1);
    },
    formatFileSize(filesize) {
      var units = "Byte";
      if (filesize / 1024 > 1) {
        filesize = filesize / 1024;
        units = "KB";
      }
      if (filesize / 1024 > 1) {
        filesize = filesize / 1024;
        units = "MB";
      }

      if (filesize / 1024 > 1) {
        filesize = filesize / 1024;
        units = "GB";
      }
      return filesize.toFixed(2) + units;
    },
    handleSourceChange(file) {
      console.log("=========", file);
    },
    handleSourceProgress(event, file, fileList) {
      console.log(event, file, fileList);
      this.sourceList = fileList;
    },
    handleSourceSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },
    handleCoverAddSuccess() {
      this.coverList.push({
        url: "http://dummyimage.com/150x90/ef79f2/FFF&text=new",
      });
    },
    handleCoverEditSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.coverList.splice(this.coverEditIndex, 1, {
        url: "http://dummyimage.com/150x90/ef79f2/FFF&text=edit",
      });
    },
    currentTutorialEditIndex(tutorialKey, tutorialImgKey) {
      console.log(tutorialKey, tutorialImgKey);
      this.currentTutorialKey = tutorialKey;
      this.currentTutorialImgKey = tutorialImgKey;
    },
    removeTutorialImg(tutorialKey, tutorialImgKey) {
      console.log(tutorialKey, tutorialImgKey);
      this.tutorialForm[tutorialKey].fileList.splice(tutorialImgKey, 1);
    },
    handleTutorialAddSuccess() {
      this.tutorialForm[this.currentTutorialKey].fileList.push({
        name: "test",
        url: "http://dummyimage.com/150x90/ef79f2/FFF&text=new",
      });
    },
    handleTutorialEditSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.tutorialForm[this.currentTutorialKey].fileList.splice(
        this.currentTutorialImgKey,
        1,
        {
          name: "test",
          url: "http://dummyimage.com/150x90/ef79f2/FFF&text=edit",
        }
      );
    },

    currentEditIndex(coverEditIndex) {
      console.log(coverEditIndex);
      this.coverEditIndex = coverEditIndex;
    },
    tutorialChange() {
      console.log(this.tutorialForm);
    },
    addTutorialItem(tutorialKey) {
      console.log(this.tutorialForm);

      this.tutorialForm.splice(tutorialKey + 1, 0, {
        id: Date.now(),
        desc: "",
        step_title: "",
        fileList: [],
      });
    },
    removeTutorialItem(tutorialKey) {
      this.tutorialForm.splice(tutorialKey, 1);
    },
    callback() {},
    format(percentage) {
      // return percentage === 100 ? "满" : `${percentage}%`;

      return `${percentage}%`;
    },
    formatStatus(percentage) {
      return percentage === 100 ? "success" : "exception";
    },
    handleSave() {
      console.log(this.tutorialForm);
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

.swiper-button-next,
.swiper-button-prev {
  width: 0;
}

.swiper-slide {
  position: relative;
  .ortur-icon-minus {
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 35px;
    cursor: pointer;
  }
  .cover-edit {
    font-size: 20px;
    position: absolute;
    top: 35px;
    left: 90px;
    cursor: pointer;
  }
  .cover-add {
    width: 150px;
    font-size: 34px;
    border: 1px dashed #aaa;
    height: 90px;
    .el-upload {
      width: 100%;
      height: 100%;
      .el-icon-plus {
        line-height: 90px;
        width: 100%;
      }
    }
  }

  .cover-add:hover {
    border: 1px dashed #409eff;
  }
  .handle {
    position: absolute;
    bottom: 10px;
    right: 35px;
    font-size: 20px;
    cursor: move;
    color: #444;
  }
  img {
    display: block;
    margin: 0px auto;
    width: 150px;
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
                  width: 80px;
                  display: inline-block;
                  margin-right: 20px;
                }
                .filetype {
                  display: inline-block;
                  width: 60px;
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

.tutorial {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  .tutorial-item {
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin: 20px auto;
    .el-button {
      position: absolute;
      border: none;
    }
    .drag-btn {
      left: -80px;
      top: 50%;
    }
    .add-btn {
      right: -80px;
      bottom: 10px;
    }
    .remove-btn {
      right: -80px;
      top: 50%;
    }
  }
}
.action-btn {
  display: flex;
  justify-content: flex-end;
  .el-button {
    width: 120px;
    margin-left: 20px;
  }
}

.el-form {
  .el-form-item input,
  .el-form-item textarea {
    font-size: 12px;
  }
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.el-tag {
  color: #1a1a1a;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
