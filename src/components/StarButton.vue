<template>
  <span>
    <el-button
      :style="{ color: isStar ? 'red' : 'black' }"
      class="baseButton button"
      :icon="isStar ? 'el-icon-star-on' : 'el-icon-star-off'"
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
    isStar: {
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
