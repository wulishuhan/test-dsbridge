<template>
  <div class="card-box" @mouseenter="enter" @mouseleave="leave">
    <div style="position: relative">
      <div class="resource-show-image">
        <img
          class="resource-show-image"
          :src="thing.image"
          @click="toDetail(thing.id)"
          alt="can't load this image"
        />
      </div>
      <div
        v-show="showCollection && isCollectIconShow"
        class="icon-collect-box"
      >
        <i
          v-if="!showCollectionDeleteButton"
          @click="addCollection"
          class="ortur-icon-add-collect icon-collect"
        ></i>
        <span
          v-if="showCollectionDeleteButton"
          @click="deleteCollection"
          class="ortur-icon-cancel-collect-strokes icon-collect"
        >
          <span class="path1"> </span>
          <span class="path2"> </span>
          <span class="path3"> </span>
        </span>
      </div>
      <div
        v-show="showEdit && isCollectIconShow"
        @click="toUpload(thing.id)"
        class="icon-collect-box"
      >
        <i class="ortur-icon-pen"></i>
      </div>
    </div>
    <div class="card-box-bottom">
      <div class="card-box-bottom-left">
        <el-avatar
          v-if="showAvatar"
          :size="35"
          :src="thing.creator && thing.creator.avatar"
          :fit="'cover'"
        ></el-avatar>
        <div class="card-box-bottom-left-name">
          <div class="thing-name">{{ thing.title }}</div>
          <span
            v-if="showAvatar"
            class="author"
            @click="viewAuthorInfo(thing.creator && thing.creator.id)"
          >
            {{ thing.creator && thing.creator.name }}
          </span>
        </div>
      </div>
      <div class="card-box-bottom-right">
        <div
          class="card-box-bottom-right-like-box"
          @click="like"
          v-show="showStar"
        >
          <i v-if="!showLikeStar" class="el-icon-star-off icon-star"></i>
          <i v-else class="ortur-icon-star-border icon-star"></i>
          {{ likes }}
        </div>
        <div @click="share" class="share-box" v-show="showShare">
          <i class="el-icon-share icon-share"></i>
          {{ thing.share_count }}
        </div>
        <span
          @click="handleClickMore"
          class="moreMenuIcon"
          v-if="showMoreMenuBtn"
        >
          <div class="moreMenu" v-if="showMoreMenu">
            <div class="moreMenuItem" @click.stop="handleDelClick">Delete</div>
            <div class="moreMenuItem" @click.stop="handleMoveClick">MoveTo</div>
            <div class="moreMenuItem" @click.stop="handleDownClick">
              DownLoad
            </div>
          </div>
          ···
        </span>
      </div>
    </div>
    <div class="share-container">
      <share-social-media v-if="isShare"></share-social-media>
    </div>
    <div class="collected-option-container">
      <CollectedOption
        :show="openCollectedOption"
        :folders="folders"
        @close="closeCollectedOption"
        @moveFolder="moveCollectedOption"
        @addFolder="addFolder"
      ></CollectedOption>
    </div>
  </div>
