<template>
  <div class="card-box" style="width: 340px; border-radius: 5%; padding: 5px">
    <img
      :src="thing.url"
      @click="toDetail(thing.thingId)"
      alt="can't load this image"
    />
    <div class="card-box-bottom">
      <div class="card-box-bottom-left">
        <el-avatar :size="40" :src="thing.avatar"></el-avatar>
        <div class="card-box-bottom-left-name">
          <div style="font-size: 18px">{{ thing.thingName }}</div>
          <span class="author" @click="viewAuthorInfo(thing.userId)">
            {{ thing.userName }}
          </span>
        </div>
      </div>
      <div class="card-box-bottom-right">
        <div class="card-box-bottom-right-like-box" @click="like">
          <i v-if="!isLike" class="el-icon-star-off icon-star"></i>
          <i v-else class="ortur-icon-star-border"></i>
          {{ thing.likes }}
        </div>
        <div slot="reference" @click="share" class="icon-share">
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
        console.log("changelike", res);
        this.$message({
          message: "success",
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
  },
};
</script>
<style lang="scss" scoped>
.author {
  color: #5c5959;
  border-bottom: solid 1px #fff;
  font-size: 14px;
}
.author:hover {
  border-bottom: solid 1px #000;
  color: #000;
  cursor: pointer;
}
.card-box:hover {
  border: 1px solid #7d6c6c;
}
.card-box {
  border: 1px solid #fff;
  position: relative;
}
img {
  width: 100%;
  height: 200px;
  border-radius: 5%;
}
.card-box-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
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
  color: #7d6c6c;
  font-size: 14px;
}
.card-box-bottom-right-like-box {
  margin-right: 10px;
}
.icon-share .icon-star {
  margin-right: 3px;
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
  top: 241px;
  left: 100px;
  z-index: 999;
}
</style>
