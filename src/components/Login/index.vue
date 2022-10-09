<template>
  <div>
    <el-dialog
      width="528px"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      @opened="handleOpen"
      append-to-body
    >
      <div v-show="!verifyEmailDialogVisible">
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
            <el-form-item prop="name">
              <el-input
                v-model="registerForm.nickname"
                autocomplete="off"
                placeholder="Name"
              ></el-input>
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
                  <a @click="switchLoginAndRegister('login')">
                    &nbsp; Log in
                  </a>
                </span>
                <span class="login-text privacy-text">
                  By clicking "Create account", I agree to ORTUR's
                  <a
                    target="_blank"
                    href="https://www.leadiffer.com/privacy-policy/"
                    >Privacy policy</a
                  >
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
                  <a :href="resetPasswordUrl" target="_blank">
                    &nbsp; Reset it
                  </a>
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
            <el-form-item prop="name">
              <el-input
                v-model="registerForm.nickname"
                autocomplete="off"
                placeholder="Name"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model="registerForm.email"
                autocomplete="off"
                placeholder="Email"
                @blur="thirdEmailBlur"
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
              <el-button
                @click="thridPartyAccountBind('thirdPartyRegisterForm')"
              >
                Complete
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="verifyEmailDialogVisible">
        <h2 style="text-align: center">Verify your email</h2>
        <p style="font-family: Source Han Sans CN; font-size: 16px">
          Click the verification button in the email we sent to
          {{ registerForm.email }}. This helps keep your account secure.
          <br />
          <br />
          No email in your inbox or spam folder?
          <a @click="sendEmail(registerForm.email)">Let's resend it. </a>
          <br />
          <br />
          Wrong address?
          <a @click="handleClose"> Log out </a>

          to sign in with adifferent email. If you mistyped your emailwhen
          signing up, create a new account.
        </p>
      </div>

      <el-dialog width="396px" :visible.sync="innerVisible" append-to-body>
        <div class="loading-box" v-loading="loading"></div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import { bindThird, activeUserSendEmail, openRegister } from "@/api/user";
import { broserInfo } from "@/utils/navigator.js";
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
    resetPasswordUrl: function () {
      if (process.env.NODE_ENV == "production") {
        return "https://sso.leadiffer.com/oauth/forget_password";
      }
      if (process.env.NODE_ENV == "development") {
        return "https://sso.leadiffer.cn/oauth/forget_password";
      }
    },
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
    var validatePassword = (rule, value, callback) => {
      let pattern =
        // eslint-disable-next-line
        /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,16}$/;
      if (!pattern.test(this.loginForm.password)) {
        callback(
          new Error(
            "The length of the password is 8-16 characters, must contain two kinds of numbers, letters and characters."
          )
        );
      }
      callback();
    };
    var validatePass1 = (rule, value, callback) => {
      // eslint-disable-next-line
      let pattern =
        // eslint-disable-next-line
        /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,16}$/;

      if (value === "") {
        callback(new Error(this.$t("login.password")));
      } else if (!pattern.test(this.registerForm.password)) {
        callback(
          new Error(
            "The length of the password is 8-16 characters, must contain two kinds of numbers, letters and characters."
          )
        );
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
      if (this.loginFormTipCode === 1009 || this.loginFormTipCode === 1006) {
        callback(new Error(this.$t("error.usernameOrPasswordError")));
        this.loginFormTipCode = "";
      }
      if (this.registerFormTip != "") {
        callback(new Error(this.registerFormTip));
        this.registerFormTip = "";
      }
      if (this.openLoginMsg === 1020) {
        if (this.isComplete) {
          callback();
        } else {
          if (!this.thirdPartyInfo.email && !this.registerForm.email) {
            callback(new Error(this.$t("login.unauthenticatedEmail")));
          } else {
            callback(new Error(this.$t("login.openLoginRegisterFirst")));
          }
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
      loginFormTipCode: "",
      registerFormTip: "",
      loginForm: {
        username: "",
        password: "",
        email: "",
      },
      registerForm: {
        nickname: "",
        username: "",
        password: "",
        password2: "",
        email: "",
      },
      innerVisible: false,
      loading: true,
      show: true,
      rules: {
        name: [
          {
            min: 2,
            max: 31,
            trigger: "blur",
          },
        ],
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
          { validator: validatePassword, trigger: "blur" },
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
        name: "",
      },
      verifyEmailDialogVisible: false,
    };
  },
  methods: {
    thirdEmailBlur() {
      this.thirdPartyInfo.email = this.registerForm.email;
      let params = {
        catalog: this.thirdPartyInfo.catalog,
        client_subtype: broserInfo(),
        client_type: "web",
        email: this.registerForm.email,
        id: this.thirdPartyInfo.userId,
        name: this.registerForm.nickname,
      };
      this.$store
        .dispatch("user/openLogin", params)
        .then(() => {
          this.$router.push(this.$route.path + "#");
        })
        .catch((data) => {
          if (data.code === 1021) {
            this.thirdPartyFormTip = this.$t("error.emailExist");
          }
        });
    },
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
              // console.log("err", error);
              if (error.data?.code === 1023) {
                this.sendEmail(this.loginForm.email);
                this.verifyEmailDialogVisible = true;
              }
              this.loginFormTipCode = error.code;
              this.innerVisible = false;
              this.$refs.loginForm.validateField("email");
              this.$refs.loginForm.validateField("password");
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
          if (this.registerForm.nickname === "") {
            let date = new Date();
            this.registerForm.nickname =
              "Explorer" +
              date.getFullYear() +
              (date.getMonth() + 1) +
              date.getDate();
          }
          this.registerForm.username = this.registerForm.email;
          this.$store
            .dispatch("user/register", {
              auto_login: false,
              client_subtype: broserInfo(),
              client_type: "web",
              ...this.registerForm,
            })
            .then((res) => {
              if (res.code == 0) {
                this.verifyEmailDialogVisible = true;
                this.sendEmail(this.registerForm.email);
                // this.handleClose();
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
          if (this.registerForm.nickname === "") {
            let date = new Date();
            this.registerForm.nickname =
              "Explorer" +
              date.getFullYear() +
              (date.getMonth() + 1) +
              date.getDate();
          }
          openRegister({
            client_subtype: broserInfo(),
            client_type: "web",
            email: this.registerForm.email,
            nickname: this.thirdPartyInfo.name,
            openUserId: this.thirdPartyInfo.userId,
            password: this.registerForm.password,
            username: this.registerForm.email,
          }).then((res) => {
            console.log("open register", res);
            if (res.data.code === 0) {
              this.$store.commit("user/SET_LOGININFO", res.data.data);
              this.handleClose();
            }
            if (res.data.code === 1024) {
              this.$message.error("Please do not re-register");
            }
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
      this.verifyEmailDialogVisible = false;
      // this.$refs.thirdPartyRegisterForm.resetFields();
    },
    handleOpen() {
      if (this.isThirdPartyRegisterForm) {
        let { code, from, email, name } = this.$route.query;
        if (email === "null") {
          email = "";
        }
        this.thirdPartyInfo.userId = code;
        this.thirdPartyInfo.catalog = from;
        this.registerForm.nickname = "";
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
    sendEmail(email) {
      activeUserSendEmail({
        email: email,
      }).then((res) => {
        console.log(res);
        this.$message.success("send email successfully");
      });
    },
  },
  mounted() {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
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
