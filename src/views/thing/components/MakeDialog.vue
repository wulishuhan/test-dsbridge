<template>
  <div>
    <el-dialog
      title="Post your make"
      :visible.sync="visible"
      :width="width"
      :custom-class="customClass"
    >
      <el-form>
        <el-form-item>
          <el-input
            placeholder="Add a step title"
            v-model="form.title"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            action="/dev-api/library/resource/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccessHandler"
            :headers="headers"
            :limit="1"
            list-type="picture"
          >
            <el-input placeholder="Add Photo (Bulk add supported)">
              <i slot="prefix" class="el-input__icon ortur-icon-image-add"></i>
            </el-input>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="Add a description"
            type="textarea"
            v-model="form.description"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            style="float: right; margin-right: 15px"
          >
            post
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
  name: "MakeDialog",
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
        title: "",
        description: "",
        url: "",
      },
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
    headers() {
      return {
        Authorization: "Bearer " + getToken(),
      };
    },
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    onSubmit() {
      console.log(this.form);
    },
    uploadSuccessHandler(response) {
      this.form.url = response.data.url;
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
  font-size: 20px;
  font-weight: 500;
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
</style>
