<template>
  <div>
    <div
      class="card"
      @click="find(subject)"
      :class="{ 'card-border-blue': selected, 'card-border-white': !selected }"
    >
      {{ subject }}
    </div>
  </div>
</template>
<script>
export default {
  name: "FilterSubject",
  props: {
    subject: {
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
        this.$store.commit("filterCard/SET_SELECTSUBJECT", "Art");
        this.$emit("setSubject", "Art");
      } else {
        this.$store.commit("filterCard/SET_SELECTSUBJECT", name);
        this.$emit("setSubject", name);
      }
      this.$emit("getUserLists");
    },
  },
  computed: {
    selected() {
      return this.subject == this.$store.getters.selectSubject;
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
