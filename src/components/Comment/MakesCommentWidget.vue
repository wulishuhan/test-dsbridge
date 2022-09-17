<template>
  <div class="comment-wrapper">
    <div v-if="!commentListFromId.rows">{{ $t("comment.empty") }}</div>
    <div v-else class="comment-count">
      {{ $t("comment.replyNum", [commentListFromId.rows.length]) }}
    </div>
    <div class="userinfo-wrapper">
      <div class="profile">
        <span class="user-avatar">
          <img :src="make.user.avatar" />
        </span>
        <span class="nickname">
          {{ make.user.name }}
        </span>
        <span class="release-date">
          {{ $d(new Date(make.create_time), "long") }}
        </span>
      </div>
      <div class="message-btn" @click="showCommentInnerDialog()">
        <el-button><i class="ortur-icon-message"></i></el-button>
      </div>
    </div>
    <div class="comment">{{ make.content }}</div>
    <div class="reply-list">
      <div v-for="(replyRow, id) in commentListFromId.rows" :key="id">
        <div class="userinfo-wrapper">
          <div class="profile">
            <span class="user-avatar"><img :src="replyRow.user.avatar" /></span>
            <span class="nickname">{{ replyRow.user.name }}</span>
            <span class="release-date">
              {{ $d(new Date(replyRow.create_time), "long") }}
            </span>
          </div>
          <div class="message-btn" @click="showReplyInnerDialog(id)">
            <el-button><i class="ortur-icon-message"></i></el-button>
          </div>
        </div>
        <div class="reply-wrapper">
          <div class="comment-detail">{{ replyRow.content }}</div>
          <div
            class="reply-ref-detail"
            v-if="JSON.stringify(replyRow.refer) != '{}'"
          >
            <span class="reply-label">回复</span>
            &nbsp;
            <span class="reply-nickname">{{
              "@" + replyRow.refer.user.name
            }}</span>
            &nbsp;
            <span class="reply-comment">{{ replyRow.refer.content }}</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="replyTo" :visible.sync="innerVisible" top="35vh">
      <reply-widget
        @closeReplyModal="handleClose('inner')"
        :comment-id="currentCommentId"
        :resId="make.id"
        :primaryCommentId="make.id"
      ></reply-widget>
    </el-dialog>
  </div>
</template>

<script>
import ReplyWidget from "@/components/Comment/ReplyWidget.vue";
// import CommentContent from "@/components/Comment/CommentContent.vue";
import { mapGetters, mapState } from "vuex";
import { generatorDefaultAvator } from "@/utils/generateImage";
export default {
  props: {
    make: {
      type: Object,
      default: () => {
        return {};
      },
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isLogin"]),
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      commentListFromId: (state) => state.comment.commentListFromId,
    }),
  },
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      replyListDialog: false,
      currentComment: {
        id: 0,
        content: "",
        create_time: "1990-01-01",
        user: {
          id: 0,
          avatar: "",
          name: "UNKNOW",
        },
        replies: [],
      },
      currentCommentId: 0,
      replyTo: "reply to xxxx",
      currentResId: 0,
      keywords: "",
      select: "",
      comment: {},
    };
  },
  components: {
    // CommentContent,
    ReplyWidget,
  },
  mounted() {
    this.comment = this.make;
    if (!this.comment.user.avatar) {
      this.comment.user.avatar = generatorDefaultAvator(
        this.comment.user.name,
        this.comment.user.id
      );
    }
    this.$store.dispatch("comment/getCommentListFromId", this.make.id);
  },
  methods: {
    handleClose(space) {
      if (space == "inner") {
        this.innerVisible = false;
      } else {
        this.outerVisible = false;
      }
    },
    showCommentInnerDialog() {
      if (!this.isLogin) {
        this.showLoginDialog();
        this.$emit("closeAll");
        return;
      }
      this.innerVisible = true;
      this.replyTo = "reply to " + this.comment.user.name;
      this.currentCommentId = this.comment.id;
    },
    showReplyInnerDialog(replyIndex) {
      console.log("inner dialog with", typeof replyIndex, replyIndex);
      this.innerVisible = true;
      console.log("inner dialog", this.innerVisible);
      this.replyTo =
        "reply to " + this.commentListFromId.rows[replyIndex].user.name;
      this.currentCommentId = this.commentListFromId.rows[replyIndex].id;
    },
    showLoginDialog() {
      let payload = { loginDialogVisible: true, isLoginForm: true };
      this.$store.dispatch("user/switchLoginRegisteForm", payload);
    },
  },
};
</script>
<style lang="scss" scoped>
.comment-wrapper {
  width: 80%;
  margin: 20px auto;
  .userinfo-wrapper {
    display: flex;
    justify-content: space-between;
    align-content: center;
    font-size: 14px;
    .profile {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-right: 14px;
      }
      .user-avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;

        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .nickname {
        font-size: 16px;
        font-weight: 500;
        color: #1a1a1a;
      }
      .release-date {
        color: #999;
        font-size: 14px;
      }
    }
    .message-btn {
      .el-button {
        border: none;
        background: none;
      }
    }
  }
  .reply-wrapper {
    padding: 5px 10px;
    margin-left: 52px;
    background: #e8ebf4;
    border-radius: 8px;
    font-size: 14px;
    .comment-detail {
      margin: 10px auto;
      font-size: 16px;
      font-weight: 400;
      color: #1a1a1a;
    }
    .reply-ref-detail {
      font-size: 16px;
      color: #1a1a1a;
      background: #dadde6;
      border-radius: 8px;
      padding: 10px 20px;
      .reply-label {
        color: #999;
      }
      .reply-nickname {
        color: #1e78f0;
      }
    }
    .reply-list-fold {
      color: #1e78f0;
      background: none;
      border: none;
      width: 104px;
      height: 40px;
      .reply-label {
        color: #1e78f0;
      }
    }
    .reply-item {
      padding: 5px 10px;
      position: relative;
      .reply-detail {
        margin: 0px 54px;
        font-size: 16px;
        font-weight: 400;
        color: #1a1a1a;
      }
    }
  }
  .comment {
    width: 95%;
    color: #1a1a1a;
    margin-left: 50px;
    font-size: 14px;
  }

  .reply-list {
    width: 95%;
    margin: 20px auto;
    padding: 0px 20px;
    border-left: 2px solid #e6e6e6;
  }
}
.el-dialog__wrapper {
  background: rgba(0, 0, 0, 0.5);
}
.comment-count {
  color: #999;
  margin-bottom: 30px;
}
.makes-reply-left-line {
  width: 1px;
  height: 101px;
  border-left: 1px solid #ccc;
  position: absolute;
  left: -52px;
  top: -4px;
}
</style>
