<template>
  <div class="message-container">
    <div class="message-form">
      <el-form
        :model="form"
        ref="messageForm"
        :rules="rules"
        label-width="80px"
        :label-position="'top'"
      >
        <el-form-item label="TO" prop="to">
          <el-input :disabled="true" v-model="form.to"></el-input>
        </el-form-item>
        <el-form-item label="SUBJECT" prop="subject">
          <el-input v-model="form.subject"></el-input>
        </el-form-item>
        <el-form-item label="MESSAGE" prop="message">
          <el-input v-model="form.message" type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelMessage">CANCEL</el-button>
          <el-button type="primary" @click="sendMessage"
            >SEND MESSAGE</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { postUserMessage } from "@/api/user";
export default {
  // eslint-disable-next-line
  name: "message",
  data() {
    return {
      form: {
        to: this.$route.params.userName,
        subject: "",
        message: "",
      },
      rules: {
        to: [{ required: true, message: "Please enter name", trigger: "blur" }],
        subject: [
          { required: true, message: "Please enter subject", trigger: "blur" },
        ],
        message: [
          { required: true, message: "Please enter message", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    sendMessage() {
      this.$refs.messageForm.validate((valid) => {
        if (valid) {
          postUserMessage(this.form).then(() => {
            this.$message({
              message: "message sent successfully!",
              type: "success",
            });
            this.$router.push(`/design/Designs/${this.$route.params.userId}`);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancelMessage() {
      this.form.subject = "";
      this.form.message = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.message-container {
  width: 100%;
  height: 844px;
  background-color: #f5f5f5;
}
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
@media screen and (max-width: 768px) {
  .message-form {
    width: 100%;
  }
  .el-form {
    width: 100%;
  }
}
</style>
