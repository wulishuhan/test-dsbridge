<template>
  <div @click="closeAllDialog">
    <div class="container-profile" id="top">
      <CollectedOption
        style="z-index: 9999"
        :show="openCollectedOption"
        :folders="folders"
        :style="collectionStyle"
        @close="closeCollectedOption"
        @moveFolder="moveCollectedOption"
        @addFolder="addFolder"
      ></CollectedOption>
      <el-dialog :visible.sync="dialogFollowersVisible" class="followDialog">
        <el-tabs
          v-model="activeTab"
          @tab-click="handleFollowTapClick"
          class="tabsContent"
        >
          <el-tab-pane
            :label="$t('design.follower')"
            name="first"
            class="followTapPanel"
          >
            <IndexFollowPanel
              :userList="followerList"
              :myFollowList="myFollowList"
              :myUserId="userInfo.user_id"
            ></IndexFollowPanel>
          </el-tab-pane>
          <el-tab-pane
            :label="$t('design.following')"
            name="second"
            class="followTapPanel"
          >
            <IndexFollowPanel
              :userList="followingList"
              :myUserId="userInfo.user_id"
              :myFollowList="myFollowList"
            ></IndexFollowPanel>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>

      <div class="bg">
        <span v-if="isYourAccount" class="ortur-icon-pen">
          <el-upload
            v-if="isYourAccount"
            class="upload-bg"
            :headers="headers"
            :on-success="handleBgImgUploadSuccess"
            :on-error="handleImgUploadErr"
            :before-upload="handleBeforeImgUpload"
            ref="upload"
            :action="baseURL + '/library/author/cover'"
            :auto-upload="true"
            :show-file-list="false"
          >
            <button slot="trigger" size="small" type="primary"></button>
          </el-upload>
        </span>

        <img
          class="img"
          v-if="user.cover_image && user.cover_image.length > 0"
          :src="user.cover_image"
          alt=""
        />
        <img
          class="img"
          v-else
          src="../../assets/img/Frame 58644504.png"
          alt=""
        />
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
                :action="baseURL + '/system/user/avatar'"
                :auto-upload="true"
                :show-file-list="false"
              >
                <button slot="trigger" size="small" type="primary">
                  选取文件
                </button>
              </el-upload>
            </span>

            <!-- <img
            class="img"
            v-if="
              (isYourAccount && userInfo.avatar.length == 0) ||
              user.avatar.length == 0
            "
            :src="
              isYourAccount
                ? 'http://dummyimage.com/300x200/96f279/FFF&text=' +
                  userInfo.nick_name
                : 'http://dummyimage.com/300x200/96f279/FFF&text=' + user.name
            "
          /> -->
            <img class="img" v-if="isYourAccount" :src="userInfo.avatar" />
            <img
              class="img"
              mode="widthFix"
              v-else
              :src="user.avatar ? user.avatar : defaultAvatar"
              alt=""
            />
          </div>
          <div class="name">
            {{ isYourAccount ? userInfo.nick_name : user.name }}
          </div>
          <FollowButton
            class="followBtn"
            v-if="!isYourAccount"
            :user-id="userId"
            :follow="myFollowingList.includes(userId - 0)"
          ></FollowButton>
          <div
            class="desc"
            @click="editDesc"
            v-if="!isDescEdit"
            :class="[
              { NoDesc: !user.description },
              { descHover: isYourAccount },
            ]"
          >
            {{ descFormat || "add a description" }}
          </div>
          <el-input
            class="descInput"
            type="textarea"
            ref="descRef"
            autosize
            @blur="descChange"
            v-show="isDescEdit"
            v-model="user.description"
            placeholder=""
          ></el-input>
          <div class="follow">
            <span class="followers" @click="openFollowDialog('first')"
              >{{ user.follower_count }}
              <span style="color: #ccc">{{ $t("design.follower") }}</span>
            </span>
            <span class="following" @click="openFollowDialog('second')"
              >{{ user.following_count
              }}<span style="color: #ccc"> {{ $t("design.following") }}</span>
            </span>
          </div>
          <div v-for="(item, index) in diyArr" :key="item.id">
            <div
              class="desc"
              @click="editDiy(item, index)"
              v-if="!item.isEdit"
              :class="[{ NoDesc: !item.text }, { descHover: isYourAccount }]"
            >
              <a
                target="_blank"
                style="color: #1e78f0"
                v-if="item.text.startsWith('http')"
                :href="item.text"
              >
                {{ item.text }}
              </a>
              <div v-else>{{ item.text || "add something" }}</div>
            </div>
            <el-input
              class="descInput"
              ref="diyRef"
              v-on:keyup.enter.native="editChange(item, index)"
              @blur="editChange(item, index)"
              v-show="item.isEdit"
              v-model="item.text"
              placeholder=""
            ></el-input>
          </div>
          <div
            v-show="isYourAccount && diyArr.length < 3"
            class="add"
            @click="addDiy"
          >
            +
          </div>
        </div>
        <div class="tabs">
          <!-- <span class="editTab">edit</span> -->
          <el-tabs
            v-model="activeName"
            @tab-click="handleResourceClick"
            class="tabsContent"
          >
            <el-tab-pane :label="$t('design.resources')" name="first">
              <el-tabs
                v-model="resourceActiveTab"
                @tab-click="handleResourceTabClick"
                class="resourceTabsContent"
              >
                <el-tab-pane :label="$t('design.mine')" name="first">
                  <el-row :gutter="20">
                    <div
                      class="resourceWrapper"
                      v-for="(item, index) in resources"
                      :key="item.thingId"
                      @contextmenu="showMenu(index, item)"
                    >
                      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <resource-card
                          :key="item.id"
                          @clickMoveMenu="Handler_MoveTo(item)"
                          @clickDelMenu="Handler_Del(item)"
                          @clickDownMenu="Handler_Down(item)"
                          @openCollection="openCollection"
                          @deleteCollection="deleteCollection"
                          :isCollected="myCollects.includes(item.id)"
                          :thing="item"
                          :showEdit="isLogin && isYourAccount"
                          :showMoreMenuBtn="isYourAccount && true"
                          :showAvatar="false"
                          :showCollection="!isLogin || !isYourAccount"
                          :isYourAccount="isYourAccount"
                          :isLike="myLikes.includes(item.id)"
                          :showStar="false"
                        >
                        </resource-card>
                      </el-col>
                      <!-- <vue-context-menu
                      class="contextMenu"
                      :contextMenuData="contextMenuData"
                      :transferIndex="transferIndex"
                      @Handler1="Handler_Del(item)"
                      @Handler2="Handler_MoveTo(item)"
                      @Handler3="Handler_Down(item)"
                    ></vue-context-menu> -->
                    </div>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('design.remixes')" name="second">
                  <el-row :gutter="20">
                    <div
                      class="resourceWrapper"
                      v-for="(item, index) in remixesList"
                      :key="item.thingId"
                      @contextmenu="showMenu(index, item)"
                    >
                      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <resource-card
                          :key="item.id"
                          @clickMoveMenu="Handler_MoveTo(item)"
                          @clickDelMenu="Handler_Del(item)"
                          @clickDownMenu="Handler_Down(item)"
                          @openCollection="openCollection"
                          @deleteCollection="deleteCollection"
                          :isCollected="myCollects.includes(item.id)"
                          :thing="item"
                          :showEdit="isLogin && isYourAccount"
                          :showMoreMenuBtn="isYourAccount && true"
                          :showAvatar="false"
                          :showCollection="!isLogin || !isYourAccount"
                          :isYourAccount="isYourAccount"
                          :isLike="myLikes.includes(item.id)"
                          :showStar="false"
                        >
                        </resource-card>
                      </el-col>
                    </div>
                  </el-row>
                </el-tab-pane>

                <el-tab-pane :label="$t('design.makes')" name="third">
                  <!-- <PostMakeDialog
                  :isShow.sync="dialogPostMake"
                  :customClass="'make-dialog'"
                ></PostMakeDialog> -->
                  <ElImageViewer
                    class="imageViewer"
                    v-if="showMake"
                    :on-close="closeMake"
                    :url-list="makes"
                    :isMake="true"
                    :initialIndex="index"
                  ></ElImageViewer>
                  <!-- <ViewMake
                  :makes="makes"
                  :isShow.sync="dialogViewMake"
                ></ViewMake> -->
                  <div style="display: flex; flex-wrap: wrap">
                    <Make
                      v-for="(item, index) in makes"
                      :key="item.id"
                      class="Make"
                      @clickDownMenu="Handler_Down(item)"
                      @clickDelMenu="handleDelMakeClick(item)"
                      @openMake="openMake(item)"
                      @getIndex="getIndex"
                      :make="item"
                      :index="index"
                      :showMoreIcon="true"
                      :isYourAccount="isYourAccount"
                    ></Make>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane :label="$t('design.likes')" name="second">
              <el-row :gutter="20">
                <div v-for="item in Likes" :key="item.thingId">
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <resource-card
                      :key="item.id"
                      :thing="item"
                      :showEdit="false"
                      :showStar="true"
                      @openCollection="openCollection"
                      :showCollection="!isLogin || !isYourAccount"
                      :isLike="myLikes.includes(item.id)"
                      :isCollected="myCollects.includes(item.id)"
                      @deleteCollection="deleteCollection"
                    >
                    </resource-card>
                  </el-col>
                </div>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('design.collection')" name="third">
              <RowFolder
                v-show="!dialogCollectionVisible"
                :isYourAccount="isYourAccount"
                style="width: 98%; margin-bottom: 20px"
                :value="rowFolders"
                :onFolderAdd="onFolderAdd"
                @clickFolder="handleClickFolder"
                @delFolder="handleDelFolder"
              ></RowFolder>
              <div class="draft" v-show="!dialogCollectionVisible">Draft</div>
              <div
                class="noCollection"
                v-show="collections.length == 0 && !dialogCollectionVisible"
              >
                {{ this.$t("design.noCollection") }}
              </div>
              <div class="nav" v-show="dialogCollectionVisible">
                <i class="el-icon-back" @click="handleCollectDialogClose"></i>
                <div>{{ collectionName }}</div>
              </div>
              <div class="collectionDialog" v-show="dialogCollectionVisible">
                <div
                  v-for="item in folderCollection"
                  :key="item.thingId"
                  style="width: 33.3%"
                >
                  <resource-card
                    @clickMoveMenu="Handler_MoveTo(item)"
                    @clickDelMenu="handleCancelCollect(item)"
                    @clickDownMenu="Handler_Down(item)"
                    @moveCollectionComplete="handleMoveCollectionComplete"
                    :isCollected="myCollects.includes(item.id)"
                    @openCollection="openCollection"
                    @deleteCollection="deleteFolderCollection"
                    :thing="item"
                    :showEdit="false"
                    :showStar="true"
                    :showMoreMenuBtn="isYourAccount"
                    :key="item.id"
                    :isYourAccount="isYourAccount"
                    :isLike="myLikes.includes(item.id)"
                  >
                  </resource-card>
                </div>
                <div class="noCollection" v-show="folderCollection.length == 0">
                  {{ this.$t("design.noCollection") }}
                </div>
              </div>
              <div
                style="display: flex; flex-wrap: wrap"
                v-show="!dialogCollectionVisible"
              >
                <div
                  v-for="item in collections"
                  :key="item.thingId"
                  style="width: 33.3%"
                >
                  <resource-card
                    @clickMoveMenu="Handler_MoveTo(item)"
                    @clickDelMenu="handleCancelCollect(item)"
                    @clickDownMenu="Handler_Down(item)"
                    @moveCollectionComplete="handleMoveCollectionComplete"
                    @openCollection="openCollection"
                    @deleteCollection="deleteFolderCollection"
                    :isCollected="myCollects.includes(item.id)"
                    :thing="item"
                    :showEdit="false"
                    :showStar="true"
                    :showMoreMenuBtn="isYourAccount"
                    :key="item.id"
                    :isYourAccount="isYourAccount"
                    :isLike="myLikes.includes(item.id)"
                  >
                  </resource-card>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('design.histories')" name="fourth">
              <el-row :gutter="20">
                <div v-for="item in histories" :key="item.thingId">
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <resource-card
                      :key="item.id"
                      :thing="item"
                      :isLike="myLikes.includes(item.id)"
                      @openCollection="openCollection"
                      @clickMoveMenu="Handler_MoveTo(item)"
                      @clickDelMenu="handleCancelCollect(item)"
                      @clickDownMenu="Handler_Down(item)"
                      @moveCollectionComplete="handleMoveCollectionComplete"
                      @deleteCollection="deleteCollection"
                      :isCollected="myCollects.includes(item.id)"
                    >
                    </resource-card>
                  </el-col>
                </div>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <SrollTopButton :to="'#top'"></SrollTopButton>
      <DownListPanel
        :isShowDownPanel="isShowDownPanel"
        :fileList="detail.files"
        :fileNum="detail.files.length"
        :downLoadNum="downloadNumber"
        :resourceName="detail.title"
        @click="openShowDownPanel"
      ></DownListPanel>
    </div>
  </div>
