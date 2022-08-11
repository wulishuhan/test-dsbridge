<template>
  <div class="comment-wrapper">
    <div v-if="commentList.length == 0">暂无评论</div>
    <div
      v-for="(commentItem, commentIndex) in commentList"
      :key="commentItem.id"
    >
      <div class="userinfo-wrapper">
        <div class="profile">
          <span class="user-avatar"
            ><img :src="commentItem.user.avatar"
          /></span>
          <span class="nickname">{{ commentItem.user.name }}</span>
          <span class="release-date">
            {{ $d(new Date(commentItem.create_time), "long") }}
          </span>
        </div>
        <div class="message-btn" @click="showReplyOuterDialog(commentIndex)">
          <el-button><i class="ortur-icon-message"></i></el-button>
        </div>
      </div>
      <div class="reply-wrapper">
        <div class="comment-detail">{{ commentItem.content }}</div>
        <div class="reply-list-wrapper">
          <div
            class="reply-item"
            v-for="(replyItem, replyIndex) in commentItem.replies.slice(0, 3)"
            :key="replyIndex"
          >
            <div class="userinfo-wrapper">
              <div class="profile">
                <span class="user-avatar">
                  <img :src="replyItem.user.avatar" />
                </span>
                <span class="nickname">{{ replyItem.user.name }}</span>
                <span class="release-date">
                  {{ $d(new Date(replyItem.create_time), "long") }}
                </span>
              </div>
              <div
                class="message-btn"
                @click="showReplyOuterDialogFromReply(commentIndex, replyIndex)"
              >
                <el-button><i class="ortur-icon-message"></i></el-button>
              </div>
            </div>
            <div class="reply-detail">{{ replyItem.content }}</div>
          </div>
          <el-button
            @click="showReplyList(commentIndex)"
            class="reply-list-fold"
          >
            <span>View all replies </span>
            <span style="margin-right: 6px; color: #999">{{
              commentItem.replies ? commentItem.replies.length : 0
            }}</span>
            <i class="el-icon-right" style="color: #999"></i>
          </el-button>
        </div>
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
            <div class="reply-ref-detail" v-if="replyRow.replyType == 2">
              <span class="reply-label">回复</span>
              &nbsp;
              <span class="reply-nickname">{{
                "@" + replyRow.toNickname
              }}</span>
              &nbsp;
              <span class="reply-comment">{{ replyRow.content }}</span>
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
        <ReplyWidget
          @closeReplyModal="handleClose('inner')"
          :comment-id="currentCommentId"
        ></ReplyWidget>
      </el-dialog>
    </el-dialog>

    <el-dialog :title="replyTo" :visible.sync="outerVisible">
      <ReplyWidget
        @closeReplyModal="handleClose('outer')"
        :comment-id="currentCommentId"
      ></ReplyWidget>
    </el-dialog>
  </div>
</template>

<script>
import ReplyWidget from "@/components/Comment/ReplyWidget.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("comment");
export default {
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
    };
  },
  components: {
    ReplyWidget,
  },
  mounted() {
    let resId = parseInt(this.$route.params.thingId);
    this.$store.dispatch("comment/getCommentList", { resId: resId });
  },
  computed: {
    ...mapState(["commentList"]),
  },
  methods: {
    handleClose(space) {
      if (space == "inner") {
        this.innerVisible = false;
      } else {
        this.outerVisible = false;
      }
    },
    showReplyOuterDialog(index) {
      this.outerVisible = true;
      this.currentComment = this.commentList[index];
      this.currentCommentId = this.currentComment.id;
      this.replyTo = "reply to " + this.currentComment.user.name;
    },
    showReplyOuterDialogFromReply(commentIndex, replyIndex) {
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
      // this.replyTotalRows = this.currentComment.replies.length + "条回复";
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
        font-weight: 700;
      }
      .release-date {
        color: #999;
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
    padding: 10px;
    margin-left: 52px;
    .comment-detail {
      margin-bottom: 10px;
      font-size: 16px;
      color: #1a1a1a;
    }
    .reply-ref-detail {
      font-size: 14px;
      color: #1a1a1a;
      background: #f5f5f5;
      border-radius: 8px;
      padding: 10px 20px;
      .reply-label {
        color: #999;
      }
      .reply-nickname {
        color: #1e78f0;
      }
    }
    .reply-list-wrapper {
      background: #e8ebf4;
      padding: 10px;
      border-radius: 8px;
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
          margin: 10px 54px;
        }
      }
    }
  }
  .comment {
    width: 95%;
    margin: 20px auto;
    color: #1a1a1a;
    margin-left: 50px;
  }

  .reply-list {
    width: 95%;
    margin: 20px auto;
    padding: 0px 20px;
    border-left: 2px solid #e6e6e6;
  }
}
</style>
