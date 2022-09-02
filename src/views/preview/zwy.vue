<template>
  <div>
    <editor-content :editor="editor" class="desc-editor" />
    <VEmojiPicker @mousedown="testClick($event)" @select="selectEmoji" />
  </div>
</template>
<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
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
  },
  mounted() {
    this.editor = new Editor({
      content: "",
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: "my custom placeholder",
        }),
      ],
    });
  },
  beforeDestroy() {
    this.editor.destroy();
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
