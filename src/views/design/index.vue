<template>
  <div class="container-profile">
    <el-dialog :visible.sync="dialogFollowersVisible">
      <el-tabs
        v-model="activeTab"
        @tab-click="handleFollowTapClick"
        class="tabsContent"
      >
        <el-tab-pane label="followers" name="first" class="followTapPanel">
          <IndexFollowPanel></IndexFollowPanel>
        </el-tab-pane>
        <el-tab-pane label="following" name="second" class="followTapPanel">
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
              :headers="headers"
              :on-success="handleImgUploadSuccess"
              :on-error="handleImgUploadErr"
              :before-upload="handleBeforeImgUpload"
              ref="upload"
              action="https://api.leadiffer.cn/system/user/avatar"
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
          :class="[{ NoDesc: !user.desc }, { descHover: isYourAccount }]"
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
        <div v-for="(item, index) in user.diyArr" :key="item.id">
          <div
            class="desc"
            @click="editDiy(item, index)"
            v-if="!item.isEdit"
            :class="[{ NoDesc: !item.text }, { descHover: isYourAccount }]"
          >
            <a target="_blank" v-if="!isYourAccount" :href="item.text">
              {{ item.text }}
            </a>
            <div v-if="isYourAccount">{{ item.text || "add something" }}</div>
          </div>
          <el-input
            class="descInput"
            ref="diyRef"
            @blur="editChange(item)"
            @change="editChange(item)"
            v-show="item.isEdit"
            v-model="item.text"
            placeholder=""
          ></el-input>
        </div>
        <div v-show="isYourAccount" class="add" @click="addDiy">+</div>
      </div>
      <div class="tabs">
        <!-- <span class="editTab">edit</span> -->
        <el-tabs
          v-model="activeName"
          @tab-click="handleResourceClick"
          class="tabsContent"
        >
          <el-tab-pane label="Resource" name="first" v-if="isYourAccount">
            <el-row :gutter="20">
              <div
                v-for="(item, index) in resources"
                :key="item.thingId"
                @contextmenu="showMenu(index, item)"
              >
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <resource-card
                    :thing="item"
                    :showEdit="true"
                    :showStar="false"
                    :showCollection="false"
                  >
                  </resource-card>
                </el-col>
                <vue-context-menu
                  class="contextMenu"
                  :contextMenuData="contextMenuData"
                  :transferIndex="transferIndex"
                  @Handler1="Handler_Del(index)"
                  @Handler2="Handler_B(index)"
                  @Handler3="Handler_Down(index)"
                  @Handler4="Handler_D(index)"
                  @Handler5="Handler_E(index)"
                ></vue-context-menu>
              </div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Likes" name="second">
            <el-row :gutter="20">
              <div v-for="item in Likes" :key="item.thingId">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <resource-card
                    :thing="item"
                    :showEdit="false"
                    :showStar="true"
                    :showCollection="false"
                  >
                  </resource-card>
                </el-col>
              </div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Collections" name="third">
            <el-row :gutter="20">
              <div v-for="item in collections" :key="item.thingId">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <resource-card
                    :thing="item"
                    :showEdit="false"
                    :showStar="false"
                  >
                  </resource-card>
                </el-col>
              </div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="History" name="fourth">
            <el-row :gutter="20">
              <div v-for="item in histories" :key="item.thingId">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <resource-card :thing="item"> </resource-card>
                </el-col>
              </div>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <SrollTopButton></SrollTopButton>
  </div>
</template>
<script>
import FollowButton from "@/components/FollowButton.vue";
import SrollTopButton from "@/components/SrollTopButton/index.vue";
import ResourceCard from "@/components/ResourceCard/index.vue";
import { getResourceList, updateDiy } from "@/api/design";

