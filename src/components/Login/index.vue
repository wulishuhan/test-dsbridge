<template>
  <div>
    <a type="text" @click="switchLoginAndRegister('Log in')"> Log in </a>
    <el-dialog width="396px" :visible.sync="isRegisterForm">
      <div :class="loginFormTip === '' ? 'no-tips' : 'tips'" slot="title">
        {{ registerFormTip }}
      </div>
      <el-form :model="registerForm" :rules="rules" ref="registerForm">
        <el-form-item>
          <div class="continue-with">Continue with</div>
          <div class="icon-box">
            <i class="ortur-icon-facebook icon"></i>
            <i class="ortur-icon-github icon"></i>
            <i class="ortur-icon-tiktok icon"></i>
            <i class="ortur-icon-google icon"></i>
            <i class="ortur-icon-apple icon disabled-icon"></i>
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
            v-model="registerForm.password1"
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
          <div style="display: flex; flex-direction: column">
            <span class="login-text">
              Already have an account?
              <a @click="switchLoginAndRegister('Log in')"> &nbsp; Log in </a>
            </span>
            <span class="login-text privacy-text">
              By clicking "Create account", I agree to ORTUR's
              <a href="#">Privacy policy</a>
              .
            </span>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog width="396px" :visible.sync="isLoginForm">
      <div :class="loginFormTip === '' ? 'no-tips' : 'tips'" slot="title">
        {{ loginFormTip }}
      </div>
      <el-form :model="loginForm" ref="loginForm" :rules="rules">
        <el-form-item>
          <div class="continue-with">Continue with</div>
          <div class="icon-box">
            <i class="ortur-icon-facebook icon"></i>
            <i class="ortur-icon-github icon"></i>
            <i class="ortur-icon-tiktok icon"></i>
            <i class="ortur-icon-google icon"></i>
            <i class="ortur-icon-apple icon disabled-icon"></i>
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
              <a @click="switchLoginAndRegister('Create one')">Create one</a>
            </span>
          </div>
        </el-form-item>
      </el-form>
      <el-dialog width="396px" :visible.sync="innerVisible" append-to-body>
        <div class="loading-box" v-loading="loading"></div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import { register } from "@/api/user";
export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.password1 !== "") {
          this.$refs.registerForm.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password1) {
        callback(new Error("两次输入密码不一致!"));
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
        password1: "",
        password2: "",
        email: "",
      },
      isRegisterForm: false,
      isLoginForm: false,
      innerVisible: false,
      loading: true,
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
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        password1: [{ validator: validatePass1, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    switchLoginAndRegister(view) {
      if (view === "Create one") {
        this.isRegisterForm = true;
        this.isLoginForm = false;
      } else if (view === "Log in") {
        this.isRegisterForm = false;
        this.isLoginForm = true;
      } else {
        console.log("reset password");
      }
    },
    login(formName) {
      this.$refs[formName].validate((valid) => {
        this.loginForm.username = this.loginForm.email;
        if (valid) {
          this.innerVisible = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((res) => {
              console.log(res);
              this.$router.push({ path: this.redirect || "/" });
              this.innerVisible = false;
            })
            .catch((err) => {
              console.log(err);
              this.$message.error(err.msg);
              this.innerVisible = false;
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
          register({
            auto_login: true,
            client_subtype: "Windows",
            client_type: "pc",
            ...this.registerForm,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              this.$message.error(err.msg);
            });
        } else {
          return false;
        }
      });
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
}
.no-tips {
  width: 0px;
  height: 0px;
}
.tips {
  width: 312px;
  height: 35px;
  font-size: 15px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ff6161;
  line-height: 23px;
  margin: 30px auto -25px;
}
.continue-with {
  font-size: 15px;
  color: #1a1a1a;
  margin-top: -14px;
}
.icon {
  font-size: 22px;
  color: #000;
  cursor: pointer;
}
.icon-box {
  display: flex;
  justify-content: space-between;
  width: 205px;
  margin-top: 14px;
}
.or {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding-top: 4px;
}
.el-button {
  background: #1e78f0;
  color: #fff;
  width: 312px;
  height: 48px;
  font-size: 18px;
  font-weight: 200;
  border-radius: 5px;
}
::v-deep .el-input__inner {
  height: 48px;
  width: 312px;
  font-size: 18px;
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
.privacy-text {
  margin: 0 auto;
  width: 278px;
  height: 35px;
  line-height: 23px;
  text-align: start;
}
.disabled-icon {
  color: #999;
  cursor: default;
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
