<template>
  <div class="register-container">
    <header class="sso-header">Sign up for your Ortur account</header>
    <el-row>
      <el-col
        class="hidden-sm-and-down"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <div class="inline width-1">
          <section class="values justify justify-left">
            <div class="value inline width-1">
              <h1>Simplified</h1>
              <h2>One Key to All Things Ortur</h2>
              <p>
                With a MakerBot account, you can focus on creating amazing
                things with your MakerBot® Desktop 3D Printer.
              </p>
            </div>

            <div class="value inline width-1">
              <h1>Integrated</h1>
              <h2>With the Ortur 3D Ecosystem</h2>
              <p>
                Whether you're downloading the latest design from Thingiverse or
                stocking up on filament at the MakerBot online store.
              </p>
            </div>

            <div class="value inline width-1">
              <h1>2,287,860+ Designs</h1>
              <h2>And growing</h2>
              <p>
                Browse the world's largest 3D design community for discovering,
                printing, and sharing 3D models. Join over 5,506,970 community
                members in downloading, sharing, and remixing 3D designs.
              </p>
            </div>
          </section>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :label-position="'top'"
        >
          <el-form-item label="Email Address">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="First Name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Last Name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Country">
            <el-select v-model="form.region" placeholder="Please Choose">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item label="Industry ">
                <el-select v-model="form.region" placeholder="Please Choose">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="Subindustry ">
                <el-select v-model="form.region" placeholder="Please Choose">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Choose a Username">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="pass">
            <el-input
              type="password"
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="confirm password" prop="checkPass">
            <el-input
              type="password"
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="birthday">
            <el-date-picker type="date" v-model="form.date1"></el-date-picker>
          </el-form-item>
          <el-form-item>
            By clicking the Continue button below, you accept the Ortur Terms of
            Use and Privacy Policy.
          </el-form-item>
          <el-form-item style="margin-top: 15px">
            <el-button type="primary" @click="onSubmit">CONTINUE</el-button>
          </el-form-item>
          <el-form-item>
            Already have an account?
            <router-link to="/login" class="sign-in">Sign In</router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <h2 style="text-align: center">
      If you have any questions about your Ortur account, check out our FAQ.
    </h2>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line
  name: "register",
  data() {
    return {
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
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  width: 970px;
  margin: 0 auto;
  .sso-header {
    font-family: "AntennaLight", Helvetica, Arial, sans-serif;
    font-weight: normal;
    font-size: 28px;
    color: #666;
    text-align: center;
    margin: 60px auto;
  }
  .value {
    border-bottom: solid 1px black;
    width: 80%;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form--label-top .el-form-item__label {
    float: none;
    display: inline-block;
    text-align: left;
    padding: 0;
  }
  .sign-in {
    text-decoration: none;
    color: #409eff;
  }
}
@media screen and (max-width: 970px) {
  .register-container {
    width: 100%;
  }
}
</style>
