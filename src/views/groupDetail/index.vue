<template>
  <div>
    <header>
      <div class="test">
        <div class="header-back">
          <span>{{ back.name }} > {{ group.groupName }}</span>
        </div>
        <div class="group-info-box">
          <div class="group-info-box-img">
            <!-- <el-image :src="group.groupImg" class="groupImg"></el-image> -->
            <img :src="group.groupImg" class="groupImg" />
          </div>
          <div class="group-info-box-info">
            <p>{{ group.groupName }}</p>
            <p class="group-message-box">
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
              <el-button @click="changeJoinStatus">{{ joinText }}</el-button>
            </p>
          </div>
        </div>
      </div>
    </header>
    <nav class="nav">
      <el-row class="nav-box" type="flex" justify="space-evenly">
        <el-col
          class="nav-item"
          :xs="12"
          :sm="12"
          :md="6"
          :lg="6"
          :xl="6"
          @click.native="to('Forums')"
        >
          <i class="el-icon-connection"></i>
          <span>Forums</span>
        </el-col>
        <el-col
          class="nav-item"
          :xs="12"
          :sm="12"
          :md="6"
          :lg="6"
          :xl="6"
          @click.native="to('Things')"
        >
          <i class="el-icon-folder-opened"></i>
          <span>Things</span>
        </el-col>
        <el-col
          class="nav-item"
          :xs="12"
          :sm="12"
          :md="6"
          :lg="6"
          :xl="6"
          @click.native="to('Members')"
        >
          <i class="el-icon-user"></i>
          <span>Members</span>
        </el-col>
        <el-col
          class="nav-item"
          :xs="12"
          :sm="12"
          :md="6"
          :lg="6"
          :xl="6"
          @click.native="to('About')"
        >
          <i class="el-icon-warning-outline"></i>
          <span>About</span>
        </el-col>
      </el-row>
    </nav>
    <div class="children">
      <div class="children-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { getGroupsInfo, changeUserGroupStatus } from "@/api/groups";
export default {
  name: "GroupDetail",
  mounted() {
    getGroupsInfo({
      groupId: this.$route.params.groupId,
      userId: this.$store.getters.userId,
    }).then((res) => {
      this.group = res.data.data;
      this.isJoinGroup = res.data.data.isJoinGroup;
    });
  },
  data() {
    return {
      back: {
        url: "",
        name: "Ortur Groups",
      },
      groupImg:
        "https://cdn.thingiverse.com/renders/ce/ea/f3/26/0a/gears_thumb_large.jpg",
      group: {},
      isJoinGroup: false,
    };
  },
  computed: {
    joinText() {
      return this.isJoinGroup ? "LEAVE GROUP" : "JOIN GROUP";
    },
  },
  methods: {
    to(name) {
      console.log("test");
      let path = this.$route.path.toString();
      console.log(path.search(name));
      if (path.search(name) === -1) {
        this.$router.push(`/groupDetail/${name}/${this.$route.params.groupId}`);
      }
    },
    changeJoinStatus() {
      this.isJoinGroup = !this.isJoinGroup;
      changeUserGroupStatus({
        isJoinGroup: this.isJoinGroup,
        userId: this.$store.getters.userId,
      }).then((res) => {
        console.log("changeJoinStatus:", res);
        this.$message({
          message: "恭喜你，这是一条成功消息",
          type: "success",
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
header {
  width: 100%;
  height: 220px;
}
.header-back {
  width: 970px;
}
.group-info-box {
  width: 970px;
  height: 100%;
  display: flex;
  align-items: center;
}
.group-info-box-info {
  margin-left: 60px;
}
.nav {
  background-color: #fff;
  display: flex;
  .nav-box {
    width: 970px;
    margin: 0 auto;
    .nav-item {
      width: 100%;
      height: 58px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #ececec;
      cursor: pointer;
    }
  }
}
.children {
  width: 100%;
  background-color: #ececec;
}
.children-box {
  width: 970px;
  margin: 0 auto;
}
.groupImg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.test {
  width: 970px;
  margin: 0 auto;
}
@media screen and (max-width: 768px) {
  .header-back {
    width: 100%;
  }
  .test {
    width: 100%;
  }
  .nav-box {
    font-size: 12px;
    width: 100%;
  }
  .group-info-box {
    width: 100%;
    justify-content: space-between;
  }
  .children-box {
    width: 100%;
    margin: 0 auto;
  }
  .group-message-box {
    display: flex;
    flex-direction: column;
  }
  .group-info-box-info {
    margin-left: 0px;
    margin-right: 12px;
  }
}
</style>
