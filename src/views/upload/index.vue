<template>
  <div class="upload-container" id="upload-container">
    <h1 class="header-title">{{ headerTitle }}</h1>
    <el-form
      ref="resourceForm"
      :model="resourceForm"
      :rules="resourceFormRules"
      label-position="top"
      label-width="80px"
      style="margin: 20px auto"
    >
      <el-form-item>
        <div class="upload-wrapper">
          <div class="select-area">
            <el-upload
              action="/dev-api/library/resource/upload"
              :show-file-list="showFile"
              :file-list="fileList"
              drag
              multiple
              :on-change="handleSourceChange"
              :on-progress="handleSourceProgress"
              :on-success="handleSourceSuccess"
              :headers="headers"
              :accept="acceptType"
              :before-upload="beforeUpload"
              ref="uploadFile"
            >
              <i class="ortur-icon-file" style="font-size: 60px"></i>
              <span>{{ $t("upload.dragFileTip") }} (&lt;12MB)</span>
              <span>{{ $t("upload.or") }}</span>
              <el-button size="small" type="primary">
                {{ $t("upload.selectFile") }}
              </el-button>
            </el-upload>
          </div>
          <el-form-item prop="files">
            <div class="list-area">
              <el-divider></el-divider>
              <div class="list-wrapper">
                <h5 class="list-wrapper-title">
                  {{ $t("upload.resourceList") }}
                </h5>
                <ul>
                  <li
                    v-for="(source, sourceIndex) in resourceForm.files"
                    :key="sourceIndex"
                  >
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
                            source.name.substring(
                              source.name.lastIndexOf(".") + 1
                            )
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <el-progress
                      :percentage="source.percent"
                      :format="format"
                      v-if="source.percent != 100"
                    ></el-progress>
                    <div
                      v-if="source.percent == 100"
                      class="fileinfo-remove-icon"
                    >
                      <span
                        class="ortur-icon-minus"
                        style="font-size: 24px; cursor: pointer"
                        @click="handleRemoveSource(sourceIndex)"
                      >
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </span>
                    </div>
                    <div
                      v-if="source.percent != 100"
                      class="fileinfo-abort-icon"
                    >
                      <span
                        class="el-icon-close"
                        style="font-size: 24px; cursor: pointer"
                        @click="handleabortUpload(sourceIndex)"
                      >
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="images">
            <div class="list-area">
              <el-divider></el-divider>
              <div class="list-wrapper">
                <h5 class="list-wrapper-title">
                  {{ $t("upload.resourceCover") }}
                </h5>
                <div v-swiper:coverSwiper="swiperOptions">
                  <draggable
                    class="swiper-wrapper"
                    handle=".handle"
                    v-model="resourceForm.images"
                  >
                    <div
                      class="swiper-slide swiper-no-swiping"
                      v-for="(coverImage, coverKey) in resourceForm.images"
                      :key="coverKey"
                    >
                      <img :src="coverImage.url" />
                      <i
                        class="ortur-icon-minus"
                        @click="handleRemoveCover(coverKey)"
                      >
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      <i class="handle el-icon-s-operation"></i>
                      <el-upload
                        class="cover-edit"
                        action="/dev-api/library/resource/upload"
                        :show-file-list="showFile"
                        :on-success="handleCoverEditSuccess"
                        :headers="headers"
                        accept=".png,.jpg,.svg,.jpeg"
                        :before-upload="beforeUpload"
                      >
                        <i
                          class="el-icon-edit"
                          @click="currentEditIndex(coverKey)"
                        ></i>
                      </el-upload>
                    </div>
                    <div class="swiper-slide">
                      <el-upload
                        action="/dev-api/library/resource/upload"
                        :show-file-list="showFile"
                        class="cover-add"
                        :on-success="handleCoverAddSuccess"
                        :headers="headers"
                        accept=".png,.jpg,.svg,.jpeg"
                        :before-upload="beforeUpload"
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
          </el-form-item>
          <div class="support-file-area">
            <el-divider></el-divider>
            <div class="support-file-area__text">
              <span>
                {{ $t("upload.supportedFiles") }}: jpg、png、svg、dxf、.gc、.nc
              </span>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('upload.title')" prop="title">
        <el-input v-model="resourceForm.title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('upload.tags')" prop="tags">
        <el-tag
          :key="index"
          v-for="(tag, index) in resourceForm.tags"
          closable
          :disable-transitions="true"
          @close="handleCloseTag(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-autocomplete
          class="inline-input"
          ref="autoInput"
          v-model="inputValue"
          :fetch-suggestions="querySearch"
          value-key="name"
          placeholder="请输入内容"
          size="small"
          :trigger-on-focus="false"
          @select="handleSelect"
          @keyup.enter.native="handleInputConfirm"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('upload.license')" prop="license">
        <el-select
          v-model="resourceForm.license"
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
      <el-form-item :label="$t('upload.description')" prop="description">
        <el-input
          type="textarea"
          autosize
          v-model="resourceForm.description"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('upload.tutorial')" style="position: relative">
        <span
          v-if="tutorialForm.length == 0"
          class="ortur-icon-plus tutorial-handle-icon"
          @click="addTutorialItem(false)"
        >
          <span class="path1"></span>
          <span class="path2"></span>
        </span>
        <span
          v-if="tutorialForm.length > 0"
          class="ortur-icon-minus tutorial-handle-icon"
          @click="removeTutorialItem(false)"
        >
          <span class="path1"></span>
          <span class="path2"></span>
        </span>
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
            <el-form
              ref="tutorialForm"
              :model="tutorialItem"
              :rules="tutorialFormRules"
            >
              <el-form-item prop="title" style="margin-bottom: 20px">
                <el-input
                  v-model="tutorialItem.title"
                  :placeholder="$t('upload.addStepTitle')"
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
                    v-model="tutorialItem.images"
                  >
                    <div
                      class="swiper-slide swiper-no-swiping"
                      v-for="(
                        tutorialImage, tutorialImgKey
                      ) in tutorialItem.images"
                      :key="tutorialImgKey"
                    >
                      <img :src="tutorialImage.url" />
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
                        action="/dev-api/library/resource/upload"
                        :show-file-list="showFile"
                        :on-success="handleTutorialEditSuccess"
                        :headers="headers"
                        accept=".png,.jpg,.svg,.jpeg"
                        :before-upload="beforeUpload"
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
                        action="/dev-api/library/resource/upload"
                        :show-file-list="showFile"
                        class="cover-add"
                        :on-success="handleTutorialAddSuccess"
                        :headers="headers"
                        accept=".png,.jpg,.svg,.jpeg"
                        :before-upload="beforeUpload"
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
              <el-form-item label="" prop="description">
                <el-input
                  type="textarea"
                  autosize
                  v-model="tutorialItem.description"
                  :placeholder="$t('upload.addStepDesc')"
                ></el-input>
              </el-form-item>
              <el-button class="drag-btn"
                ><i class="el-icon-s-operation"></i
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
          <el-button type="primary" @click="handleSave()">
            {{ $t("upload.save") }}
          </el-button>
          <el-button @click="previewDialogVisible = true">
            {{ $t("upload.preview") }}
          </el-button>
          <el-button @click="resetForm()">
            {{ $t("upload.reset") }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <Preview
      :dialogVisible="previewDialogVisible"
      :close="closePreviewDialog"
      :preview-data="previewData"
    ></Preview>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Preview from "@/components/Preview";
import { getToken } from "@/utils/auth";
import {
  saveResource,
  getResource,
  updateResource,
  getResourceTags,
  uploadFile,
} from "@/api/resource";
export default {
  // eslint-disable-next-line
  name: "upload",
  components: {
    draggable,
    Preview,
  },
  data() {
    return {
      previewDialogVisible: false,
      sourceId: 0,
      fileList: [],
      acceptType: ".jpg,.png,.svg,.dxf,.gc,.nc,.jpeg",
      tutorialValidateResult: true,
      tutorialSwiper: "tutorialSwiper",
      showFile: false,
      dialogImageUrl: "",
      inputValue: "",
      searchSuggestions: "",
      dialogVisible: false,
      resourceFormRules: {
        files: [{ required: true, message: "资源不能为空" }],
        images: [{ required: true, message: "封面不能为空" }],
        title: [{ required: true, message: "标题不能为空" }],
        tags: [{ required: true, message: "标签不能为空" }],
        license: [{ required: true, message: "不能为空", trigger: "change" }],
        description: [{ required: true, message: "不能为空" }],
      },
      resourceForm: {
        images: [],
        files: [],
        title: "",
        tags: ["标签一"],
        license: "GNU - LGPL",
        description: "",
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
      tutorialFormRules: {
        title: [{ required: true, message: "标题不能为空" }],
        description: [{ required: true, message: "描述不能为空" }],
      },
      tutorialForm: [],
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
    headers() {
      return {
        Authorization: "Bearer " + getToken(),
      };
    },
    headerTitle() {
      if (this.sourceId != undefined) {
        return this.$t("upload.editProject");
      } else {
        return this.$t("upload.createProject");
      }
    },
    previewData() {
      return {
        ...this.resourceForm,
        tutorials: this.tutorialForm,
        editDatetime: this.$t("upload.editOn") + this.$d(new Date(), "short"),
      };
    },
  },
  mounted() {
    this.sourceId = this.$route.params.sourceId;
    if (this.sourceId != undefined) {
      //调用详解接口
      getResource(parseInt(this.sourceId)).then((res) => {
        let detail = res.data.data;
        console.log("资源详情", detail);
        this.resourceForm.description = detail.description;
        this.resourceForm.title = detail.title;
        this.resourceForm.files = detail.files;
        this.resourceForm.files.forEach((item) => {
          item.percent = 100;
        });
        this.resourceForm.images = detail.images;
        this.resourceForm.tags = detail.tags;
        this.resourceForm.license = detail.license;
        this.tutorialForm = detail.tutorials;
      });
    }
  },
  methods: {
    genThumb(srcFile) {
      //判断文件类型，如果是图片，则生成截图
      if (srcFile.raw.type.indexOf("image") < 0) {
        return;
      }
      //
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = URL.createObjectURL(srcFile.raw);
        image.setAttribute("crossOrigin", "Anonymous");

        image.onload = () => {
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          var maxw = 400;
          var maxh = 400;

          var cw = image.width;
          var ch = image.height;
          var w = image.width;
          var h = image.height;
          canvas.width = w;
          canvas.height = h;
          if (cw > maxw && cw > ch) {
            w = maxw;
            h = (maxw * ch) / cw;
            canvas.width = w;
            canvas.height = h;
          }
          if (ch > maxh && ch > cw) {
            h = maxh;
            w = (maxh * cw) / ch;
            canvas.width = w;
            canvas.height = h;
          }
          ctx.drawImage(image, 0, 0, w, h);

          canvas.toBlob((blob) => {
            var file = new File([blob], srcFile.raw.name, {
              type: "image/jpeg",
            });
            //TODO:调用上传接口获取缩略图地址
            let formData = new FormData();
            formData.append("file", file);
            uploadFile(formData)
              .then((res) => {
                resolve(res);
              })
              .catch((error) => {
                reject(error);
              });
          }, srcFile.raw.type);
        };
      });
    },
    handleSelect(item) {
      this.$refs["autoInput"].focus();
      console.log(item);
    },
    querySearch(queryString, cb) {
      getResourceTags({ name: queryString }).then((res) => {
        var restaurants = res.data.data;
        cb(restaurants);
      });
    },
    closePreviewDialog() {
      this.previewDialogVisible = false;
    },
    beforeUpload(file) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let accept = this.acceptType.indexOf(extension) < 0 ? false : true;
      if (!accept) {
        this.$message({
          message: "Supported Files:" + this.acceptType,
          type: "warning",
        });
      }
      accept = true;
      return accept;
    },
    resetForm() {
      this.resourceForm = this.$options.data().resourceForm;
      this.tutorialForm = this.$options.data().tutorialForm;
    },
    handleCloseTag(tag) {
      this.resourceForm.tags.splice(this.resourceForm.tags.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (this.resourceForm.tags.length >= 12) {
        this.$message.error("标签至多12个");
        return;
      }

      if (inputValue.length > 32) {
        this.$message.error("至多32个字符");
        return;
      }
      if (inputValue) {
        this.resourceForm.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
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
      //检查当前队列里是否已经有该元素
      for (const index in this.resourceForm.files) {
        var item = this.resourceForm.files[index];
        if (file.uid == item.uid) {
          return;
        }
      }

      let fileInfo = {
        uid: file.uid,
        url: "",
        id: 0,
        name: file.name,
        size: file.size,
        percent: 0,
        file: file,
        thumbnail: "",
      };
      //获取缩略图
      this.genThumb(file).then((res) => {
        fileInfo.thumbnail = res.data.data.url;
        console.log("fileInfo===", fileInfo);
        this.resourceForm.files.push(fileInfo);
      });

      console.log("handleSourceChange=========", file);
    },
    handleSourceProgress(event, file) {
      for (const index in this.resourceForm.files) {
        var item = this.resourceForm.files[index];
        if (file.uid == item.uid) {
          item.percent = parseInt(event.percent.toFixed(0));
          return;
        }
      }
    },
    handleSourceSuccess(response, file) {
      console.log("file", file);
      for (const index in this.resourceForm.files) {
        var item = this.resourceForm.files[index];
        if (file.uid == item.uid) {
          item.url = response.data.url;
          item.percent = 100;
          item.id = response.data.id;
          // this.genThumb().then(() => {});
          break;
        }
      }

      //TODO 完成的时候隐藏掉进度条，显示移除
    },
    handleRemoveSource(sourceIndex) {
      this.resourceForm.files.splice(sourceIndex, 1);
    },
    //中止上传
    handleabortUpload(sourceIndex) {
      this.$refs.uploadFile.abort(this.resourceForm.files[sourceIndex].file);
      this.resourceForm.files.splice(sourceIndex, 1);
    },
    handleRemoveCover(removeKey) {
      console.log(removeKey);
      this.resourceForm.images.splice(removeKey, 1);
    },
    handleCoverAddSuccess(response) {
      let imgInfo = {
        id: response.data.id,
        url: response.data.url,
        name: response.data.name,
        size: response.data.size,
      };
      this.resourceForm.images.push(imgInfo);
    },
    handleCoverEditSuccess(response) {
      let imgInfo = {
        id: response.data.id,
        url: response.data.url,
        name: response.data.name,
        size: response.data.size,
      };
      this.resourceForm.images.splice(this.coverEditIndex, 1, imgInfo);
    },
    currentTutorialEditIndex(tutorialKey, tutorialImgKey) {
      console.log(tutorialKey, tutorialImgKey);
      this.currentTutorialKey = tutorialKey;
      this.currentTutorialImgKey = tutorialImgKey;
    },
    removeTutorialImg(tutorialKey, tutorialImgKey) {
      console.log(tutorialKey, tutorialImgKey);
      this.tutorialForm[tutorialKey].images.splice(tutorialImgKey, 1);
    },
    handleTutorialAddSuccess(response) {
      let imgInfo = {
        id: response.data.id,
        url: response.data.url,
        name: response.data.name,
        size: response.data.size,
      };
      this.tutorialForm[this.currentTutorialKey].images.push(imgInfo);
    },
    handleTutorialEditSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      let imgInfo = {
        id: response.data.id,
        url: response.data.url,
        name: response.data.name,
        size: response.data.size,
      };
      this.tutorialForm[this.currentTutorialKey].images.splice(
        this.currentTutorialImgKey,
        1,
        imgInfo
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
      var index = tutorialKey;
      if (tutorialKey === false) {
        index = 0;
      } else {
        index += 1;
      }

      this.tutorialForm.splice(index, 0, {
        id: Date.now(),
        description: "",
        title: "",
        images: [],
      });
    },
    removeTutorialItem(tutorialKey) {
      if (tutorialKey !== false) {
        this.tutorialForm.splice(tutorialKey, 1);
      } else {
        this.tutorialForm = [];
      }
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
      this.$refs["resourceForm"].validate((valid) => {
        const tutorialFormList = this.$refs["tutorialForm"] ?? [];
        this.tutorialValidateResult = true;
        for (let i = 0; i < tutorialFormList.length; i++) {
          tutorialFormList[i].validate((valid) => {
            this.tutorialValidateResult &&= valid;
          });
        }
        if (valid && this.tutorialValidateResult) {
          if (this.sourceId != undefined) {
            //调用详解接口
            updateResource({
              id: this.sourceId,
              ...this.resourceForm,
              tutorials: this.tutorialForm,
            })
              .then(() => {
                console.log("修改成功");
                this.$message.success("修改成功");
              })
              .catch(() => {
                this.$message.error("修改失败");
              });
          } else {
            saveResource({
              ...this.resourceForm,
              tutorials: this.tutorialForm,
            })
              .then((res) => {
                if (res.data.code == 0) {
                  this.$message.success("保存成功");
                } else {
                  this.$message.error("保存失败");
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }
          console.log("表单验证成功");
        } else {
          this.$message.error("验证失败!");
        }
      });
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
    height: 90px;
    object-fit: contain;
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
          .fileinfo-wrapper {
            width: 12%;
            display: flex;
            align-items: center;
            .fileinfo {
              width: 100%;
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
            margin-left: 70px;
          }
          .fileinfo-remove-icon {
            margin-left: 70px;
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
.tutorial-handle-icon {
  position: absolute;
  right: 0;
  top: -24px;
  font-size: 20px;
  cursor: pointer;
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
      background: none;
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
