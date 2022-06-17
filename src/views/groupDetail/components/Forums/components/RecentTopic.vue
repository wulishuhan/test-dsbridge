<template>
  <div class="topic-box">
    <div class="topic">
      <h3>
        <a href="#">{{ topicName }}</a>
      </h3>
      <div>
        by <a href="#">{{ author }}</a>
      </div>
      <div style="margin-top: 20px">{{ content }}}</div>
    </div>

    <div
      style="
        background-color: #ececec;
        display: flex;
        justify-content: space-between;
      "
    >
      <span>comments: {{ comments }}</span>
      <span>Last Post: {{ lastPostTime }}</span>
      <span>Created: {{ createTime }}</span>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line
  name: "RecentTopics",
  data() {
    return {
      topicName: "RecentTopics",
      author: "shuhan",
      content: "dgssdafsdafdf",
      comments: 9,
      lastPostTime: "2022-05-07",
      createTime: "2022-04-07",
    };
  },
};
</script>
<style lang="scss" scoped>
.topic-box {
  color: #666;
}
.topic {
  height: 355px;
  background-color: #fff;
  padding: 25px;
  box-sizing: border-box;
}
</style>
