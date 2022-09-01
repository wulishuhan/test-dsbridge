<template>
  <div>
    <div style="display: flex; justify-content: space-between; flex-wrap: wrap">
      <div
        style="position: relative"
        @mouseenter="showMask = true"
        @mouseleave="showMask = false"
      >
        <el-image class="more-image" :src="make.url"> </el-image>
        <div class="makes-mask" @click="openMake" v-show="showMask">
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
export default {
  props: {
    make: {
      type: Object,
      default: () => {
        return {
          id: new Date().getTime(),
          url: "https://orturbucket.s3.amazonaws.com/assets/2022/08/10/c4d93a3805b3ce3f323f7974e6f78jpeg_20220810182053A028.jpeg",
        };
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showMake: false,
      showMask: false,
    };
  },
  methods: {
    openMake() {
      this.$emit("openMake");
      this.$emit("getIndex", this.index);
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
