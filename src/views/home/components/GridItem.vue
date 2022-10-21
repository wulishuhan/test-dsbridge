<template>
  <div class="item-container" @click="routeTo">
    <div class="item-content">
      <div class="item-content-img">
        <img :src="categorizes.icon" alt="" />
      </div>
      <div class="item-content-text">{{ categorizes.name }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyGridItem",
  props: {
    categorizes: {
      type: Object,
      default: () => {
        return {
          title: "新手入门",
          url: "https://orturbucket.s3.amazonaws.com/assets/2022/09/29/06_20220929162950A179.jpg",
          id: 124,
        };
      },
    },
  },
  methods: {
    routeTo() {
      this.$router.push({
        path: `/catelog/${this.categorizes.id}`,
        query: {
          title: this.categorizes.name,
        },
      });
    },
  },
};
</script>
<style scoped>
.item-container {
  width: 216px;
  height: 184px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-content {
  width: 104px;
  height: 122px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.item-content-img {
  width: 56px;
  height: 56px;
}
.item-content-text {
  width: 104px;
  font-size: 26px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #121212;
}
img {
  width: 100%;
  height: 100%;
}
</style>
