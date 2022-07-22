<template>
  <div>
    <div class="tag">Tags</div>
    <div class="labelCard">
      <BaseButton
        class="button"
        @click="onBaseButtonClick(item.id)"
        v-for="item in LabelArr"
        :key="item.id"
      >
        {{ item.label }}
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
        return [
          { id: "1", label: "路飞1111" },
          { id: "2", label: "萨博" },
          { id: "3", label: "路飞" },
          { id: "4", label: "萨博" },
          { id: "5", label: "路飞" },
          { id: "6", label: "萨博" },
          { id: "7", label: "路飞" },
          { id: "8", label: "萨博" },
          { id: "9", label: "路飞" },
          { id: "10", label: "萨博" },
        ];
      },
    },
  },
  components: {
    BaseButton,
  },
  methods: {
    onBaseButtonClick(id) {
      this.$router.push({ path: "", query: id });
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
  width: 200px;
  .button {
    margin-right: 12px;
    margin-top: 12px;
    font-size: 15px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
  }
}
</style>
