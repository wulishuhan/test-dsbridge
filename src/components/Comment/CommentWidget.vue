<template>
  <div class="comment-wrapper">
    <div v-for="(item, index) in commentList" :key="index">
      <div class="userinfo-wrapper">
        <div class="profile">
          <span class="user-avatar"
            ><img src="http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj"
          /></span>
          <span class="nickname">{{ item.nickname }}</span>
          <span class="release-date">{{ item.release_date }}</span>
        </div>
        <div class="message-btn" @click="outerVisible = true">
          <el-button><i class="ortur-icon-message"></i></el-button>
        </div>
        <el-dialog :title="replyTo" :visible.sync="outerVisible">
          <ReplyWidget></ReplyWidget>
        </el-dialog>
      </div>
      <div class="reply-wrapper">
        <div class="reply-detail">{{ item.comment }}</div>
        <el-button @click="showReplyList(index)">
          <span style="color: #aaa">reply</span>
          <span style="margin-right: 10px">{{ item.replyList.length }}</span>
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
            <span class="nickname">{{ replyRow.nickname }}</span>
            <span class="release-date">{{ replyRow.release_date }}</span>
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
import { getInfo } from "@/api/user";
import ReplyWidget from "@/components/Comment/ReplyWidget.vue";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      outerVisible: false,
      innerVisible: false,
      replyListDialog: false,
      replyTotalRows: "12",
      currentComment: {},
      replyTo: "reply to xxxx",
      keywords: "",
      select: "",
      commentList: [
        {
          avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
          nickname: "Rubik's cube",
          release_date: "2 days ago",
          comment: "How to download this file1",
          replyList: [
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
          ],
        },
        {
          avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
          nickname: "Rubik's cube",
          release_date: "2 days ago",
          comment: "How to download this file2",
          replyList: [
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
          ],
        },
        {
          avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
          nickname: "Rubik's cube",
          release_date: "2 days ago",
          comment: "How to download this file3",
          replyList: [
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
          ],
        },
        {
          avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
          nickname: "Rubik's cube",
          release_date: "2 days ago",
          comment: "How to download this file4",
          replyList: [
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
            {
              avatar: "http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj",
              nickname: "Rubik's cube",
              release_date: "2 days ago",
              comment: "How to download this file",
            },
          ],
        },
      ],
    };
  },
  components: {
    ReplyWidget,
  },
  mounted() {
    getInfo().then(function (res) {
      console.log(res.data.data.avatar);
    });
  },
  methods: {
    showReplyList(index) {
      console.log(index);
      this.replyListDialog = true;
      this.currentComment = this.commentList[index];
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
        width: 30px;
        height: 30px;
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
