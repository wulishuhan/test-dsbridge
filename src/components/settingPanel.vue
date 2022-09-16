<template>
  <div>
    <el-dialog :visible.sync="dialogFollowersVisible" class="followDialog">
      <el-tabs
        v-model="activeTab"
        @tab-click="handleFollowTapClick"
        class="tabsContent"
      >
        <el-tab-pane
          :label="$t('design.Account')"
          name="first"
          class="followTapPanel"
        >
          <div class="wrapper">
            <div class="left">
              <img
                class="img"
                alt=""
                v-if="userInfo.avatar && userInfo.avatar.length > 0"
                :src="userInfo.avatar"
              />
              <img class="img" v-else :src="defaultAvatar" />
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
                <span slot="trigger" class="choose">
                  {{ $t("design.chooseImg") }}
                </span>
              </el-upload>
            </div>
            <div class="right">
              <div class="top">
                <div class="title">{{ $t("design.name") }}</div>
                <div class="name">{{ userInfo.nick_name }}</div>
                <div class="action" @click="handleChangeNameClick">
                  {{ $t("setting.changeName") }}
                </div>
              </div>
              <!-- <div class="center">
                <div class="title">{{ $t("design.email") }}</div>
                <div class="name">{{ userInfo.email }}</div>
                <div class="action" @click="handleChangeEmailClick">
                  {{ $t("setting.changeEmail") }}
                </div>
              </div> -->
              <div class="bottom">
                <div class="title">{{ $t("design.password") }}</div>
                <div class="name">xxxxxxxxxx</div>
                <div class="action" @click="handleChangePasswordClick">
                  {{ $t("setting.changePassword") }}
                </div>
              </div>
              <div class="border"></div>

              <div class="binding">
                <div
                  style="
                    font-size: 16px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #999999;
                    margin-bottom: 30px;
                  "
                >
                  {{ $t("design.accountBinding") }}
                </div>
                <div
                  class="bindItem"
                  v-for="item in bindingInfo"
                  :key="item.id"
                >
                  <div class="left">
                    <span
                      v-if="item.switch1 && item.catalog !== 'tiktok'"
                      class="icon"
                      :class="item.iconClassLight"
                    ></span>
                    <span
                      v-if="item.switch1 && item.catalog == 'tiktok'"
                      class="ortur-icon-tiktok-light icon"
                      ><span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span
                    ></span>
                    <span
                      v-else-if="!item.switch1"
                      class="icon"
                      :class="item.iconClass"
                    ></span>
                    <span>{{ item.catalog }}</span>
                    <span class="username">{{
                      item.username ? "item.username" : ""
                    }}</span>
                    <span class="email">{{ item.email }}</span>
                  </div>
                  <div class="right">
                    <el-switch
                      v-model="item.switch1"
                      @change="handleSwitch1Change(item.switch1, item)"
                    >
                    </el-switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('design.private')"
          name="second"
          class="followTapPanel"
        >
          222
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <ChangeEmailPassword
      @handleClose="isChangePasswordVisible = false"
      :visible="isChangePasswordVisible"
      :ChangePasswordOrEmail="ChangePasswordOrEmail"
    ></ChangeEmailPassword>
    <ChangeName
      @handleClose="isChangeNameVisible = false"
      :visible="isChangeNameVisible"
    ></ChangeName>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("user");
import { getToken } from "@/utils/auth";
import ChangeEmailPassword from "@/components/ChangeEmailPassword.vue";
import ChangeName from "@/components/ChangeName.vue";
import { unbindThird, getUserInfo } from "@/api/user";
import { generatorDefaultAvator } from "@/utils/generateImage.js";

