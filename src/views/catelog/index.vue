<template>
  <div>
    <div class="content">
      <question-cell
        v-for="item in faqs"
        :key="item.id"
        :question="item"
      ></question-cell>
    </div>
  </div>
</template>
<script>
import QuestionCell from "@/components/QuestionCell.vue";
import { getFaqList } from "@/api/question.js";
export default {
  name: "index",
  components: {
    QuestionCell,
  },
  mounted() {
    getFaqList({ id: this.$route.params.catelogId }).then((res) => {
      console.log("getFaqList", res);
      this.faqs = res.data.data;
    });
    this.$dsbridge.call("modifyNavBarName", this.$route.params.catelogId);
  },
  data() {
    return {
      faqs: [
        {
          title: "",
          id: -1,
        },
      ],
    };
  },
};
</script>
<style scoped lang="less">
.content {
  padding: 0 31px;
  margin-top: 40px;
  padding-bottom: 254px;
}
</style>
