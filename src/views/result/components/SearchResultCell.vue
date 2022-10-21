<template>
  <div class="cell" @click="routeTo">
    <img src="@/assets/icon-search.png" alt="" />
    <span>{{ result.title }}</span>
  </div>
</template>
<script>
export default {
  name: "SearchResultCell",
  props: {
    result: {
      type: Object,
      default: () => {
        return {
          title: "为什么雕刻出来的图像是歪的",
          id: 12345,
        };
      },
    },
  },
  methods: {
    routeTo() {
      this.$router.push(`/detail/${this.result.id}`);
    },
  },
};
</script>
<style scoped lang="less">
.cell {
  width: 647px;
  height: 90px;
  border-bottom: solid 1px #e6e6e6;
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    width: 312px;
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #121212;
    margin-left: 18px;
  }
}
</style>
