<template>
  <div>
    <div class="card-box" style="width: 340px; border-radius: 5%; padding: 5px">
      <img
        :src="thing.url"
        alt=""
        style="border-radius: 5%; width: 100%; height: 200px"
      />

      <div
        style="display: flex; justify-content: space-between; margin-top: 10px"
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <el-avatar :size="40" :src="thing.avatar"></el-avatar>
          <div style="margin-left: 5px">
            <div style="font-size: 18px">{{ thing.thingName }}</div>
            <div
              class="author"
              @click="viewAuthorInfo(thing.userId)"
              style="font-size: 14px"
            >
              {{ thing.userName }}
            </div>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #7d6c6c;
            font-size: 14px;
          "
        >
          <div style="margin-right: 10px">
            <i class="el-icon-star-off" style="margin-right: 3px"></i>
            {{ thing.likes }}
          </div>
          <el-popover placement="right" width="296" trigger="click">
            <share-social-media></share-social-media>
            <div slot="reference" @click="share">
              <i class="el-icon-share" style="margin-right: 3px"></i>
              1.2k
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <share-social-media></share-social-media>
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
  border-bottom: solid 1px #f5f5f5;
}
.author:hover {
  border-bottom: solid 1px #000;
  cursor: pointer;
}
.card-box:hover {
  border: 1px solid #ccc;
}
.card-box {
  border: 1px solid #f5f5f5;
}
</style>
