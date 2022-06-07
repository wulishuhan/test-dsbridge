<template>
  <div>
    <div class="container">
      <div class="profile-card">
        <el-image
          src="https://cdn.thingiverse.com/assets/c2/58/61/a4/e1/PTBanner1.jpg"
        ></el-image>
        <el-avatar
          :size="100"
          src="https://cdn.thingiverse.com/assets/03/86/a4/e0/99/62327717_2406250489429711_4715082395391361024_n.jpg"
        ></el-avatar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line
  name: "Following",
};
</script>
<style lang="scss" scoped>
* {
  background-color: #ececec;
  .container {
    width: 970px;
    margin: 0 auto;
  }
  .profile-card {
    width: 296px;
    height: 400px;
    background-color: #fff;
  }
}
</style>
