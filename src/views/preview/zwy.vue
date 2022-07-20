<template>
  <div>
    <app-header></app-header>
    <reply-widget style="margin-top: 50px"></reply-widget>
    <comment-widget></comment-widget>
  </div>
</template>
<script>
// 用来预览组件
import AppHeader from "@/components/AppHeader.vue";
import ReplyWidget from "@/components/Comment/ReplyWidget.vue";
import CommentWidget from "@/components/Comment/CommentWidget.vue";
export default {
  // eslint-disable-next-line
  name: "zwy",
  components: {
    AppHeader,
    ReplyWidget,
    CommentWidget,
  },
};
</script>