export default {
  components: {
    ChangeEmailPassword,
    ChangeName,
  },
  data() {
    return {
      defaultAvatar: "",
      third_user: [],
      isChangeNameVisible: false,
      ChangePasswordOrEmail: false,
      isChangePasswordVisible: false,
      bindingInfo: {
        facebook: {
          catalog: "facebook",
          switch1: false,
          username: "",
          email: "",
          user_id: "",
          iconClassLight: "ortur-icon-facebook-light",
          iconClass: "ortur-icon-facebook",
        },
        github: {
          catalog: "github",
          user_id: "",
          switch1: false,
          username: "",
          email: "",
          iconClassLight: "ortur-icon-github-light",
          iconClass: "ortur-icon-github",
        },
        google: {
          catalog: "google",
          user_id: "",
          switch1: false,
          username: "",
          email: "",
          iconClassLight: "ortur-icon-google-light",
          iconClass: "ortur-icon-google",
        },
        // whatsApp: {
        //   catalog: "whatsApp",
        //   user_id: "",
        //   switch1: false,
        //   username: "",
        //   email: "",
        //   iconClassLight: "ortur-icon-whatsapp-light",
        //   iconClass: "ortur-icon-whats-app",
        // },
        twitter: {
          catalog: "twitter",
          user_id: "",
          switch1: false,
          username: "",
          email: "",
          iconClassLight: "ortur-icon-twitter-light",
          iconClass: "ortur-icon-twitter",
        },
        tiktok: {
          catalog: "tiktok",
          user_id: "",
          switch1: false,
          username: "",
          email: "",
          iconClassLight: "ortur-icon-tiktok-light",
          iconClass: "ortur-icon-tiktok",
        },
      },

      dialogFollowersVisible: false,
      activeTab: "first",
      headers: {
        Authorization: getToken(),
      },
    };
  },
  mounted() {
    // getUserInfo().then((e) => {
    //   this.third_user = e.data.data.third_user;
    // });
    this.defaultAvatar = generatorDefaultAvator(
      this.userInfo.nick_name,
      this.userInfo.user_id
    );
  },

  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    thirdPartyLogin(from) {
      let redirectUrl = window.location.href.split("?")[0];
      window.location.href = `https://sso.leadiffer.com/oauth/thirdParty?from=${from}&redirect_url=${redirectUrl}`;
    },
    handleSwitch1Change(willBind, item) {
      if (willBind) {
        sessionStorage.setItem("isBinding", 1);
        console.log(sessionStorage.getItem("isBinding"));
        this.thirdPartyLogin(item.catalog);
        // item.switch1 = false;
      } else {
        unbindThird({ userId: item.user_id, catalog: item.catalog })
          .then(() => {
            this.$message("unbindThird successfully");
          })
          .catch(() => {
            this.$message("unbindThird fail");
            item.switch1 = true;
          });
      }
    },
    handleChangeNameClick() {
      this.isChangeNameVisible = true;
    },
    handleChangeEmailClick() {
      this.ChangePasswordOrEmail = true;
      this.isChangePasswordVisible = true;
    },
    handleChangePasswordClick() {
      this.ChangePasswordOrEmail = false;
      this.isChangePasswordVisible = true;
    },
    handleFollowTapClick() {},
    showPanel() {
      getUserInfo().then((res) => {
        this.third_user = res.data.data.third_user;
        for (const item of this.third_user) {
          if (item.catalog) {
            this.bindingInfo[item.catalog].switch1 = true;
            this.bindingInfo[item.catalog].user_id = item.user_id;
            this.bindingInfo[item.catalog].email = item.email;
            this.bindingInfo[item.catalog].username = item.username;
            this.bindingInfo[item.catalog].catalog = item.catalog;
          }
        }
        this.headers.Authorization = getToken();
        this.dialogFollowersVisible = true;
      });
    },
    handleBeforeImgUpload() {
      // const isJPG = file.type === "image/jpeg";
      // const isLt1M = file.size / 1024 / 1024 < 1;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt1M) {
      //   this.$message.error("上传头像图片大小不能超过 1MB!");
      // }
      // return isJPG && isLt2M;
      // return isLt1M;
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
    margin-bottom: 21px;
    .left {
      display: flex;
      flex-direction: row;
      .icon {
        margin-right: 18px;
        font-size: 26px;
        width: 30px;
        height: 26px;
      }
      .username {
        margin-left: 20px;
      }
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
  top: -115px;
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
    cursor: pointer;
  }
}
</style>
