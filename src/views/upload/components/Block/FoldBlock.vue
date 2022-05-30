<template>
  <div>
    <draggable @start="drag = true" @end="drag = false">
      <div class="text-block" v-if="showTextBlock">
        <block :name="'Text Block'" @closeBlock="closeBlock">
          <el-form class="text-block-form">
            <el-form-item>
              <el-input
                placeholder="Optional:Add a Title (i.e. Step 1, Introduction, Requirements, etc))"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <editor ref="toastuiEditor" @change="onEditorChange"></editor>
            </el-form-item>
          </el-form>
        </block>
      </div>
      <div class="image-block" v-if="showImageBlock">
        <block :name="'Image Block'" @closeBlock="closeBlock">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="middle" type="primary">ADD IMAGE</el-button>
          </el-upload>
        </block>
      </div>
      <div class="video-block" v-if="showVideoBlock">
        <block :name="'Video Block'" @closeBlock="closeBlock">
          <el-form class="video-block-form">
            <el-form-item class="video-block-form-item">
              <el-input placeholder="Enter YouTube or Video URL"></el-input>
              <el-button size="middle" type="primary">ADD VIDEO</el-button>
            </el-form-item>
          </el-form>
        </block>
      </div>
    </draggable>
    <div class="addBox-container">
      <div class="addBox-text addBox-card">
        <i class="el-icon-s-operation"></i>
        <el-link @click="activeBlock('Text Block')">Add Text</el-link>
      </div>
      <div class="addBox-image addBox-card">
        <i class="el-icon-camera-solid"></i>
        <el-link @click="activeBlock('Image Block')">Add an Image</el-link>
      </div>
      <div class="addBox-video addBox-card">
        <i class="el-icon-caret-right"></i>
        <el-link @click="activeBlock('Video Block')">Add a Video</el-link>
      </div>
    </div>
  </div>
</template>
<script>
import Block from "./Block";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import draggable from "vuedraggable";
export default {
  name: "FoldBlock",
  components: { Block, Editor, draggable },
  props: {},
  mounted() {},
  data() {
    return {
      showTextBlock: false,
      showImageBlock: false,
      showVideoBlock: false,
      contentMARKDOWN: "",
      fileList: [],
    };
  },
  methods: {
    activeBlock(name) {
      if (name === "Text Block") {
        this.showTextBlock = true;
      } else if (name === "Image Block") {
        this.showImageBlock = true;
      } else {
        this.showVideoBlock = true;
      }
    },
    closeBlock(name) {
      if (name === "Text Block") {
        this.showTextBlock = false;
      } else if (name === "Image Block") {
        this.showImageBlock = false;
      } else {
        this.showVideoBlock = false;
      }
    },
    onEditorChange() {
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      this.contentMARKDOWN = markdown;
      console.log(markdown);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>
<style lang="scss">
.addBox-container {
  width: 640px;
  height: 50px;
  background: #fff;
  .addBox-card {
    height: 20px;
    padding: 15px 20px 15px 14px;
    border-right: 1px solid #dcdcdc;
    float: left;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    .el-link {
      margin-left: 10px;
    }
  }
}
.text-block {
  .text-block-form {
    .el-input {
      width: 100%;
    }
  }
}
.image-block {
  .el-upload {
    display: flex;
    justify-content: center;
    align-content: center;
  }
}
.video-block {
  .video-block-form {
    margin-top: 15px;
    .el-button {
      margin: 10px;
    }
  }
}
</style>
