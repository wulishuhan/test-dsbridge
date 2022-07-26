<template>
  <div class="card-box" @mouseenter="enter" @mouseleave="leave">
    <div style="position: relative">
      <img
        :src="thing.url"
        @click="toDetail(thing.thingId)"
        alt="can't load this image"
      />
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
    </div>
    <div class="card-box-bottom">
      <div class="card-box-bottom-left">
        <el-avatar :size="30" :src="thing.avatar"></el-avatar>
        <div class="card-box-bottom-left-name">
          <div class="thing-name">{{ thing.thingName }}</div>
          <span class="author" @click="viewAuthorInfo(thing.userId)">
            {{ thing.userName }}
          </span>
        </div>
      </div>
      <div class="card-box-bottom-right">
        <div class="card-box-bottom-right-like-box" @click="like">
          <i v-if="!isLike" class="el-icon-star-off icon-star"></i>
          <i v-else class="ortur-icon-star-border icon-star"></i>
          {{ thing.likes }}
        </div>
        <div @click="share" class="share-box">
          <i class="el-icon-share icon-share"></i>
          1.2k
        </div>
      </div>
    </div>
    <div class="share-container">
      <share-social-media v-if="isShare"></share-social-media>
    </div>
  </div>
</template>
<script>
import { changeCollect, changeLike } from "@/api/thing";
import ShareSocialMedia from "../ShareCard";
export default {
  name: "ResourceCard",
  components: { ShareSocialMedia },
  props: {
    thing: {
      type: Object,
      default: function () {
        return {
          avatar: "http://dummyimage.com/300x200/f27982/FFF&text=vknro",
          id: "620000197009121720",
          isCollected: true,
          isLike: false,
          likes: 737,
          publicTime: "1976 02 23",
          thingId: "620000197009121720",
          thingName: "ccdfsctoh",
          url: "http://dummyimage.com/300x200/79a5f2/FFF&text=gxmorr",
          userId: "620000197009121720",
          userName: "gcxzxpbyne",
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
    };
  },
  mounted() {
    this.likes = this.thing.likes;
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
      } else {
        this.likes = 1 + Number(this.likes);
      }
      changeLike({
        isLike: !this.isLike,
        userId: this.$store.getters.userId,
        thingId: this.thing.thingId,
      }).then((res) => {
        this.$message({
          message: res.data.message,
          type: "success",
        });
        this.isLike = !this.isLike;
      });
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
  font-size: 9px;
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
  width: 258px;
  border-radius: 5%;
  padding: 5px;
}
img {
  width: 246px;
  height: 150px;
  border-radius: 8px;
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
  font-size: 11px;
}
.card-box-bottom-right-like-box {
  margin-right: 10px;
}
.icon-share,
.icon-star {
  margin-right: 7px;
  font-size: 11px;
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
  top: 192px;
  left: 76px;
  z-index: 999;
}
.thing-name {
  font-size: 11px;
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
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 12px;
  right: 12px;
  cursor: pointer;
}
.icon-collect {
  font-size: 15px;
  color: #fff;
}
</style>
