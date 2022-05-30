<template>
  <div class="container-profile">
    <el-row>
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">
        <profile-card :user="user"></profile-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="18">
        <el-row>
          <div v-for="item in filterByType" :key="item">
            <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
              <filter-profile :filter="item"></filter-profile>
            </el-col>
          </div>
          <el-col :span="24"> <router-view /> </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ProfileCard from "./components/ProfileCard";
import FilterProfile from "./components/FilterProfile";
import { getUserInfoByUserId } from "@/api/user";
export default {
  name: "MainProfile",
  components: { ProfileCard, FilterProfile },
  data() {
    return {
      user: {
        name: "profile",
        address: "profile",
        followers: 1234,
        following: 1234,
        designs: 1234,
      },
      filterByType: ["Favorites", "Designs", "Collections", "Makes", "Likes"],
      temp: {},
      isUserProfile: false,
    };
  },
  mounted() {
    getUserInfoByUserId({ id: 1 }).then((res) => {
      this.user = res.data.data;
    });
    let userId = this.$store.getters.userId;
    let paramsId = this.$route.params.userId;
    if (userId == paramsId) {
      this.isUserProfile = true;
    } else {
      this.isUserProfile = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.container-profile {
  background: #f2f2f2;
}
</style>
