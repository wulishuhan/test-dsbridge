<template>
  <div style="width: 605px; height: 372px; position: relative">
    <!-- <test-card :thing="test"></test-card> -->
    <el-carousel
      height="372px"
      direction="vertical"
      :autoplay="true"
      arrow="always"
      indicator-position="outside"
      trigger="click"
      ref="nop"
    >
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <div class="btn-div">
      <div class="btn btn-up" @click="prev()">
        <i class="ortur-icon-arrow-up"></i>
      </div>
      <div class="btn btn-down" @click="next()">
        <i class="ortur-icon-arrow-bottom"></i>
      </div>
    </div>
    <div class="btn-enlarge">
      <i class="ortur-icon-enlarge"></i>
    </div>
    <div style="border: solid"></div>
    <div>
      <div class="select-box">
        <i class="ortur-icon-hourglass icon-hourglass"></i>
        <el-select v-model="value" placeholder="The Popular" class="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="font-size: 12px"
            class="option"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
// import TestCard from "@/components/ResourceCard/index";
// import Share from "@/components/ShareCard/index";
// 用来预览组件
export default {
  name: "csh",
  // components: { TestCard, Share },
  data() {
    return {
      test: {
        avatar: "http://dummyimage.com/300x200/f27982/FFF&text=vknro",
        id: "620000197009121720",
        isCollected: true,
        isLike: false,
        likes: 737,
        publicTime: "1976 02 23",
        thingId: "620000197009121720",
        thingName: "ccdfsctohgg",
        url: "http://dummyimage.com/300x200/79a5f2/FFF&text=gxmorr",
        userId: "620000197009121720",
        userName: "gcxzxpbyne",
      },
      options: [
        {
          value: "popular",
          label: "The popular",
        },
        {
          value: "newest",
          label: "The newest",
        },
        {
          value: "folowing",
          label: "Only folowing",
        },
      ],
      value: "",
    };
  },
  methods: {
    prev() {
      this.$refs.nop.prev();
    },
    next() {
      this.$refs.nop.next();
    },
  },
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.btn-div {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 605px;
  height: 372px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
}
.btn {
  width: 138px;
  height: 36px;
  background: #1a1a1a;
  opacity: 0.3;
  border-radius: 6px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-up {
  margin-top: 12px;
}
.btn-down {
  margin-bottom: 12px;
}
.btn-enlarge {
  width: 36px;
  height: 36px;
  background: #1a1a1a;
  opacity: 0.3;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
