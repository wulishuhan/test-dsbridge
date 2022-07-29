<template>
  <div class="container-profile">
    <el-dialog :visible.sync="dialogFollowersVisible">
      <el-tabs v-model="activeTab" @tab-click="handleClick" class="tabsContent">
        <el-tab-pane label="followers" name="first">
          <IndexFollowPanel></IndexFollowPanel>
        </el-tab-pane>
        <el-tab-pane label="following" name="second">
          <IndexFollowPanel></IndexFollowPanel>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <div class="bg">
      <span v-if="isYourAccount" class="ortur-icon-pen">
        <el-upload
          v-if="isYourAccount"
          class="upload-bg"
          :on-success="handleImgUploadSuccess"
          :on-error="handleImgUploadErr"
          :before-upload="handleBeforeImgUpload"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="true"
          :show-file-list="false"
        >
          <button slot="trigger" size="small" type="primary"></button>
        </el-upload>
      </span>

      <img class="img" :src="user.bgImg" alt="" />
    </div>

    <div class="content">
      <div class="info">
        <div class="imgWrap">
          <span v-if="isYourAccount" class="ortur-icon-pen imgEdit">
            <el-upload
              v-if="isYourAccount"
              class="upload-demo"
              :on-success="handleImgUploadSuccess"
              :on-error="handleImgUploadErr"
              :before-upload="handleBeforeImgUpload"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="true"
              :show-file-list="false"
            >
              <button slot="trigger" size="small" type="primary">
                选取文件
              </button>
            </el-upload>
          </span>

          <img class="img" mode="widthFix" :src="user.avatar" alt="" />
        </div>
        <div class="name">{{ user.name }}</div>
        <FollowButton class="followBtn"></FollowButton>
        <div
          class="desc"
          @click="editDesc"
          v-if="!isDescEdit"
          :class="{ NoDesc: !user.desc }"
        >
          {{ user.desc || "add a description" }}
        </div>
        <el-input
          class="descInput"
          type="textarea"
          ref="descRef"
          @blur="descChange"
          @change="descChange"
          v-show="isDescEdit"
          v-model="user.desc"
          placeholder=""
        ></el-input>
        <div class="follow">
          <span class="followers" @click="openFollowDialog('first')"
            >{{ user.followers }} <span style="color: #ccc"> followers</span>
          </span>
          <span class="following" @click="openFollowDialog('second')"
            >{{ user.following }}<span style="color: #ccc"> following</span>
          </span>
        </div>
        <div
          class="desc"
          @click="editTwitter"
          v-if="!isTwitterEdit"
          :class="{ NoDesc: !user.twitter }"
        >
          {{ user.twitter || "add a twitter" }}
        </div>
        <el-input
          class="descInput"
          ref="twitterRef"
          @blur="twitterChange"
          @change="twitterChange"
          v-show="isTwitterEdit"
          v-model="user.twitter"
          placeholder=""
        ></el-input>
        <div
          class="desc"
          @click="editLocation"
          v-if="!isLocationEdit"
          :class="{ NoDesc: !user.location }"
        >
          {{ user.location || "add a Location" }}
        </div>
        <el-input
          class="descInput"
          ref="locationRef"
          @blur="locationChange"
          @change="locationChange"
          v-show="isLocationEdit"
          v-model="user.location"
          placeholder=""
        ></el-input>
        <div
          class="desc"
          @click="editFacebook"
          v-if="!isFacebookEdit"
          :class="{ NoDesc: !user.facebook }"
        >
          {{ user.facebook || "add a facebook" }}
        </div>
        <el-input
          class="descInput"
          ref="facebookRef"
          @blur="facebookChange"
          @change="facebookChange"
          v-show="isFacebookEdit"
          v-model="user.facebook"
          placeholder=""
        ></el-input>
      </div>
      <div class="tabs">
        <!-- <span class="editTab">edit</span> -->
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
import FollowButton from "@/components/FollowButton.vue";

