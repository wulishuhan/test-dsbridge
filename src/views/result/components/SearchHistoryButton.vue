<template>
  <button @click="click">{{ name }}</button>
</template>
<script>
export default {
  name: "SearchHistoryButton",
  props: {
    name: {
      type: String,
      default: "button",
    },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
<style scoped>
button {
  padding: 16px 25px;
  background: #f0f0f0;
  border-radius: 8px;
  border: none;
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #999999;
  margin-right: 16px;
  margin-top: 24px;
}
</style>
