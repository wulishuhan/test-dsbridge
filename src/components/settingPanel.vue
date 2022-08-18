<template>
  <el-dialog :visible.sync="dialogFollowersVisible" class="followDialog">
    <el-tabs
      v-model="activeTab"
      @tab-click="handleFollowTapClick"
      class="tabsContent"
    >
      <el-tab-pane
        :label="$t('design.follower')"
        name="first"
        class="followTapPanel"
      >
        <div class="wrapper">
          <div class="left">
            <img class="img" alt="" :src="userInfo.avatar" />
            <el-upload
              class="upload-demo"
              :headers="headers"
              :on-success="handleImgUploadSuccess"
              :on-error="handleImgUploadErr"
              :before-upload="handleBeforeImgUpload"
              ref="upload"
              :action="baseURL + '/system/user/avatar'"
              :auto-upload="true"
              :show-file-list="false"
            >
              <span slot="trigger" class="choose"> 选取文件 </span>
            </el-upload>
          </div>
          <div class="right">
            <div class="top">
              <div class="title">姓名</div>
              <div class="name">{{ userInfo.nick_name }}</div>
              <div class="action" @click="handleActionClick">changeName</div>
            </div>
            <div class="center">
              <div class="title">邮箱</div>
              <div class="name">{{ userInfo.email }}</div>
              <div class="action" @click="handleActionClick">changeName</div>
            </div>
            <div class="bottom">
              <div class="title">密码</div>
              <div class="name">{{ userInfo.nick_name }}</div>
              <div class="action" @click="handleActionClick">changeName</div>
            </div>
            <div class="border"></div>
            <div class="binding">
              <div class="bindItem">
                <div class="left">facebook</div>
                <div class="right">
                  <el-switch v-model="switch1"> </el-switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('design.following')"
        name="second"
        class="followTapPanel"
      >
        222
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("user");
import { getToken } from "@/utils/auth";

export default {
  components: {},
  data() {
    return {
      switch1: false,
      dialogFollowersVisible: true,
      activeTab: "first",
      headers: {
        Authorization: getToken(),
      },
    };
  },
  mounted() {},
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    handleActionClick() {},
    handleFollowTapClick() {},
    showPanel() {
      this.dialogFollowersVisible = true;
    },
    async handleBeforeImgUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt1M = file.size / 1024 / 1024 < 1;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      // return isJPG && isLt2M;
      return isLt1M;
    },

    handleImgUploadErr(err) {
      //console.log(e)
      this.$message.error("上传失败" + err);
    },
    handleImgUploadSuccess() {
      this.$store.dispatch("user/getUserInfo").catch((e) => {
        console.log(e);
      });
      this.$message.success("上传成功");
    },
  },
};
</script>

<style scoped lang="scss">
.binding {
  border-top: 1px solid #ccc;
  margin-top: 20px;
  padding-top: 20px;
  width: 400px;
  .bindItem {
    display: flex;
    justify-content: space-between;
    .left {
    }
    .right {
    }
  }
}
.followDialog {
  ::v-deep .el-dialog {
    width: 816px;
    background: #ffffff;
    border-radius: 20px;
    .el-dialog__header {
      padding: 10px;
    }
  }
  ::v-deep .tabsContent {
    top: -165px;
    padding: 0 64px;
  }
  ::v-deep .el-dialog__body {
    padding: 0 0 30px 0;
  }
  top: -65px;
}
.wrapper {
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  display: flex;
  /* justify-content: space-around; */
}

.left {
  display: flex;
  margin-right: 63px;
  align-items: center;
  flex-direction: column;
  .upload-demo {
    margin-top: 10px;
    .choose {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #999999;
    }
  }
  .img {
    margin-top: 10px;
    width: 129px;
    height: 129px;
    border-radius: 50%;
  }
}
.right {
  .top {
  }
  .center {
    margin-top: 62px;
  }
  .bottom {
    margin-top: 62px;
  }
  .title {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
  }
  .name {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #1a1a1a;
    margin-top: 15px;
  }
  .action {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #1e78f0;
    margin-top: 15px;
  }
}
</style>
