<template>
  <div class="container">
    <div class="center-container">
      <div class="show">
        <el-row>
          <el-col :span="18">
            <div class="author">
              <el-avatar :size="50" :src="user.avatar"></el-avatar>
              <div>
                <span class="thing-name">{{ user.thingName }}</span>
                <span>
                  by
                  <a href="#">
                    {{ user.name }}
                  </a>
                  {{ user.publicTime }}
                </span>
              </div>
            </div>
            <div class="model-button-group">
              <el-button @click="showModel">show model</el-button>
              <el-button @click="closeModel">close model</el-button>
            </div>
            <div v-if="viewModel">
              <view-model></view-model>
            </div>
            <div v-if="!viewModel" class="show-thing">
              <!-- <concise-slider :imageList="imgList"></concise-slider> -->
              <div>
                <div>
                  <div class="carousel">
                    <el-carousel
                      height="526px"
                      :interval="3000"
                      arrow="never"
                      ref="carousel"
                      indicator-position="none"
                      :autoplay="false"
                    >
                      <el-carousel-item
                        v-for="(item, index) in imageList"
                        :name="'' + index"
                        :key="item.id"
                        indicator-position="outside"
                        autoplay="true"
                      >
                        <img :src="item.url" />
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
                <div class="bottom-carousel">
                  <button
                    class="el-icon-arrow-left"
                    @click="trunImageLeft()"
                  ></button>
                  <ul class="img-ul">
                    <li
                      v-for="(item, index) in showImg"
                      class="img-li"
                      :key="item.id + index"
                      @click="changeImg(item, index)"
                    >
                      <img
                        :class="
                          item.index === imgActiveIndex
                            ? 'img-activeBorder'
                            : ''
                        "
                        :src="item.url"
                      />
                    </li>
                  </ul>
                  <button
                    class="el-icon-arrow-right"
                    @click="trunImageRight()"
                  ></button>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="5" :offset="1">
            <div class="user-active">
              <div class="active-box">
                <el-button type="primary" icon="el-icon-download">
                  Download All Files
                </el-button>
              </div>
              <div class="active-box">
                <span><i class="el-icon-plus"></i>Collect Thing</span>
              </div>
              <div class="active-box">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    class="bi bi-heart"
                    viewBox="0 -1 16 16"
                  >
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                  </svg>
                  Like
                </span>
                <i class="el-icon-right"></i>
              </div>
              <div class="active-box">
                <span><i class="el-icon-chat-square"></i>Comment</span>
              </div>
              <div class="active-box">
                <span><i class="el-icon-edit"></i>Post a Make</span>
                <i class="el-icon-right"></i>
              </div>
              <div class="active-box">
                <span><i class="el-icon-view"></i>Watch</span>
              </div>
              <div class="active-box">
                <span><i class="el-icon-refresh"></i>Remix it</span>
                <i class="el-icon-right"></i>
              </div>
              <div class="active-box">
                <span><i class="el-icon-plus"></i>Copy Link</span>
              </div>
              <div class="active-box">
                <el-button type="primary" icon="el-icon-upload2">
                  Tip Designer
                </el-button>
              </div>
            </div>
            <div class="share-thing">
              <span>Share this thing</span>
              <div class="social-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-twitter"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-whatsapp"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-link-45deg"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"
                  />
                  <path
                    d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                  />
                </svg>
              </div>
              <div class="send-email">
                <span>Send to Thingiverse user</span>
                <el-input placeholder="Enter user name or email"></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="Thing Details" name="first">
          <thing-details></thing-details>
        </el-tab-pane>
        <el-tab-pane label="Thing Files" name="second">
          <thing-files></thing-files>
        </el-tab-pane>
        <el-tab-pane label="Comments" name="third">
          <comments></comments>
        </el-tab-pane>
        <el-tab-pane label="Makes" name="fourth">
          <makes></makes>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import ViewModel from "./components/ViewModel";
