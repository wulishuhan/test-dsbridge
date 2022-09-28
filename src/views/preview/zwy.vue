<template>
  <div>
    <FloatingMenu
      ref="test"
      :editor="editor"
      :tippyOptions="{ placement: 'left', offset: [0, 20] }"
    >
      <el-dropdown trigger="click" placement="left-end">
        <span class="el-dropdown-link">
          <i class="el-icon-plus"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            icon="el-icon-plus"
            @click.native="
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            "
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            >title</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-circle-plus">
            subtile
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">photo</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </FloatingMenu>
    <div>
      <el-button>aaa</el-button>
    </div>
    <editor-content :editor="editor" class="desc-editor" />

    <draggable-swiper
      v-model="data"
      :on-add-success="onCoverAddSuccess"
      :on-edit-success="onCoverEditSuccess"
      :remove="handleRemoveCover"
      :currentKey.sync="currentCoverEditKey"
    ></draggable-swiper>
    <div v-for="(item, index) in data" :key="index">{{ item.url }}</div>
  </div>
</template>
<script>
import { Editor, EditorContent, FloatingMenu } from "@tiptap/vue-2";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Focus from "@tiptap/extension-focus";
import { generatorDefaultAvator } from "@/utils/generateImage";
import draggableSwiper from "@/views/upload/draggableSwiper";
export default {
  // eslint-disable-next-line
  name: "zwy",
  data() {
    return {
      editor: null,
      data: [],
      currentCoverEditKey: 0,
    };
  },
  components: {
    EditorContent,
    FloatingMenu,
    draggableSwiper,
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
      onSelectionUpdate({ editor }) {
        // The selection has changed.
        console.log("onSelectionUpdate", editor);
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  mounted() {},
  methods: {
    onCoverAddSuccess(response) {
      console.log("=============", response);
      let imgInfo = {
        id: response.id,
        url: response.url,
        name: response.name,
        size: response.size,
      };
      this.data.push(imgInfo);
    },
    handleRemoveCover(removeKey) {
      this.data.splice(removeKey, 1);
    },
    onCoverEditSuccess(response) {
      let imgInfo = {
        id: response.id,
        url: response.url,
        name: response.name,
        size: response.size,
      };
      this.data.splice(this.currentCoverEditKey, 1, imgInfo);
    },
    handleClick() {
      console.log(21);
    },
    shouldShow({ editor, view, state }) {
      console.log("shouldShow", editor, view, state);
      return true;
    },
    selectEmoji(emoji) {
      console.log(emoji);
      console.log(this.editor);

      this.editor.chain().focus().insertContent(emoji.data).run();
    },
    getImg() {
      return generatorDefaultAvator("hello", 21);
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
  /* Placeholder (at the top) */
  ::v-deep .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
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
