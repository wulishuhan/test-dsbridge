<!-- eslint-disable prettier/prettier -->
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
              action=""
              :show-file-list="showFile"
              :file-list="resourceForm.files"
              multiple
              :limit="config.fileLimit"
              :on-exceed="handleExceed"
              drag
              :on-progress="handleSourceProgress"
              :on-success="handleSourceSuccess"
              :on-error="handleSourceError"
              :headers="headers"
              :accept="acceptType"
              :before-upload="beforeUploadSource"
              :http-request="handleUpload"
              ref="uploadFile"
            >
              <i class="ortur-icon-file" style="font-size: 60px"></i>
              <div>
                <div style="font-size: 20px; color: #ccc">
                  {{ $t("upload.dragFileTip") }}
                </div>
                <div style="font-size: 16px; color: #ccc">
                  {{
                    $t("upload.draFileTipDesc", [
                      config.fileLimit,
                      formatFileSize(config.maxFileSize, 0),
                    ])
                  }}
                </div>
              </div>
              <span style="font-size: 20px; color: #ccc">
                {{ $t("upload.or") }}
              </span>
              <el-button size="small" type="primary">
                <i class="el-icon-plus"></i> &nbsp;
                {{ $t("upload.selectFile") }}
              </el-button>
            </el-upload>
          </div>
          <el-form-item prop="files">
            <div class="list-area" v-if="resourceForm.files.length > 0">
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
                        <i class="ortur-icon-file" style="font-size: 36px"></i>
                      </div>
                      <div class="fileinfo">
                        <span class="filename" :title="source.name">
                          {{ source.name }}
                        </span>
                        <div class="fileinfo-tag">
                          <span class="filesize">
                            {{ formatFileSize(source.size) }}
                          </span>
                          <span
                            class="filetype"
                            :title="
                              source.name.substring(
                                source.name.lastIndexOf('.') + 1
                              )
                            "
                            >{{
                              source.name.substring(
                                source.name.lastIndexOf(".") + 1
                              )
                            }}</span
                          >
                        </div>
                      </div>
                    </div>
                    <el-progress
                      :percentage="source.percent"
                      :format="format"
                      v-if="source.percent != 100 && source.upStatus < 2"
                    ></el-progress>
                    <div class="upload-error-tip" v-if="source.upStatus >= 2">
                      <i class="el-icon-warning"></i>
                      <span class="error-tip-text">
                        {{
                          source.upStatus == 3
                            ? $t("upload.fileSizeTipError")
                            : $t("upload.uploadfailed")
                        }}
                      </span>
                    </div>
                    <div
                      v-if="source.upStatus >= 2 || source.upStatus == 0"
                      class="fileinfo-remove-icon"
                    >
                      <span
                        class="ortur-icon-minus"
                        @click="handleRemoveSource(sourceIndex)"
                      >
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </span>
                    </div>
                    <div v-else class="fileinfo-abort-icon">
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
          <el-form-item prop="images" v-if="resourceForm.files.length > 0">
            <div class="list-area">
              <el-divider></el-divider>
              <div class="list-wrapper">
                <h5 class="list-wrapper-title">
                  {{ $t("upload.resourceCover") }}
                </h5>
                <draggable-swiper
                  v-model="resourceForm.images"
                  swiper-name="coverSwiper"
                  :on-add-success="onCoverAddSuccess"
                  :on-edit-success="onCoverEditSuccess"
                  :remove="handleRemoveCover"
                  :currentKeyList.sync="currentEditKeyList"
                ></draggable-swiper>
              </div>
            </div>
          </el-form-item>
          <div class="support-file-area">
            <el-divider></el-divider>
            <div class="support-file-area__text">
              <span>
                {{
                  $t("upload.supportedFiles") +
                  ": " +
                  acceptType.replace(/,/g, "、")
                }}
              </span>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item class="ref-resource-info" v-if="isRefSource">
        <h4>Source</h4>
        <el-divider></el-divider>
        <div class="resource-info-wrapper">
          <div class="resource-info-intro">
            <img :src="refResource.image" />
            <div class="resource-info">
              <span class="ref-title">{{ refResource.title }}</span>
              <span class="ref-author">By {{ refResource.creator.name }}</span>
            </div>
          </div>
          <div class="copyright">
            <img
              :src="iconUrl"
              v-for="(iconUrl, IconKey) in refResource.licenseIcon"
              :key="IconKey"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('upload.title')" prop="title">
        <el-input v-model="resourceForm.title"></el-input>
      </el-form-item>
      <el-form-item :label="$t('upload.tags')" prop="tags">
        <template v-slot:label>
          {{ $t("upload.tags") }}
          <span style="font-size: 12px; color: #aaa">
            ({{ $t("upload.tagTip") }})</span
          >
        </template>
        <div class="tag-input-wrapper">
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
            style="width: 80px"
            class="inline-input"
            ref="autoInput"
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            value-key="name"
            placeholder="New tag"
            size="small"
            :trigger-on-focus="false"
            @select="handleSelect"
            @keyup.enter.native="handleInputConfirm"
          ></el-autocomplete>
        </div>
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
          v-model="tutorialForm"
        >
          <div
            class="tutorial-item"
            v-for="(tutorialItem, tutorialKey) in tutorialForm"
            :key="tutorialItem.id"
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
                <draggable-swiper
                  v-model="tutorialItem.images"
                  :swiper-name="tutorialSwiper + tutorialKey"
                  :on-add-success="onTutorialAddSuccess"
                  :on-edit-success="onTutorialEditSuccess"
                  :remove="removeTutorialImg"
                  :currentKeyList.sync="currentEditKeyList"
                  :group-key="tutorialKey"
                ></draggable-swiper>
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
                ><i class="ortur-icon-settings-gray"></i
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
import { mapState } from "vuex";
import {
  saveResource,
  getResource,
  updateResource,
  getResourceTags,
  uploadFile,
  getResouceUploadS3Url,
} from "@/api/resource";
import axios from "axios";
import draggableSwiper from "@/views/upload/draggableSwiper";
import { throttle } from "@/utils/common";
export default {
  // eslint-disable-next-line
  name: "upload",
  components: {
    draggable,
    Preview,
    draggableSwiper,
  },
  data() {
    return {
      currentEditKeyList: [0, 0],
      previewDialogVisible: false,
      sourceId: 0,
      parentId: 0,
      isRefSource: false,
      acceptType: ".jpg,.png,.svg,.dxf,.gc,.nc,.jpeg,.gcode",
      tutorialValidateResult: true,
      tutorialSwiper: "tutorialSwiper",
      showFile: false,
      inputValue: "",
      searchSuggestions: "",
      dialogVisible: false,
      refResource: {
        title: "",
        images: [
          {
            url: "",
          },
        ],
        creator: {
          name: "",
        },
        licenseIcon: [],
      },
      resourceFormRules: {
        files: [
          {
            required: true,
            message: this.$t("upload.sourceNotEmpty"),
          },
        ],
        images: [{ required: true, message: this.$t("upload.coverNotEmpty") }],
        title: [
          { required: true, message: this.$t("upload.titleNotEmpty") },
          {
            range: true,
            min: 1,
            max: 32,
            message: this.$t("upload.titleLengthError", [1, 32]),
          },
        ],
        tags: [
          {
            required: true,
            message: this.$t("upload.tagNotEmpty"),
            trigger: "blur",
          },
        ],
        license: [
          {
            required: true,
            message: this.$t("upload.notEmpty"),
            trigger: "change",
          },
        ],
        description: [{ required: true, message: this.$t("upload.notEmpty") }],
      },
      resourceForm: {
        images: [],
        files: [],
        title: "",
        tags: [],
        license: "GNU - LGPL",
        description: "",
      },

      licenseSelectList: [
        {
          label: "Creative Commons - Attribution",
          value: "Creative Commons - Attribution",
          url: "https://creativecommons.org/licenses/by/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
          ],
        },
        {
          label: "Creative Commons - Attribution - Share Alike",
          value: "Creative Commons - Attribution - Share Alike",
          url: "https://creativecommons.org/licenses/by-sa/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
            "/license-img/Share Alike.png",
          ],
        },
        {
          label: "Creative Commons - Attribution - No Derivatives",
          value: "Creative Commons - Attribution - No Derivatives",
          url: "https://creativecommons.org/licenses/by-nd/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
            "/license-img/No Derivatives.png",
          ],
        },
        {
          label: "Creative Commons - Attribution - Non-Commercial",
          value: "Creative Commons - Attribution - Non-Commercial",
          url: "https://creativecommons.org/licenses/by-nc/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
            "/license-img/Non-Commercial.png",
          ],
        },
        {
          label:
            "Creative Commons - Attribution - Non-Commercial - Share Alike",
          value:
            "Creative Commons - Attribution - Non-Commercial - Share Alike",
          url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
            "/license-img/Non-Commercial.png",
            "/license-img/Share Alike.png",
          ],
        },
        {
          label:
            "Creative Commons - Attribution - Non-Commercial - No Derivatives ",
          value:
            "Creative Commons - Attribution - Non-Commercial - No Derivatives ",
          url: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
            "/license-img/Non-Commercial.png",
            "/license-img/No Derivatives.png",
          ],
        },
        {
          label: "Creative Commons - Public Domain Dedication",
          value: "Creative Commons - Public Domain Dedication",
          url: "https://creativecommons.org/share-your-work/public-domain/cc0/",
          icon: [
            "/license-img/Creative Commons - Public Domain Dedication.png",
          ],
        },
        {
          label: "GNU - GPL",
          value: "GNU - GPL",
          url: "https://www.gnu.org/licenses/gpl-3.0.html",
          icon: ["/license-img/GNU - GPL.png"],
        },
        {
          label: "GNU - LGPL",
          value: "GNU - LGPL",
          url: "https://www.gnu.org/licenses/lgpl-3.0.html",
          icon: ["/license-img/GNU - LGPL.png"],
        },
        {
          label: "BSD License",
          value: "BSD License",
          url: "https://opensource.org/licenses/BSD-3-Clause",
          icon: ["/license-img/BSD.png"],
        },
      ],
      tutorialFormRules: {
        title: [
          { required: true, message: this.$t("upload.titleNotEmpty") },
          {
            range: true,
            min: 1,
            max: 32,
            message: this.$t("upload.titleLengthError", [1, 32]),
          },
        ],
        description: [
          { required: true, message: this.$t("upload.descNotEmpty") },
        ],
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
    ...mapState({
      headers: (state) => state.user.headers,
      config: (state) => state.user.config,
    }),
    headerTitle() {
      if (this.sourceId != 0) {
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
    baseApi() {
      return process.env.VUE_APP_BASE_API;
    },
  },
  created() {
    this.sourceId = this.$route.params.sourceId || 0;
    this.parentId = this.$route.query.refId || 0;
    //refId不为空则为POST Remix
    if (this.sourceId != 0) {
      //调用详解接口
      getResource(parseInt(this.sourceId)).then((res) => {
        let detail = res.data.data;
        this.resourceForm.description = detail.description;
        this.resourceForm.title = detail.title;
        this.resourceForm.files = detail.files;
        this.resourceForm.files.forEach((item) => {
          item.percent = 100;
          item.upStatus = 0; //0:ok,1:等待上传,2:失败，3:文件超出大小
        });
        this.resourceForm.images = detail.images;
        this.resourceForm.tags = detail.tags;
        this.resourceForm.license = detail.license;
        this.tutorialForm = detail.tutorials;
        if (Object.keys(detail.ancestor).length > 0) {
          this.isRefSource = true;
          this.refResource = detail.ancestor;
          for (const item of this.licenseSelectList) {
            if (item.value == this.refResource.license) {
              this.refResource.licenseIcon = item.icon;
              break;
            }
          }
        }
      });
    }
    if (this.parentId != 0) {
      //调用详解接口
      this.isRefSource = true;
      getResource(parseInt(this.parentId)).then((res) => {
        var resData = res.data.data;
        this.refResource = {
          image: resData.images.length > 0 ? resData.images[0].url : "",
          title: resData.title,
          license: resData.license,
          id: resData.id,
          creator: resData.creator,
        };

        for (const item of this.licenseSelectList) {
          if (item.value == this.refResource.license) {
            this.refResource.licenseIcon = item.icon;
            break;
          }
        }
      });
    }
    this._throttle = throttle((swiperArrow) => {
      //滚动
      this.$refs[swiperArrow].click();
    }, 500);

    this._throttle_tutorial = throttle((swiperArrow, curIndex) => {
      //滚动
      this.$refs[swiperArrow][curIndex].click();
    }, 500);
  },
  methods: {
    drop(event) {
      event.preventDefault();
    },
    allowDrop(event, swiperArrow, curIndex) {
      if (/^tutorial/.test(swiperArrow)) {
        this._throttle_tutorial(swiperArrow, curIndex);
      } else {
        this._throttle(swiperArrow);
      }
      event.preventDefault();
    },

    genThumb(srcFile) {
      //
      return new Promise((resolve, reject) => {
        //判断文件类型，如果是图片，则生成截图
        if (srcFile.type.indexOf("image") < 0) {
          reject("error");
          return;
        }
        const image = new Image();
        image.src = URL.createObjectURL(srcFile);
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
            var file = new File([blob], srcFile.name, {
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
          }, srcFile.type);
        };
      });
    },
    handleSelect() {
      this.$refs["autoInput"].focus();
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
    handleExceed() {
      this.$message({
        message: this.$t("upload.fileExceed", [this.config.fileLimit]),
        type: "warning",
      });
    },
    handleUpload({ file, onProgress, onSuccess }) {
      var data;
      getResouceUploadS3Url({
        name: file.name,
        size: file.size,
        type: file.type,
      })
        .then((res) => {
          if (res.data.code == 0) {
            let presignUrl = res.data.data.presignUrl;

            data = res.data.data;
            return axios.put(presignUrl, file, {
              headers: {
                "Content-Type": file.type,
              },
              onUploadProgress: (progressEvent) => {
                onProgress(progressEvent);
              },
            });
          }
        })
        .then(() => {
          onSuccess(data);
        });
    },
    beforeUploadSource(file) {
      let extension = file.name
        .substring(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      var accept = this.acceptType.indexOf(extension) < 0 ? false : true;
      if (file.name.length > 50) {
        this.$message({
          message: this.$t("upload.filenameTooLong"),
          type: "warning",
        });
        return false;
      }

      if (!accept) {
        this.$message({
          message: this.$t("upload.supportedFilesError", [this.acceptType]),
          type: "warning",
        });
        return false;
      }
      var fileInfo = {
        uid: file.uid,
        url: "",
        id: 0,
        name: file.name,
        size: file.size,
        percent: 0,
        file: file,
        thumbnail: "",
        upStatus: 1, //0:ok,1:等待上传,2:失败，3:文件超出大小
      };

      //校验文件大小
      if (file.size > this.config.maxFileSize) {
        this.$message({
          message: this.$t("upload.fileTooLarge", [
            this.formatFileSize(this.config.maxFileSize, 0),
          ]),
          type: "warning",
        });
        accept = false;
        fileInfo.upStatus = 3;
      }
      this.resourceForm.files.push(fileInfo);
      //获取缩略图
      if (accept) {
        // this.genThumb(file).then((res) => {
        //   if (res && res.data.code == 0) {
        //     fileInfo.thumbnail = res.data.data.url;
        //   }
        // });
      }

      return accept;
    },
    beforeUpload(file) {
      let extension = file.name
        .substring(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      let accept = this.acceptType.indexOf(extension) < 0 ? false : true;
      if (file.name.length > 50) {
        this.$message({
          message: this.$t("upload.filenameTooLong"),
          type: "warning",
        });
        return false;
      }

      //校验文件大小
      if (file.size > this.config.maxPictureSize) {
        this.$message({
          message: this.$t("upload.fileTooLarge", [
            this.formatFileSize(this.config.maxPictureSize, 0),
          ]),
          type: "warning",
        });
        return false;
      }
      if (!accept) {
        this.$message({
          message: "Supported Files:" + this.acceptType,
          type: "warning",
        });
        return false;
      }

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
        this.$message.error(this.$t("upload.tagNumError"));
        return;
      }

      if (inputValue.length > 32) {
        this.$message.error(this.$t("upload.charNumError"));
        return;
      }
      if (inputValue) {
        this.resourceForm.tags.push(inputValue);
        this.resourceForm.tags = Array.from(new Set(this.resourceForm.tags));
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    formatFileSize(filesize, rad = 2) {
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
      return filesize.toFixed(rad) + units;
    },
    handleSourceProgress(event, file) {
      file.percent = parseInt(((event.loaded / event.total) * 100).toFixed(0));
    },
    handleSourceSuccess(response, file) {
      file.upStatus = 0;
      file.url = response.url;
      file.percent = 100;
      file.id = response.id;
      file.percentage = 0;
      console.log(this.resourceForm.files);
    },
    handleSourceError(err, file) {
      file.upStatus = 2;
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
      this.resourceForm.images.splice(removeKey, 1);
    },
    onCoverAddSuccess(response) {
      let imgInfo = {
        id: response.id,
        url: response.url,
        name: response.name,
        size: response.size,
      };
      this.resourceForm.images.push(imgInfo);
    },
    onCoverEditSuccess(response) {
      let imgInfo = {
        id: response.id,
        url: response.url,
        name: response.name,
        size: response.size,
      };
      this.resourceForm.images.splice(this.currentEditKeyList[0], 1, imgInfo);
    },
    currentTutorialEditIndex(tutorialKey, tutorialImgKey) {
      this.currentTutorialKey = tutorialKey;
      this.currentTutorialImgKey = tutorialImgKey;
    },
    removeTutorialImg(tutorialImgKey, tutorialKey) {
      this.tutorialForm[tutorialKey].images.splice(tutorialImgKey, 1);
    },
    onTutorialAddSuccess(response) {
      let imgInfo = {
        id: response.id,
        url: response.url,
        name: response.name,
        size: response.size,
      };
      console.log("上传成功", this.currentEditKeyList);
      this.tutorialForm[this.currentEditKeyList[1]].images.push(imgInfo);
    },
    onTutorialEditSuccess(response) {
      let imgInfo = {
        id: response.id,
        url: response.url,
        name: response.name,
        size: response.size,
      };
      this.tutorialForm[this.currentEditKeyList[1]].images.splice(
        this.currentEditKeyList[0],
        1,
        imgInfo
      );
    },

    currentEditIndex(coverEditIndex) {
      this.coverEditIndex = coverEditIndex;
    },
    addTutorialItem(tutorialKey) {
      var index = tutorialKey;
      if (tutorialKey === false) {
        index = 0;
      } else {
        index += 1;
      }

      this.$nextTick(() => {
        this.tutorialForm.splice(index, 0, {
          id: Date.now(),
          description: "",
          title: "",
          images: [],
        });
      });
      console.log(this.tutorialForm);
    },
    removeTutorialItem(tutorialKey) {
      console.log("tutorialKey=======", tutorialKey, this.tutorialForm);
      if (tutorialKey !== false) {
        this.tutorialForm.splice(tutorialKey, 1);
      } else {
        this.tutorialForm = [];
      }
    },
    callback() {},
    format(percentage) {
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
          if (this.sourceId != 0) {
            //调用详解接口
            updateResource({
              id: this.sourceId,
              ...this.resourceForm,
              tutorials: this.tutorialForm,
            })
              .then(() => {
                this.$message.success(this.$t("upload.updateOk"));
                this.$router.push("/design/fromProfile");
              })
              .catch((res) => {
                this.$message.error(res.msg);
              });
          } else {
            saveResource({
              ...this.resourceForm,
              tutorials: this.tutorialForm,
              parentId: this.parentId,
            })
              .then((res) => {
                if (res.data.code == 0) {
                  this.$message.success(this.$t("upload.saveOk"));
                  this.$router.push("/design/fromProfile");
                } else {
                  this.$message.error(this.$t("upload.saveFail"));
                }
              })
              .catch((e) => {
                console.log(e);
                this.$message.error(this.$t("upload.validateError"));
              });
          }
        } else {
          this.$message.error(this.$t("upload.validateError"));
        }
      });
    },
  },
};
</script>

<style lang="scss">
.header-title {
  font-size: 30px;
  margin: 50px auto 30px;
  font-weight: 300;
  text-align: center;
}

.swiper-button-next,
.swiper-button-prev {
  width: 0;
}
.swiper-button-next {
  right: 12px;
}
.swiper-button-prev {
  left: 12px;
}

.upload-container {
  width: 1136px;
  margin: 0px auto;
}
.upload-wrapper {
  padding: 40px;
  min-height: 568px;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #e8ebf4;
  border-radius: 12px;
  .select-area {
    font-size: 24px;
    color: #777;
    .el-upload {
      width: 100%;
      .el-upload-dragger {
        height: 300px;
        width: 100%;
        border: none;
        background: none;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .el-button {
          width: 160px;
          font-size: 20px;
          padding: 20px;
          color: #1a1a1a;
          border-color: #999;
          border-radius: 8px;
          background: unset;
        }
      }
      .el-upload-dragger:hover {
        border: 1px dashed #409eff;
      }
    }
  }

  .list-area {
    .list-wrapper {
      .list-wrapper-title {
        line-height: 16px;
        color: #777;
        margin-bottom: 28px;
        font-weight: 300;
      }
      ul {
        li {
          display: flex;
          margin-bottom: 20px;
          align-items: center;
          flex-direction: row;
          .fileinfo-wrapper {
            display: flex;
            align-items: center;
            margin-right: 32px;
            .fileicon i {
              vertical-align: middle;
            }
            .fileinfo {
              width: 120px;
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              .filename {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                line-height: 24px;
              }
              .fileinfo-tag {
                width: 100%;
                display: flex;
                align-items: center;
                font-size: 12px;
                line-height: 22px;
                justify-content: space-around;
                .filesize {
                  color: #777;
                }
                .filetype {
                  max-width: 60px;
                  padding: 0 8px;
                  margin-left: 10px;
                  background: #000;
                  color: #fff;
                  border-radius: 4px;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }
              }
            }
          }

          .el-progress {
            width: 60%;
            margin-right: 32px;
          }
          .upload-error-tip {
            margin-right: 32px;
            color: #ff5e5e;
            font-size: 14px;
            font-weight: 400;
            .error-tip-text {
              margin-left: 10px;
            }
          }
          .fileinfo-remove-icon {
            margin-right: 32px;
            .ortur-icon-minus {
              font-size: 24px;
              cursor: pointer;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
  .support-file-area {
    .support-file-area__text {
      font-size: 16px;
      text-align: center;
      color: #cccccc;
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
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;

  .tutorial-item {
    position: relative;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 8px;
    margin: 0px auto 16px;
    border: 1px solid #cccccc;
    border-radius: 6px;
    background: #e8ebf4;

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
      width: 32px;
      height: 32px;
      background: rgba(255, 94, 94, 0.3);
      padding: unset;
    }
    .remove-btn:hover {
      color: #fff;
      background: #ff5e5e;
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
  .el-form-item label {
    font-weight: 400;
    font-size: 16px;
  }
  .el-form-item input,
  .el-form-item textarea {
    font-size: 12px;
  }
  .el-input .el-input__inner {
    background: none;
  }
  .el-textarea .el-textarea__inner {
    background: none;
  }
  .tag-input-wrapper {
    border: 1px solid #dcdfe6;
    padding: 0 5px;
    border-radius: 5px;
  }
  .ref-resource-info {
    padding: 10px;
    background: #e8ebf4;
    border-radius: 10px;
    h4 {
      line-height: 24px;
      font-size: 16px;
      font-weight: 400;
      color: #1a1a1a;
    }
    .el-divider--horizontal {
      margin: 10px 0;
      background: #999 !important;
      border-top: unset !important;
    }
    .resource-info-wrapper {
      line-height: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .resource-info-intro {
        display: flex;
        justify-content: space-between;
        align-content: center;
        img {
          width: 88px;
          height: 56px;
          object-fit: cover;
        }
        .resource-info {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          .ref-title {
            font-size: 16px;
          }
          .ref-author {
            font-size: 14px;
            color: #999999;
          }
        }
      }
      .copyright img {
        height: 46px;
        width: auto;
      }
      .copyright img + img {
        margin-left: 20px;
      }
    }
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
