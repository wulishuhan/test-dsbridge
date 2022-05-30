<template>
  <div class="group-card">
    <div class="group-logo">
      <el-avatar :size="95" :src="group.logo"></el-avatar>
    </div>
    <div class="group-info">
      <div class="group-title">{{ group.name }}</div>
      <el-row
        style="
          display: flex;
          justify-content: center;
          align-content: center;
          align-items: center;
          text-align: center;
          height: 60%;
        "
      >
        <el-col :span="6"
          ><el-button type="primary">VIEW GROUP</el-button></el-col
        >
        <el-col :span="5" :offset="1"
          >{{ group.topics }} <br />
          Topics</el-col
        >
        <el-col :span="5" :offset="1"
          >{{ group.things }} <br />
          Things</el-col
        >
        <el-col :span="5" :offset="1"
          >{{ group.members }} <br />
          Members</el-col
        >
      </el-row>
    </div>
    <div class="group-picture">
      <el-row>
        <el-col v-for="item in group.gourpImages" :key="item.id" :span="8">
          <el-image :src="item.url"> </el-image>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupCard",
  props: {
    group: {
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
.group-card {
  height: 95px;
  width: 970px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  margin: 10px auto;
  .group-logo {
    width: 95px;
    height: 95px;
  }
  .group-info {
    width: 429px;
    height: 95px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    .group-title {
      width: 100%;
      height: 40%;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .group-picture {
    width: 380px;
    height: 95px;
    float: left;
    .el-col {
      height: 95px;
    }
  }
}
</style>
