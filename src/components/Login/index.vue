<template>
  <div>
    <a type="text" @click="dialogFormVisible = true"> Log in </a>
    <el-dialog width="550px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item>
          <div class="continue-with">Continue with</div>
          <div class="icon-box">
            <i class="ortur-icon-facebook icon"></i>
            <i class="ortur-icon-apple icon"></i>
            <i class="ortur-icon-github icon"></i>
            <i class="ortur-icon-tiktok icon"></i>
            <i class="ortur-icon-google icon"></i>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="or">or</div>
        </el-form-item>
        <div v-if="isRegisterForm">
          <el-form-item>
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="Account"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="Password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button>Create Account</el-button>
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
        </div>
        <div v-else>
          <el-form-item>
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="Email"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="Password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button>Log in</el-button>
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
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      isRegisterForm: false,
    };
  },
  methods: {
    switchLoginAndRegister(view) {
      if (view === "Create one") {
        this.isRegisterForm = true;
      } else if (view === "Log in") {
        this.isRegisterForm = false;
      } else {
        console.log("reset password");
      }
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
</style>
