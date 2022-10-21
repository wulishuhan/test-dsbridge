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
      categorizes: [],
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
