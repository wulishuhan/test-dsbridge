<template>
  <div>
    <router-link :to="url" class="filterTarget">
      <div
        class="card"
        @click="find(filter)"
        :class="{
          'card-border-blue': selected,
          'card-border-white': !selected,
        }"
      >
        <div>
          {{ count }}
        </div>
        <div>
          {{ filter }}
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "FilterProfile",
  props: {
    filter: {
      type: String,
      default: "",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  methods: {
    find(name) {
      this.$store.commit("filterCard/SET_SELECTPROFILE", name);
      console.log("check profile");
    },
  },
  computed: {
    selected() {
      return this.filter == this.$store.getters.selectProfile;
    },
    url() {
      return `/design/${this.filter}/${this.$route.params.userId}`;
    },
  },
};
</script>

<style scope>
.filterTarget {
  text-decoration: none;
  color: #555555;
}
.card {
  background-color: white;
  padding: 10px;
  margin-top: 5px;
  margin-left: 5px;
}
.card-border-blue {
  border: 1px solid #248bfb;
}
.card-border-white {
  border: 1px solid #fff;
}
</style>
