<template>
  <div class="group-card">
    <div class="group-logo">
      <el-avatar :size="95" :src="group.groupLogo"></el-avatar>
    </div>
    <div class="group-info">
      <div class="group-title">{{ group.groupName }}</div>
      <el-row class="group-to">
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <el-button type="primary" @click="to('Forums')">VIEW GROUP</el-button>
        </el-col>
        <el-col :span="5" :offset="1">
          <div @click="to('Forums')">
            {{ group.topics }} <br />
            Topics
          </div>
        </el-col>
        <el-col :span="5" :offset="1">
          <div @click="to('Things')">
            {{ group.things }} <br />
            Things
          </div>
        </el-col>
        <el-col :span="5" :offset="1">
          <div @click="to('Members')">
            {{ group.members }} <br />
            Members
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="group-picture">
      <el-row>
        <el-col v-for="item in group.gourpImages" :key="item.id" :span="8">
          <el-image :fit="'contain'" :src="item.url" @click="to('Things')">
          </el-image>
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
  methods: {
    to(name) {
      console.log(name);
      this.$router.push(`/groupDetail/${name}/${this.group.groupId}`);
    },
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
    width: 300px;
    height: 95px;
    box-sizing: border-box;
    float: left;
    cursor: pointer;
    .el-col {
      height: 95px;
    }
  }
}
.group-to {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  height: 60%;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .group-card {
    height: 300px;
    width: 100%;
    background-color: #fff;
    display: block;
    padding: 10px;
    margin: 10px auto;
    box-sizing: border-box;
    .group-info {
      display: block;
      height: 98px;
      width: 100%;
    }
  }
  .group-logo {
    width: 100%;
    text-align: center;
  }
  .group-picture {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