import ThingDetails from "./components/ThingDetails";
import ThingFiles from "./components/ThingFiles/index";
import Comments from "./components/Comments/index";
import Makes from "./components/Makes";
import { getUserInfoByThingId } from "@/api/thing";
export default {
  // eslint-disable-next-line
  name: "thingMake",
  components: {
    ViewModel,
    ThingDetails,
    ThingFiles,
    Comments,
    Makes,
  },
  data() {
    return {
      activeName: "first",
      user: {},
      imgActiveIndex: 0, // 当前移动图片的索引值
      imageList: [],
      showImg: [],
      waitImg: [],
      viewModel: false,
    };
  },
  methods: {
    setActiveItem(index) {
      this.$refs.carousel.setActiveItem(index);
    },
    showModel() {
      console.log("view model");
      this.viewModel = true;
    },
    closeModel() {
      console.log("close model");
      this.viewModel = false;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeImg(item) {
      this.$refs.carousel.setActiveItem(item.index);
      this.imgActiveIndex = item.index;
    },
    trunImageLeft() {
      let currentShowImgLast = this.showImg.pop();
      this.waitImg.unshift(currentShowImgLast);
      this.showImg.unshift(this.waitImg.pop());
    },
    trunImageRight() {
      let currentShowImgFirst = this.showImg.shift();
      this.waitImg.push(currentShowImgFirst);
      this.showImg.push(this.waitImg.shift());
    },
  },
  created() {
    getUserInfoByThingId({
      thingId: this.$route.params.thingId,
    }).then((res) => {
      this.user = res.data.data;
      this.imageList = this.user.image;
      for (let i = 0; i < this.imageList.length; i++) {
        let obj = {
          ...this.imageList[i],
          index: i,
        };
        i < 8 ? this.showImg.push(obj) : this.waitImg.push(obj);
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #f2f2f2;
  height: 100%;
  .model-button-group {
    background-color: #fff;
    width: 700px;
  }
  .show {
    margin-top: 20px;
  }
  .tip {
    width: 700px;
    height: 41px;
    background-color: #fca833;
    color: #fff;
    font-size: 14px;
    line-height: 41px;
  }
  .author {
    margin-top: 10px;
    width: 700px;
    height: 63px;
    background-color: #fff;
    display: flex;
    align-items: center;
    color: #555;
    div {
      display: flex;
      font-size: 12px;
      flex-direction: column;
      margin-left: 16px;
      a {
        color: #248bfb;
        text-decoration: none;
      }
      .thing-name {
        font-size: 18px;
      }
    }
  }
  .show-thing {
    width: 700px;
    background-color: #fff;
    .switchImage {
      width: 700px;
      height: 66px;
      background-color: #fff;
      img {
        margin-left: 6px;
        cursor: pointer;
        margin-top: 5px;
      }
    }
  }
  .user-active {
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
    .active-box {
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      padding: 5px;
      width: 100%;
      min-height: 41px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #555;
      cursor: pointer;
      span {
        margin-left: 3px;
        font-size: 12px;
      }
      i {
        font-size: 14px;
      }
      .el-icon-right {
        margin-right: 5px;
      }
    }
  }
  .share-thing {
    width: 100%;
    height: 255px;
    color: #555;
    background-color: #fff;
    margin-top: 10px;
    padding: 10px 0px 10px 10px;
    box-sizing: border-box;
    span {
      font-size: 16px;
    }
    .social-icon {
      margin-top: 10px;
      svg {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        margin-top: 10px;
      }
    }
    .send-email {
      margin-top: 20px;
      span {
        font-size: 12px;
        padding: 10px;
      }
      .el-input {
        margin-top: 20px;
      }
    }
  }
  .filter-box {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
}
.center-container {
  margin: 0 auto;
  width: 970px;
}
.el-tabs {
  margin-top: 15px;
}
.img-ul {
  position: relative;
  left: -20px;
  display: flex;
  width: 100%;
  height: 66px;
  overflow: hidden;
  list-style: none;
}
.img-li {
  float: left;
  margin: 0 8px;
  cursor: pointer;
  img {
    width: 80px;
    height: 62px;
  }
}
.img-activeBorder {
  border: 1px solid #248bfb;
}
.bottom-carousel {
  display: flex;
  width: 700px;
  align-items: center;
  justify-content: space-around;
}
.el-icon-arrow-left {
  font-size: 30px;
  display: inline-block;
  cursor: pointer;
  background: none;
  border: none;
}
.el-icon-arrow-right {
  font-size: 30px;
  display: inline-block;
  cursor: pointer;
  background: none;
  border: none;
}
.carousel {
  width: 700px;
  height: 524px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
