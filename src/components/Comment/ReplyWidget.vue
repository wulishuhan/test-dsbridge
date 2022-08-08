<template>
  <div>
    <div class="reply-widget-wrapper">
      <el-button class="el-btn-avatar"
        ><img
          :src="
            userInfo.avatar
              ? userInfo.avatar
              : 'http://dummyimage.com/300x200/96f279/FFF&text=gcfqdvmp'
          "
      /></el-button>
      <el-input
        placeholder="Add a comment"
        v-model="comment"
        class="el-input-search input-with-select"
        @keyup.native.enter="handleEnter"
      >
      </el-input>
      <el-button class="el-btn-post" @click="handlePost()">Post</el-button>
    </div>
  </div>
</template>

<script>
import { postComment } from "@/api/user";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("user");
export default {
  data() {
    return {
      comment: "",
    };
  },
  props: {
    commentId: {
      type: Number,
      default: 0,
    },
  },
  mounted() {},
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    handleEnter() {
      this.handlePost();
    },
    handlePost() {
      let resId = parseInt(this.$route.params.thingId);
      postComment({
        resourceId: resId,
        parentId: this.commentId,
        content: this.comment,
      }).then((res) => {
        console.log("post comment", res);
        this.$store.dispatch("comment/getCommentList", { resId: resId });
        this.$message({
          message: "发送成功",
          type: "success",
        });
      });

      this.comment = "";
      this.$emit("closeReplyModal");
    },
  },
};
</script>
<style lang="scss" scoped>
.reply-widget-wrapper {
  margin: 0px auto;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border: 1px solid #88bbf3 !important;
  border-radius: 4px;
  .el-input-search {
    width: 100%;
    padding-left: 50px;
    padding-right: 120px;
    border: unset;
  }
  ::v-deep .el-input__inner {
    border: none !important;
    background: unset;
  }
  .el-btn-avatar {
    padding: unset;
    z-index: 1;
    position: absolute;
    height: 34px;
    width: 34px;
    border-radius: 50%;
    top: 3px;
    left: 10px;
    color: #ffffff;
    img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
    }
  }
  .el-btn-post {
    position: absolute;
    background: #1e78f0;
    height: 34px;
    top: 3px;
    right: 30px;
    color: #ffffff;
  }
}
</style>
