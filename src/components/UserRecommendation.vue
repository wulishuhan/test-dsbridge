<template>
  <div class="user-card">
    <div class="user-info">
      <div class="user-info-avatar-name">
        <el-avatar :src="creator.avatar" :size="60"></el-avatar>
        <span class="name">{{ creator.name }}</span>
      </div>
      <el-button v-if="!isFollow" @click="follow"> Follow </el-button>
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
import { getMoreByThisCreator } from "@/api/resource";
import { follow, unFollow } from "@/api/design";
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
    getMoreByThisCreator({
      userId: this.creator.id,
      pageSize: 3,
      pageNum: 1,
      resId: this.currentResourceId,
    }).then((res) => {
      this.moreCreateList = res.data.rows;
    });
  },
  data() {
    return {
      moreCreateList: [],
    };
  },
  computed: {
    isFollow() {
      return this.$store.getters.myFollowingList.some((item) => {
        return item.id == this.creator.id;
      });
    },
  },
  methods: {
    follow() {
      follow({
        userId: this.creator.id,
      })
        .then(() => {
          this.$store.commit("user/SET_FOLLOWINGLIST", [
            ...this.$store.getters.myFollowingList,
            this.creator,
          ]);
        })
        .catch(() => {});
    },
    unFollow() {
      unFollow({
        userId: this.creator.id,
      })
        .then(() => {
          this.$store.commit(
            "user/SET_FOLLOWINGLIST",
            this.$store.getters.myFollowingList.filter((item) => {
              item.id !== this.creator.id;
            })
          );
        })
        .catch(() => {});
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
