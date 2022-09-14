<template>
  <div>
    <FloatingMenu ref="test" :editor="editor">
      <el-button>123123123</el-button>
    </FloatingMenu>
    <editor-content :editor="editor" class="desc-editor" />
    <VEmojiPicker @mousedown="testClick($event)" @select="selectEmoji" />
  </div>
</template>
<script>
import { Editor, EditorContent, FloatingMenu } from "@tiptap/vue-2";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Focus from "@tiptap/extension-focus";
export default {
  // eslint-disable-next-line
  name: "zwy",
  data() {
    return {
      editor: null,
    };
  },
  components: {
    EditorContent,
    FloatingMenu,
  },
  created() {
    this.editor = new Editor({
      content: "",
      extensions: [
        StarterKit,
        Focus.configure({
          className: "has-focus",
          mode: "all",
        }),
        Placeholder.configure({
          placeholder: "my custom placeholder",
        }),
      ],
      onUpdate({ editor }) {
        // The content has changed.
        console.log("onUpdate:", editor);
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  mounted() {
    console.log(this.$refs);
  },
  methods: {
    shouldShow({ editor, view, state }) {
      console.log("shouldShow", editor, view, state);
      return true;
    },
    selectEmoji(emoji) {
      console.log(emoji);
      console.log(this.editor);

      this.editor.chain().focus().insertContent(emoji.data).run();
    },
  },
};
</script>

<style lang="scss" scoped>
.desc-editor {
  width: 800px;
  margin: 0 auto;
  border: 1px solid red;
  padding: 10px;
  ::v-deep .ProseMirror {
    outline: none !important;
    min-height: 300px;
  }
}
.tippy-box .tippy-content {
  background: #aaa;
}
.el-button {
  color: #000;
  font-weight: 700;
}
</style>
