<template>
  <div class="profile-card">
    <el-image
      :src="'https://cdn.thingiverse.com/site/img/default/cover/cover-9_display_small.jpg'"
    ></el-image>
    <el-avatar
      :size="100"
      :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
    ></el-avatar>
  </div>
</template>
<script>
export default {
  name: "ProfileCard",
};
</script>
<style lang="scss" scoped>
.profile-card {
  padding-bottom: 30px;
  background: #fff;
  width: 296px;
  height: 300px;
  text-align: center;
  overflow: hidden;
  border: 1px solid #e7e7e7;
  margin: 0 0 6px;
  position: relative;
  box-sizing: border-box;
}
</style>
