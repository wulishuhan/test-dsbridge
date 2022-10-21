<template>
  <div class="question-class-container">
    <div class="question-title">问题类型</div>
    <div class="question-grid-wrapper">
      <MyGridItem
        v-for="item in categorizes"
        :key="item.id"
        :categorizes="item"
      >
      </MyGridItem>
    </div>
  </div>
</template>
<script>
import MyGridItem from "./GridItem.vue";
import { getCatelogList } from "@/api/question.js";
export default {
  name: "QuestionCategorize",
  components: {
    MyGridItem,
  },
  mounted() {
    getCatelogList().then((res) => {
      console.log("getCatelogList", res);
      this.categorizes = res.data.data;
    });
  },
  data() {
    return {
      categorizes: [
        {
          title: "新手入门",
          url: require("@/assets/beginner.png"),
          id: 12410,
        },
        {
          title: "设备相关",
          url: require("@/assets/device.png"),
          id: 12412,
        },
        {
          title: "雕刻资源",
          url: require("@/assets/resource.png"),
          id: 12478,
        },
        {
          title: "账号安全",
          url: require("@/assets/security.png"),
          id: 1245654,
        },
        {
          title: "其他问题",
          url: require("@/assets/question.png"),
          id: 12456,
        },
      ],
    };
  },
};
</script>
<style scoped>
.question-class-container {
  margin-top: 35px;
}
.question-title {
  /* width: 120px; */
  font-size: 30px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #1a1a1a;
  text-align: start;
}
.question-grid-wrapper {
  grid-template-columns: repeat(3, 216px);
  display: grid;
  grid-gap: 16px 19px;
  margin-top: 15px;
}
</style>
