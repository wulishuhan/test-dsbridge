<template>
  <div class="user-card">
    <div class="user-avatar-username">
      <el-avatar :src="user.avatar"></el-avatar>
      <el-button @click="to(user.userId)" type="text">{{
        user.username
      }}</el-button>
    </div>
    <div class="username">{{ user.name }}</div>
  </div>
</template>
<script>
export default {
  name: "UserInfoCard",
  props: ["user"],
  methods: {
    to(id) {
      this.$router.push(`/design/Designs/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.user-card {
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  height: 82px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  font-size: 12px;
}
.user-avatar-username {
  width: 200px;
  display: flex;
  align-items: center;
  .el-button {
    margin-left: 15px;
  }
}
.username {
  width: 100px;
}
</style>
