<template>
  <div>
    <post-comment></post-comment>
    <comment-card></comment-card>
  </div>
</template>
<script>
import PostComment from "./components/PostComment";
import CommentCard from "./components/CommentCard";
export default {
  //eslint-disable-next-line
  name: "Comments",
  components: { PostComment, CommentCard },
};
</script>
<style></style>
