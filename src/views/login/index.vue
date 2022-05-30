<template>
  <div class="login_container">
    <h1>Sign in with your Ortur account</h1>
    <el-form :label-position="'top'" :inline="true" :model="user">
      <el-form-item label="Username or Email">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">SIGN IN</el-button>
      </el-form-item>
      <p>
        <input type="checkbox" id="cbox1" value="first_checkbox" />
        <label for="cbox1">Remember me</label>
      </p>
    </el-form>
    <h2>
      NEW TO Ortur? <router-link to="/register">CREATE AN ACCOUNT</router-link>
    </h2>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line
  name: "login",
  data() {
    return {
      user: {
        username: "admin",
        password: "123456",
        type: [],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("user/login", this.user).then((res) => {
        console.log(res);
        this.$router.push("/");
      });
    },
  },
};
</script>
<style lang="scss">
.login_container {
  h1 {
    text-align: center;
    margin-bottom: 50px;
  }
  h2 {
    text-align: center;
    a {
      text-decoration: none;
      color: #248bfb;
    }
  }
  .el-button {
    margin-top: 10px;
  }
  .el-form-item__label {
    line-height: 0px;
    font-size: 14px;
    color: #888;
    float: left;
  }
  .el-form-item {
    width: 32%;
  }
  .el-form {
    text-align: center;
    margin: 0 auto;
  }
  .el-input {
    width: 100%;
  }
}
</style>
