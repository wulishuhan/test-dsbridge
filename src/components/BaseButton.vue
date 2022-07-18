<template>
  <span>
    <el-button class="baseButton" @click="onBaseButtonClick">
      <slot></slot>
    </el-button>
  </span>
</template>

<script>
export default {
  props: {},
  methods: {
    onBaseButtonClick() {
      this.$emit("onBaseButtonClick");
    },
  },
};
</script>

<style></style>
<style lang="scss" scoped></style>
