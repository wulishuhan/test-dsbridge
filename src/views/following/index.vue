<template>
  <div class="container">
    <div class="content">
      <el-row>
        <el-col :span="8">
          <div class="profile-card">
            <el-image
              class="background-image"
              :src="userInfo.background"
            ></el-image>
            <el-image class="avatar" :src="userInfo.avatar"></el-image>
            <div class="info-content">
              <h3>Arian Croft</h3>
              <div class="justify-info">
                <span>
                  <i class="el-icon-user-solid"></i>
                  <span>{{ userInfo.username }}</span>
                </span>
                <span>
                  <i class="el-icon-location"></i>
                  <span>{{ userInfo.address }}</span>
                </span>
              </div>
              <div class="button-content">
                <el-button>FOLLOW</el-button>
                <br />
                <el-button>TIP DESIGNER</el-button>
              </div>
              <div class="bottom-content">
                <div class="bottom-content-justify">
                  <span>{{ userInfo.followers }}</span>
                  <span>FOLLOWERS</span>
                </div>
                <div class="bottom-content-justify">
                  <span>{{ userInfo.following }}</span>
                  <span>FOLLOWING</span>
                </div>
              </div>
            </div>
          </div>

          <div class="box-container">
            <div class="box-outer-justify">
              <div class="box" @click="to('Designs')">
                <span>{{ userInfo.designs }}</span>
                <span>DESIGNS</span>
              </div>
              <div class="box" @click="to('Makes')">
                <span>{{ userInfo.makes.length }}</span>
                <span>MAKES</span>
              </div>
            </div>
            <div class="box-outer-justify">
              <div class="box" @click="to('Collections')">
                <span>{{ userInfo.collections.length }}</span>
                <span>COLLECTIONS</span>
              </div>
              <div class="box" @click="to('Likes')">
                <span>{{ userInfo.likes.length }}</span>
                <span>LIKES</span>
              </div>
            </div>
          </div>

          <div class="message-content">
            <el-button type="primary">MESSAGE ME</el-button>
          </div>
        </el-col>
        <el-col :span="16">
          <div>
            <div class="router-container">
              <router-link class="router-link" to="/like">ABOUT</router-link>
              <router-link class="router-link" to="/like">DESIGNS</router-link>
              <router-link class="router-link" to="/like">
                COLLECTIONS
              </router-link>
              <router-link class="router-link" to="/like">MAKES</router-link>
              <router-link class="router-link" to="/like">LIKES</router-link>
            </div>
            <el-row>
              <el-col :span="12" v-for="item in followers" :key="item.userId">
                <designer-card :follow="item"></designer-card>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import DesignerCard from "./components/DesignerCard";
import { findFollowsByUserId, getUserInfoByUserId } from "@/api/user";
export default {
  // eslint-disable-next-line
  name: "Following",
  components: { DesignerCard },
  data() {
    return {
      followers: [],
      userInfo: {},
    };
  },
  computed: {
    designsPath() {
      return `/design/designs/${this.$route.params.userId}`;
    },
    makesPath() {
      return `/design/makes/${this.$route.params.userId}`;
    },
    collectionsPath() {
      return `/design/collections/${this.$route.params.userId}`;
    },
    likesPath() {
      return `/design/likes/${this.$route.params.userId}`;
    },
  },
  mounted() {
    console.log("mounted", this.$route.params.userId);
    findFollowsByUserId({
      userId: this.$route.params.userId,
    }).then((res) => {
      console.log("findFollowsByUserId res:", res);
      this.followers = res.data.data.data;
    });
    getUserInfoByUserId({
      userId: this.$route.params.userId,
    }).then((res) => {
      console.log("getUserInfoByUserId res:", res);
      this.userInfo = res.data.data;
    });
  },
  methods: {
    to(name) {
      this.$store.commit("filterCard/SET_SELECTPROFILE", name);
      this.$router.push(`/design/${name}/${this.$route.params.userId}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #ececec;
  .content {
    width: 970px;
    margin: 0 auto;
    position: relative;
    top: 15px;
  }
  .profile-card {
    width: 296px;
    background-color: #fff;
    text-align: center;
    box-sizing: border-box;
    .el-button {
      background-color: #666;
      width: 150px;
      color: #fff;
    }
  }
  .background-image {
    width: 296px;
    height: 146px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #fff;
    border: 4px solid #fff;
    position: relative;
    top: -65px;
  }
  .justify-info {
    margin-top: -15px;
    display: flex;
    justify-content: space-around;
  }
  .info-content {
    margin-top: -80px;
  }
  .button-content {
    margin-top: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
    .el-button {
      margin-top: 5px;
    }
  }
  .bottom-content {
    display: flex;
    justify-content: space-around;
    padding: 5px 0;
    .bottom-content-justify {
      display: flex;
      flex-direction: column;
    }
  }
  .router-link {
    text-decoration: none;
    color: #666;
  }
  .router-container {
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
  }
}
.box-container {
  width: 296px;
  height: 260px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-top: 15px;
  .box-outer-justify {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .box {
    width: 140px;
    height: 125px;
    background-color: #fff;
    font-size: 18px;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #666;
  }
  .box:hover {
    color: #248bfb;
    cursor: pointer;
  }
}
.message-content {
  width: 296px;
  margin-top: 15px;
  .el-button {
    width: 296px;
    height: 50px;
  }
}
</style>
