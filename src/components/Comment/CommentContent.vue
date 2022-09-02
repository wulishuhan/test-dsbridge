<template>
  <div>
    <div class="userinfo-wrapper">
      <div class="profile">
        <span class="user-avatar"><img :src="comment.user.avatar" /></span>
        <span class="nickname">{{ comment.user.name }}</span>
        <span class="release-date">
          {{ $d(new Date(comment.create_time), "long") }}
        </span>
      </div>
      <div
        class="message-btn"
        @click="showReplyDialog(commentIndex, replyIndex)"
      >
        <el-button><i class="ortur-icon-message"></i></el-button>
      </div>
    </div>
    <div class="comment-pic" v-if="comment.image != '' && comment.image">
      <img :src="comment.image" />
    </div>
    <div class="comment-detail">
      {{ comment.content }}
    </div>
    <div
      class="reply-ref-detail"
      v-if="JSON.stringify(comment.refer) != '{}' && comment.refer"
    >
      <span class="reply-label">回复</span>
      &nbsp;
      <span class="reply-nickname">{{ "@" + comment.refer.user.name }}</span>
      &nbsp;
      <span class="reply-comment">{{ comment.refer.content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentContent",
  data() {
    return {};
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    showReplyDialog: {
      type: Function,
      required: true,
    },
    commentIndex: {
      type: Number,
      required: true,
    },
    replyIndex: {
      type: Number,
    },
  },
};
</script>
<style lang="scss" scoped>
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

.comment-pic {
  margin-left: 54px;
  img {
    width: 184px;
    height: 122px;
    object-fit: cover;
  }
}

.comment-detail {
  margin-left: 54px !important;
  margin: 10px auto;
  font-size: 16px;
  font-weight: 400;
  color: #1a1a1a;
}

.reply-ref-detail {
  margin-left: 54px;
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
</style>
