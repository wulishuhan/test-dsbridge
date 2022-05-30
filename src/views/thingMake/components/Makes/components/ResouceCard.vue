<template>
  <div class="container">
    <div class="header">
      <p>
        <el-avatar :size="25" :src="info.avatar"></el-avatar>
        <span>{{ info.thingName }}</span>
      </p>
      <span>{{ info.publicTime }}</span>
    </div>
    <div class="img">
      <el-image @click="toDetail(info.id)" :src="info.url"></el-image>
    </div>
    <div class="collect-likes-comments">
      <div class="collect-thing">
        <i class="el-icon-plus"></i>
        <span>Collect Thing</span>
      </div>
      <div class="likes-comments">
        <div class="likes">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-heart"
            viewBox="0 0 16 16"
            :class="{ 'red-icon': info.isLike }"
          >
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
            />
          </svg>
          <span>
            {{ info.likes }}
          </span>
        </div>
        <div class="comments">
          <i class="el-icon-chat-square"></i>
          <span>
            {{ info.comments }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ResourceCard",
  props: {
    info: {
      type: Object,
      default: function () {
        return {
          id: 1234,
          name: "Yarn Ball Yarn Bowl",
          avatar:
            "https://cdn.thingiverse.com/renders/5c/65/26/d1/5b/4e73d022627863eeb1ec17803a868aa0_thumb_medium.jpg",
          url: "https://cdn.thingiverse.com/assets/21/6c/ab/fc/a3/card_preview_LMC_20220424_093016_ExonLMC.jpg",
          likes: 1360,
          comments: 3,
          publicTime: "Apr 25, 2022",
          thingName: "Yarn Ball Yarn Bowl",
        };
      },
    },
  },
  methods: {
    toDetail(id) {
      this.$router.push("/thingMake/" + id);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 300px;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 3px;
  background-color: #fff;
  color: #555;
  .red-icon {
    color: red;
  }
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
    cursor: pointer;
    img {
      width: 300px;
      height: 225px;
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
}
</style>