</template>
<script>
var lock = false;

function throttle(func, delay = 60) {
  if (typeof func !== "function") {
    throw "参数必须是函数";
  }

  return () => {
    if (lock) {
      return;
    }
    func();
    lock = true;
    setTimeout(() => {
      lock = false;
    }, delay);
  };
}
import FollowButton from "@/components/FollowButton.vue";
import SrollTopButton from "@/components/SrollTopButton/index.vue";
import ResourceCard from "@/components/ResourceCard/index.vue";
import IndexFollowPanel from "./IndexFollowPanel.vue";
import CollectedOption from "@/components/CollectedOption";
import RowFolder from "@/components/RowFolder.vue";
import DownListPanel from "@/components/DownListPanel.vue";
import { generatorDefaultAvator } from "@/utils/generateImage.js";
import {
  deleteCollectionResource,
  getCollectionResourceList,
} from "@/api/collection";
import {
  getResourceList,
  getCollectResourceList,
  getHistoriesList,
  deleteCollection,
  getLikesList,
  deleteResource,
  deleteMake,
  addCollection,
  cancelCollectResource,
  updateDiy,
  getFollowerList,
  getFollowingList,
  getProfile,
  getCollectList,
  moveResourceToCollection,
  addResourceToCollection,
} from "@/api/design";
// import { getUserInfo } from "@/api/user";
import { getToken } from "@/utils/auth";
import { createNamespacedHelpers } from "vuex";
import { getResource } from "@/api/resource";
// import PostMakeDialog from "./components/PostMakeDialog.vue";
import ElImageViewer from "@/components/ImageViewer";
// import ViewMake from "@/views/thing/components/ViewMake.vue";
import Make from "./components/Make.vue";

