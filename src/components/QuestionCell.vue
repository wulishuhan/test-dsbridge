<template>
  <div>
    <van-cell is-link title-class="title" @click="routeTo">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="custom-title">{{ question.title }}</div>
      </template>
      <template #right-icon>
        <span class="custom-icon">
          <img src="@/assets/arrow-right.png" alt="" />
        </span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { Cell } from "vant";
export default {
  name: "QuestionCell",
  components: { [Cell.name]: Cell },
  props: {
    question: {
      type: Object,
      default: () => {
        return {
          title: "为什么雕刻出来的图像是歪的",
          id: 1234,
        };
      },
    },
  },
  methods: {
    routeTo() {
      this.$router.push(`/detail/${this.question.id}`);
    },
  },
  computed: {},
};
</script>
<style scoped lang="less">
.title {
  text-align: start;
}
.custom-title {
  width: 310px;
  /* height: 24px; */
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #121212;
  padding-left: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.custom-icon {
  width: 12px;
  height: 20px;
  margin-right: 32px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
