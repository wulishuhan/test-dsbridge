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
              <div class="center">
                <div class="title">{{ $t("design.email") }}</div>
                <div class="name">{{ userInfo.email }}</div>
                <div class="action" @click="handleChangeEmailClick">
                  {{ $t("setting.changeEmail") }}
                </div>
              </div>
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
                <div class="bindItem">
                  <div class="left">
                    <span
                      v-if="bindingInfo.switch1"
                      class="ortur-icon-facebook-light icon"
                    ></span>
                    <span v-else class="ortur-icon-facebook icon"></span>
                    <span>facebook</span>
                    <span class="username">{{ bindingInfo.username }}</span>
                    <span class="email">{{ bindingInfo.email }}</span>
                  </div>
                  <div class="right">
                    <el-switch
                      v-model="bindingInfo.switch1"
                      @change="handleSwitch1Change($event, 1)"
                    >
                    </el-switch>
                  </div>
                </div>
                <div class="bindItem">
                  <div class="left">
                    <span
                      v-if="binding.switch2"
                      class="ortur-icon-whatsapp-light icon"
                    ></span>
                    <span v-else class="ortur-icon-whats-app icon"></span>
                    <span>whatsApp</span>
                  </div>
                  <div class="right">
                    <el-switch
                      v-model="binding.switch2"
                      @change="handleSwitch1Change($event, 1)"
                    >
                    </el-switch>
                  </div>
                </div>
                <!-- <div class="bindItem">
                  <div class="left">
                    <svg
                      v-if="binding.switch3"
                      class="icon"
                      width="26"
                      height="25.43"
                      viewBox="0 0 30 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.9959 10.5007C12.2431 10.5007 9.99666 12.7472 9.99666 15.5C9.99666 18.2528 12.2431 20.4992 14.9959 20.4992C17.7487 20.4992 19.9952 18.2528 19.9952 15.5C19.9952 12.7472 17.7487 10.5007 14.9959 10.5007ZM29.9899 15.5C29.9899 13.4298 30.0087 11.3783 29.8924 9.31188C29.7761 6.91164 29.2286 4.78143 27.4734 3.02625C25.7145 1.26733 23.588 0.723523 21.1878 0.607262C19.1176 0.491 17.0661 0.509752 14.9997 0.509752C12.9295 0.509752 10.878 0.491 8.81154 0.607262C6.4113 0.723523 4.28109 1.27108 2.52592 3.02625C0.766992 4.78518 0.223188 6.91164 0.106926 9.31188C-0.00933561 11.3821 0.00941631 13.4335 0.00941631 15.5C0.00941631 17.5665 -0.00933561 19.6217 0.106926 21.6881C0.223188 24.0884 0.770742 26.2186 2.52592 27.9737C4.28484 29.7327 6.4113 30.2765 8.81154 30.3927C10.8817 30.509 12.9332 30.4902 14.9997 30.4902C17.0699 30.4902 19.1213 30.509 21.1878 30.3927C23.588 30.2765 25.7182 29.7289 27.4734 27.9737C29.2323 26.2148 29.7761 24.0884 29.8924 21.6881C30.0124 19.6217 29.9899 17.5702 29.9899 15.5ZM14.9959 23.192C10.7392 23.192 7.30389 19.7567 7.30389 15.5C7.30389 11.2433 10.7392 7.80798 14.9959 7.80798C19.2526 7.80798 22.6879 11.2433 22.6879 15.5C22.6879 19.7567 19.2526 23.192 14.9959 23.192ZM23.003 9.28938C22.0091 9.28938 21.2065 8.4868 21.2065 7.49295C21.2065 6.4991 22.0091 5.69652 23.003 5.69652C23.9968 5.69652 24.7994 6.4991 24.7994 7.49295C24.7997 7.72894 24.7534 7.96267 24.6632 8.18076C24.5731 8.39885 24.4408 8.597 24.2739 8.76388C24.107 8.93075 23.9089 9.06306 23.6908 9.15323C23.4727 9.24341 23.2389 9.28967 23.003 9.28938Z"
                        fill="url(#paint0_linear_45_907)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_45_907"
                          x1="27.0641"
                          y1="0.508638"
                          x2="1.31863"
                          y2="29.1175"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#6622CD" />
                          <stop offset="0.384895" stop-color="#D31460" />
                          <stop offset="0.700548" stop-color="#ED5035" />
                          <stop offset="1" stop-color="#F6C85B" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <span v-else class="ortur-icon-ins icon"></span>
                    <span>ins</span>
                  </div>
                  <div class="right">
                    <el-switch
                      v-model="binding.switch3"
                      @change="handleSwitch1Change($event, 1)"
                    >
                    </el-switch>
                  </div>
                </div> -->
                <div class="bindItem">
                  <div class="left">
                    <span
                      v-if="binding.switch4"
                      class="icon ortur-icon-google-light"
                      ><span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span><span class="path4"></span
                    ></span>
                    <span v-else class="ortur-icon-google icon"></span>
                    <span>google</span>
                  </div>
                  <div class="right">
                    <el-switch
                      v-model="binding.switch4"
                      @change="handleSwitch1Change($event, 1)"
                    >
                    </el-switch>
                  </div>
                </div>
                <div class="bindItem">
                  <div class="left">
                    <span
                      v-if="binding.switch5"
                      class="ortur-icon-twitter-light icon"
                    ></span>
                    <span v-else class="ortur-icon-twitter icon"></span>
                    <span>twitter</span>
                  </div>
                  <div class="right">
                    <el-switch
                      v-model="binding.switch5"
                      @change="handleSwitch1Change($event, 1)"
                    >
                    </el-switch>
                  </div>
                </div>
                <div class="bindItem">
                  <div class="left">
                    <span
                      v-if="binding.switch6"
                      class="ortur-icon-github-light icon"
                    ></span>
                    <span v-else class="ortur-icon-github icon"></span>
                    <span>github</span>
                  </div>
                  <div class="right">
                    <el-switch
                      v-model="binding.switch6"
                      @change="handleSwitch1Change($event, 1)"
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
export default {
  components: {
    ChangeEmailPassword,
    ChangeName,
  },
  data() {
    return {
      isChangeNameVisible: false,
      ChangePasswordOrEmail: false,
      isChangePasswordVisible: false,
      bindingInfo: {
        switch1: true,
        username: "hzy",
        email: "115997",
      },
      binding: {
        switch1: true,
        switch2: true,
        switch3: true,
        switch4: true,
        switch5: true,
        switch6: true,
        switch7: true,
        switch8: true,
      },
      dialogFollowersVisible: false,
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
    handleSwitch1Change(e, index) {
      console.log("e: ", e, index);
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
  }
}
</style>
