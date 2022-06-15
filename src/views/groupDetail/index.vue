<template>
  <div>
    <header
      style="
        width: 100%;
        height: 220px;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        align-content: flex-start;
      "
    >
      <div style="border: 1px solid black; width: 970px">
        <span>{{ back.name }} > {{ group.name }}</span>
      </div>
      <div
        style="
          width: 970px;
          height: 100%;
          display: flex;
          border: 1px solid red;
          align-items: center;
        "
      >
        <div style="margin-left: 60px">
          <el-image :src="groupImg"></el-image>
        </div>
        <div style="margin-left: 30px">
          <p>{{ group.name }}</p>
          <p>
            <span> {{ group.topics }} <b>Topics</b> </span>
            <span>
              {{ group.things }}
              <b>Things</b>
            </span>
            <span>
              {{ group.members }}
              <b>Members</b>
            </span>
          </p>
          <p>
            <el-button>JOIN GROUP</el-button>
          </p>
        </div>
      </div>
    </header>
    <div style="width: 100%; border: 1px solid red">
      <nav
        class="nav"
        style="
          background-color: #fff;
          border: 1px solid black;
          width: 970px;
          margin: 0 auto;
          display: flex;
        "
      >
        <a>
          <i class="el-icon-connection"></i>
          <span>Forums</span>
        </a>
        <a>
          <i class="el-icon-folder-opened"></i>
          <span>Things</span>
        </a>
        <a>
          <i class="el-icon-user"></i>
          <span>Members</span>
        </a>
        <a>
          <i class="el-icon-warning-outline"></i>
          <span>About</span>
        </a>
      </nav>
    </div>
    <div style="width: 100%; border: 1px solid red">
      <div style="width: 970px; margin: 0 auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GroupDetail",
  data() {
    return {
      back: {
        url: "",
        name: "Ortur Groups",
      },
      groupImg:
        "https://cdn.thingiverse.com/renders/ce/ea/f3/26/0a/gears_thumb_large.jpg",
      group: {
        name: "Engineering",
        topics: 1620,
        things: 2246,
        members: 24400,
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.nav {
  a {
    width: 100%;
    height: 58px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ececec;
    border: 1px solid #666;
    cursor: pointer;
  }
}
</style>
