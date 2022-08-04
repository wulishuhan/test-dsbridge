<template>
  <div class="comment-wrapper">
    <div v-for="(commentItem, index) in commentList" :key="index">
      <div class="userinfo-wrapper">
        <div class="profile">
          <span class="user-avatar"><img :src="commentItem.fromAvatar" /></span>
          <span class="nickname">{{ commentItem.fromNickname }}</span>
          <span class="release-date">{{ commentItem.datetime }}</span>
        </div>
        <div class="message-btn" @click="showReplyOuterDialog(index)">
          <el-button><i class="ortur-icon-message"></i></el-button>
        </div>
      </div>
      <div class="reply-wrapper">
        <div class="comment-detail">{{ commentItem.comment }}</div>
        <div class="reply-list-wrapper">
          <el-button @click="showReplyList(index)" class="reply-list-fold">
            <span>View all replies </span>
            <span style="margin-right: 6px; color: #999">{{
              commentItem.replyList.length
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
          <span class="user-avatar"
            ><img :src="currentComment.fromAvatar"
          /></span>
          <span class="nickname">{{ currentComment.fromNickname }}</span>
          <span class="release-date">{{ currentComment.datetime }}</span>
        </div>
        <div class="message-btn" @click="showCommentInnerDialog()">
          <el-button><i class="ortur-icon-message"></i></el-button>
        </div>
      </div>
      <div class="reply-list">
        <div v-for="(replyRow, id) in currentComment.replyList" :key="id">
          <div class="userinfo-wrapper">
            <div class="profile">
              <span class="user-avatar"
                ><img src="http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj"
              /></span>
              <span class="nickname">{{ replyRow.fromNickname }}</span>
              <span class="release-date">{{ replyRow.datetime }}</span>
            </div>
            <div class="message-btn" @click="showReplyInnerDialog(id)">
              <el-button><i class="ortur-icon-message"></i></el-button>
            </div>
          </div>
          <div class="reply-wrapper">
            <div class="comment-detail">{{ replyRow.comment }}</div>
            <div class="reply-ref-detail" v-if="replyRow.replyType == 2">
              <span class="reply-label">回复</span>
              &nbsp;
              <span class="reply-nickname">{{
                "@" + replyRow.toNickname
              }}</span>
              &nbsp;
              <span class="reply-comment">{{ replyRow.refComment }}</span>
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
        <ReplyWidget @closeReplyModal="handleClose('inner')"></ReplyWidget>
      </el-dialog>
    </el-dialog>

    <el-dialog :title="replyTo" :visible.sync="outerVisible">
      <ReplyWidget @closeReplyModal="handleClose('outer')"></ReplyWidget>
    </el-dialog>
  </div>
</template>

<script>
import { getCommentList } from "@/api/user";
import ReplyWidget from "@/components/Comment/ReplyWidget.vue";
export default {
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      replyListDialog: false,
      currentComment: {},
      replyTotalRows: "0条回复",
      replyTo: "reply to xxxx",
      keywords: "",
      select: "",
      commentList: [],
    };
  },
  components: {
    ReplyWidget,
  },
  mounted() {
    var that = this;
    getCommentList().then(function (res) {
      that.commentList = res.data.data;
    });
  },
  computed: {},
  methods: {
    handleClose(space) {
      if (space == "inner") {
        this.innerVisible = false;
      } else {
        this.outerVisible = false;
      }
      getCommentList().then((res) => {
        this.commentList = res.data.data;
      });
    },
    showReplyOuterDialog(index) {
      this.outerVisible = true;
      this.currentComment = this.commentList[index];
      this.replyTo = "reply to " + this.currentComment.fromNickname;
    },
    showCommentInnerDialog() {
      this.innerVisible = true;
      this.replyTo = "reply to " + this.currentComment.fromNickname;
    },
    showReplyInnerDialog(replyIndex) {
      this.innerVisible = true;
      this.replyTo =
        "reply to " + this.currentComment.replyList[replyIndex].fromNickname;
    },
    showReplyList(index) {
      console.log(index);
      this.replyListDialog = true;
      this.currentComment = this.commentList[index];
      this.replyTotalRows = this.currentComment.replyList.length + "条回复";
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
    padding: 20px 62px;
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
    }
  }

  .reply-list {
    width: 95%;
    margin: 20px auto;
    padding: 0px 20px;
    border-left: 2px solid #e6e6e6;
  }
}
</style>
