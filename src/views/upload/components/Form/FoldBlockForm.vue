<template>
  <div v-if="isShow" class="fold-block-form-container">
    <fold-block></fold-block>
  </div>
</template>
<script>
import FoldBlock from "../Block/FoldBlock";
export default {
  name: "FoldBlockForm",
  components: { FoldBlock },
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  mounted() {
    if (this.nameList.includes(this.name)) this.isShow = true;
  },
  data() {
    return {
      isShow: false,
      nameList: [
        "Post-Printing",
        "How I Designed This",
        "Overview and Background",
        "Lesson Plan and Activity",
        "Materials Needed",
        "Preparation",
        "Rubric and Assessment",
        "References",
        "Custom Section",
      ],
    };
  },
};
</script>
<style lang="scss"></style>
