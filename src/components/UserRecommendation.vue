<template>
  <div class="user-card">
    <div class="user-info">
      <div class="user-info-avatar-name">
        <el-avatar :src="creator.avatar" :size="40"></el-avatar>
        <span class="name">{{ creator.name }}</span>
      </div>
      <el-button
        v-if="!followers.includes(creator.id)"
        type="primary"
        @click="follow"
        >Follow</el-button
      >
      <el-button v-else type="primary" @click="unFollow">Unfollow</el-button>
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
import { follow, unFollow, getFollowerList } from "@/api/design";
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
    getFollowerList({
      userId: this.$store.getters.userInfo.user_id,
    }).then((res) => {
      console.log("getFollowerList:", res);
      let list = res.data.data;
      for (let i = 0; i < list.length; i++) {
        this.followers.push(list[i].id);
      }
    });
  },
  data() {
    return {
      moreCreateList: [],
      followers: [],
    };
  },
  methods: {
    follow() {
      follow({
        userId: this.creator.id,
      }).then(() => {
        this.followers.push(this.creator.id);
      });
    },
    unFollow() {
      unFollow({
        userId: this.creator.id,
      }).then(() => {
        for (let i = 0; i < this.followers.length; i++) {
          if (this.followers[i] === this.creator.id) {
            this.followers.splice(i, 1);
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
  width: 320px;
  height: 148px;
  background: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(18, 18, 18, 0.07);
  border-radius: 10px;
  padding: 12px;
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
        font-size: 14px;
        margin-left: 17px;
      }
    }
    .el-button {
      width: 80px;
      height: 30px;
      background: #1e78f0;
      border-radius: 8px;
      line-height: 6px;
    }
  }
  .recommend-resources {
    display: flex;
    justify-content: space-between;
    margin-top: 17px;
    .el-image {
      width: 80px;
      height: 59px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
