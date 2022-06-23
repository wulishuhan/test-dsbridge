<template>
  <div class="edit-section">
    <el-row class="center-content">
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <h1>ABOUT YOU</h1>
        <el-form ref="form" :model="form">
          <el-form-item label="First Name">
            <el-input v-model="form.firstName"></el-input>
          </el-form-item>
          <el-form-item label="Last Name">
            <el-input v-model="form.lastName"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="{ span: 10, offset: 4 }"
        :lg="{ span: 10, offset: 4 }"
        :xl="{ span: 10, offset: 4 }"
      >
        <h1>COVER PHOTO & AVATAR</h1>
        <profile-card></profile-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ProfileCard from "./ProfileCard";
export default {
  name: "OrturAccount",
  components: { ProfileCard },
  props: {},
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
      },
    };
  },
  methods: {
    submit() {
      console.log("orturAccount:", this.form);
    },
  },
};
</script>
<style lang="scss" scoped>
.center-content {
  margin: 0 auto;
  box-sizing: border-box;
  width: 970px;
}
.edit-section {
  padding: 40px 0 20px;
  overflow: hidden;
  background-color: #f5f5f5;
}
h1 {
  font-family: "Antenna Bold", Helvetica, Arial, sans-serif;
  font-weight: normal;
  font-size: 24px;
  line-height: 1.25em;
  color: #666;
  text-transform: uppercase;
  margin: 0 0 20px;
}
@media screen and (max-width: 768px) {
  .center-content {
    width: 100%;
  }
  h1 {
    font-size: 16px;
  }
}
</style>
