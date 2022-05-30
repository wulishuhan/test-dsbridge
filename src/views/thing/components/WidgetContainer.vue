<template>
  <div class="widget-container">
    <h1>{{ title }}</h1>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "WidgetContainer",
  props: {
    title: {
      type: String,
      default: "WidgetContainer",
    },
  },
};
</script>
<style lang="scss" scoped>
.widget-container {
  background-color: #fff;
  color: #555;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 10px;
  width: 100%;
  a {
    text-decoration: none;
    color: #248bfb;
    font-size: 12px;
    margin-left: 5px;
  }
  h1 {
    color: #555;
    font-family: SFUIText-Light;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.2px;
  }
}
</style>
