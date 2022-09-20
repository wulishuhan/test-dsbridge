<template>
  <div>
    <el-dialog
      width="396px"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :title="
        !ChangePasswordOrEmail
          ? $t('setting.changePassword')
          : $t('setting.changeEmail')
      "
    >
      <div v-show="!isLogin">
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
              <!-- <div class="forget" @click="handleClickForget">
                {{ $t("setting.forgetPassword") }}
              </div> -->
              <div></div>
              <el-button @click="changePassword('registerForm')">{{
                $t("setting.submit")
              }}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="isLogin">
        <el-form :model="loginForm" ref="loginForm" :rules="rules">
          <el-form-item prop="email">
            <el-input
              v-model="loginForm.email"
              autocomplete="off"
              :placeholder="$t('setting.newEmail')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
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
              <el-button @click="changeEmail('loginForm')">{{
                $t("setting.submit")
              }}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-dialog width="396px" :visible.sync="innerVisible" append-to-body>
        <div class="loading-box" v-loading="loading"></div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import { changePassword } from "@/api/setting.js";
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
  },
  computed: {
    dialogVisible: function () {
      return this.visible;
    },
    isLogin: function () {
      return this.ChangePasswordOrEmail;
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
      loginFormTip: "",
      registerFormTip: "",
      loginForm: {
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
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
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
      this.$emit("handleClickForget");
    },
    handleEnter() {
      this.login("loginForm");
    },

    changeEmail(formName) {
      this.$refs[formName].validate((valid) => {
        this.loginForm.username = this.loginForm.email;
        if (valid) {
          this.innerVisible = true;
          this.$store
            .dispatch("user/login", {
              loginForm: this.loginForm,
            })
            .then(() => {
              this.innerVisible = false;
              this.handleClose();
            })
            .catch((error) => {
              this.$message.error(error.msg);
              this.innerVisible = false;
            });
        } else {
          console.log("error submit!!");
          return false;
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
