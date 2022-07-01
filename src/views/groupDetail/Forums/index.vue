<template>
  <div>
    <el-input placeholder="SEARCH"></el-input>
    <div class="general"></div>
    <h2>Recent Topics</h2>
    <recent-topic></recent-topic>
  </div>
</template>
<script>
import RecentTopic from "./components/RecentTopic";
export default {
  // eslint-disable-next-line
  name: "Forums",
  components: { RecentTopic },
};
</script>
<style lang="scss" scoped></style>
