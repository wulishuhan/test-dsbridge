<template>
  <div>
    <div class="post-comment">
      <h1>Post a Comment</h1>
      <el-input type="textarea" :rows="2" v-model="text"> </el-input>
      <div class="post-comment-button">
        <el-button type="primary" :size="'small'" @click="postComment">
          Post Comment
        </el-button>
      </div>
    </div>
    <comment-card
      v-for="item in comments"
      :key="item.id"
      :comment="item"
    ></comment-card>
  </div>
</template>
<script>
import { addUserComments } from "@/api/thing";
import CommentCard from "./components/CommentCard";
import { getUserCommentsByThingId } from "@/api/thing";
export default {
  //eslint-disable-next-line
  name: "Comments",
  components: { CommentCard },
  data() {
    return {
      text: "",
      comments: [],
      commentList: [],
    };
  },
  mounted() {
    getUserCommentsByThingId({
      thingId: this.$route.params.thingId,
    }).then((res) => {
      this.commentList = res.data.data;
      this.generateTree("0", null);
      for (let i = 0; i < this.commentList.length; i++) {
        if (this.commentList[i].pid === "0") {
          this.comments.push(this.commentList[i]);
        }
      }
    });
  },
  methods: {
    postComment() {
      let data = {
        id: Math.random(),
        pid: 0,
        uid: this.$store.getters.userId,
        name: this.$store.getters.name,
        publicTime: new Date(),
        comment: this.text,
        avatar: this.$store.getters.avatar,
      };
      addUserComments(data).then((res) => {
        console.log(res);
        this.$message({
          message: "comment successfully!",
          type: "success",
        });
        this.comments.push(data);
        this.text = "";
      });
    },
    generateTree(pid, parent) {
      for (let i = 0; i < this.commentList.length; i++) {
        if (this.commentList[i].pid === pid) {
          if (parent) {
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(this.commentList[i]);
          }
          this.generateTree(this.commentList[i].id, this.commentList[i]);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.post-comment {
  width: 100%;
  background-color: #fff;
  h1 {
    font-size: 18px;
    font-weight: 400;
    color: #555;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .el-input {
    height: 200px;
  }
  .el-button {
    margin-top: 10px;
  }
  .post-comment-button {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
  }
}
</style>
