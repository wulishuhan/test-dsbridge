<template>
  <div class="bio-card">
    <div class="bio-card-title">
      <h1>
        {{ name }}
      </h1>
      <div>
        <i
          :class="{ 'el-icon-arrow-down': !isShow, 'el-icon-arrow-up': isShow }"
          @click="controlShow"
        ></i>
      </div>
    </div>
    <div class="bio-card-content" v-show="isShow">
      <div class="summary-editor">
        <editor ref="toastuiEditor" @change="onEditorChange"></editor>
      </div>
    </div>
  </div>
</template>
<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
export default {
  // eslint-disable-next-line
  name: "Bio",
  components: { Editor },
  props: {
    name: {
      type: String,
      default: "",
    },
    isSummary: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      isShow: true,
      contentHTML: "",
      contentMARKDOWN: "",
      editorOptions: {
        hideModeSwitch: true,
      },
    };
  },
  mounted() {},
  methods: {
    controlShow() {
      this.isShow = !this.isShow;
    },
    onEditorChange() {
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      this.contentMARKDOWN = markdown;
      this.$emit("changeBio", markdown);
    },
  },
};
</script>
<style lang="scss" scoped>
.bio-card {
  .bio-card-content {
    width: 100%;
    margin-bottom: 15px;
    .summary-editor {
      background: #fff;
    }
  }
}
.bio-card-title {
  margin-top: 15px;
  width: 930px;
  height: 20.4px;
  text-align: justify;
  color: #fff;
  background-color: #999;
  padding: 14px 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  input {
    background: none;
    border: none;
    color: #fff;
    font-size: 16px;
  }
}
</style>