import IndexFollowPanel from "./IndexFollowPanel.vue";
import { getUserInfoByUserId } from "@/api/user";
import getters from "@/store/getters";
export default {
  name: "Design",
  components: {
    IndexFollowPanel,
    FollowButton,
    SrollTopButton,
    ResourceCard,
  },
  data() {
    return {
      getters: {},
      headers: {
        Authorization: getters.token,
      },
      histories: [],
      collections: [],
      Likes: [],
      transferIndex: null,
      contextMenuData: {
        menuName: "demo",
        axis: {
          x: null,
          y: null,
        },
        menulists: [
          {
            btnName: "Delete",
            fnHandler: "Handler1",
          },
          {
            btnName: "Move to",
            // fnHandler: "Handler2",

            children: [
              {
                fnHandler: "Handler5",
                btnName: "Collections",
              },
              {
                fnHandler: "Handler5",
                btnName: "Likes",
              },
            ],
          },

          {
            btnName: "Download",
            fnHandler: "Handler3",
          },
        ],
      },
      resources: [],
      activeTab: "first",
      activeName: "first",
      isYourAccount: true,
      isDescEdit: false,
      pagination: {
        pageSize: 10,
        currentPage: 1,
      },
      dialogFollowersVisible: false,
      user: {
        bgImg: "https://scpic.chinaz.net/files/pic/pic9/202207/apic42262.jpg",
        avatar: "https://scpic.chinaz.net/files/pic/pic9/202207/apic42262.jpg",
        following: "14",
        followers: "13",
        name: "yang4444444444",
        desc: "yang 654651",
        diyArr: [
          {
            isEdit: false,
            text: "11",
          },
          {
            isEdit: false,
            text: "11",
          },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$store.getters.token);
    this.getters = this.$store.getters;
    if ("yourSelf" == this.$route.params.userId) {
      this.isYourAccount = true;
      this.getLikesList();
      this.activeName = "second";
    }
    this.getResourceList();
    getUserInfoByUserId({
      id: this.$route.params.userId,
      userId: this.$store.getters.userId,
    }).then((res) => {
      console.log(res);
    });
  },
  methods: {
    handleFollowTapClick() {},
    getResourceList() {
      getResourceList(this.pagination).then((res) => {
        this.resources.push(...res.data.data);
      });
    },
    getLikesList() {
      getResourceList(this.pagination).then((res) => {
        this.Likes.push(...res.data.data);
      });
    },
    getCollectionsList() {
      getResourceList(this.pagination).then((res) => {
        this.collections.push(...res.data.data);
      });
    },
    getHistoriesList() {
      getResourceList(this.pagination).then((res) => {
        this.histories.push(...res.data.data);
      });
    },
    showMenu(index, item) {
      console.log("item: ", item);
      console.log("index: ", index);
      this.transferIndex = index; // tranfer index to child component
      event.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      this.contextMenuData.axis = {
        x,
        y,
      };
    },
    Handler_Del(index) {
      console.log("index:", index, "选项1-1-1绑定事件执行");
    },
    Handler_B(index) {
      console.log("index:", index, "选项1-1-2绑定事件执行");
    },
    Handler_Down(index) {
      console.log("index:", index, "选项1-2-1绑定事件执行");
    },
    Handler_D(index) {
      console.log("index:", index, "选项1-2-2绑定事件执行");
    },
    Handler_E(index) {
      console.log("index:", index, "选项2-1绑定事件执行");
    },
    addDiy() {
      //console.log(e)
      this.user.diyArr.push({
        isEdit: false,
        text: "",
      });
    },
    async handleBeforeImgUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(this.test());
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      debugger;

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
    editChange(item) {
      updateDiy({ item }).then(() => {
        item.isEdit = false;
      });
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
    editDiy(item, index) {
      if (!this.isYourAccount) {
        return;
      }
      //console.log(e)
      item.isEdit = true;
      setTimeout(() => {
        this.$refs.diyRef[index].focus();
      }, 0);
    },

    handleResourceClick() {
      if (this.activeName == "first") {
        this.getResourceList();
      } else if (this.activeName == "second") {
        this.getLikesList();
      } else if (this.activeName == "third") {
        this.getCollectionsList();
      } else if (this.activeName == "fourth") {
        this.getHistoriesList();
      }
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
  width: 1440px;
  margin: 0 auto;
  ::v-deep .el-dialog {
    width: 488px;
    height: 472px;
    background: #ffffff;
    border-radius: 20px;
  }
  .tabsContent {
    ::v-deep .el-tabs__item {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #1e78f0;
    }
    .contextMenu {
      background-color: black;
      color: white;
      ::v-deep {
        .context-menu-list {
          background-color: black;
          .btn-wrapper-simple {
            height: auto !important;
          }
        }
        .child-ul-wrapper {
          background-color: black;
          color: white;
          .child-li-wrapper {
            background-color: black;
          }
          .btn-wrapper-simple {
            height: auto !important;
          }
        }
      }
    }
  }
  .NoDesc {
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #cccccc !important;
  }
  box-sizing: border-box;
  .tabs {
    width: 1072px;
    position: relative;
    .editTab {
      position: absolute;
      top: 12px;
      right: 12px;
    }
  }
  .bg {
    margin: 0 auto;
    width: 1440px;
    height: 392px;
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
    margin: 0 auto;
    .info {
      position: relative;
      top: -50px;
      width: 350px;
      .add {
        font-size: 30px;
        text-align: center;
      }
      .name {
        margin-top: 12px;
        text-align: center;
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #1a1a1a;
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
        ::v-deep .el-button {
          padding: 5px;
          width: 112px;
          height: 40px;
          background: #1e78f0;
          border-radius: 8px;
          font-size: 16px;
        }
      }
      .desc {
        margin-top: 12px;
        padding: 7px;
        word-wrap: break-word;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #1a1a1a;
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
        width: 120px;
        height: 119px;
        border-radius: 50%;
        display: none;
      }
      .img {
        background-color: red;
        width: 120px;
        height: 119px;
        border-radius: 50%;
      }
    }
    .imgWrap:hover .imgEdit {
      display: inline-block;
    }
    .descHover:hover {
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 6px;
      cursor: pointer;
    }
  }
}
</style>
