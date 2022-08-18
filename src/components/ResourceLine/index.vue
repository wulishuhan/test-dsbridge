<template>
  <div class="resource-line-wrapper">
    <div class="userinfo">
      <div class="avatar"></div>
      <div class="follow-wrapper">
        <div class="username">J chen</div>
        <div class="follow-info">
          <el-button>关注</el-button>
          <span>
            <span class="fans-num">45</span>
            <span class="follow-text"> Follows</span>
          </span>
        </div>
      </div>
    </div>
    <div class="cover-list-wrapper">
      <img
        src="https://orturbucket.s3.amazonaws.com/assets/2022/08/10/c4d93a3805b3ce3f323f7974e6f78jpeg_20220810174516A016.jpeg"
      />
      <img
        src="https://orturbucket.s3.amazonaws.com/assets/2022/08/10/c4d93a3805b3ce3f323f7974e6f78jpeg_20220810174516A016.jpeg"
      />
      <img
        src="https://orturbucket.s3.amazonaws.com/assets/2022/08/10/c4d93a3805b3ce3f323f7974e6f78jpeg_20220810174516A016.jpeg"
      />

      <img
        src="https://orturbucket.s3.amazonaws.com/assets/2022/08/10/c4d93a3805b3ce3f323f7974e6f78jpeg_20220810174516A016.jpeg"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    coverList: {
      type: Array,
      default: () => {
        return [];
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
      background: #aaa;
      border-radius: 50%;
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
    }
    img + img {
      margin-left: 30px;
    }
  }
}
</style>
