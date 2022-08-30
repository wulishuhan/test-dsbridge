<template>
  <span>
    <el-button
      :style="{ color: isStar ? 'red' : 'black' }"
      class="baseButton button"
      :disabled="disabled"
      @click="click"
    >
      <i :class="isStar ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
      <span class="num">{{ numText }}</span>
    </el-button>
  </span>
</template>

<script>
export default {
  methods: {
    click() {
      this.$emit("click");
    },
  },
  props: {
    starNum: {
      type: Number,
      default: 0,
    },
    isStar: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    numText() {
      let numText = "";
      if (this.starNum < 0) {
        numText = "0";
      } else if (this.starNum < 1000) {
        numText = "" + this.starNum;
      } else {
        numText = Math.floor(this.starNum / 1000) + "k";
      }
      return numText;
    },
  },
};
</script>

<style></style>
<style lang="scss" scoped>
.button {
  width: 120px;
  height: 56px;
  /* margin-left: 24px; */
  .num {
    color: #000;
    font-size: 20px;
  }
  i {
    font-size: 25px;
  }
}
</style>
