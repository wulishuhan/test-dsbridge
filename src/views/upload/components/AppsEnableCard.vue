<template>
  <div class="container">
    <div>
      <p>
        <img :src="url" alt="" srcset="" />
        <span>
          {{ name }}
        </span>
        &nbsp;
        <span>
          by
          {{ author }}
        </span>
      </p>
    </div>
    <i class="el-icon-close"></i>
  </div>
</template>
<script>
export default {
  name: "AppsEnableCard",
  props: {
    name: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding: 10px;
  border-top: 1px solid #ccc;
  height: 62px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  p {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
  i {
    font-size: 25px;
    display: block;
  }
  i:hover {
    cursor: pointer;
  }
}
@media screen and (max-width: 768px) {
  .container {
    width: 100%;
    font-size: 12px;
  }
}
</style>
