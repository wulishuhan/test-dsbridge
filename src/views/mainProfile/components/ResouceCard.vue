<template>
  <div class="container">
    <div class="header">
      <p>
        <el-avatar :size="25" :src="avatar"></el-avatar>
        <span>{{ user.thingName }}</span>
      </p>
      <span>{{ user.publicTime }}</span>
    </div>
    <div class="img" @click="viewResource">
      <el-image :src="user.uploadImg"></el-image>
    </div>
    <div class="collect-likes-comments">
      <div class="collect-thing">
        <i class="el-icon-plus"></i>
        <span>Collect Thing</span>
      </div>
      <div class="likes-comments">
        <div class="likes" @click="like">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-heart"
            viewBox="0 0 16 16"
            :class="{ 'red-icon': isLike }"
          >
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
            />
          </svg>
          <span>
            {{ likes }}
          </span>
        </div>
        <div class="comments">
          <i class="el-icon-chat-square"></i>
          <span>
            {{ user.comments }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ResourceCard",
  props: ["user", "avatar"],
  data() {
    return {
      isLike: false,
      likes: 0,
    };
  },
  mounted() {
    console.log("mounted", this.user);
    this.isLike = this.user.isLike;
    this.likes = this.user.likes;
  },
  methods: {
    like() {
      console.log("like");
      this.isLike = !this.isLike;
      if (this.isLike) {
        this.likes += 1;
      } else {
        this.likes -= 1;
      }
    },
    viewResource() {
      this.$router.push("/thing/" + this.user.id);
    },
  },
};
</script>
<style lang="scss" scope>
.container {
  width: 300px;
  height: 340px;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 3px;
  background-color: #fff;
  color: #555;
  .header {
    height: 38px;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    p {
      display: flex;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
  }
  .img {
    width: 100%;
    img {
      width: 300px;
      height: 225px;
      cursor: pointer;
    }
  }
  .collect-likes-comments {
    display: flex;
    margin-top: -1px;
    cursor: pointer;
    .collect-thing {
      width: 207px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #ccc;
    }
    .likes-comments {
      display: flex;
      flex-direction: column;
      .likes {
        border-bottom: 1px solid #ccc;
      }
      div {
        display: flex;
        width: 97px;
        height: 36px;
        align-items: center;
        padding-left: 10px;
        i {
          font-size: 18px;
        }
        span {
          margin-left: 15px;
          margin-top: -3px;
        }
      }
    }
  }
  .red-icon {
    color: red;
  }
}
</style>
