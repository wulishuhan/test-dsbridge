<template>
  <div>
    <ElImageViewer
      class="imageViewer"
      v-if="showMake"
      :on-close="closeMake"
      :url-list="makeUrl"
      :isMake="true"
    ></ElImageViewer>
    <div style="display: flex; justify-content: space-between; flex-wrap: wrap">
      <div style="position: relative">
        <el-image class="more-image" :src="url"> </el-image>
        <div class="makes-mask" @click="openMake">
          <div class="makes-mask-font-container">
            <span class="ortur-icon-message"></span>
            12
            <span class="el-icon-arrow-right"></span>
          </div>
          <div
            v-if="showMoreIcon"
            style="color: white; padding-right: 16px; font-size: 16px"
            @click.stop="handleClickMore"
          >
            ···
          </div>
        </div>
      </div>
      <div class="moreMenu" v-if="showMoreMenu">
        <div
          class="moreMenuItem"
          @click.stop="handleDelClick"
          v-show="isYourAccount"
        >
          {{ $t("design.Delete") }}
        </div>

        <div class="moreMenuItem" @click.stop="handleDownClick">
          {{ $t("design.download") }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ElImageViewer from "@/components/ImageViewer";

export default {
  components: { ElImageViewer },
  props: {
    isYourAccount: {
      type: Boolean,
      default: false,
    },
    showMoreIcon: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default:
        "https://orturbucket.s3.amazonaws.com/assets/2022/08/10/c4d93a3805b3ce3f323f7974e6f78jpeg_20220810182053A028.jpeg",
    },
  },
  computed: {
    makeUrl() {
      return [this.url];
    },
  },
  data() {
    return {
      showMake: false,
      showMoreMenu: false,
    };
  },
  methods: {
    handleDownClick() {
      if (!this.$store.getters.isLogin) {
        let payload = { loginDialogVisible: true, isLoginForm: true };
        this.$store.dispatch("user/switchLoginRegisteForm", payload);
        return;
      }
      this.showMoreMenu = false;
      this.$emit("clickDownMenu", this.thing);
    },
    handleDelClick() {
      if (!this.$store.getters.isLogin) {
        let payload = { loginDialogVisible: true, isLoginForm: true };
        this.$store.dispatch("user/switchLoginRegisteForm", payload);
        return;
      }
      this.showMoreMenu = false;
      this.$emit("clickDelMenu", this.thing);
    },
    handleClickMore() {
      this.showMoreMenu = !this.showMoreMenu;
    },
    openMake() {
      this.showMake = true;
      document.documentElement.style.overflowY = "hidden";
    },
    closeMake() {
      this.showMake = false;
      document.documentElement.style.overflowY = "scroll";
    },
  },
};
</script>
<style scoped lang="scss">
.moreMenu {
  z-index: 9999;
  position: absolute;
  width: 160px;
  // height: 176px;
  background: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  text-align: left;
  bottom: 35px;
  right: 7px;
  .moreMenuItem {
    width: 144px;
    height: 48px;
    border-radius: 8px;
    line-height: 48px;
    margin: 8px auto;
    padding-left: 25px;
  }
  .moreMenuItem:hover {
    background: #8ab5ef;
  }
}
.makes-mask {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 3px;
  width: 184px;
  height: 32px;
  background-color: rgba(34, 34, 34, 0.5);
  text-align: center;
  line-height: 32px;
  .ortur-icon-message {
    position: relative;
    top: 2px;
  }
  .makes-mask-font-container {
    color: #fff;
    font-size: 16px;
    margin-left: 25px;
  }
}
.more-image-box {
  margin-top: 31px;
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(3, 184px);
  justify-content: space-between;
}

.more-image {
  width: 184px;
  height: 112px;
  margin-top: 5px;
}

::v-deep .el-image-viewer__img {
  width: 1084px;
  height: 660px;
}
::v-deep .el-image-viewer__close {
  background-color: rgba(26, 26, 26, 0.3);
  border-radius: 0px;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  font-size: 14px;
}
.makes-mask:hover {
  cursor: pointer;
}
</style>
