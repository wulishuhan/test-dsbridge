<template>
  <div>
    <el-row>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="ortur-resource">
          <router-link to="/">ORTUR RESOURCE</router-link>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <el-input
          placeholder="请输入搜索关键词"
          suffix-icon="el-icon-search"
          v-model="keywords"
        ></el-input>
      </el-col>
      <div class="menuview">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" v-if="isHideNavBar">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-width-md"
            mode="horizontal"
          >
            <el-submenu index="1">
              <template slot="title">Explore</template>
              <el-menu-item index="2-1">
                <router-link to="/">Things</router-link>
              </el-menu-item>
              <el-menu-item index="2-2">
                <router-link to="/designer">Designers</router-link>
              </el-menu-item>
              <el-menu-item index="2-3">
                <router-link to="/groups">Groups</router-link>
              </el-menu-item>
              <el-menu-item index="2-4">
                <router-link to="/">Customizable Things</router-link>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <router-link to="/education">Education</router-link>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">Create</template>
              <el-menu-item index="3-1">
                <router-link to="/upload">Upload a Thing</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">
                <router-link to="/customizer">Customize a Thing</router-link>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="4" v-if="!hasToken">
              <router-link to="/login">Sign Up</router-link>
            </el-menu-item>
            <el-submenu index="5" v-if="hasToken">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
              </template>
              <el-menu-item index="5-1">
                <router-link :to="profilePath">View Profile</router-link>
              </el-menu-item>
              <el-menu-item index="5-2"> Messages </el-menu-item>
              <el-menu-item index="5-3">
                <router-link to="/mainProfile/Designs">My Designs</router-link>
              </el-menu-item>
              <el-menu-item index="5-4">
                <router-link to="/mainProfile/Collections">
                  My Collections
                </router-link>
              </el-menu-item>
              <el-menu-item index="5-5">
                <router-link to="/mainProfile/Likes">My Likes</router-link>
              </el-menu-item>
              <el-menu-item index="5-6">
                <router-link to="/mainProfile/Groups">My Groups</router-link>
              </el-menu-item>
              <el-menu-item index="5-7">
                <router-link to="/editProfile"> Account Settings </router-link>
              </el-menu-item>
              <el-menu-item index="5-8" @click="logout">Log Out</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </div>

      <div class="menuview" v-if="!isHideNavBar">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="17">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="el-dropdown-menu-width">
              <el-menu :default-active="activeIndex" class="el-menu-width-sm">
                <el-submenu index="1">
                  <template slot="title">Explore</template>
                  <el-menu-item index="2-1">Things</el-menu-item>
                  <el-menu-item index="2-2">Designers</el-menu-item>
                  <a href="/groups">
                    <el-menu-item index="2-3">Groups</el-menu-item>
                  </a>
                  <el-menu-item index="2-4">Customizable Things</el-menu-item>
                </el-submenu>
                <a href="/education">
                  <el-menu-item index="2">Education</el-menu-item>
                </a>
                <el-submenu index="3">
                  <template slot="title">Create</template>
                  <el-menu-item index="3-1">upload</el-menu-item>
                  <el-menu-item index="3-2">Customize</el-menu-item>
                </el-submenu>
                <router-link to="/login" v-if="!hasToken">
                  <el-menu-item index="4">Sign Up</el-menu-item>
                </router-link>
                <el-submenu index="4" v-if="hasToken">
                  <template slot="title">profile</template>
                  <el-menu-item index="4-1">
                    <router-link :to="profilePath"> View Profile </router-link>
                  </el-menu-item>
                  <el-menu-item index="4-2"> Messages </el-menu-item>
                  <el-menu-item index="4-3">
                    <router-link to="/mainProfile/Designs">
                      My Designs
                    </router-link>
                  </el-menu-item>
                  <el-menu-item index="4-4">
                    <router-link to="/mainProfile/Collections">
                      My Collections
                    </router-link>
                  </el-menu-item>
                  <el-menu-item index="4-5">
                    <router-link to="/mainProfile/Likes">My Likes</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-6">
                    <router-link to="/mainProfile/Groups">
                      My Groups
                    </router-link>
                  </el-menu-item>
                  <el-menu-item index="4-7">
                    <router-link to="/editProfile">
                      Account Settings
                    </router-link>
                  </el-menu-item>
                  <el-menu-item index="4-8" @click="logout">
                    Log Out
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuview: "hidden-sm-and-down",
      iconview: ["el-icon-s-unfold", "hidden-md-and-up"],
      activeIndex: "1",
      keywords: "",
      isHideNavBar: false,
      isCollapse: true,
      hasTokend: false,
      profilePath: "",
    };
  },
  methods: {
    formatWidth() {
      let w = window.innerWidth;
      if (w <= 768) {
        this.isHideNavBar = false;
      } else {
        this.isHideNavBar = true;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$store.dispatch("user/logout", this.user).then(() => {});
    },
  },
  mounted() {
    this.formatWidth();
    window.onresize = () => {
      if (!this.timer) {
        setTimeout(() => {
          this.formatWidth();
          this.timer = false;
        }, 400);
      }
    };
    if (this.$store.getters.userId) {
      this.profilePath = "/mainProfile/" + this.$store.getters.userId;
      console.log("path", this.profilePath);
    }
  },
  computed: {
    hasToken() {
      return this.$store.getters.token ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #409eff;
}
.ortur-resource {
  padding: 20px;
  a {
    color: #409eff;
    text-decoration: none;
  }
}
.el-menu-width-md {
  display: flex;
}
.el-menu {
  float: right;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-input {
  margin: 10px 0px;
}
.el-dropdown-menu-width {
  width: 100%;
}
@media screen and (max-width: 768px) {
  .menuview {
    text-align: center;
    margin-top: 15px;
  }
  .ortur-resource {
    padding: 14px;
  }
  .el-menu {
    background: none;
    float: none;
  }
}

@media screen and (max-width: 425px) {
  .ortur-resource {
    padding: 10px;
  }
}
</style>
