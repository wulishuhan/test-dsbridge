<template>
  <div class="profile-card">
    <div class="profile-card-content">
      <div class="img">
        <img :src="user.background" />
      </div>
      <div class="profile-card-info">
        <el-avatar :size="95" :src="user.avatar"></el-avatar>
        <div class="profile-card-info-name">{{ user.name }}</div>
        <div v-if="isProfile">
          <a href="/editProfile" style="margin: 10px">
            <el-button type="primary" size="small">Edit Profile</el-button>
          </a>
          <router-link to="/analytics" style="margin: 10px">
            <el-button type="primary" size="small">View Analytics</el-button>
          </router-link>
        </div>
        <div class="design-profile" v-else>
          <div @mouseover="enterFollowing" @mouseleave="leaveFollowing">
            <el-button type="primary" size="small" @click="changeFollowState">
              {{ followText }}
            </el-button>
          </div>
          <div>
            <el-button type="primary" size="small">Tip Designer</el-button>
          </div>
          <div>
            <el-button type="primary" size="small">Message</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-row class="card-action-item">
      <el-col :span="8">
        <div class="follower-item">
          <div class="follower-data">{{ user.followers }}</div>
          <div class="follower-name">Followers</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="follower-item">
          <div class="follower-data">{{ user.following }}</div>
          <div class="follower-name">Following</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="follower-item">
          <div class="follower-data">{{ user.designs }}</div>
          <div class="follower-name">Designs</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "ProfileCard",
  props: ["user"],
  data() {
    return {
      isEnterFollowingBox: false,
      isFollow: false,
      followStyle: {},
    };
  },
  mounted() {
    this.isFollow = this.user.isFollow;
  },
  computed: {
    isProfile() {
      return this.$store.getters.userId === this.$route.params.userId;
    },
    followText: {
      get() {
        return this.isFollow
          ? this.isEnterFollowingBox
            ? "Unfollow"
            : "Following"
          : "Follow";
      },
    },
  },
  methods: {
    changeFollowState() {
      this.isFollow = !this.isFollow;
    },
    enterFollowing() {
      if (this.isFollow) this.isEnterFollowingBox = true;
    },
    leaveFollowing() {
      if (this.isFollow) this.isEnterFollowingBox = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-card {
  width: 300px;
  height: 340px;
  background-color: #fff;
  text-align: center;
  .profile-card-content {
    color: #248bfb;
    width: 100%;
    height: 263px;
    .img {
      height: 110px;
      img {
        width: 100%;
      }
    }
    .profile-card-info {
      height: 135px;
      position: relative;
      top: -35px;
      text-align: center;
      .profile-card-info-name {
        font-weight: 400;
        font-size: 18px;
      }
      .profile-card-info-address {
        font-size: 12px;
      }
    }
  }
  .card-action-item {
    text-align: center;
  }
  .follower-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 76px;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    align-content: center;
    flex-wrap: wrap;
    .follower-data {
      color: #555;
      width: 100%;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
    }
    .follower-name {
      color: #555;
      font-weight: 400;
      font-size: 12px;
    }
  }
  .el-button {
    margin-top: 20px;
  }
  .design-profile {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
