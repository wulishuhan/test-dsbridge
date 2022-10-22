<template>
  <div class="item-container" @click="routeTo">
    <div class="item-content">
      <!-- <div class="item-content-img"> -->
      <!-- <img :src="categorizes.icon" alt="" /> -->
      <van-icon class="icon" :name="categorizes.icon" color="#000" />
      <!-- </div> -->
      <div class="item-content-text">{{ categorizes.name }}</div>
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  name: "MyGridItem",
  components: {
    [Icon.name]: Icon,
  },
  props: {
    categorizes: {
      type: Object,
      default: () => {
        return {
          title: "新手入门",
          icon: "https://orturbucket.s3.amazonaws.com/assets/2022/09/29/06_20220929162950A179.jpg",
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
::v-deep .van-icon {
  font-size: 56px;
}
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
  /* width: 104px; */
  height: 122px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.item-content-img {
  width: 56px;
  height: 56px;
  font-size: 56px;
  /* border: dashed 1px #999; */
  line-height: 56px;
}
.item-content-text {
  /* width: 104px; */
  font-size: 26px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #121212;
}
</style>
