<template>
  <div class="container-profile">
    <el-row>
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">
        <profile-card :user="user"></profile-card>
        <div class="about">
          <p>About</p>
          <span>{{ profile.introduction }}}</span>
          <br />
          <span>
            <a :href="profile.website">{{ profile.website }}</a>
          </span>
          <p>I AM A...</p>
          <span>{{ profile.who }}</span>
          <p>3D Design Skill Level</p>
          <span>{{ profile.designLevel }}</span>
          <p>Tools I Use</p>
          <span>{{ profile.designToolsUsed }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="18">
        <el-row>
          <div v-for="item in filterByTypes" :key="item.name">
            <el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
              <filter-profile
                :filter="item.name"
                :count="item.count"
              ></filter-profile>
            </el-col>
          </div>
          <el-col :span="24">
            <router-view />
          </el-col>
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
  // eslint-disable-next-line
  name: "Design",
  components: { ProfileCard, FilterProfile },
  data() {
    return {
      user: {},
      profile: {},
      filterByType: ["Favorites", "Designs", "Collections", "Makes", "Likes"],
      filterByTypes: [
        { name: "Favorites", count: 0 },
        { name: "Designs", count: 0 },
        { name: "Collections", count: 0 },
        { name: "Makes", count: 0 },
        { name: "Likes", count: 0 },
      ],
    };
  },
  mounted() {
    getUserInfoByUserId({
      id: this.$route.params.userId,
      userId: this.$store.getters.userId,
    }).then((res) => {
      console.log(res.data.data);
      this.user = res.data.data;
      this.profile = res.data.data.userProfile;
      this.filterByTypes[0].count = res.data.data.favorites.length;
      this.filterByTypes[1].count = res.data.data.design.length;
      this.filterByTypes[2].count = res.data.data.collections.length;
      this.filterByTypes[3].count = res.data.data.makes.length;
      this.filterByTypes[4].count = res.data.data.likes.length;
    });
  },
};
</script>
<style lang="scss" scoped>
.container-profile {
  background: #f2f2f2;
  .about {
    margin-top: 20px;
    width: 300px;
    height: 361px;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    p {
      font-size: 18px;
      font-weight: 400;
      margin-top: 15px;
    }
    span {
      color: #555;
      font-size: 12px;
    }
  }
}
</style>
