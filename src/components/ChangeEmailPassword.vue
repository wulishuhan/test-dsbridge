<template>
  <div>
    <el-dialog
      width="396px"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :title="title"
    >
      <div v-show="!isLogin && !forgetPasswordVisible">
        <el-form :model="registerForm" :rules="rules" ref="registerForm">
          <el-form-item prop="currentPassword">
            <el-input
              v-model="registerForm.currentPassword"
              autocomplete="off"
              :placeholder="$t('setting.currentPassword')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password1">
            <el-input
              type="password"
              v-model="registerForm.password1"
              autocomplete="off"
              :placeholder="$t('setting.newPassword')"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input
              type="password"
              v-model="registerForm.password2"
              autocomplete="off"
              :placeholder="$t('setting.confirmPassword')"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="submit">
              <div class="forget" @click="handleClickForget">
                {{ $t("setting.forgetPassword") }}
              </div>
              <div></div>
              <el-button @click="changePassword('registerForm')">{{
                $t("setting.submit")
              }}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="isLogin && !forgetPasswordVisible">
        <el-form :model="changeEmailForm" ref="changeEmailForm" :rules="rules">
          <el-form-item>
            <span style="color: #999">
              We'll send an email to your new address with
              <br />
              instructions on completing the change
            </span>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              v-model="changeEmailForm.email"
              autocomplete="off"
              :placeholder="$t('setting.newEmail')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="changeEmailForm.password"
              autocomplete="off"
              :placeholder="$t('setting.confirmPassword')"
              show-password
              @keyup.enter.native="handleEnter"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="submit">
              <div class="forget" @click="handleClickForget">
                {{ $t("setting.forgetPassword") }}
              </div>
              <el-button @click="changeEmail('changeEmailForm')">{{
                $t("setting.submit")
              }}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="forgetPasswordVisible">
        <h2 style="text-align: center">Change Password</h2>
        <span>
          Change Password We' II sent an email to {{ email }} with instructions
          to reset your password!
        </span>
      </div>
      <el-dialog width="396px" :visible.sync="innerVisible" append-to-body>
        <div class="loading-box" v-loading="loading"></div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import { changePassword, changeEmail } from "@/api/setting.js";
import { resetPasswordSendEmail } from "@/api/user.js";
export default {
  name: "ChangePassword",
  props: {
    ChangePasswordOrEmail: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: "",
    },
  },
  computed: {
    dialogVisible: function () {
      return this.visible;
    },
    isLogin: function () {
      return this.ChangePasswordOrEmail;
    },
    title: function () {
      if (this.forgetPasswordVisible) {
        return "";
      }
      return !this.ChangePasswordOrEmail
        ? this.$t("setting.changePassword")
        : this.$t("setting.changeEmail");
    },
  },
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error(this.$t("setting.inputPassword")));
      } else {
        if (this.registerForm.currentPassword !== "") {
          this.$refs.registerForm.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error(this.$t("setting.inputPasswordAgain")));
      } else if (value !== this.registerForm.password1) {
        callback(new Error(this.$t("setting.PasswordNoSame")));
      } else {
        callback();
      }
    };
    return {
      forgetPasswordVisible: false,
      changeEmailFormTip: "",
      registerFormTip: "",
      changeEmailForm: {
        username: "",
        password: "",
        email: "",
      },
      registerForm: {
        username: "",
        password2: "",
        password1: "",
        currentPassword: "",
      },
      innerVisible: false,
      loading: true,
      show: true,
      rules: {
        email: [
          {
            required: true,
            message: this.$t("setting.email"),
            trigger: "blur",
          },
          {
            min: 5,
            max: 50,
            message: this.$t("setting.emailLengthLimit"),
            trigger: "blur",
          },
          {
            type: "email",
            message: this.$t("setting.emailErrorInput"),
            trigger: ["blur", "change"],
          },
        ],
        username: [
          {
            required: true,
            message: this.$t("setting.username"),
            trigger: "blur",
          },
          {
            min: 5,
            max: 50,
            message: this.$t("setting.usernameLengthLimit"),
            trigger: "blur",
          },
        ],
        currentPassword: [
          {
            required: true,
            message: this.$t("setting.currentPasswordRequired"),
            trigger: "blur",
          },
          {
            min: 5,
            max: 20,
            message: this.$t("setting.PasswordLen"),
            trigger: "blur",
          },
        ],
        password1: [{ validator: validatePass1, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
      },
      activeIcon: "",
    };
  },
  methods: {
    handleClickForget() {
      this.forgetPasswordVisible = true;
      // 此处发送邮件的请求
      // this.$emit("handleClickForget");
      resetPasswordSendEmail({ email: this.email });
      console.log("email send ");
    },
    handleEnter() {
      this.login("changeEmailForm");
    },

    changeEmail(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changeEmail({
            newEmail: this.changeEmailForm.email,
            oldPassword: this.changeEmailForm.password,
          }).then((res) => {
            console.log("--------------------------------", res);
            this.$message({
              message: this.$t("setting.changeEmailSuccess"),
              type: "success",
            });
            this.handleClose();
          });
        }
      });
    },
    changePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.registerForm);
          changePassword({
            newPassword: this.registerForm.password1,
            oldPassword: this.registerForm.currentPassword,
          })
            .then(() => {
              this.$message({
                type: "success",
                message: this.$t("design.updSuccess"),
              });
              this.handleClose();
            })
            .catch((err) => {
              this.$message({
                type: "warning",
                message: err.msg,
              });
            });
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.forgetPasswordVisible = false;
      this.$emit("handleClose");
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-dialog {
  width: 464px;
  background: #ffffff;
  border-radius: 10px;
  .el-dialog__body {
    padding: 20px;
  }
  .el-dialog__body {
    font-size: 16px;
  }
  .el-dialog__title {
    margin-left: 20px;
  }
}
.submit {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  .el-button {
    width: 104px;
    height: 40px;
    background: #1e78f0;
    border-radius: 6px;
    font-size: 14px;
  }
}
.forget {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #1e78f0;
}

.loading-box {
  width: 100%;
  height: 198px;
}
.login-text-nav {
  display: flex;
  flex-direction: column;
}

.el-button {
  background: #1e78f0;
  color: #fff;
  font-size: 18px;
  font-weight: 200;
  border-radius: 5px;
}
::v-deep .el-input__inner {
  height: 48px;
  width: 312px;
  font-size: 16px;
  font-weight: 200;
}
::v-deep .el-dialog {
  border-radius: 15px;
  font-weight: 400;
  font-family: Source Han Sans CN;
}
.login-text {
  font-size: 15px;
  color: #000;
  text-align: center;
}

.el-form-item {
  margin-bottom: 18px;
}
.el-form-item__content {
  line-height: 36px;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: #1e78f0;
}
::v-deep .el-form {
  width: 312px;
  margin: 0 auto;
}
::v-deep .el-dialog__headerbtn .el-dialog__close {
  font-size: 11px;
  color: #000;
  border-radius: 15px;
}
::v-deep .el-form-item__error {
  margin-top: 5px;
  position: relative;
}
</style>
