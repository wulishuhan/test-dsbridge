<template>
  <div class="faq-container">
    <div class="question-title">常见问题</div>
    <div class="question-body">
      <question-cell
        v-for="item in faqs.slice(0, 4)"
        :key="item.id"
        :question="item"
      ></question-cell>
    </div>
  </div>
</template>
<script>
import QuestionCell from "@/components/QuestionCell.vue";
import { getFaqCommonList } from "@/api/question.js";
export default {
  name: "FAQ",
  components: {
    QuestionCell,
  },
  mounted() {
    getFaqCommonList().then((res) => {
      console.log("getFaqCommonList", res);
      this.faqs = res.data.data;
    });
  },
  data() {
    return {
      faqs: [],
    };
  },
};
</script>
<style scoped>
.faq-container {
  margin-top: 31px;
}
.question-title {
  /* width: 120px; */
  font-size: 30px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #1a1a1a;
  text-align: start;
}
.question-body {
  margin-top: 21px;
  border-radius: 12px;
}
.question {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
}
.custom-title {
  width: 310px;
  height: 24px;
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #121212;
  padding-left: 32px;
}
.title {
  text-align: start;
}
.custom-icon {
  width: 12px;
  height: 20px;
  margin-right: 32px;
}
</style>
