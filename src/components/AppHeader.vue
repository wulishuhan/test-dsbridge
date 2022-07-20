<template>
  <div class="app-header-wrapper">
    <div class="app-header header-shadow navbar">
      <div class="app-header__content">
        <div class="app-header-left">
          <div class="app-header__logo" style="font-size: 24px">
            <router-link to="/main">
              <span class="ortur-icon-logo"
                ><span class="path1"></span><span class="path2"></span
                ><span class="path3"></span><span class="path4"></span
                ><span class="path5"></span><span class="path6"></span
              ></span>
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
          <ul class="app-header-dots">
            <li>
              <router-link to="/upload">
                <el-button type="primary" class="el-btn-upload">
                  <span>上传</span>
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
              <el-dropdown>
                <el-button style="background: #f5f5f5; border: none">
                  <span style="display: flex; align-items: center">
                    <i
                      class="ortur-icon-user-info"
                      style="font-size: 22px; color: #409eff"
                    ></i>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>xxx</el-dropdown-item>
                  <el-dropdown-item>概况</el-dropdown-item>
                  <el-dropdown-item>历史</el-dropdown-item>
                  <el-dropdown-item>设置</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      keywords: "",
      select: "",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
      width: 700px;

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
          }
        }

        .el-select-search {
          max-width: 120px;
          ::v-deep .el-input__inner {
            border: 1px solid #88bbf3 !important;
            border-left: transparent !important;
            border-radius: 0px 4px 4px 0px;
            margin-left: -1px;
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
</style>
