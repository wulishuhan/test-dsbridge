<template>
  <div class="comment-wrapper">
    <div v-for="(commentItem, index) in commentList" :key="index">
      <div class="userinfo-wrapper">
        <div class="profile">
          <span class="user-avatar"><img :src="commentItem.fromAvatar" /></span>
          <span class="nickname">{{ commentItem.fromNickname }}</span>
          <span class="release-date">{{ commentItem.datetime }}</span>
        </div>
        <div class="message-btn" @click="outerVisible = true">
          <el-button><i class="ortur-icon-message"></i></el-button>
        </div>
        <el-dialog :title="replyTo" :visible.sync="outerVisible">
          <ReplyWidget></ReplyWidget>
        </el-dialog>
      </div>
      <div class="reply-wrapper">
        <div class="reply-detail">{{ commentItem.comment }}</div>
        <el-button @click="showReplyList(index)">
          <span style="color: #aaa">reply &nbsp;</span>
          <span style="margin-right: 10px">{{
            commentItem.replyList.length
          }}</span>
          <i class="ortur-icon-arrow-down"></i>
        </el-button>
      </div>
    </div>
    <el-dialog :title="replyTotalRows" :visible.sync="replyListDialog">
      <div v-for="(replyRow, id) in currentComment.replyList" :key="id">
        <div class="userinfo-wrapper">
          <div class="profile">
            <span class="user-avatar"
              ><img src="http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj"
            /></span>
            <span class="nickname">{{ replyRow.fromNickname }}</span>
            <span class="release-date">{{ replyRow.datetime }}</span>
          </div>
          <div class="message-btn" @click="innerVisible = true">
            <el-button><i class="ortur-icon-message"></i></el-button>
          </div>
        </div>
        <div class="reply-wrapper">
          <div class="reply-detail">{{ replyRow.comment }}</div>
        </div>
      </div>
      <el-dialog
        :title="replyTo"
        :visible.sync="innerVisible"
        append-to-body
        top="35vh"
      >
        <ReplyWidget></ReplyWidget>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { getCommentList } from "@/api/user";
import ReplyWidget from "@/components/Comment/ReplyWidget.vue";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
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
      console.log(res.data.data.avatar);
      that.commentList = res.data.data;
    });
  },
  computed: {},
  methods: {
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
        color: #aaa;
      }
    }
  }
  .reply-wrapper {
    padding: 20px 62px;
    .reply-detail {
      margin-bottom: 10px;
    }
  }
}
</style>
