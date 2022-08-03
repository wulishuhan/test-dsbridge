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
        v-show="isCollectIconShow"
        @click="switchCollect"
        class="icon-collect-box"
      >
        <i v-show="isCollected" class="ortur-icon-add-collect icon-collect"></i>
        <span
          v-show="!isCollected"
          class="ortur-icon-cancel-collect-strokes icon-collect"
        >
          <span class="path1"> </span>
          <span class="path2"> </span>
          <span class="path3"> </span>
        </span>
      </div>
      <div
        style="
          width: 224px;
          height: 360px;
          background: #ffffff;
          box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.07);
          border-radius: 10px;
          position: absolute;
          top: -240px;
          right: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 888;
          border: solid;
          flex-wrap: wrap;
          padding: 8px;
        "
      >
        <span
          style="
            height: 36px;
            width: 208px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #999999;
            text-align: center;
            line-height: 36px;
            border-bottom: solid #ccc 1px;
          "
          >Collect to</span
        >
        <a
          style="
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #1a1a1a;
            width: 208px;
            height: 48px;
            border-radius: 8px;
          "
          >Draft</a
        >
        <a
          class="el-icon-folder"
          style="
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            width: 208px;
            height: 48px;
            color: #1a1a1a;
          "
          >t1</a
        >
        <a
          v-if="folder"
          class="el-icon-plus"
          style="
            width: 208px;
            height: 48px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #1a1a1a;
            color: #1e78f0;
          "
          @click="folder = false"
          >New File</a
        >
        <el-input v-if="!folder" @keyup.enter.native="folder = true"></el-input>
      </div>
    </div>
    <div class="card-box-bottom">
      <div class="card-box-bottom-left">
        <el-avatar
          :size="35"
          :src="thing.creator.avatar"
          :fit="'cover'"
        ></el-avatar>
        <div class="card-box-bottom-left-name">
          <div class="thing-name">{{ thing.title }}</div>
          <span class="author" @click="viewAuthorInfo(thing.creator.id)">
            {{ thing.creator.name }}
          </span>
        </div>
      </div>
      <div class="card-box-bottom-right">
        <div class="card-box-bottom-right-like-box" @click="like">
          <i v-if="!isLike" class="el-icon-star-off icon-star"></i>
          <i v-else class="ortur-icon-star-border icon-star"></i>
          {{ thing.like_count }}
        </div>
        <div @click="share" class="share-box">
          <i class="el-icon-share icon-share"></i>
          {{ thing.share_count }}
        </div>
      </div>
    </div>
    <div class="share-container">
      <share-social-media v-if="isShare"></share-social-media>
    </div>
  </div>
</template>
<script>
import { changeCollect } from "@/api/thing";
import { addLike, deleteLike } from "@/api/like";
import ShareSocialMedia from "../ShareCard";
export default {
  name: "ResourceCard",
  components: { ShareSocialMedia },
  props: {
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
      likes: 0,
      isLike: false,
      isCollected: false,
      isShare: false,
      isCollectIconShow: false,
      folder: true,
    };
  },
  mounted() {
    this.likes = this.thing.like_count;
    this.isLike = this.thing.isLike;
    this.isCollected = this.thing.isCollected;
  },
  methods: {
    toDetail(id) {
      this.$router.push(`/thing/${id}`);
    },
    like() {
      if (this.isLike) {
        this.likes = Number(this.likes) - 1;
        deleteLike({
          resId: this.thing.id,
        }).then(() => {
          this.$message({
            message: "delete likes successfully",
            type: "success",
          });
          this.isLike = !this.isLike;
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
            this.isLike = !this.isLike;
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
      this.$router.push(`/design/Designs/${userId}`);
    },
    switchCollect() {
      this.isCollected = !this.isCollected;
      changeCollect({
        thingId: this.thing.thingId,
        isCollected: this.isCollected,
        userId: this.$store.getters.userId,
      }).then((res) => {
        console.log("switchCollect", res);
        this.$message({
          message: res.data.message,
          type: "success",
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
