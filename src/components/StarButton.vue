<template>
  <span>
    <el-button
      :style="{ color: isCollect ? 'red' : 'black' }"
      class="baseButton button"
      :icon="isCollect ? 'el-icon-star-on' : 'el-icon-star-off'"
    >
      <span class="num">{{ downLoadNum }}k</span>
    </el-button>
  </span>
</template>

<script>
export default {
  props: {
    downLoadNum: {
      type: Number,
      default: 0,
    },
    isCollect: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
<style lang="scss" scoped>
.button {
  width: 90px;
  margin-left: 24px;
  .num {
    color: #000;
  }
}
</style>
