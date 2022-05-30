<template>
  <div
    class="filter-box"
    :class="{
      'filter-box-select-color': select,
      'filter-box-unselect-color': !select,
    }"
    @click="controlOpen"
  >
    <i :class="iconName">&nbsp;{{ name }}</i>
  </div>
</template>
<script>
export default {
  name: "FilterBox",
  props: {
    name: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "el-icon-plus",
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    controlOpen() {
      console.log("content opened!");
      if (this.name === "Custom Section") {
        console.log("is Custom Section!");
        this.$emit("addCustomSection");
      } else {
        this.$store.commit("upload/SET_SELECTORMODULES", this.name);
      }
    },
  },
  computed: {
    select() {
      if (this.name === "Custom Section") {
        return false;
      }
      return this.$store.getters.selectorModules.has(this.name);
    },
    iconName() {
      return this.select ? "el-icon-minus" : "el-icon-plus";
    },
  },
};
</script>
<style>
.filter-box-select-color {
  color: #d1d1d1;
}
.filter-box-unselect-color {
  color: #888888;
}
.filter-box {
  width: 280px;
  height: 35px;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
</style>
