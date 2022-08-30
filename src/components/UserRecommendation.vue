<template>
  <div class="user-card">
    <div class="user-info">
      <div class="user-info-avatar-name">
        <el-avatar :src="creator.avatar" :size="60"></el-avatar>
        <span class="name">{{ creator.name }}</span>
      </div>
      <el-button v-if="!followings.includes(creator.id)" @click="follow">
        Follow
      </el-button>
      <el-button v-else @click="unFollow">Unfollow</el-button>
    </div>
    <div class="recommend-resources">
      <el-image
        v-for="item in moreCreateList"
        :key="item.id"
        :src="item.image"
        @click="toMore(item.id)"
      ></el-image>
    </div>
  </div>
</template>
<script>
import { getResourceListById } from "@/api/resource";
import { follow, unFollow, getFollowingList } from "@/api/design";
export default {
  name: "UserRecommendation",
  props: {
    creator: {
      type: Object,
      default: () => {
        return {
          avatar:
            "https://orturbucket.s3.amazonaws.com/pic/5f93f983524def3dca464469d2cf9f3e",
          id: 110,
          name: "ccc@ccc.cccq",
        };
      },
    },
    currentResourceId: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    getResourceListById({
      userId: this.creator.id,
      pageSize: 4,
      pageNum: 1,
    }).then((res) => {
      let more = res.data.rows;
      for (let i = 0; i < more.length; i++) {
        if (more[i].id !== this.currentResourceId) {
          this.moreCreateList.push(more[i]);
        }
      }
      if (this.moreCreateList.length > 3) {
        this.moreCreateList.pop();
      }
    });
    getFollowingList({
      userId: this.$store.getters.userInfo.user_id,
    }).then((res) => {
      let list = res.data.data;
      for (let i = 0; i < list.length; i++) {
        this.followings.push(list[i].id);
      }
      console.log("getFollowingList: ", this.followings);
    });
  },
  data() {
    return {
      moreCreateList: [],
      followings: [],
    };
  },
  methods: {
    follow() {
      console.log(
        "following",
        this.$store.getters.userInfo.user_id,
        this.creator.id
      );
      follow({
        userId: this.creator.id,
      }).then(() => {
        this.followings.push(this.creator.id);
      });
    },
    unFollow() {
      unFollow({
        userId: this.creator.id,
      }).then(() => {
        for (let i = 0; i < this.followings.length; i++) {
          if (this.followings[i] === this.creator.id) {
            this.followings.splice(i, 1);
            break;
          }
        }
      });
    },
    toMore(id) {
      this.$router.push(`/thing/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.user-card {
  width: 384px;
  height: 168px;
  background: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(18, 18, 18, 0.07);
  border-radius: 10px;
  padding: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user-info-avatar-name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        font-size: 20px;
        margin-left: 17px;
      }
    }
    .el-button {
      width: 104px;
      height: 40px;
      background: #1e78f0;
      border-radius: 8px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      font-family: Source Han Sans CN;
      font-size: 16px;
    }
  }
  .recommend-resources {
    display: grid;
    grid-template-columns: repeat(3, 98px);
    justify-content: space-between;
    margin-top: 17px;
    .el-image {
      width: 98px;
      height: 59px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
