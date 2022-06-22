<template>
  <div class="block">
    <header class="block-header">
      <span>
        <i :class="icon"></i>
        <span>{{ name }}</span>
      </span>
      <div>
        <i class="el-icon-d-caret"></i>
        <i class="el-icon-close" @click="close"></i>
      </div>
    </header>
    <slot></slot>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line
  name: "Block",
  props: {
    name: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "el-icon-s-operation",
    },
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    close() {
      console.log("close:", this.name);
      this.$emit("closeBlock", this.name);
    },
  },
};
</script>
<style lang="scss" scoped>
.block {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
  margin: 5px 0;
  .block-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    i {
      margin-right: 10px;
      font-size: 20px;
    }
  }
}
</style>
