<template>
  <div class="comment-wrapper">
    <div v-if="!comment.replies">暂无评论</div>
    <div v-else class="comment-count">{{ comment.replies.length }}条回复</div>
    <div
      v-for="(commentItem, commentIndex) in commentList"
      :key="commentItem.id"
    >
      <comment-content
        :comment="commentItem"
        :showReplyDialog="showReplyOuterDialog"
        :commentIndex="commentIndex"
      ></comment-content>
      <div class="reply-wrapper" v-if="commentItem.replies.length > 0">
        <div
          class="reply-item"
          v-for="(replyItem, replyIndex) in commentItem.replies.slice(0, 3)"
          :key="replyIndex"
        >
          <comment-content
            :comment="replyItem"
            :showReplyDialog="showReplyOuterDialogFromReply"
            :commentIndex="commentIndex"
            :replyIndex="replyIndex"
          ></comment-content>
        </div>
        <el-button
          @click="showReplyList(commentIndex)"
          class="reply-list-fold"
          v-if="commentItem.replies.length > 3"
        >
          <span style="font-size: 12px">View all replies </span>
          <span style="margin-right: 6px; color: #999">{{
            commentItem.replies ? commentItem.replies.length : 0
          }}</span>
          <i class="el-icon-right" style="color: #999"></i>
        </el-button>
      </div>
    </div>
    <el-dialog
      :title="replyTotalRows"
      :visible.sync="replyListDialog"
      width="900px"
    >
      <div class="userinfo-wrapper">
        <div class="profile">
          <span class="user-avatar">
            <img :src="currentComment.user.avatar" />
          </span>
          <span class="nickname">
            {{ currentComment.user.name }}
          </span>
          <span class="release-date">
            {{ $d(new Date(currentComment.create_time), "long") }}
          </span>
        </div>
        <div class="message-btn" @click="showCommentInnerDialog()">
          <el-button><i class="ortur-icon-message"></i></el-button>
        </div>
      </div>
      <div class="comment">{{ currentComment.content }}</div>
      <div class="reply-list">
        <div v-for="(replyRow, id) in currentComment.replies" :key="id">
          <div class="userinfo-wrapper">
            <div class="profile">
              <span class="user-avatar"
                ><img :src="replyRow.user.avatar"
              /></span>
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
      <el-dialog
        :title="replyTo"
        :visible.sync="innerVisible"
        append-to-body
        top="35vh"
      >
        <reply-widget
          @closeReplyModal="handleClose('inner')"
          :comment-id="currentCommentId"
        ></reply-widget>
      </el-dialog>
    </el-dialog>

    <el-dialog :title="replyTo" :visible.sync="outerVisible">
      <reply-widget
        @closeReplyModal="handleClose('outer')"
        :comment-id="currentCommentId"
      ></reply-widget>
    </el-dialog>
  </div>
</template>

<script>
import ReplyWidget from "@/components/Comment/ReplyWidget.vue";
import CommentContent from "@/components/Comment/CommentContent.vue";
import { getMakeDetail } from "@/api/user";
import { mapGetters } from "vuex";
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
      replyTotalRows: "0条回复",
      replyTo: "reply to xxxx",
      currentResId: 0,
      keywords: "",
      select: "",
      commentList: [],
      comment: {},
    };
  },
  components: {
    CommentContent,
    ReplyWidget,
  },
  mounted() {
    this.comment = this.make;
    getMakeDetail({
      commentId: this.make.id,
    }).then((res) => {
      this.comment.replies = res.data.rows;
      this.commentList.push(this.comment);
    });
  },
  methods: {
    handleClose(space) {
      if (space == "inner") {
        this.innerVisible = false;
      } else {
        this.outerVisible = false;
      }
      getMakeDetail({
        commentId: this.make.id,
      }).then((res) => {
        this.comment.replies = res.data.rows;
        this.commentList = [this.comment];
        console.log(space, "okok");
      });
    },
    showReplyOuterDialog(index) {
      if (!this.isLogin) {
        this.showLoginDialog();
        this.$emit("closeAll");
        return;
      }
      this.outerVisible = true;
      this.currentComment = this.commentList[index];
      this.currentCommentId = this.currentComment.id;
      this.replyTo = "reply to " + this.currentComment.user.name;
    },
    showReplyOuterDialogFromReply(commentIndex, replyIndex) {
      if (!this.isLogin) {
        this.showLoginDialog();
        this.$emit("closeAll");
        return;
      }
      this.outerVisible = true;
      this.currentComment = this.commentList[commentIndex];
      console.log("replyIndex:" + replyIndex);

      this.currentCommentId =
        this.commentList[commentIndex].replies[replyIndex].id;
      this.replyTo = "reply to " + this.currentComment.user.name;
    },
    showCommentInnerDialog() {
      this.innerVisible = true;
      this.replyTo = "reply to " + this.currentComment.user.name;
      this.currentCommentId = this.currentComment.id;
    },
    showReplyInnerDialog(replyIndex) {
      this.innerVisible = true;
      this.replyTo =
        "reply to " + this.currentComment.replies[replyIndex].user.name;
      this.currentCommentId = this.currentComment.replies[replyIndex].id;
    },
    showReplyList(index) {
      this.replyListDialog = true;
      this.currentComment = this.commentList[index];
      this.replyTotalRows = this.currentComment.replies.length + "条回复";
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
</style>
