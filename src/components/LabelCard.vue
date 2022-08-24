<template>
  <div>
    <div class="tag">Tags</div>
    <div class="labelCard">
      <BaseButton
        class="button"
        @click="onBaseButtonClick(tag)"
        v-for="(tag, index) in LabelArr"
        :key="index"
      >
        {{ tag }}
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";
export default {
  props: {
    LabelArr: {
      type: Array,
      default: () => {
        return ["标签一", "标签二", "标签三", "标签四"];
      },
    },
  },
  components: {
    BaseButton,
  },
  methods: {
    onBaseButtonClick(tag) {
      this.$router.push("/search/index?keywords=" + tag);
    },
  },
};
</script>

<style></style>
<style lang="scss" scoped>
.tag {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #1a1a1a;
}
.labelCard {
  display: flex;
  flex-wrap: wrap;
  .button {
    margin-right: 12px;
    margin-top: 12px;
    font-size: 15px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    margin-left: unset;
  }
}
</style>
