<template>
  <div class="reply-widget-wrapper">
    <div class="post-content-wrapper">
      <img v-if="showAvatar" :src="userInfo.avatar" />
      <editor-content
        :editor="editor"
        class="post-content"
        @keydown.enter.native="handlePost()"
      ></editor-content>
    </div>
    <div class="toolbar">
      <el-upload
        action="/dev-api/library/resource/upload"
        multiple
        :show-file-list="false"
        :on-success="upSuccess"
        :headers="headers"
        :accept="acceptType"
        :before-upload="beforeUpload"
        ref="uploadFile"
      >
        <el-button class="btn-uppic" style="margin-right: 18px">
          <i class="ortur-icon-image-add"></i>
        </el-button>
      </el-upload>
      <el-popover placement="bottom" width="400" trigger="click">
        <VEmojiPicker @select="selectEmoji" />
        <el-button class="btn-emoji" slot="reference"
          ><i class="ortur-icon-simle"></i
        ></el-button>
      </el-popover>
      <el-button class="el-btn-post" @click="handlePost()">Post</el-button>
    </div>
  </div>
</template>

<script>
import { postComment } from "@/api/user";
import { createNamespacedHelpers } from "vuex";
import { Editor, EditorContent } from "@tiptap/vue-2";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
const { mapState } = createNamespacedHelpers("user");
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      editor: null,
      showAvatar: true,
      comment: "",
      acceptType: ".jpg,.png,.jpeg",
    };
  },
  props: {
    commentId: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.comment,
      autofocus: true,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: "Add a comment",
          showOnlyWhenEditable: false,
        }),
      ],
      onUpdate: () => {
        this.comment = this.editor.getText();
        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
      onFocus: () => {
        this.showAvatar = false;
      },
    });
  },
  components: {
    EditorContent,
  },
  computed: {
    ...mapState(["userInfo"]),
    headers() {
      return {
        Authorization: "Bearer " + getToken(),
      };
    },
  },
  methods: {
    selectEmoji(emoji) {
      this.editor.chain().focus().insertContent(emoji.data).run();
    },
    handleEnter() {
      this.handlePost();
    },
    handlePost() {
      let resId = parseInt(this.$route.params.thingId);
      if (this.comment == "") {
        this.$message({
          message: "评论不能为空",
          type: "error",
        });
        return;
      }
      postComment({
        resourceId: resId,
        parentId: this.commentId,
        content: this.comment,
      }).then(() => {
        this.$store.dispatch("comment/getCommentList", { resId: resId });
        this.$message({
          message: "发送成功",
          type: "success",
        });
      });

      this.editor.commands.clearContent(true);
      this.$emit("closeReplyModal");
    },
    upSuccess(response, file) {
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
  },
};
</script>
<style lang="scss" scoped>
.reply-widget-wrapper {
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  border: 1px solid #ccc !important;
  border-radius: 10px;
  min-height: 96px;
  max-height: 96px;
  justify-content: space-between;
  .post-content-wrapper {
    width: 100%;
    padding: 8px;
    display: flex;
    justify-content: space-between;

    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      object-fit: cover;
      border-radius: 50%;
    }
    .post-content {
      width: 90%;
      ::v-deep .ProseMirror {
        outline: none;
        min-height: 40px;
        max-height: 40px;
        font-size: 20px;
        line-height: 40px;
        padding: 0 20px;
        overflow: hidden;
        white-space: nowrap;
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
  }
  .toolbar {
    display: flex;
    align-items: center;
    padding: 10px 10px;
    position: relative;
    .el-btn-post {
      position: absolute;
      background: #1e78f0;
      height: 40px;
      width: 104px;
      border-radius: 8px;
      bottom: 10px;
      right: 10px;
      color: #ffffff;
    }
    .btn-uppic,
    .btn-emoji {
      background: none;
      border: none;
      font-size: 24px;
      padding: unset !important;
    }
  }
}
.el-popover {
  background: none !important;
  padding: none;
  border: none;
  .emoji-picker {
    width: 100% !important;
  }
}
</style>
