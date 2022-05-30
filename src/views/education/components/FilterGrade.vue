<template>
  <div>
    <div
      class="card"
      @click="find(grade)"
      :class="{ 'card-border-blue': selected, 'card-border-white': !selected }"
    >
      {{ grade }}
    </div>
  </div>
</template>
<script>
export default {
  name: "FilterGrade",
  props: {
    grade: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    find(name) {
      if (name == "Reset") {
        this.$store.commit("filterCard/SET_SELECTGRADE", "K-6");
        this.$emit("setGrade", "K-6");
      } else {
        this.$store.commit("filterCard/SET_SELECTGRADE", name);
        this.$emit("setGrade", name);
      }
      console.log("check grade");
      this.$emit("getUserLists");
    },
  },
  computed: {
    selected() {
      return this.grade == this.$store.getters.selectGrade;
    },
  },
};
</script>

<style scope>
.card {
  background-color: white;
  margin: 10px 20px 10px 0;
  padding: 10px;
  width: 117.75px;
  height: 38px;
}
.card-border-blue {
  border: 1px solid #248bfb;
}
.card-border-white {
  border: 1px solid #fff;
}
</style>
