<template>
  <div class="post-comment">
    <h1>Post a Comment</h1>
    <el-input type="textarea" autosize v-model="text"> </el-input>
    <el-button type="primary" :size="'small'">Post Comment</el-button>
  </div>
</template>
<script>
export default {
  name: "PostComment",
  data() {
    return {
      text: "",
    };
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
}
</style>
