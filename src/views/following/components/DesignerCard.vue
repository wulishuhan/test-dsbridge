<template>
  <div class="designer-card">
    <div :style="cardBackground">
      <el-image :src="follow.avatar"> </el-image>
    </div>
    <div class="card-info">
      <div class="follow-button">
        <el-button size="small">FOLLOW</el-button>
      </div>
      <div class="text-info">
        <span>{{ follow.name }}</span>
        <br />
        <span>{{ follow.address }}</span>
      </div>
    </div>
    <div class="card-content-bottom">
      <div class="card-bottom-number-show">
        <span>{{ follow.designs }}</span>
        <span>Designs</span>
      </div>
      <div class="card-bottom-number-show">
        <span>{{ follow.makes }}</span>
        <span>Makes</span>
      </div>
      <div class="card-bottom-number-show">
        <span>{{ follow.collections }}</span>
        <span>Collections</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DesignerCard",
  props: ["follow"],
  data() {
    return {
      cardBackground: {
        backgroundImage: `url(${this.follow.background})`,
        width: `296px`,
        height: `122px`,
        backgroundSize: `100% 100%`,
        backgroundRepeat: `no-repeat`,
      },
    };
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.designer-card {
  width: 296px;
  height: 265px;
  background: #fff;
  border: 2px solid #ececec;
  margin-top: 10px;
  .card-info {
    height: 89px;
    width: 296px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ececec;
  }
  .follow-button {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 89px;
    .el-button {
      margin-left: 10px;
      margin-bottom: 10px;
    }
  }
  .text-info {
    font-size: 14px;
    margin-left: 10px;
  }
  .el-image {
    width: 67px;
    height: 67px;
    border-radius: 50%;
    border: 4px solid #fff;
    position: relative;
    top: 70px;
    left: 25px;
  }
  .el-button {
    background-color: #666;
    width: 100px;
    height: 35px;
    color: #fff;
  }
  .card-content-bottom {
    display: flex;
    justify-content: space-around;
    width: 296px;
    .card-bottom-number-show {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 4px;
    }
  }
}
</style>
