<template>
  <div class="designer-card">
    <div class="designer-card-content">
      <div class="img">
        <img :src="user.uploadImg" />
      </div>
      <div class="designer-card-info">
        <el-avatar :size="40" :src="user.avatar"></el-avatar>
        <div class="designer-card-info-name">{{ user.name }}</div>
        <div class="designer-card-info-address">{{ user.address }}</div>
        <div><el-button size="small">follow</el-button></div>
      </div>
    </div>
    <el-row class="card-action-item">
      <el-col :span="8">
        <div class="follower-item">
          <div class="follower-data">{{ user.followers }}</div>
          <div class="follower-name">Followers</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="follower-item">
          <div class="follower-data">{{ user.following }}</div>
          <div class="follower-name">Following</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="follower-item">
          <div class="follower-data">{{ user.designs }}</div>
          <div class="follower-name">Designs</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "DesignerCard",
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.designer-card {
  width: 300px;
  height: 340px;
  background-color: #fff;
  margin: 15px auto;
  text-align: center;
  .designer-card-content {
    color: #248bfb;
    width: 100%;
    height: 263px;
    .img {
      height: 110px;
      img {
        width: 100%;
      }
    }
    .designer-card-info {
      height: 135px;
      position: relative;
      top: -35px;
      text-align: center;
      .designer-card-info-name {
        font-weight: 400;
        font-size: 18px;
      }
      .designer-card-info-address {
        font-size: 12px;
      }
    }
  }
  .card-action-item {
    text-align: center;
  }
  .follower-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 76px;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    align-content: center;
    flex-wrap: wrap;
    .follower-data {
      color: #555;
      width: 100%;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
    }
    .follower-name {
      color: #555;
      font-weight: 400;
      font-size: 12px;
    }
  }
  .el-button {
    margin-top: 20px;
  }
}
</style>
