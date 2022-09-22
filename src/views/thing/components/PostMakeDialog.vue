<template>
  <div>
    <el-dialog
      title="Post your make"
      :visible.sync="visible"
      :width="width"
      :custom-class="customClass"
      @close="close"
      :append-to-body="true"
    >
      <el-form>
        <el-form-item>
          <el-upload
            ref="upload-make-file"
            class="upload-demo"
            :action="uploadUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccessHandler"
            :before-upload="uploadBefore"
            :headers="headers"
            :limit="1"
            list-type="picture"
            :disabled="isDisabled"
            :multiple="false"
          >
            <el-input placeholder="Add Photo">
              <i slot="prefix" class="el-input__icon ortur-icon-image-add"></i>
            </el-input>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="Add a description"
            type="textarea"
            v-model="form.content"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            class="post-make-button"
            :disabled="isUploadComplete"
          >
            post
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { postComment } from "@/api/user";
import { mapGetters, mapState } from "vuex";
export default {
  name: "PostMakeDialog",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "840px",
    },
  },
  data() {
    return {
      form: {
        image: "",
        content: "",
        resourceId: this.$route.params.thingId,
        isMake: "1",
        id: 0,
      },
      isDisabled: false,
      isUploadComplete: true,
    };
  },
  computed: {
    visible: {
      get() {
        return this.isShow;
      },
      set(val) {
        console.log("val", val);
        this.$emit("update:isShow", false);
      },
    },
    uploadUrl() {
      return `${process.env.VUE_APP_BASE_API}/library/resource/upload`;
    },
    ...mapGetters(["isLogin"]),
    ...mapState({
      headers: (state) => state.user.headers,
    }),
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    onSubmit() {
      postComment(this.form).then((res) => {
        this.$message({
          message: "post make successfully",
          type: "success",
        });
        this.form.id = res.data.data;
        let resId = parseInt(this.$route.params.thingId);
        this.$store.dispatch("comment/getCommentList", { resId: resId });
        this.$emit("addMake", this.form);
        this.close();
      });
    },
    uploadSuccessHandler(response) {
      console.log("uploadSuccessHandler", response);
      this.form.image = response.data.url;
      this.form.url = response.data.url;
      this.isUploadComplete = false;
    },
    uploadBefore(file) {
      console.log("upload before file", file);
      this.isDisabled = true;
      let whiteList = ["png", "jpg", "jpeg", "gif"];
      if (file.name.length > 50) {
        this.$message.error(this.$t("thing.fileNameTooLong"));
        this.isDisabled = false;
        return false;
      } else if (
        !whiteList.includes(file.name.substring(file.name.lastIndexOf(".") + 1))
      ) {
        this.$message.error(this.$t("thing.acceptFileFormat"));
        this.isDisabled = false;
        return false;
      } else if (file.size < 1024 * 10) {
        this.$message.error(this.$t("thing.acceptFileSize"));
        return false;
      }
      return true;
    },
    close() {
      this.$emit("update:isShow", false);
      this.$refs["upload-make-file"].clearFiles();
      this.isDisabled = false;
      this.isUploadComplete = true;
      this.form = {
        image: "",
        content: "",
        resourceId: this.$route.params.thingId,
        isMake: "1",
        url: "",
      };
    },
  },
  watch: {
    visible(val) {
      // 在此做显示与隐藏的交互
      if (val === false) {
        // 重置操作
      } else {
        // 展示时操作
      }
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-input__inner {
  background: #f5f5f5;
  width: 808px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #ebebeb;
  cursor: pointer;
}

::v-deep .el-textarea__inner {
  background: #f5f5f5;
  width: 808px;
  height: 80px;
  border-radius: 6px;
  border: 1px solid #ebebeb;
}

::v-deep .el-dialog__header {
  padding: 0px 0px 0px 18px;
  height: 56px;
  line-height: 56px;
  font-size: 20px !important;
  font-weight: 500 !important;
  color: #1a1a1a;
  font-family: Source Han Sans CN;
}
::v-deep .el-dialog__body {
  padding: 0px;
}
::v-deep .el-form-item {
  margin-bottom: 8px;
}
.el-form {
  background: #f5f5f5;
  padding: 8px;
}
.post-make-button {
  width: 120px;
  font-size: 16px;
  float: right;
  margin-right: 15px;
}
</style>
