<template>
  <div>
    <el-dialog
      width="528px"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      @opened="handleOpen"
      append-to-body
    >
      <div v-show="!isLogin && !isThirdPartyRegisterForm">
        <el-form :model="registerForm" :rules="rules" ref="registerForm">
          <el-form-item>
            <div class="continue-with">Continue with</div>
            <div class="icon-box">
              <a @click="thirdPartyLogin('facebook')">
                <i class="ortur-icon-facebook icon"></i>
              </a>
              <a @click="thirdPartyLogin('github')">
                <i class="ortur-icon-github icon"></i>
              </a>
              <a @click="thirdPartyLogin('tiktok')">
                <i class="ortur-icon-tiktok icon"></i>
              </a>
              <a @click="thirdPartyLogin('google')">
                <i class="ortur-icon-google icon"></i>
              </a>
              <a>
                <i class="ortur-icon-apple icon disabled-icon"></i>
              </a>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="or">or</div>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              v-model="registerForm.email"
              autocomplete="off"
              placeholder="Email"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password1">
            <el-input
              type="password"
              v-model="registerForm.password"
              autocomplete="off"
              placeholder="Password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input
              type="password"
              v-model="registerForm.password2"
              autocomplete="off"
              placeholder="Password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="createAccount('registerForm')"
              >Create Account</el-button
            >
          </el-form-item>
          <el-form-item>
            <div class="privacy-text-box">
              <span class="login-text">
                Already have an account?
                <a @click="switchLoginAndRegister('login')"> &nbsp; Log in </a>
              </span>
              <span class="login-text privacy-text">
                By clicking "Create account", I agree to ORTUR's
                <a href="#">Privacy policy</a>
                .
              </span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="isLogin && !isThirdPartyRegisterForm">
        <el-form :model="loginForm" ref="loginForm" :rules="rules">
          <el-form-item>
            <div class="continue-with">Continue with</div>
            <div class="icon-box">
              <a
                @click="thirdPartyLogin('facebook')"
                @mouseenter="enter('facebook')"
                @mouseleave="leave"
              >
                <i
                  class="ortur-icon-facebook icon"
                  :class="[
                    activeIcon === 'facebook'
                      ? 'ortur-icon-facebook-light'
                      : '',
                  ]"
                ></i>
              </a>
              <a
                @click="thirdPartyLogin('github')"
                @mouseenter="enter('github')"
                @mouseleave="leave"
              >
                <i
                  class="ortur-icon-github icon"
                  :class="[
                    activeIcon === 'github' ? 'ortur-icon-github-light' : '',
                  ]"
                ></i>
              </a>
              <a
                @click="thirdPartyLogin('tiktok')"
                @mouseenter="enter('tiktok')"
                @mouseleave="leave"
              >
                <i
                  class="ortur-icon-tiktok icon"
                  v-if="activeIcon !== 'tiktok'"
                ></i>
                <span v-else class="ortur-icon-tiktok-light icon"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span
                ></span>
              </a>
              <a
                @click="thirdPartyLogin('google')"
                @mouseenter="enter('google')"
                @mouseleave="leave"
              >
                <i
                  v-if="activeIcon !== 'google'"
                  class="ortur-icon-google icon"
                ></i>
                <span v-else class="ortur-icon-google-light icon"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span><span class="path4"></span
                ></span>
              </a>
              <a>
                <i class="ortur-icon-apple icon disabled-icon"></i>
              </a>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="or">or</div>
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              v-model="loginForm.email"
              autocomplete="off"
              placeholder="Email"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              autocomplete="off"
              placeholder="Password"
              show-password
              @keyup.enter.native="handleEnter"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login('loginForm')">Log in</el-button>
          </el-form-item>
          <el-form-item>
            <div class="login-text-nav">
              <span class="login-text">
                Forget password?
                <a href="#">&nbsp; Reset it</a>
              </span>
              <span class="login-text">
                No account?
                <a @click="switchLoginAndRegister('register')">Create one</a>
              </span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="isThirdPartyRegisterForm">
        <el-form
          :model="registerForm"
          :rules="rules"
          ref="thirdPartyRegisterForm"
        >
          <el-form-item>
            <div class="continue-with">Complete your information</div>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              v-model="registerForm.email"
              autocomplete="off"
              placeholder="Email"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password1">
            <el-input
              type="password"
              v-model="registerForm.password"
              autocomplete="off"
              placeholder="Password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input
              type="password"
              v-model="registerForm.password2"
              autocomplete="off"
              placeholder="Password"
              show-password
            ></el-input> </el-form-item
          >ortur-icon-apple
          <el-form-item>
            <el-button @click="thridPartyAccountBind('thirdPartyRegisterForm')">
              Complete
            </el-button>
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
import { bindThird } from "@/api/user";
export default {
  props: {
    loadLoginDialog: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    isThirdPartyRegisterForm: { type: Boolean, default: false },
    openLoginInfo: { type: Number, default: 0 },
  },
  computed: {
    dialogVisible: function () {
      return this.visible;
    },
    isLogin: function () {
      return this.loadLoginDialog;
    },
    openLoginMsg: function () {
      return this.openLoginInfo;
    },
  },
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("login.password")));
      } else {
        if (this.registerForm.password !== "") {
          this.$refs.registerForm.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("login.password")));
      } else if (value !== this.registerForm.password) {
        callback(new Error(this.$t("login.passwordDifferent")));
      } else {
        callback();
      }
    };
    var validateUserName = (rule, value, callback) => {
      let { email } = this.$route.query;
      if (this.thirdPartyFormTip != "") {
        callback(new Error(this.thirdPartyFormTip));
        this.thirdPartyFormTip = "";
      }
      if (this.loginFormTip != "") {
        callback(new Error(this.loginFormTip));
        this.loginFormTip = "";
      }
      if (this.registerFormTip != "") {
        callback(new Error(this.registerFormTip));
        this.registerFormTip = "";
      }
      if (this.openLoginMsg === 1020) {
        if (this.isComplete) {
          callback();
        } else {
          callback(new Error(this.$t("login.openLoginRegisterFirst")));
        }
      }
      if (this.openLoginMsg === 1021) {
        if (email === value) {
          callback(new Error(this.$t("login.openLoginLoginFirst")));
        } else {
          callback();
        }
      }
      callback();
    };
    return {
      isComplete: false,
      loginFormTip: "",
      registerFormTip: "",
      loginForm: {
        username: "",
        password: "",
        email: "",
      },
      registerForm: {
        username: "",
        password: "",
        password2: "",
        email: "",
      },
      innerVisible: false,
      loading: true,
      show: true,
      rules: {
        email: [
          { required: true, message: this.$t("login.email"), trigger: "blur" },
          {
            min: 5,
            max: 50,
            message: this.$t("login.emailLengthLimit"),
            trigger: "blur",
          },
          {
            type: "email",
            message: this.$t("login.emailErrorInput"),
            trigger: ["blur", "change"],
          },
          {
            validator: validateUserName,
            trigger: ["blur", "change"],
          },
        ],
        username: [
          {
            required: true,
            message: this.$t("login.username"),
            trigger: "blur",
          },
          {
            min: 5,
            max: 20,
            message: this.$t("login.usernameLengthLimit"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("login.password"),
            trigger: "blur",
          },
          {
            min: 5,
            max: 20,
            message: this.$t("login.passwordLengthLimit"),
            trigger: "blur",
          },
        ],
        password1: [{ validator: validatePass1, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
      },
      activeIcon: "",
      thirdPartyFormTip: "",
      thirdPartyInfo: {
        userId: "",
        catalog: "",
        email: "",
      },
    };
  },
  methods: {
    handleEnter() {
      this.login("loginForm");
    },
    switchLoginAndRegister(view) {
      this.$emit("changeView", view);
      // if (view == "register") {
      //   this.$refs.registerForm.resetFields();
      // } else {
      //   this.$refs.loginForm.resetFields();
      // }
    },
    login(formName) {
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
              // this.$message.error(error.msg);
              this.loginFormTip = error.msg;
              this.innerVisible = false;
              this.$refs.loginForm.validateField("email");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    createAccount(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.registerForm.username = this.registerForm.email;
          this.$store
            .dispatch("user/register", {
              auto_login: true,
              client_subtype: "Windows",
              client_type: "pc",
              ...this.registerForm,
            })
            .then((res) => {
              if (res.code == 0) {
                this.handleClose();
              }
            })
            .catch((e) => {
              console.log("ee", e);
              this.registerFormTip = e.msg;
              this.$refs.registerForm.validateField("email");
            });
        } else {
          return false;
        }
      });
    },
    thridPartyAccountBind(formName) {
      this.isComplete = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.registerForm.username = this.registerForm.email;
          this.$store
            .dispatch("user/register", {
              auto_login: true,
              client_subtype: "Windows",
              client_type: "pc",
              ...this.registerForm,
            })
            .then((res) => {
              if (res.code == 0) {
                bindThird(this.thirdPartyInfo)
                  .then((res) => {
                    console.log("bindThird successfully", res);
                    this.$router.push(this.$route.path + "#");
                    this.handleClose();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((e) => {
              this.thirdPartyFormTip = e.msg;
              this.$refs.thirdPartyRegisterForm.validateField("email");
              console.log(e);
            });
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$emit("handleClose");
      this.$refs.loginForm.resetFields();
      this.$refs.registerForm.resetFields();
      this.registerForm.password = "";
      this.isComplete = false;
      // this.$refs.thirdPartyRegisterForm.resetFields();
    },
    handleOpen() {
      if (this.isThirdPartyRegisterForm) {
        let { code, from, email } = this.$route.query;
        this.thirdPartyInfo.userId = code;
        this.thirdPartyInfo.catalog = from;
        this.thirdPartyInfo.email = email;
        this.registerForm.email = email;
        this.registerForm.username = email;
      }
    },
    thirdPartyLogin(from) {
      sessionStorage.setItem("isBinding", 2);

      let redirectUrl = window.location.href.split("?")[0];
      window.location.href = `https://sso.leadiffer.com/oauth/thirdParty?from=${from}&redirect_url=${redirectUrl}`;
    },
    enter(val) {
      this.activeIcon = val;
    },
    leave() {
      this.activeIcon = "";
    },
  },
};
</script>
<style scoped>
::v-deep .path {
  stroke: #ccc !important;
}
.loading-box {
  width: 100%;
  height: 198px;
}
.login-text-nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 58px;
}
.privacy-text-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 95px;
}
.no-tips {
  width: 0px;
  height: 0px;
}
.tips {
  width: 416px;
  height: 35px;
  font-size: 15px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ff6161;
  line-height: 23px;
  margin: 30px auto -25px;
}
.no-third-tips {
  height: 35px;
}
.third-tips {
  width: 416px;
  height: 35px;
  font-size: 15px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ff6161;
  line-height: 23px;
  margin: 0px auto;
}
.continue-with {
  font-size: 20px;
  color: #1a1a1a;
  margin-top: -14px;
}
.icon {
  font-size: 32px;
  color: #000;
  cursor: pointer;
}
.icon-box {
  display: flex;
  justify-content: space-between;
  width: 273px;
  margin-top: 27px;
}
.or {
  text-align: center;
  font-size: 16px;
  color: #999;
  /* padding-top: 4px; */
}
.el-button {
  background: #1e78f0;
  color: #fff;
  width: 416px;
  height: 64px;
  font-size: 20px;
  font-weight: 200;
  border-radius: 5px;
}
::v-deep .el-input__inner {
  height: 64px;
  width: 416px;
  font-size: 20px;
  font-weight: 400;
}
::v-deep .el-dialog {
  border-radius: 15px;
  font-weight: 400;
  font-family: Source Han Sans CN;
}
.login-text {
  font-size: 16px;
  color: #000;
  text-align: center;
}
.privacy-text {
  margin: 0 auto;
  width: 314px;
  line-height: 23px;
  text-align: start;
}
.disabled-icon {
  color: #999;
  cursor: default;
}
.el-form-item {
  margin-bottom: 24px;
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
  width: 416px;
  margin: 0 auto;
}
::v-deep .el-dialog__headerbtn .el-dialog__close {
  font-size: 16px;
  color: #000;
  border-radius: 15px;
}
::v-deep .el-form-item__error {
  margin-top: 5px;
  position: relative;
}
.ortur-icon-apple {
  display: none;
}
</style>
