<template>
  <div class="inner-card">
    <div class="img">
      <el-image :src="thing.url"></el-image>
    </div>
    <div class="thing-info">
      <div>
        <b>{{ thing.name }}</b>
      </div>
      <div>
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
          {{ thing.likes }}
        </span>
        <span>
          <i class="el-icon-download"></i>
          {{ thing.download }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InnerCard",
  data() {
    return {
      thing: {
        url: "https://cdn.thingiverse.com/assets/cd/8d/92/bc/21/small_thumb__.png",
        name: "shuhantest",
        likes: 3,
        download: 8,
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.inner-card {
  width: 250px;
  height: 55px;
  margin: 0 0 20px;
  border: 1px solid #e9e9eb;
  position: relative;
  background: #ececec;
  cursor: pointer;
  display: inline-flex;
}
.thing-info {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 5px;
}
</style>
