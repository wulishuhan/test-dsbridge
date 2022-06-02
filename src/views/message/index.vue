<template>
  <div class="message-container">
    <div class="message-form">
      <el-form label-width="80px" :label-position="'top'">
        <el-form-item label="TO">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="SUBJECT">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="MESSAGE">
          <el-input type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>CANCEL</el-button>
          <el-button>SEND MESSAGE</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line
  name: "message",
};
</script>
<style lang="scss" scoped>
.message-container {
  width: 100%;
  height: 844px;
  background-color: #f5f5f5;
  .message-form {
    background-color: #fff;
    width: 970px;
    margin: 0 auto;
    position: relative;
    top: 15px;
  }
  .el-form {
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
