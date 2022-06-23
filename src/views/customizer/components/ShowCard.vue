<template>
  <div class="container">
    <a href="#" class="header-container">
      <h3>{{ name }}</h3>
    </a>
    <div class="image-container">
      <el-image
        :src="'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'"
      ></el-image>
      <el-image
        :src="'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'"
      ></el-image>
      <el-image
        :src="'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'"
      ></el-image>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShowCard",
  props: {
    name: {
      type: String,
      default: "showCard",
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  .header-container {
    text-decoration: none;
    color: #666;
  }
}
.image-container {
  width: 465px;
}
.el-image {
  width: 140px;
  height: 105px;
  margin: 0 5px;
}
@media screen and (max-width: 425px) {
  .el-image {
    width: 100%;
    margin: 0 5px;
  }
  .image-container {
    width: 100%;
    display: flex;
  }
}
@media screen and (max-width: 768px) {
  .image-container {
    width: 100%;
    display: flex;
  }
}
</style>
