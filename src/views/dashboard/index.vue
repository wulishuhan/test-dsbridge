<template>
  <div>
    <ul style="display: flex">
      <li>ALL ACTIVITY</li>
      <li>MY ACTIVITY</li>
      <li>FRIENDS ACTIVITY</li>
      <li>WATCHLIST</li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  /* eslint-disable */
  name: "Dashboard",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
li {
  list-style: none;
  margin-right: 15px;
}
li:hover {
  color: #248bfb;
}
</style>
