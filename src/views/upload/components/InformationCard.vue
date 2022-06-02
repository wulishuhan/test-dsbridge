<template>
  <div class="information-card" v-if="select">
    <div class="information-card-title">
      <div v-if="name !== 'Custom Section'">
        {{ name }} &nbsp;
        {{
          requiredList.includes(name)
            ? "(required)"
            : recommendedList.includes(name)
            ? "(recommended)"
            : ""
        }}
      </div>
      <div v-else>
        <input type="text" v-model="customSectionName" />
      </div>
      <div>
        <i
          :class="{ 'el-icon-arrow-down': !isShow, 'el-icon-arrow-up': isShow }"
          @click="controlShow"
        ></i>
        &nbsp;
        <i class="el-icon-close" v-if="!isSummary" @click="controlClose"></i>
      </div>
    </div>
    <div class="information-card-content" v-show="isShow">
      <div v-if="isSummary" class="summary-editor">
        <editor ref="toastuiEditor" @change="onEditorChange"></editor>
      </div>
      <print-settings ref="printSettings" :name="name"></print-settings>
      <fold-block-form :name="name"></fold-block-form>
      <education-form :name="name"></education-form>
    </div>
  </div>
</template>
<script>
import PrintSettings from "./Form/PrintSettings";
import FoldBlockForm from "./Form/FoldBlockForm";
import EducationForm from "./Form/EducationForm";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
export default {
  name: "InformationCard",
  components: { PrintSettings, Editor, FoldBlockForm, EducationForm },
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
      requiredList: ["Summary", "Lesson Plan and Activity"],
      recommendedList: ["Grade", "Subject", "Standards", "Materials Needed"],
      customSectionName: "Custom Section",
    };
  },
  mounted() {},
  methods: {
    controlShow() {
      this.isShow = !this.isShow;
    },
    controlClose() {
      if (this.name === "Custom Section") {
        this.$emit("closeCustomSection", this.id);
      } else {
        this.$store.commit("upload/DELETE_SELECTORMODULES", this.name);
      }
    },
    onEditorChange() {
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      this.contentMARKDOWN = markdown;
    },
  },
  computed: {
    select: function () {
      if (this.name === "Summary" || this.name === "Custom Section") {
        return true;
      }
      return this.$store.getters.selectorModules.has(this.name);
    },
  },
  watch: {
    editorText: {
      get: function () {
        return this.editorText;
      },
      set: function (value) {
        this.editorText = value;
      },
    },
    // eslint-disable-next-line
    customSectionName(newName, oldName) {
      return this.customSectionName;
    },
  },
};
</script>
<style lang="scss" scoped>
.information-card {
  .information-card-content {
    width: 640px;
    margin-bottom: 15px;
    .summary-editor {
      background: #fff;
    }
  }
}
.information-card-title {
  margin-top: 15px;
  width: 600px;
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
  i {
    cursor: pointer;
  }
}
</style>
