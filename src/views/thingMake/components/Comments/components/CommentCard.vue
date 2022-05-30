<template>
  <div class="comment-card">
    <div class="comment-info">
      <img :src="user.avatar" />
      <div class="info">
        <a>{{ user.name }}</a>
        <p>{{ user.postDate }}</p>
      </div>
    </div>
    <div class="post-comment">
      <p>
        {{ user.comment }}
      </p>
    </div>
    <div class="comment-button">
      <el-button>Flag</el-button>
      <el-button type="primary">Reply</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommentCard",
  data() {
    return {
      user: {
        id: Math.random(),
        name: "aaa",
        postDate: new Date(),
        comment: "testsetestestsetestse",
        avatar:
          "https://cdn.thingiverse.com/site/img/default/avatar/avatar_default_thumb_medium.jpg",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.comment-card {
  width: 100%;
  background-color: #fff;
  color: #555;
  margin-top: 10px;
  box-sizing: border-box;
  padding: 10px;
  .comment-info {
    box-sizing: border-box;
    display: flex;
    padding: 20px;
    font-size: 12px;
    .info {
      margin-left: 25px;
    }
    a {
      font-size: 18px;
      font-weight: 400;
      text-decoration: none;
    }
    p {
      position: relative;
      top: -10px;
    }
    img {
      border-radius: 25%;
      width: 50px;
      height: 50px;
    }
  }
  .post-comment {
    font-size: 12px;
    padding: 20px;
    color: #555;
    box-sizing: border-box;
  }
  .comment-button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
