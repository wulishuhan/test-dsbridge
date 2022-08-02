<template>
  <div class="app-header-wrapper">
    <div class="app-header header-shadow navbar">
      <div class="app-header__content">
        <div class="app-header-left">
          <div class="app-header__logo">
            <router-link to="/main">
              <img src="@/assets/logo.png" style="height: 36px" />
            </router-link>
          </div>
          <div class="app-header__search">
            <el-input
              placeholder="请输入搜索关键词"
              prefix-icon="el-icon-search"
              v-model="keywords"
              class="el-input-search input-with-select"
            >
            </el-input>
            <el-select
              v-model="select"
              class="el-select-search"
              placeholder="请选择"
            >
              <el-option label="Author" value="1"></el-option>
              <el-option label="Content" value="2"></el-option>
              <el-option label="All" value="3"></el-option>
            </el-select>
          </div>
        </div>
        <div class="app-header-right">
          <ul class="app-header-dots" v-if="isLogin">
            <li>
              <router-link to="/upload">
                <el-button class="el-btn-upload">
                  <span>上传</span>
                  &nbsp;
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </router-link>
            </li>
            <li>
              <el-button
                style="background: #f5f5f5; border: none; font-size: 20px"
              >
                <i class="ortur-icon-collected"></i>
              </el-button>
            </li>
            <li>
              <el-button
                style="background: #f5f5f5; border: none; font-size: 20px"
              >
                <i class="ortur-icon-alert"></i>
              </el-button>
            </li>

            <li>
              <el-dropdown class="el-dropdown-userinfo">
                <el-button>
                  <span>
                    <img
                      :src="
                        userInfo.avatar
                          ? userInfo.avatar
                          : 'http://dummyimage.com/300x200/96f279/FFF&text=gcfqdvmp'
                      "
                    />
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                </el-button>
                <el-dropdown-menu
                  slot="dropdown"
                  class="el-dropdown-menu-userinfo"
                >
                  <el-dropdown-item class="header-userinfo">
                    <div class="header-avatar">
                      <img
                        :src="
                          userInfo.avatar
                            ? userInfo.avatar
                            : 'http://dummyimage.com/300x200/96f279/FFF&text=gcfqdvmp'
                        "
                      />
                    </div>
                    <div class="username-and-email">
                      <span class="username">{{ userInfo.nick_name }}</span>
                      <span class="email">{{ userInfo.email }}</span>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="el-icon-user-solid"></i>&nbsp; 概况
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="el-icon-collection-tag"></i>&nbsp; 历史
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="el-icon-fork-spoon"></i>&nbsp; 设置
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="logout">
                    <i class="el-icon-back"></i>&nbsp; 退出
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>

          <ul class="app-header-nologin" v-else>
            <li>
              <el-button
                style="background: #f5f5f5; border: none; font-size: 20px"
                @click="showLoginDialog('login')"
              >
                Log in
              </el-button>
            </li>
            <li>
              <el-button
                style="background: #f5f5f5; border: none; font-size: 20px"
                @click="showLoginDialog('register')"
              >
                Sign up
              </el-button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <login
      :loadLoginDialog="isLoginForm"
      :visible.sync="dialogVisible"
      @handleClose="dialogVisible = false"
      @changeView="changeLoginView"
    ></login>
  </div>
</template>

<script>
import Login from "@/components/Login";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("user");
export default {
  data() {
    return {
      isLoginForm: true,
      dialogVisible: false,
      activeIndex: "1",
      activeIndex2: "1",
      keywords: "",
      select: "",
    };
  },
  components: {
    Login,
  },
  computed: {
    ...mapState(["accessToken", "expiresIn", "userInfo", "isLogin"]),
  },
  mounted() {
    this.$store.dispatch("user/getUserInfo").then((res) => {
      console.log("user/getUserInfo========", res);
      if (res.code != 0) {
        console.log("获取用户信息失败，请重新登录");
      }
    });
  },
  methods: {
    showLoginDialog(view) {
      if (view === "login") {
        this.isLoginForm = true;
      } else {
        this.isLoginForm = false;
      }
      this.dialogVisible = true;
    },
    changeLoginView(view) {
      if (view === "login") {
        this.isLoginForm = true;
      } else {
        this.isLoginForm = false;
      }
    },
    logout() {
      this.$store.dispatch("user/logout").then((res) => {
        if (res.data.code != 200) {
          this.$message.error("退出登录失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-header-wrapper {
  width: 100%;
  height: 60px;
}
.app-header {
  background: #f5f5f5;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  align-content: center;
  z-index: 10;
  transition: all 0.2s;
  position: fixed;
  overflow: hidden;
  .app-header__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #f5f5f5;
    width: 1440px;
    height: 100%;
    margin: 0px auto;
    .app-header-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0 0 1.5rem;
      width: 828px;
      .app-header__logo {
        font-size: 24px;
      }
      .app-header__search {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        .el-input-search {
          width: 400px;
          ::v-deep .el-input__inner {
            border: 1px solid #88bbf3 !important;
            border-right: transparent !important;
            border-radius: 4px 0px 0px 4px;
            background: none;
          }
        }

        .el-select-search {
          max-width: 120px;
          ::v-deep .el-input__inner {
            border: 1px solid #88bbf3 !important;
            border-left: transparent !important;
            border-radius: 0px 4px 4px 0px;
            margin-left: -1px;
            background: none;
          }
        }
        .input-with-select .el-input-group__prepend {
          background-color: #fff;
        }
      }
    }

    .app-header-right {
      align-items: center;
      display: flex;
      margin-left: auto;
      padding: 0 1.5rem 0 0;
      ul.app-header-dots {
        width: 400px;
        list-style-type: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .el-dropdown {
          .el-button {
            background: #f5f5f5;
            border: none;
          }
          span {
            display: flex;
            align-items: center;
            img {
              border-radius: 50%;
              width: 40px;
              height: 40px;
            }
            .el-icon-arrow-down {
              font-size: 25px;
              font-weight: 20px;
              margin-right: 10px;
            }
          }
        }
        .el-btn-upload {
          width: 100px;
          background: #1e78f0;
          color: #fff;
        }
      }
      ul.app-header-nologin {
        list-style-type: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        .el-btn-upload {
          width: 90px;
          background: #88bbf3;
        }
      }
    }
  }
}

.app-header.header-shadow {
  box-shadow: 0 0.46875rem 2.1875rem rgb(4 9 20 / 3%),
    0 0.9375rem 1.40625rem rgb(4 9 20 / 3%),
    0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%);
}
.el-dropdown-menu-userinfo {
  li {
    height: 50px;
    line-height: 50px;
    width: 95%;
    margin: 0 auto;
    border-radius: 8px;
  }
  li:hover {
    background: #8ab5ef;
    color: #f5f5f5;
  }
  .header-userinfo {
    width: 100%;
    height: 58px;
    display: flex;
    align-items: center;
    .header-avatar img {
      border-radius: 50%;
      overflow: hidden;
      vertical-align: middle;
      width: 40px;
      height: 40px;
    }
    .username-and-email {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      justify-content: space-around;
      .username {
        font-weight: 500;
        font-size: 16px;
        color: #333;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        line-height: 20px;
      }
      .email {
        font-size: 12px;
        line-height: 14px;
        color: #aaa;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
      }
    }
  }
  .header-userinfo:hover {
    background: unset !important;
  }
}
</style>
