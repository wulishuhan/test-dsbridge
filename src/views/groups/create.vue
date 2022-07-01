<template>
  <div class="container">
    <header>
      <h1>CREATE A NEW GROUP</h1>
      <h2>
        Get your group up and running by quickly filling out some basic
        information
      </h2>
      <ul>
        <li>Join and create discussions about a variety of topics.</li>
        <li>
          Work together with other users to learn, create and share all sorts of
          Things.
        </li>
        <li>Build a community of people who share similar interests.</li>
      </ul>
    </header>
    <div style="width: 70%; margin: 0 auto">
      <el-form :rules="rules" ref="createGroupForm">
        <el-form-item label="Group Name" prop="groupName">
          <el-input v-model="form.groupName"></el-input>
        </el-form-item>
        <el-form-item label="Group URL" prop="groupUrl">
          <el-input v-model="form.groupUrl"></el-input>
        </el-form-item>
        <el-form-item label="Group Avatar">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/user/receiveImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submit">GREATE MY GROUP</el-button>
          <el-button>CANCEL</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { createGroup } from "@/api/groups";
export default {
  // eslint-disable-next-line
  name: "create",
  mounted() {},
  data() {
    return {
      form: {
        groupName: "",
        groupUrl: "",
        description: "",
        imageUrl: "",
      },
      rules: {
        groupName: [
          {
            required: true,
            message: "groupName can't be empty",
            trigger: "blur",
          },
        ],
        groupUrl: [
          {
            required: true,
            message: "groupUrl can't be empty",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "description can't be empty",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log("file", file);
      console.log("avatar", res);
      this.form.imageUrl = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submit() {
      console.log("form", this.form);
      this.$refs["createGroupForm"].validate((valid) => {
        if (valid) {
          createGroup(this.form).then((res) => {
            console.log("group", res);
            this.$message.success("create group successfully");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
header {
  background-color: #87c1fe;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  color: #fff;
}
ul {
  display: flex;
  list-style-type: none;
  flex-flow: row wrap;
}
li {
  flex: 1;
  text-align: center;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 121px;
  height: 121px;
  line-height: 121px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin-top: 50px;
}
.avatar {
  width: 121px;
  height: 121px;
  display: block;
  border-radius: 50%;
}
</style>
