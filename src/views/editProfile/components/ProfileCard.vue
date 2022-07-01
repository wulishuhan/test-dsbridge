<template>
  <div class="profile-card">
    <el-popover placement="bottom-start" width="270" trigger="click">
      <el-image
        class="profile-card-background"
        slot="reference"
        :src="backgroundUrl"
      ></el-image>
      <div style="text-align: center">
        <h3>Cover Requirements:</h3>
        <p>Minimum size: 592x292px</p>
        <p>File Types: jpeg, gif, png</p>
        <el-upload
          class="upload-demo"
          action="http://localhost:8080/user/receiveImg"
          multiple
          :on-success="backgroundFileSuccess"
          :show-file-list="false"
          :on-change="handleChange"
        >
          Upload a File
        </el-upload>
      </div>
    </el-popover>
    <el-popover placement="bottom-start" width="270" trigger="click">
      <el-image class="avatar" slot="reference" :src="avatarUrl"></el-image>
      <div style="text-align: center">
        <h3>Avatar Requirements:</h3>
        <p>Minimum size: 200x200px</p>
        <p>File Types: jpeg, gif, png</p>
        <el-upload
          class="upload-demo"
          action="http://localhost:8080/dev-api/user/receiveImg"
          multiple
          :on-success="avatarFileSuccess"
          :show-file-list="false"
          :on-change="handleChange"
        >
          Upload a File
        </el-upload>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: "ProfileCard",
  data() {
    return {
      avatarUrl: this.$store.getters.avatar,
      backgroundUrl:
        "https://cdn.thingiverse.com/site/img/default/cover/cover-9_display_small.jpg",
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  methods: {
    handleChange(file) {
      console.log("handleChange", file);
    },
    backgroundFileSuccess(res, file) {
      let objectURL = window.URL.createObjectURL(file.raw);
      this.backgroundUrl = objectURL;
      console.log("fileSuccess", res, file);
    },
    avatarFileSuccess(res, file) {
      let objectURL = window.URL.createObjectURL(file.raw);
      this.avatarUrl = objectURL;
      console.log("fileSuccess", res, file);
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-card {
  padding-bottom: 30px;
  background: #fff;
  width: 296px;
  height: 300px;
  text-align: center;
  overflow: hidden;
  border: 1px solid #e7e7e7;
  margin: 0 0 6px;
  position: relative;
  box-sizing: border-box;
  .el-popover-t {
    text-align: center;
  }
  .profile-card-background {
    width: 296px;
    height: 150px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid #248bfb;
    margin-top: 15px;
  }
}
</style>
