<template>
  <div class="container-profile">
    <el-dialog :visible.sync="dialogFollowersVisible">
      <el-tabs v-model="activeTab" @tab-click="handleClick" class="tabsContent">
        <el-tab-pane label="followers" name="first"
          ><IndexFollowPanel></IndexFollowPanel
        ></el-tab-pane>
        <el-tab-pane label="following" name="second">following</el-tab-pane>
      </el-tabs>
    </el-dialog>
    <div class="bg">
      <span class="ortur-icon-pen"></span>
      <img class="img" :src="user.bgImg" alt="" />
    </div>

    <div class="content">
      <div class="info">
        <img class="img" src="" alt="" />
        <div class="name">{{ user.name }}</div>
        <div class="desc" @click="editDesc" v-if="!isDescEdit">
          {{ user.desc }}
        </div>
        <el-input
          @blur="descChange"
          @change="descChange"
          v-if="isDescEdit"
          v-model="user.desc"
          autofocus="true"
          placeholder=""
        ></el-input>
        <div class="follow">
          <span class="followers" @click="openFollowDialog('first')"
            >{{ user.followers }} followers</span
          >
          <span class="following" @click="openFollowDialog('second')"
            >{{ user.following }} following</span
          >
        </div>
        <div class="twitter">5312</div>
      </div>
      <div class="tabs">
        <span class="editTab">edit</span>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          class="tabsContent"
        >
          <el-tab-pane label="Resource" name="first">Resource</el-tab-pane>
          <el-tab-pane label="Likes" name="second">Likes</el-tab-pane>
          <el-tab-pane label="Collections" name="third"
            >Collections</el-tab-pane
          >
          <el-tab-pane label="History" name="fourth">History</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import IndexFollowPanel from "./IndexFollowPanel.vue";
import { getUserInfoByUserId } from "@/api/user";
export default {
  // eslint-disable-next-line
  name: "Design",
  components: { IndexFollowPanel },
  mounted() {
    getUserInfoByUserId({
      id: this.$route.params.userId,
      userId: this.$store.getters.userId,
    }).then((res) => {
      console.log(res);
    });
  },
  methods: {
    openFollowDialog(index) {
      //console.log(e)
      this.activeTab = index;
      this.dialogFollowersVisible = true;
    },
    descChange() {
      //console.log(e)
      this.isDescEdit = false;
    },
    editDesc() {
      //console.log(e)
      this.isDescEdit = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  data() {
    return {
      activeTab: "first",
      activeName: "first",
      isDescEdit: false,
      dialogFollowersVisible: false,
      user: {
        bgImg: "",
        name: "yang",
        desc: "yang 654651",
        following: "14",
        followers: "13",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.img {
  background-color: black;
  width: 100%;
  height: 100%;
}
.container-profile {
  box-sizing: border-box;
  .tabs {
    width: 600px;
    position: relative;
    .editTab {
      position: absolute;
      top: 12px;
      right: 12px;
    }
  }
  .bg {
    margin: 0 auto;
    width: 1080px;
    height: 200px;
    position: relative;
    .ortur-icon-pen {
      right: 12px;
      top: 12px;
      position: absolute;
      color: white;
    }
  }
  background: #f2f2f2;
  text-align: center;
  .content {
    display: flex;
    width: 1080px;
    margin: 0 auto;
    .info {
      position: relative;
      top: -50px;
    }
    .img {
      background-color: red;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .desc:hover {
      border: 1px solid #000;
      cursor: pointer;
    }
  }
}
</style>
