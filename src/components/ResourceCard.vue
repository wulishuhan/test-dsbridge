<template>
  <div>
    <div class="resource_card">
      <div class="user-info">
        <div @click="viewAuthorInfo(thing.userId)">
          <el-avatar :size="20" :src="thing.avatar"></el-avatar>
        </div>
        <span>
          {{ thing.thingName }}
        </span>
      </div>

      <img :src="thing.url" alt="" @click="toDetail(thing.thingId)" />
      <div class="card-footer">
        <div class="collect-thing" @click="switchCollect">
          <span v-if="isCollected">
            <i class="el-icon-plus"></i>
            Collect Thing
          </span>
          <span v-else>
            <i class="el-icon-check"></i>
            Collected
          </span>
        </div>
        <div class="icon-number-show">
          <div @click="like">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-heart"
              viewBox="0 0 16 16"
              :class="{ 'red-icon': isLike }"
            >
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
              />
            </svg>
            <span>
              {{ likes }}
            </span>
          </div>
          <el-popover
            v-if="!thing.comments"
            placement="right"
            width="296"
            trigger="click"
          >
            <share-social-media></share-social-media>
            <div slot="reference" @click="share" v-if="!thing.comments">
              <i class="el-icon-upload2"></i>
              <span> Share </span>
            </div>
          </el-popover>
          <div v-else class="comments">
            <i class="el-icon-chat-square"></i>
            <span>
              {{ thing.comments }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { changeCollect, changeLike } from "@/api/thing";
import ShareSocialMedia from "./ShareSocialMedia";
export default {
  name: "ResourceCard",
  components: { ShareSocialMedia },
  props: {
    thing: {
      type: Object,
      default: function () {
        return {};
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
    console.log("thing:", this.thing);
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
.resource_card {
  width: 300px;
  height: 340px;
  margin: 5px auto;
  background-color: white;
  .el-icon-check {
    color: #248bfb;
    font-size: 20px;
  }
  img {
    width: 300px;
    height: 225px;
    cursor: pointer;
  }
  .card-footer {
    display: flex;
  }
  .user-info {
    display: flex;
    width: 100%;
    height: 38px;
    align-items: center;
    .el-avatar {
      margin: 0 5px;
      cursor: pointer;
    }
    span {
      font-size: 12px;
      color: #555;
    }
  }
  .collect-thing {
    display: flex;
    width: 70%;
    height: 77px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .icon-number-show {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    div {
      display: flex;
      justify-content: flex-start;
      cursor: pointer;
      span {
        margin-left: 5px;
      }
    }
  }
  .el-icon-upload2 {
    font-size: 20px;
    margin-left: -2.5px;
  }
  .red-icon {
    color: red;
  }
  .comments {
    font-size: 16px;
    i {
      margin-top: 3px;
    }
  }
}
@media screen and (max-width: 375px) {
  .resource_card {
    width: 90vw;
    img {
      width: 90vw;
    }
  }
}
</style>