import { getMakeList } from "@/api/user";

const { mapState } = createNamespacedHelpers("user");
export default {
  name: "Design",
  components: {
    IndexFollowPanel,
    FollowButton,
    SrollTopButton,
    ResourceCard,
    CollectedOption,
    RowFolder,
    DownListPanel,
    Make,
    // PostMakeDialog,
    // ViewMake,
    ElImageViewer,
  },
  data() {
    return {
      makeId: "",
      defaultAvatar: "",
      // dialogViewMake: false,
      makes: [],
      showMake: false,
      index: 0,
      remixesList: [],
      detail: {
        creator: {
          avatar: "",
          name: "UNKNOW",
        },
        description: "",
        files: [],
        id: "",
        images: "",
        license: "",
        like_count: 0,
        collect_count: 0,
        tags: [],
        title: "",
        tutorials: [],
        update_time: "1990-01-01",
      },
      resourceActiveTab: "first",
      isShowDownPanel: false,

      collectionName: "",
      myFollowList: [],
      folderCollection: [],
      followerList: [],
      followingList: [],
      dialogCollectionVisible: false,
      isYourAccount: false,

      myCollects: [],
      thing: {},
      openCollectedOption: false,
      folders: [],
      rowFolders: [],
      headers: {
        Authorization: getToken(),
      },
      histories: [],
      collections: [],
      Likes: [],
      myLikes: [],
      transferIndex: null,
      contextMenuData: {
        menuName: "demo",
        axis: {
          x: null,
          y: null,
        },
        menulists: [
          {
            btnName: this.$t("design.Delete"),
            fnHandler: "Handler1",
            disabled: !this.isYourAccount,
          },
          {
            btnName: this.$t("design.moveTo"),
            fnHandler: "Handler2",

            // children: [
            //   {
            //     fnHandler: "Handler5",
            //     btnName: "Collections",
            //   },
            //   {
            //     fnHandler: "Handler5",
            //     btnName: "Likes",
            //   },
            // ],
          },
          {
            btnName: this.$t("design.download"),
            fnHandler: "Handler3",
          },
        ],
      },
      collectionStyle: {
        position: "absolute",
        left: "0px",
        top: "0px",
      },
      resources: [],
      myFollowingList: [],
      activeTab: "first",
      activeName: "first",
      isDescEdit: false,
      pagination: {
        pageSize: 10,
        currentPage: 1,
      },
      dialogFollowersVisible: false,
      diyArr: [],
      user: {
        // 自己或他人的用户信息
        avatar: "",
        cover_image: "",
        description: "",
        follower_count: "",
        following_count: "",
        id: 0,
        name: "",
      },
      collectionId: "",
      userId: "", //自己或他人的主页
      prepareCollectedResId: "", //收藏的资源id
    };
  },
  watch: {
    "$store.getters.isLogin"() {
      console.log("change login status");
      if (this.$store.getters.isLogin) {
        this.getAllMyCollectList();
        this.getMyFollowingList();

        this.getMyLikesList().then(() => {});
        if (this.activeName == "first") {
          console.log(1);
        } else if (this.activeName == "second") {
          console.log(1);
        } else if (this.activeName == "third") {
          console.log(1);
        } else if (this.activeName == "fourth") {
          console.log(1);
        }
      } else {
        if (this.isYourAccount) {
          // this.$router.push("/");
        }
      }
    },
  },
  mounted() {
    let userId = this.$route.params.userId;

    if (userId == "fromLike") {
      this.isYourAccount = true;
      this.getLikesList();
      this.activeName = "second";
    } else if (userId == "fromProfile") {
      this.isYourAccount = true;
      this.getResourceList();
      // this.getResourceList(this.userInfo.user_id);
    } else if (userId == "fromHistory") {
      this.isYourAccount = true;
      this.getHistoriesList();
      this.activeName = "fourth";
    } else if (this.userInfo.user_id == userId) {
      this.isYourAccount = true;
      this.getResourceList();
    } else {
      this.isYourAccount = false;
      this.user.userId = userId;
      if (this.isLogin) {
        this.getMyLikesList().then(() => {});
        this.getResourceList();
      } else {
        this.getResourceList();
      }
    }
    if (this.isYourAccount && !this.isLogin) {
      this.$router.replace("/");
    }
    this.userId = this.isYourAccount ? this.userInfo.user_id : this.user.userId;
    this.contextMenuData.menulists[0].disabled = !this.isYourAccount;
    this.isLogin ? this.getAllMyCollectList() : "";
    this.isLogin && !this.isYourAccount && this.getMyFollowingList();
    getProfile(this.userId).then((params) => {
      let res = params.data.data;
      Object.assign(this.user, res);
      res.url1 &&
        this.diyArr.push({
          isEdit: false,
          text: res.url1,
        });
      res.url2 &&
        this.diyArr.push({
          isEdit: false,
          text: res.url2,
        });
      res.url3 &&
        this.diyArr.push({
          isEdit: false,
          text: res.url3,
        });
      this.defaultAvatar = generatorDefaultAvator(
        this.isYourAccount ? this.userInfo.nick_name : this.user.name,
        this.userId
      );
    });
    console.log(this.user.name, this.userInfo.nick_name);
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapState(["isLogin"]),
    downloadNumber() {
      return this.detail.files.reduce((pre, cur) => {
        return pre + cur.downloadCount;
      }, 0);
    },
    descFormat() {
      return this.user.description;
    },
  },
  methods: {
    closeAllDialog() {
      this.isShowDownPanel = false;
      this.openCollectedOption = false;
    },
    getIndex(index) {
      console.log(index);
      this.index = index;
    },
    openMake(item) {
      this.makeId = item.id;
      this.showMake = true;
      document.documentElement.style.overflowY = "hidden";
    },
    closeMake() {
      this.showMake = false;
      document.documentElement.style.overflowY = "scroll";
    },
    handleDelMakeClick(item) {
      if (!this.$store.getters.isLogin) {
        let payload = { loginDialogVisible: true, isLoginForm: true };
        this.$store.dispatch("user/switchLoginRegisteForm", payload);
        return;
      }
      this.$confirm(this.$t("design.delFileTip"), this.$t("design.tips"), {
        confirmButtonText: this.$t("design.confirm"),
        cancelButtonText: this.$t("design.cancel"),
      }).then(() => {
        deleteMake({ resId: item.id }).then(() => {
          this.$message({
            type: "success",
            message: this.$t("design.delSuccess"),
          });
          this.getMakeList();
        });
      });
    },
    openShowDownPanel() {
      if (!this.isShowDownPanel) {
        this.openCollectedOption = false;
      }
      this.isShowDownPanel = !this.isShowDownPanel;
    },
    openCollection(id, left, top) {
      this.openCollectedOption = true;
      this.collectionStyle.position = "absolute";
      this.collectionStyle.left = left + "px";
      this.collectionStyle.top = top + "px";
      this.prepareCollectedResId = id;
      getCollectList({
        userId: this.$store.getters.userInfo.user_id,
      }).then((res) => {
        this.folders = res.data.data;
      });
    },
    deleteFolderCollection(id) {
      deleteCollectionResource({
        userId: this.$store.getters.userInfo.user_id,
        resourceId: id,
      }).then(() => {
        this.$message({
          message: this.$t("design.delSuccess"),
          type: "success",
        });
        // this.getAllMyCollectList();
        if (this.dialogCollectionVisible) {
          this.getCollectFolderResourceList();
        } else {
          this.getMyCollectResourceList();
        }
      });
    },
    deleteCollection(id) {
      deleteCollectionResource({
        userId: this.$store.getters.userInfo.user_id,
        resourceId: id,
      }).then(() => {
        this.$message({
          message: this.$t("design.delSuccess"),
          type: "success",
        });
        this.getAllMyCollectList();
      });
    },
    handleCollectDialogClose() {
      // this.getMyLikesList();
      this.getCollectList();
      this.dialogCollectionVisible = false;
    },
    handleCancelCollect(item) {
      this.$confirm(this.$t("design.delFileTip"), this.$t("design.tips"), {
        confirmButtonText: this.$t("design.confirm"),
        cancelButtonText: this.$t("design.cancel"),
      }).then(() => {
        if (this.dialogCollectionVisible) {
          cancelCollectResource({
            collectionId: this.collectionId,
            resId: item.id,
          }).then(() => {
            this.getCollectFolderResourceList();
          });
        } else {
          cancelCollectResource({
            collectionId: 0,
            resId: item.id,
          }).then(() => {
            this.getCollectResourceList();
          });
        }
      });
    },
    handleClickFolder(item) {
      this.collectionId = item.id;
      this.collectionName = item.name;
      this.getCollectFolderResourceList();
      console.log("item: ", item);
    },
    handleDelFolder(item) {
      this.$confirm(this.$t("design.delFolderTip"), this.$t("design.tips"), {
        confirmButtonText: this.$t("design.confirm"),
        cancelButtonText: this.$t("design.cancel"),
      }).then(() => {
        deleteCollection({ collectionId: item.id }).then(() => {
          this.getCollectList();
          this.$message({
            type: "success",
            message: this.$t("design.delSuccess"),
          });
        });
      });
    },
    onFolderAdd(item) {
      return new Promise((resolve) => {
        let req = {
          name: item.name,
          userId: this.userInfo.user_id,
        };
        addCollection(req).then(() => {
          this.getCollectList().then(() => {
            return resolve(1);
          });
        });
      });
      // this.folder = [...e];
    },
    closeCollectedOption() {
      this.openCollectedOption = false;
    },
    handleMoveCollectionComplete() {
      // if (this.dialogCollectionVisible) {
      //   this.getCollectResourceList();
      //   this.getCollectFolderResourceList();
      // } else {
      //   this.getCollectResourceList();
      // }
    },
    moveCollectedOption(folderObject) {
      // this.isCollected = true;
      if (this.activeName == "first") {
        this.openCollectedOption = false;
        addResourceToCollection({
          resourceId: this.prepareCollectedResId,
          collectionId: folderObject.id,
        }).then(() => {
          this.getAllMyCollectList();
          this.$message({
            message: this.$t("design.moveSuccess"),
            type: "success",
          });
        });
      } else if (this.activeName == "second") {
        this.openCollectedOption = false;
        addResourceToCollection({
          resourceId: this.prepareCollectedResId,
          collectionId: folderObject.id,
        }).then(() => {
          this.getAllMyCollectList();
          this.$message({
            message: this.$t("design.moveSuccess"),
            type: "success",
          });
        });
      } else if (this.activeName == "third") {
        this.openCollectedOption = false;
        // console.log(this.myCollects.includes(this.prepareCollectedResId));
        if (this.myCollects.includes(this.prepareCollectedResId)) {
          moveResourceToCollection({
            resourceId: this.prepareCollectedResId,
            collectionId: folderObject.id,
          }).then((res) => {
            console.log(res);
            this.isYourAccount && this.getCollectResourceList();
            if (this.isYourAccount && this.dialogCollectionVisible) {
              this.getCollectFolderResourceList();
            }
            this.getAllMyCollectList();

            this.$message({
              message: this.$t("design.moveSuccess"),
              type: "success",
            });
          });
        } else {
          addResourceToCollection({
            resourceId: this.prepareCollectedResId,
            collectionId: folderObject.id,
          }).then((res) => {
            console.log(res);
            this.isYourAccount && this.getCollectResourceList();
            if (this.isYourAccount && this.dialogCollectionVisible) {
              this.getCollectFolderResourceList();
            }
            this.getAllMyCollectList();

            this.$message({
              message: this.$t("design.moveSuccess"),
              type: "success",
            });
          });
        }
      } else if (this.activeName == "fourth") {
        this.openCollectedOption = false;
        addResourceToCollection({
          resourceId: this.prepareCollectedResId,
          collectionId: folderObject.id,
        }).then(() => {
          this.getAllMyCollectList();
          this.$message({
            message: this.$t("design.moveSuccess"),
            type: "success",
          });
        });
      }
    },
    addFolder(folderName) {
      addCollection({ name: folderName })
        .then(() => {
          this.$message({
            message: this.$t("design.addSuccess"),
            type: "success",
          });
        })
        .then(() => {
          getCollectList({ userId: this.userId }).then((res) => {
            this.folders = res.data.data;
          });
        });
    },
    getMyFollowingList() {
      getFollowingList({ userId: this.userInfo.user_id }).then((res) => {
        this.myFollowingList = [];
        this.myFollowingList = res.data.data.map((item) => {
          return item.id - 0;
        });
      });
    },
    handleFollowTapClick() {
      this.getMyFollowList();
      if (this.activeTab == "first") {
        this.followerList = [];

        getFollowerList({ userId: this.userId }).then((res) => {
          this.followerList = res.data.data;
        });
      } else {
        this.followingList = [];

        getFollowingList({ userId: this.userId }).then((res) => {
          this.followingList = res.data.data;
        });
      }
    },
    getResourceList() {
      if (this.isYourAccount) {
        getResourceList({
          userId: this.userInfo.user_id,
          type: "mine",
        }).then((res) => {
          this.resources = res.data.rows;
        });
      } else {
        let userId = this.user.userId;

        getResourceList({ userId, type: "mine" }).then((res) => {
          this.resources = res.data.rows;
        });
      }
    },
    getRemixesList() {
      if (this.isYourAccount) {
        getResourceList({
          userId: this.userInfo.user_id,
          type: "remix",
        }).then((res) => {
          this.remixesList = res.data.rows;
        });
      } else {
        let userId = this.user.userId;
        getResourceList({ userId, type: "remix" }).then((res) => {
          this.remixesList = res.data.rows;
        });
      }
    },
    getLikesList() {
      if (this.isYourAccount) {
        this.getMyLikesList();
      } else {
        let userId = this.user.userId;
        getLikesList({ userId }).then((res) => {
          this.Likes = res.data.rows;
          if (this.isLogin) {
            this.getMyLikesList();
          }
        });
      }
    },
    getMyLikesList() {
      return new Promise((resolve) => {
        getLikesList({ userId: this.userInfo.user_id }).then((res) => {
          this.myLikes = [];

          if (this.isYourAccount) {
            this.Likes = res.data.rows;
          }
          for (const item of res.data.rows) {
            this.myLikes.push(item.id);
          }
          resolve(1);
        });
      });
    },
    getCollectList(myUserId) {
      return new Promise((resolve) => {
        getCollectList({ userId: myUserId || this.userId }).then((params) => {
          this.rowFolders = params.data.data.map((item) => {
            item.showMoreMenu = false;
            item.isEdit = false;
            return item;
          });
          resolve(1);
        });
      });
    },
    getCollectResourceList() {
      this.isLogin && this.getMyLikesList();
      if (!this.isYourAccount) {
        let userId = this.user.userId;
        getCollectResourceList({
          collectionId: 0,
          userId: userId,
        }).then((res) => {
          this.collections = res.data.rows;
          this.isLogin && this.getAllMyCollectList();
        });
      } else {
        this.getMyCollectResourceList();
      }
    },
    getMyCollectResourceList() {
      this.myCollects = [];

      return new Promise((resolve) => {
        getCollectResourceList({
          collectionId: 0,
          userId: this.userInfo.user_id,
        }).then((res) => {
          if (this.isYourAccount) {
            this.collections = res.data.rows;
            for (const item of res.data.rows) {
              this.myCollects.push(item.id);
            }
          }

          resolve(1);
        });
      });
    },
    getCollectFolderResourceList() {
      this.isLogin && this.getAllMyCollectList();
      this.isLogin && !this.isYourAccount && this.getMyLikesList();

      if (!this.isYourAccount) {
        let userId = this.user.userId;
        getCollectResourceList({
          collectionId: this.collectionId || 0,
          userId: userId,
        }).then((res) => {
          this.folderCollection = res.data.rows;
          this.dialogCollectionVisible = true;
        });
      } else {
        this.getMyCollectFolderResourceList().then(() => {
          this.dialogCollectionVisible = true;
        });
      }
    },
    getMyCollectFolderResourceList() {
      return new Promise((resolve) => {
        getCollectResourceList({
          collectionId: this.collectionId || 0,
          userId: this.userInfo.user_id,
        }).then((res) => {
          if (this.isYourAccount) {
            this.folderCollection = res.data.rows;
          }

          resolve(1);
        });
      });
    },
    getHistoriesList() {
      if (this.isYourAccount) {
        getHistoriesList({ userId: this.userInfo.user_id }).then((res) => {
          this.histories = res.data.rows;
        });
      } else {
        let userId = this.user.userId;
        getHistoriesList({ userId }).then((res) => {
          this.histories = res.data.rows;
        });
      }
      this.isLogin && this.getMyLikesList();
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
    Handler_Del(item) {
      this.$confirm(this.$t("design.delFileTip"), this.$t("design.tips"), {
        confirmButtonText: this.$t("design.confirm"),
        cancelButtonText: this.$t("design.cancel"),
      }).then(() => {
        deleteResource({ resId: item.id }).then(() => {
          this.$message({
            type: "success",
            message: this.$t("design.delSuccess"),
          });
          this.getResourceList();
        });
      });
    },
    Handler_MoveTo(thing) {
      this.prepareCollectedResId = thing.id;
      this.collectionStyle.left = "41%";
      this.collectionStyle.top = "33%";
      this.collectionStyle.position = "fixed";
      getCollectList({ userId: this.userInfo.user_id }).then((res) => {
        this.folders = res.data.data;
        this.openCollectedOption = true;
      });
    },
    Handler_Down(item) {
      getResource(item.id).then((res) => {
        this.detail = res.data.data;
        this.isShowDownPanel = true;
      });
    },

    addDiy() {
      //console.log(e)
      this.diyArr.push({
        isEdit: false,
        text: "",
      });
    },
    handleBeforeImgUpload(file) {
      const isJPG = file.type.includes("image");
      // const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error(this.$t("design.onlyImg"));
      }
      // if (!isLt1M) {
      //   this.$message.error("上传头像图片大小不能超过 1MB!");
      // }
      return isJPG;
    },

    handleImgUploadErr(err) {
      //console.log(e)
      this.$message.error(this.$t("design.uploadFail") + err);
    },
    handleImgUploadSuccess() {
      this.$store.dispatch("user/getUserInfo").catch((e) => {
        console.log(e);
      });
      this.$message.success(this.$t("design.uploadSuccess"));
    },
    handleBgImgUploadSuccess(res, file) {
      console.log("res: ", res, file);
      this.user.cover_image = res.data;
      this.$message.success(this.$t("design.uploadSuccess"));
    },
    getMyFollowList() {
      getFollowingList({ userId: this.userInfo.user_id }).then((result) => {
        let res = [];
        for (const item of result.data.data) {
          res.push(item.id);
        }
        this.myFollowList = res;
      });
    },
    openFollowDialog(index) {
      //console.log(e)
      this.activeTab = index;
      this.getMyFollowList();
      if (index == "first") {
        getFollowerList({ userId: this.userId }).then((res) => {
          this.followerList = res.data.data;
          this.dialogFollowersVisible = true;
        });
      } else {
        getFollowingList({ userId: this.userId }).then((res) => {
          this.followingList = res.data.data;
          this.dialogFollowersVisible = true;
        });
      }
    },
    descChange(item) {
      console.log(item);
      throttle(() => {
        updateDiy({ description: this.user.description }).then(() => {
          this.isDescEdit = false;
        });
      }, 1000)();
    },
    editChange(item, index) {
      console.log("item: ", item);
      // let str = "url" + index;
      throttle(function () {
        updateDiy({ ["url" + (index + 1)]: item.text }).then(() => {
          item.isEdit = false;
        });
      }, 1000)();
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
      this.isDescEdit = false;

      setTimeout(() => {
        this.$refs.diyRef[index].focus();
      }, 0);
    },
    getAllMyCollectList() {
      getCollectionResourceList({
        userId: this.userInfo.user_id,
      }).then((res) => {
        this.myCollects = [];
        for (let i = 0; i < res.data.rows.length; i++) {
          const element = res.data.rows[i];
          this.myCollects.push(element.id);
        }
      });
    },
    async handleResourceClick() {
      this.openCollectedOption = false;
      if (this.activeName == "first" && this.resourceActiveTab == "first") {
        this.isLogin && !this.isYourAccount && this.getMyLikesList();

        this.getResourceList();
      } else if (this.activeName == "second") {
        this.getLikesList();
      } else if (this.activeName == "third") {
        this.getCollectList();
        this.getCollectResourceList();
      } else if (this.activeName == "fourth") {
        this.getHistoriesList();
        this.isLogin && this.getAllMyCollectList();
        // this.isLogin && !this.isYourAccount && this.getMyLikesList();
      }
    },
    getMakeList() {
      getMakeList({ userId: this.userId }).then((res) => {
        this.makes = res.data.rows;
        this.makes.map((item) => {
          item.url = item.image;
        });
        console.log("makes", this.makes);
      });
    },
    async handleResourceTabClick() {
      if (this.resourceActiveTab == "first") {
        // this.isLogin && !this.isYourAccount && this.getMyLikesList();

        this.getResourceList();
      } else if (this.resourceActiveTab == "second") {
        // this.isLogin && !this.isYourAccount && this.getMyLikesList();

        this.getRemixesList();
      } else if (this.resourceActiveTab == "third") {
        this.getMakeList();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.Make {
  margin-right: 40px;
  margin-bottom: 45px;
  $width: 228px;
  ::v-deep .more-image {
    width: $width;
    height: 139px;
  }
  ::v-deep .makes-mask {
    width: $width;
  }
}
.collectMenu {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 9999;
}
.img {
  width: 100%;
  height: 100%;
}
.container-profile {
  width: 1440px;
  margin: 0 auto;
  padding-bottom: 100px;
  .DialogCollection {
    ::v-deep .el-dialog {
      width: 1000px;
    }
  }
  .collectionDialog {
    display: flex;
    flex-wrap: wrap;
  }
  .noCollection {
    margin: 10px;
    // width: 33.3%;
    text-align: center;
    margin: 0px auto;
    margin-top: 40px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
  }
  .followDialog {
    ::v-deep .el-dialog {
      width: 488px;
      height: 472px;
      background: #ffffff;
      border-radius: 20px;
    }
  }

  .tabsContent {
    ::v-deep .resourceTabsContent {
      .el-tabs__nav-wrap::after {
        height: 0px;
      }
      .el-tabs__active-bar {
        height: 0;
      }
      .el-tabs__item {
        // padding: 0 20px;
        width: 120px;
        height: 40px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        padding: 0;
        text-align: center;
      }
      .is-active {
        background: #1e78f0;
        border-radius: 8px;
        color: white !important;
        // padding: 0 20px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
      }
    }
    ::v-deep .el-tabs__item {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }
    ::v-deep .el-tabs__item.is-active {
      color: #1e78f0;
    }
    .contextMenu {
      box-sizing: border-box;
      padding: 8px;
      color: black;
      width: 160px;
      // height: 176px;
      background: #ffffff;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.07);
      border-radius: 10px;

      ::v-deep {
        .context-menu-list {
          background-color: white;
          // width: 144px;
          margin: 0;
          padding-top: 8px;

          .no-child-btn {
            height: 48px;
            padding: 10px;
            margin: auto;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #1a1a1a;
          }
          // .no-child-btn:hover {

          // }
        }
        .context-menu-list:hover {
          background: #8ab5ef !important;
          font-size: 16px;
          width: 144px;
          // height: 48px;
          color: #ffffff;
          border-radius: 8px;
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
    margin-top: 34px;
    .editTab {
      position: absolute;
      top: 12px;
      right: 12px;
    }
    ::v-deep {
      .el-tabs__content {
        overflow: visible;
      }
    }
    .draft {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #cccccc;
      border-top: 1px solid #999999;
      padding: 10px;
      margin: 0 15px;
    }
    .nav {
      display: flex;
      font-size: 20px;
      margin-bottom: 16px;
      .el-icon-back {
        font-size: 30px;
        margin-right: 16px;
      }
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
      color: black;
      background-color: #bfbfc1;
      padding: 5px;
    }
    .ortur-icon-pen:hover {
      background-color: gainsboro;
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
        cursor: pointer;
      }
      .name {
        margin-top: 12px;
        text-align: center;
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #1a1a1a;
        overflow: hidden;
        /* 第二步：让文本不会换行， 在同一行继续 */
        white-space: nowrap;
        /* 第三步：用省略号来代表未显示完的文本 */
        text-overflow: ellipsis;
      }
      .follow {
        margin-top: 12px;
        .followers {
          margin-right: 121px;
          cursor: pointer;
        }
        .following {
          cursor: pointer;
        }
      }
      .followBtn {
        width: 112px;
        height: 40px;
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
        white-space: pre-wrap;
      }
      .descInput {
        margin-top: 12px;
        ::v-deep {
          .el-textarea__inner {
            background-color: #f0f3fa;
          }
          .el-input__inner {
            background-color: #f0f3fa;
          }
        }
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
        font-size: 36px;
        line-height: 119px;
        color: white;
        /* opacity: 0.5; */
        width: 120px;
        height: 119px;
        border-radius: 50%;
        display: none;
      }
      .img {
        width: 120px;
        height: 119px;
        border-radius: 50%;
      }
    }
    .imgWrap:hover .imgEdit {
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.4);
      cursor: pointer;
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
