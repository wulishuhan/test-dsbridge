<template>
  <div class="things-card">
    <div class="things-card-image" :style="bakcStyle">
      <div class="things-card-image-header">
        <div class="things-card-image-avatar">
          <el-avatar :size="40" :src="url"></el-avatar>
        </div>
        <div class="things-card-image-info">
          <span>name</span>
          <div class="things-card-image-info-author">
            <span>by author</span>
            <span>time</span>
          </div>
        </div>
      </div>
    </div>
    <div class="message">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-heart"
          viewBox="0 0 16 16"
        >
          <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
          />
        </svg>
        0
      </span>
      <span> <i class="el-icon-copy-document"></i> 0</span>
      <span> <i class="el-icon-chat-line-square"></i> 0</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ThingsCard",
  data() {
    return {
      url: "https://cdn.thingiverse.com/renders/9c/9f/b7/f7/91/image_thumb_tiny.jpg",
      bakcStyle: {
        backgroundImage:
          "url(https://cdn.thingiverse.com/assets/58/3b/a9/55/0e/card_preview_Halterblock_BGR_s.jpg)",
        backgroundRepeat: "no-repeat",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.things-card {
  width: 296px;
  height: 265px;
  border: 1px solid red;
  .things-card-image {
    width: 100%;
    height: 219px;
    border: 1px solid #000;
    .things-card-image-header {
      display: flex;
      align-items: flex-start;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0) 100%
      );
      .things-card-image-avatar {
        margin-top: 5px;
      }
      .things-card-image-info {
        margin-left: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #fff;
        font-size: 12px;
        .things-card-image-info-author {
          font-size: 11px;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
      }
    }
  }
  .message {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    cursor: pointer;
    span {
      height: 41px;
      display: inline-flex;
      width: 100%;
      border: 1px solid red;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
