<template>
  <div>
    <a type="text" @click="switchLoginAndRegister('Log in')"> Log in </a>
    <el-dialog width="550px" :visible.sync="isRegisterForm">
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
          <div class="login-text">
            Already have an account?
            <a @click="switchLoginAndRegister('Log in')"> &nbsp; Log in </a>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="login-text privacy-text">
            By clicking "Create account", I agree to ORTUR's
            <a href="#">Privacy policy</a>
            .
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog width="550px" :visible.sync="isLoginForm">
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
          <div class="login-text">
            Forget password?
            <a href="#">&nbsp; Reset it</a>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="login-text">
            No account?
            <a @click="switchLoginAndRegister('Create one')">Create one</a>
          </div>
        </el-form-item>
      </el-form>
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
      dialogFormVisible: false,
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
      formLabelWidth: "120px",
      isRegisterForm: false,
      isLoginForm: false,
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
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((res) => {
              console.log(res);
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch((err) => {
              console.log(err);
              this.$message.error(err.msg);
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
.continue-with {
  font-size: 18px;
  color: #000;
}
.icon {
  font-size: 28px;
  color: #000;
}
.icon-box {
  display: flex;
  justify-content: space-between;
  width: 280px;
  margin-top: 20px;
}
.or {
  text-align: center;
  font-size: 20px;
  color: #999;
}
.el-button {
  background-color: #000;
  color: #fff;
  width: 100%;
  height: 60px;
  font-size: 18px;
  font-weight: 200;
  border-radius: 5px;
}
::v-deep .el-input__inner {
  height: 60px;
  font-size: 18px;
  font-weight: 200;
}
::v-deep .el-dialog {
  border-radius: 15px;
}
.login-text {
  font-size: 18px;
  color: #000;
  text-align: center;
}
.privacy-text {
  margin: 0 auto;
  width: 350px;
  text-align: start;
}
.disabled-icon {
  color: #999;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: rgb(35, 95, 236);
}
::v-deep .el-form {
  width: 410px;
  margin: 0 auto;
}
::v-deep .el-dialog__headerbtn .el-dialog__close {
  color: #909399;
  font-size: 23px;
  color: #000;
  border-radius: 15px;
}
::v-deep .el-form-item__error {
  margin-top: 5px;
  position: relative;
}
</style>
