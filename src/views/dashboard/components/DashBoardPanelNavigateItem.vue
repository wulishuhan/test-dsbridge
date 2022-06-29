<template>
  <div class="item" @click="navigateTo">
    <div>
      <i :class="iconName"></i>
      <span class="text">{{ title }}</span>
    </div>
    <div class="arrow">></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    iconName: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  methods: {
    navigateTo() {
      //console.log(e)
      this.$router.push({ path: this.path });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  background-color: #fff;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  .text {
    margin-left: 5px;
  }
}
</style>
