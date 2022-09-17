<template>
  <div class="app-header-wrapper">
    <div class="app-header navbar">
      <div class="app-header__content">
        <div class="app-header-left">
          <div class="app-header__logo">
            <router-link to="/main">
              <img src="@/assets/logo.png" style="height: 24px" />
            </router-link>
          </div>
          <div class="app-header__search">
            <el-input
              :placeholder="$t('header.search')"
              prefix-icon="el-icon-search"
              v-model="keywords"
              class="el-input-search input-with-select"
              @keyup.enter.native="search"
            >
            </el-input>
            <!-- <el-select
              v-model="select"
              class="el-select-search"
              :placeholder="$t('header.searchSelect')"
            >
              <el-option label="Author" value="1"></el-option>
              <el-option label="Content" value="2"></el-option>
              <el-option label="All" value="3"></el-option>
            </el-select> -->
          </div>
        </div>
        <div class="app-header-right">
          <ul class="app-header-dots" v-if="isLogin">
            <li>
              <router-link to="/upload">
                <el-button class="el-btn-upload">
                  <span>{{ $t("header.upload") }}</span>
                  &nbsp;
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </router-link>
            </li>
            <li>
              <router-link to="/design/fromLike">
                <el-button>
                  <i class="ortur-icon-collected"></i>
                </el-button>
              </router-link>
            </li>
            <!-- <li class="alert">
              <div v-show="showDot" class="dot"></div>
              <el-button @click.stop="handleShowNotice">
                <i class="ortur-icon-alert"></i>
              </el-button>
              <div class="noticePanel">
                <NoticePanel ref="NoticePanel"></NoticePanel>
              </div>
            </li> -->

            <!-- <li>
              <el-dropdown @command="selectLanguage">
                <span class="el-dropdown-link">
                  {{ $t("header.language") }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="en">English</el-dropdown-item>
                  <el-dropdown-item command="zh">中文</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li> -->
            <li>
              <el-dropdown class="el-dropdown-userinfo">
                <el-button>
                  <span>
                    <img :src="userInfo.avatar" />
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                </el-button>
                <el-dropdown-menu
                  slot="dropdown"
                  class="el-dropdown-menu-userinfo"
                >
                  <el-dropdown-item class="header-userinfo">
                    <div class="header-avatar">
                      <img :src="userInfo.avatar" />
                    </div>
                    <div class="username-and-email">
                      <span class="username">{{ userInfo.nick_name }}</span>
                      <span class="email">{{ userInfo.email }}</span>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="handleProfileClick">
                    <i class="el-icon-user-solid"></i>&nbsp;
                    {{ $t("header.profile") }}
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="handleHistoryClick">
                    <i class="el-icon-collection-tag"></i>&nbsp;
                    {{ $t("header.history") }}
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="handleSettingClick">
                    <i class="el-icon-fork-spoon"></i>&nbsp;
                    {{ $t("header.setting") }}
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="logout">
                    <i class="el-icon-back"></i>&nbsp; {{ $t("header.logout") }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>

          <ul class="app-header-nologin" v-else>
            <li>
              <el-button @click="showLoginDialog('login')">
                {{ $t("header.logIn") }}
              </el-button>
            </li>
            <li>
              <el-button @click="showLoginDialog('register')">
                {{ $t("header.signUp") }}
              </el-button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <login
      :loadLoginDialog="isLoginForm"
      :visible.sync="loginDialogVisible"
      :isThirdPartyRegisterForm="isThirdPartyRegisterForm"
      :openLoginInfo="openLoginInfo"
      @handleClose="handleCloseDialog"
      @changeView="showLoginDialog"
    ></login>
    <settingPanel ref="settingPanel"></settingPanel>
  </div>
</template>

<script>
import Login from "@/components/Login";
// import NoticePanel from "@/components/NoticePanel";
import settingPanel from "@/components/settingPanel";
import { createNamespacedHelpers } from "vuex";
import { bindThird } from "@/api/user";

const { mapState } = createNamespacedHelpers("user");
export default {
  data() {
    return {
      showDot: true,
      keywords: "",
      select: "",
      isThirdPartyRegisterForm: false,
      thirdPartyInfo: {
        id: "",
        catalog: "",
        email: "",
      },
      openLoginInfo: 0,
    };
  },
  components: {
    Login,
    // NoticePanel,
    settingPanel,
  },
  computed: {
    ...mapState([
      "accessToken",
      "expiresIn",
      "userInfo",
      "isLogin",
      "loginDialogVisible",
      "isLoginForm",
    ]),
  },
  mounted() {
    let isBinding = sessionStorage.getItem("isBinding");
    console.log("isBinding: ", isBinding);

    this.$store.dispatch("user/getUserInfo").catch((e) => {
      console.log(e);
    });
    this.$store.dispatch("user/getMyFollowingList", {
      userId: this.userInfo.user_id,
    });
    let { code, from, email } = this.$route.query;
    if (isBinding == 2) {
      if (code && from && email) {
        this.thirdPartyInfo.id = code;
        this.thirdPartyInfo.catalog = from;
        this.thirdPartyInfo.email = email;
        this.$store
          .dispatch("user/openLogin", this.thirdPartyInfo)
          .then(() => {
            this.$router.push(this.$route.path + "#");
            this.handleCloseDialog();
          })
          .catch((data) => {
            if (data.code == 1020 || data.code == 1021) {
              this.isThirdPartyRegisterForm = true;
              this.openLoginInfo = data.code;
            }
            this.showLoginDialog("");
            console.log(data);
          });
      }
    } else if (isBinding == 1) {
      if (code && from && email) {
        bindThird({ catalog: from, userId: code, email: email })
          .then((res) => {
            console.log("bindThird successfully", res);
            this.$message("bindThird successfully");
            this.$router.push(this.$route.path + "#");
            // this.$router.push(this.$route.path + "#");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  },
  methods: {
    handleSettingClick() {
      this.$refs.settingPanel.showPanel();
    },
    search() {
      this.$router
        .push({
          path: "/search/index",
          query: { keywords: this.keywords },
        })
        .catch((err) => {
          console.log(err);
        });
      this.keywords = "";
    },
    handleShowNotice() {
      this.$refs.NoticePanel.showPanel();
    },
    handleHistoryClick() {
      this.$router.push({ path: "/design/fromHistory" });
    },
    handleProfileClick() {
      this.$router.push({ path: "/design/fromProfile" });
    },
    handleCollectClick() {
      this.$router.push({ path: "/design/fromLike" });
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    selectLanguage(lang) {
      this.$i18n.locale = lang;
    },

    showLoginDialog(view) {
      let payload = { loginDialogVisible: true, isLoginForm: false };
      if (view == "login") {
        payload.isLoginForm = true;
      }
      this.$store.dispatch("user/switchLoginRegisteForm", payload);
    },
    logout() {
      this.$store.dispatch("user/logout");
    },
    handleCloseDialog() {
      let { code, from, email } = this.$route.query;
      if (code && from && email) {
        this.$router.push(this.$route.path);
      }
      this.isThirdPartyRegisterForm = false;
      this.openLoginInfo = 0;
      this.$store.dispatch("user/closeLoginRegisteForm");
    },
  },
};
</script>

<style lang="scss" scoped>
.app-header-wrapper {
  width: 100%;
  height: 88px;
}
.app-header {
  background: #1e78f0;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  align-content: center;
  z-index: 10;
  transition: all 0.2s;
  position: fixed;
  // overflow: hidden;
  .app-header__content {
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 1640px;
    height: 100%;
    margin: 0px auto;
    .app-header-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0 0 1.5rem;
      width: 828px;
      .app-header__logo {
        font-size: 18px;
      }
      .app-header__search {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        .el-input-search {
          width: 500px;

          ::v-deep .el-input__inner {
            font-size: 14px;
            height: 36px;
            border-radius: 6px;
            background: #ffffff;
            border: 1px solid #999999;
          }
        }

        .el-select-search {
          max-width: 120px;
          ::v-deep .el-input__inner {
            border: 1px solid #999 !important;
            border-left: transparent !important;
            border-radius: 0px 6px 6px 0px;
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
        .el-dropdown-link {
          cursor: pointer;
          color: #fff;
        }
        .alert {
          position: relative;
          .noticePanel {
            position: absolute;
            top: 57px;
            right: 0;
          }
          .dot {
            position: absolute;
            top: -1px;
            left: 13px;
            width: 8px;
            height: 8px;
            background: #ff6161;
            border-radius: 50%;
          }
        }

        .el-dropdown {
          .el-button {
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
        .el-button {
          border: none;
          background: none;
          color: #fff;
          font-size: 14px;
          padding: unset;
        }
        .el-btn-upload {
          width: 110px;
          .el-icon-upload {
            font-size: 20px;
          }
        }
      }
      ul.app-header-nologin {
        list-style-type: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        .el-button {
          border: none;
          background: none;
          color: #fff;
          font-size: 14px;
        }
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
    color: #f0f3fa;
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
