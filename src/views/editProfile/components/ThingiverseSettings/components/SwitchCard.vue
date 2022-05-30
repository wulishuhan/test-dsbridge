<template>
  <div>
    <p>
      <span> {{ text }} </span>
      <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </p>
  </div>
</template>
<script>
export default {
  name: "SwitchCard",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: false,
    };
  },
};
</script>
<style lang="scss" scoped>
p {
  display: flex;
  justify-content: space-between;
  padding: 6px;
  font-size: 14px;
}
p:hover {
  background-color: #fff;
}
</style>
