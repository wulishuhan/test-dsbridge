<template>
  <div class="comment-card">
    <div class="comment-info">
      <el-avatar :src="comment.avatar" :size="50"></el-avatar>
      <div class="info">
        <a>{{ comment.name }}</a>
        <p>{{ comment.publicTime }}</p>
      </div>
    </div>
    <div class="post-comment">
      <p>
        {{ comment.comment }}
      </p>
    </div>
    <div class="comment-button">
      <el-button @click="viewComment(comment)">
        {{ isShowSubComment ? "close replies" : "view replies" }}
      </el-button>
      <el-button type="primary" @click="reply(comment.name)">Reply</el-button>
    </div>
    <div v-if="isReply" class="reply-comment-post">
      <el-input type="textarea" :rows="2" v-model="text"> </el-input>
      <div class="justify-content-button">
        <el-button :size="'small'" @click="cancelComment">
          Cancel Comment
        </el-button>
        <el-button type="primary" :size="'small'" @click="postComment(comment)">
          Post Comment
        </el-button>
      </div>
    </div>
    <div class="subComments" v-for="item in subComments" :key="item.id">
      <div class="sub-comment-header">
        <el-avatar :src="item.avatar" :size="50"></el-avatar>
        <div class="">
          <a>{{ item.name }} to {{ item.replyName }}</a>
          <p>{{ item.publicTime }}</p>
        </div>
      </div>
      <div class="post-comment">
        <p>
          {{ item.comment }}
        </p>
        <div class="justify-content-button">
          <el-button type="primary" @click="subReply(item)"> Reply </el-button>
        </div>
      </div>
      <div v-if="item.id === currentReply" class="sub-comment-reply-item">
        <el-input type="textarea" :rows="2" v-model="text"> </el-input>
        <div class="justify-content-button">
          <el-button :size="'small'" @click="cancelSubComment">
            Cancel Comment
          </el-button>
          <el-button
            type="primary"
            :size="'small'"
            @click="replyComment(item.name)"
          >
            Post Comment
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { addUserComments } from "@/api/thing";
export default {
  name: "CommentCard",
  props: ["comment"],
  data() {
    return {
      isReply: false,
      isSubReply: false,
      subComments: [],
      text: "",
      currentReply: "",
      currentReplyInfo: {},
      isShowSubComment: false,
      bufferSubComments: [],
    };
  },
  mounted() {
    this.generateSubComments(this.comment);
    console.log("this.comment", this.comment);
  },
  methods: {
    viewComment() {
      this.isShowSubComment = !this.isShowSubComment;
      if (this.isShowSubComment) {
        this.subComments = this.bufferSubComments;
      } else {
        this.subComments = [];
      }
    },
    generateSubComments(root) {
      if (!root.children || root.children.length < 1) {
        return;
      }
      for (let index = 0; index < root.children.length; index++) {
        root.children[index].replyName = root.name;
        this.bufferSubComments.push(root.children[index]);
        this.generateSubComments(root.children[index]);
      }
    },
    reply() {
      this.isReply = true;
    },
    cancelComment() {
      this.isReply = false;
      this.text = "";
    },
    postComment(comment) {
      // data传递数据需要修改，应该传 uid、pid、thingId
      let data = {
        id: Math.random(),
        name: this.$store.getters.name,
        replyName: this.comment.name,
        publicTime: new Date(),
        comment: this.text,
        avatar: this.$store.getters.avatar,
        uid: this.$store.getters.userId,
        pid: comment.id,
        thingId: this.$route.params.thingId,
      };
      this.currentReply = -1;
      this.subComments = this.bufferSubComments;
      this.subComments.push(data);
      this.text = "";
      this.isShowSubComment = true;
      this.isReply = false;
      addUserComments(data).then((res) => {
        this.$message({
          message: "comment successfully!",
          type: "success",
        });
        console.log("ok!", res);
      });
    },
    subReply(info) {
      this.isSubReply = true;
      this.currentReplyInfo = info;
      this.currentReply = info.id;
    },
    cancelSubComment() {
      this.currentReply = -1;
      this.text = "";
    },
    replyComment(name) {
      this.currentReply = -1;
      this.subComments.push({
        id: Math.random(),
        name: this.$store.getters.name,
        replyName: name,
        publicTime: new Date(),
        comment: this.text,
        avatar: this.$store.getters.avatar,
      });
      this.text = "";
      this.isReply = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.comment-card {
  width: 100%;
  background-color: #fff;
  color: #555;
  margin-top: 10px;
  box-sizing: border-box;
  padding: 10px;
  .reply-comment-post {
    width: 100%;
    height: 100px;
    background-color: #fff;
    margin-top: 15px;
    border-bottom: 1px solid #ccc;
  }
  .justify-content-button {
    display: flex;
    padding: 5px;
    justify-content: flex-end;
  }
  .sub-comment-reply-item {
    width: 100%;
    height: 100px;
    background-color: #fff;
    margin-top: 15px;
    border-bottom: 1px solid #ccc;
  }
  .comment-info {
    box-sizing: border-box;
    display: flex;
    padding: 20px;
    font-size: 12px;
    .info {
      margin-left: 25px;
    }
    a {
      font-size: 18px;
      font-weight: 400;
      text-decoration: none;
    }
    p {
      position: relative;
      top: -10px;
    }
    img {
      border-radius: 25%;
      width: 50px;
      height: 50px;
    }
  }
  .post-comment {
    font-size: 12px;
    padding: 5px;
    color: #555;
    box-sizing: border-box;
  }
  .comment-button {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
  }
  .subComments {
    background-color: #ececec;
    border-bottom: solid 1px black;
    font-size: 12px;
    padding: 10px;
    .sub-comment-header {
      display: flex;
      align-items: flex-start;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
