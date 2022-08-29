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
    };
  },
  methods: {
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
.makes-mask {
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