</template>
<script>
import ShareSocialMedia from "@/components/ShareCard";
import CollectedOption from "@/components/CollectedOption";
import { addLike, deleteLike } from "@/api/like";
import {
  getCollectionList,
  addCollection,
  addResourceToCollection,
  deleteCollectionResource,
} from "@/api/collection";
export default {
  name: "ResourceCard",
  components: { ShareSocialMedia, CollectedOption },
  props: {
    showMoreMenuBtn: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    isCollected: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    isLike: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    showAvatar: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    showEdit: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    showCollection: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    showShare: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    showStar: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    thing: {
      type: Object,
      default: function () {
        return {
          creator: {
            name: "ccc@ccc.cccq",
            id: 110,
            avatar:
              "https://orturbucket.s3.amazonaws.com/pic/5f93f983524def3dca464469d2cf9f3e",
          },
          id: 2,
          image:
            "https://orturbucket.s3.amazonaws.com/pic/5f93f983524def3dca464469d2cf9f3e",
          like_count: 0,
          share_count: 0,
          title: "laser",
          isLike: false,
        };
      },
    },
  },
  data() {
    return {
      showMoreMenu: false,
      likes: 0,
      isShare: false,
      isCollectIconShow: false,
      folder: true,
      openCollectedOption: false,
      showLikeStar: false,
      folders: [],
      showCollectionDeleteButton: false,
    };
  },
  mounted() {
    this.likes = this.thing.like_count;
    this.showLikeStar = this.isLike;
    this.showCollectionDeleteButton = this.isCollected;
  },
  computed: {
    selected() {
      return this.$store.getters.selectCollectionBox;
    },
  },
  methods: {
    handleDownClick() {
      this.showMoreMenu = false;
    },
    handleDelClick() {
      this.showMoreMenu = false;
    },
    handleMoveClick() {
      this.showMoreMenu = false;
      this.$emit("showMoveMenu", this.thing);
    },
    handleClickMore() {
      this.showMoreMenu = !this.showMoreMenu;
    },
    toUpload(id) {
      this.$router.push(`/upload/${id}`);
    },
    toDetail(id) {
      this.$router.push(`/thing/${id}`);
    },
    like() {
      if (this.showLikeStar) {
        this.likes = Number(this.likes) - 1;
        deleteLike({
          resId: this.thing.id,
        }).then(() => {
          this.$message({
            message: "delete likes successfully",
            type: "success",
          });
          this.showLikeStar = false;
        });
      } else {
        this.likes = 1 + Number(this.likes);
        addLike({
          resId: this.thing.id,
        })
          .then(() => {
            this.$message({
              message: "add likes successfully",
              type: "success",
            });
            this.showLikeStar = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    share() {
      this.isShare = !this.isShare;
      console.log("share!");
    },
    viewAuthorInfo(userId) {
      this.$store.commit("filterCard/SET_SELECTPROFILE", "Designs");
      this.$router.push(`/design/${userId}`);
    },
    addCollection() {
      if (this.selected === "" || this.selected === this.thing.id) {
        this.$store.commit("collection/SET_SELECTCOLLECTIONBOX", this.thing.id);
        this.openCollectedOption = true;
        getCollectionList({
          userId: this.$store.getters.userInfo.user_id,
        }).then((res) => {
          console.log("getCollectionList", res);
          this.folders = res.data.data;
        });
      }
    },
    deleteCollection() {
      console.log("delete");
      this.openCollectedOption = false;
      deleteCollectionResource({
        userId: this.$store.getters.userInfo.user_id,
        resourceId: this.thing.id,
      }).then((res) => {
        console.log("cancelCollected", res);
        this.$message({
          message: "cancel collected successfully",
          type: "success",
        });
        this.showCollectionDeleteButton = false;
      });
    },
    closeCollectedOption() {
      this.openCollectedOption = false;
      this.$store.commit("collection/SET_SELECTCOLLECTIONBOX", "");
    },
    moveCollectedOption(folderObject) {
      // this.isCollected = true;
      this.showCollectionDeleteButton = true;
      this.openCollectedOption = false;
      this.$store.commit("collection/SET_SELECTCOLLECTIONBOX", "");
      addResourceToCollection({
        resourceId: this.thing.id,
        collectionId: folderObject.id,
      }).then((res) => {
        console.log(res);
        this.$message({
          message: "move successfully",
          type: "success",
        });
        this.showCollectionDeleteButton = true;
      });
    },
    addFolder(folderName) {
      addCollection({
        name: folderName,
        userId: this.$store.getters.userInfo.user_id,
      })
        .then((res) => {
          console.log("addCollection", res);
          this.$message({
            message: "add folder successfully",
            type: "success",
          });
        })
        .then(() => {
          getCollectionList({
            userId: this.$store.getters.userInfo.user_id,
          }).then((res) => {
            this.folders = res.data.data;
          });
        });
    },
    enter() {
      this.isCollectIconShow = true;
    },
    leave() {
      this.isCollectIconShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.author {
  color: #5c5959;
  border-bottom: solid 1px #fff;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #999999;
}
.author:hover {
  border-bottom: solid 1px #000;
  color: #000;
  cursor: pointer;
}
.card-box:hover {
  border: 1px solid #c2c4cc;
}
.card-box {
  border: 1px solid #f5f5f5;
  position: relative;
  width: 300px;
  border-radius: 8px;
  padding: 7px;
}
.resource-show-image {
  width: 285px;
  height: 180px;
  border-radius: 8px;
  object-fit: contain;
}
::v-deep .el-avatar > img {
  width: 100%;
}
.card-box-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 12px;
}
.card-box-bottom-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-box-bottom-left-name {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 5px;
}
.moreMenuIcon {
  text-align: center;
  width: 32px;
  height: 24px;
  line-height: 24px;
  background: #e8ebf4;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  .moreMenu {
    position: absolute;
    width: 160px;
    height: 176px;
    background: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
    bottom: 40px;
    right: 20px;
    text-align: left;
    .moreMenuItem {
      width: 144px;
      height: 48px;
      border-radius: 8px;
      line-height: 48px;
      margin: 8px auto;
      padding-left: 25px;
    }
    .moreMenuItem:hover {
      background: #8ab5ef;
    }
  }
}
.card-box-bottom-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999999;
  font-size: 14px;
}
.card-box-bottom-right-like-box {
  margin-right: 8px;
}
.icon-share,
.icon-star {
  margin-right: 5px;
  font-size: 13px;
}
.icon-share:hover {
  color: #000;
  cursor: pointer;
}
.card-box-bottom-right-like-box:hover {
  color: #000;
  cursor: pointer;
}
img:hover {
  cursor: pointer;
}
.share-container {
  position: absolute;
  top: 222px;
  right: 0px;
  z-index: 999;
}
.collected-option-container {
  position: absolute;
  bottom: 120px;
  right: 21px;
  z-index: 1000;
}
.thing-name {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #1a1a1a;
}
.share-box:hover {
  color: #000;
  cursor: pointer;
}
.icon-collect-box {
  width: 42px;
  height: 30px;
  background: rgba(30, 120, 240, 1);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 12px;
  right: 12px;
  cursor: pointer;
}
.icon-collect {
  font-size: 20px;
  color: #fff;
}
</style>
