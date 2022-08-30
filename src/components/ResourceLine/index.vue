<template>
  <div class="resource-line-wrapper">
    <div class="userinfo">
      <div class="avatar"><img :src="authorInfo.avatar" /></div>
      <div class="follow-wrapper">
        <div class="username">{{ authorInfo.name }}</div>
        <div class="follow-info">
          <el-button>关注</el-button>
          <span>
            <span class="fans-num">{{ authorInfo.follower_count }}</span>
            <span class="follow-text"> Follows</span>
          </span>
        </div>
      </div>
    </div>
    <div class="cover-list-wrapper" v-if="authorInfo.resources.length > 0">
      <img
        v-for="item in authorInfo.resources.slice(0, 5)"
        :src="item.image"
        :key="item.id"
      />
    </div>
    <div v-if="authorInfo.resources.length <= 0">Not resource Yet</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    authorInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.resource-line-wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  .userinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 270px;
    height: 84px;
    background: none;
    .avatar {
      width: 74px;
      height: 74px;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .follow-wrapper {
      width: 160px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      margin-right: 20px;
      .follow-info {
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-button {
          font-size: 10px;
          width: 84px;
          height: 30px;
          line-height: 30px;
          background: #1e78f0;
          color: #fff;
          border-radius: 6px;
          padding: unset;
        }
        .fans-num {
          color: #000010;
        }
        .follow-text {
          color: #ccc;
        }
      }
    }
  }
  .cover-list-wrapper {
    width: 1150px;
    display: flex;
    align-items: center;
    img {
      width: 138px;
      height: 84px;
      object-fit: cover;
    }
    img + img {
      margin-left: 30px;
    }
  }
}
</style>