import IndexFollowPanel from "./IndexFollowPanel.vue";
import { getUserInfoByUserId } from "@/api/user";
export default {
  // eslint-disable-next-line
  name: "Design",
  components: { IndexFollowPanel, FollowButton },
  data() {
    return {
      activeTab: "first",
      activeName: "first",
      isYourAccount: true,
      isDescEdit: false,
      isTwitterEdit: false,
      isFacebookEdit: false,
      isLocationEdit: false,
      dialogFollowersVisible: false,
      user: {
        bgImg: "https://scpic.chinaz.net/files/pic/pic9/202207/apic42262.jpg",
        name: "yang4444444444",
        desc: "yang 654651",
        twitter: "",
        faceBook: "",
        location: "",
        following: "14",
        followers: "13",
        avatar: "https://scpic.chinaz.net/files/pic/pic9/202207/apic42262.jpg",
      },
    };
  },
  mounted() {
    getUserInfoByUserId({
      id: this.$route.params.userId,
      userId: this.$store.getters.userId,
    }).then((res) => {
      console.log(res);
    });
  },
  methods: {
    async handleBeforeImgUpload(file) {
      debugger;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(this.test());
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    handleImgUploadErr(err) {
      //console.log(e)
      this.$message.error("上传失败" + err);
    },
    handleImgUploadSuccess() {
      //console.log(e)
      this.$message.success("上传成功");
    },
    openFollowDialog(index) {
      //console.log(e)
      this.activeTab = index;
      this.dialogFollowersVisible = true;
    },
    descChange(e) {
      console.log(e);
      this.isDescEdit = false;
    },
    twitterChange(e) {
      console.log(e);
      this.isTwitterEdit = false;
    },
    locationChange(e) {
      console.log(e);
      this.isLocationEdit = false;
    },
    facebookChange(e) {
      console.log(e);
      this.isFacebookEdit = false;
    },
    editDesc() {
      if (!this.isYourAccount) {
        return;
      }
      //console.log(e)
      this.isDescEdit = true;
      setTimeout(() => {
        this.$refs.descRef.focus();
      }, 0);
    },
    editTwitter() {
      if (!this.isYourAccount) {
        return;
      }
      //console.log(e)
      this.isTwitterEdit = true;
      setTimeout(() => {
        this.$refs.twitterRef.focus();
      }, 0);
    },
    editLocation() {
      if (!this.isYourAccount) {
        return;
      }
      //console.log(e)
      this.isLocationEdit = true;
      setTimeout(() => {
        this.$refs.locationRef.focus();
      }, 0);
    },
    editFacebook() {
      if (!this.isYourAccount) {
        return;
      }
      //console.log(e)
      this.isFacebookEdit = true;
      setTimeout(() => {
        this.$refs.facebookRef.focus();
      }, 0);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
  .NoDesc {
    color: red;
  }
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
    .upload-bg {
      // right: 12px;
      // top: 12px;
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      top: 0;
      ::v-deep .el-upload--text {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        cursor: pointer;
      }
    }
    .ortur-icon-pen {
      right: 12px;
      top: 12px;
      position: absolute;
      color: white;
    }
  }
  text-align: center;
  .content {
    text-align: left;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 1080px;
    margin: 0 auto;
    .info {
      position: relative;
      top: -50px;
      width: 300px;
      .name {
        margin-top: 12px;
        text-align: center;
        font-size: 25px;
      }
      .follow {
        margin-top: 12px;
        .followers {
          margin-right: 12px;
        }
        .following {
        }
      }
      .followBtn {
        margin-top: 12px;
        margin-left: 12px;
        ::v-deep .el-button {
          padding: 5px;
          font-size: 12px;
        }
      }
      .desc {
        margin-top: 12px;
        padding: 7px;
        word-wrap: break-word;
      }
      .descInput {
        margin-top: 12px;
      }
    }
    .imgWrap {
      position: relative;
      display: inline-block;
      left: 50%;
      margin-left: -50px;
      text-align: center;
      .upload-demo {
        position: absolute;
        top: 0;
        left: 0;
        background-color: black;
        line-height: 100px;
        color: white;
        opacity: 0;
        display: inline-block;
        width: 100%;
        height: 100%;

        ::v-deep .el-upload--text {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      .imgEdit {
        position: absolute;
        top: 0;
        font-size: 40px;
        background-color: black;
        line-height: 100px;
        color: white;
        opacity: 0.5;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: none;
      }
      .img {
        background-color: red;
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    .imgWrap:hover .imgEdit {
      display: inline-block;
    }
    .desc:hover {
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 6px;
      cursor: pointer;
    }
  }
}
</style>
