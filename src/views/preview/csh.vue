<template>
  <div>
    <el-tabs v-model="activeName" style="display: none">
      <el-tab-pane label="aaaa" name="first">
        <div style="width: 1440px; height: 1749px">
          <div style="width: 768px; margin: 0 auto">
            <div
              style="
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              "
            >
              <div style="display: flex; flex-direction: column">
                <div
                  style="
                    font-size: 18px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #1a1a1a;
                  "
                >
                  xxxxx
                </div>
                <div style="display: flex; align-items: center">
                  <el-avatar :size="30" class="el-icon-plus"></el-avatar>
                  <span
                    style="
                      font-size: 12px;
                      font-family: Source Han Sans CN;
                      font-weight: 400;
                      color: #999999;
                      margin-left: 7px;
                    "
                    >xxx</span
                  >
                </div>
              </div>
              <div>
                <!-- <el-button icon="ortur-icon-star">1.2K</el-button>
                <el-button icon="ortur-icon-share">1.2K</el-button>
                <el-button>
                  <i class="ortur-icon-file"></i>
                  1.5K
                  <i style="font-size: 7px" class="ortur-icon-arrow-down"></i>
                </el-button> -->
                <StarButton></StarButton>
                <BaseButton @click="test">基础按钮</BaseButton>
                <DownLoadButton></DownLoadButton>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-top: 30px;
              "
            >
              <div style="width: 605px; height: 372px; border: solid 1px"></div>
              <div style="height: 372px; width: 138px; border: solid 1px"></div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-top: 24px;
              "
            >
              <div
                style="width: 478px; height: 1000px; border: solid 1px"
              ></div>
              <div style="width: 201px; height: 500px; border: solid 1px"></div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="bbbb" name="second">
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
          </div></div
      ></el-tab-pane>
      <el-tab-pane label="cccc" name="third">
        <el-carousel
          height="372px"
          direction="vertical"
          :autoplay="true"
          arrow="always"
          trigger="click"
          ref="nop"
        >
          <el-carousel-item v-for="item in 3" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="login" name="fourth">
        <login></login>
      </el-tab-pane>
    </el-tabs>
    <div style="width: 486px; margin: 0 auto; display: none">
      <el-tabs type="border-card" :stretch="true" v-model="activeName">
        <el-tab-pane label="描述" name="description">
          <show-more
            :showHeight="showHeight"
            :contentHeight="100"
            v-if="activeName == 'description'"
          >
            xxxxxxxxxxxxxxx xxxxxxxx xxxxxxxxx xxxxxx xxxxxxxxx xxxxxxx
            xxxxxxxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxx
            xxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxx xxxxxxxxxxxxxxx xxxxxxxx
            xxxxxxxxx xxxxxx xxxxxxxxx xxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxxxxx
            xxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxx xxxxxxxxx xxxxxxxxxxxxxx
            xxxxxxxxxxx
          </show-more>
        </el-tab-pane>
        <el-tab-pane label="步骤" name="step">
          <show-more :showHeight="showHeight" v-if="activeName == 'step'">
            xxxxxxxxxxxxxxx xxxxxxxx xxxxxxxxx xxxxxx xxxxxxxxx xxxxxxx
            xxxxxxxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxx
            xxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxx
          </show-more>
        </el-tab-pane>
        <el-tab-pane label="制作" name="third">制作</el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <div style="width: 486px; border: solid">
        <div style="display: flex; justify-content: space-between">
          <span
            style="
              font-size: 18px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #1a1a1a;
            "
            >该创作者的更多作品</span
          >
          <a
            style="
              font-size: 15px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #1e78f0;
            "
            >查看全部</a
          >
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-top: 31px;
          "
        >
          <el-image
            style="width: 138px; height: 84px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          ></el-image>
          <el-image
            style="width: 138px; height: 84px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          ></el-image>
          <el-image
            style="width: 138px; height: 84px"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          ></el-image>
        </div>
      </div>
    </div>
    <login></login>
  </div>
</template>
<script>
// import TestCard from "@/components/ResourceCard/index";
// import Share from "@/components/ShareCard/index";
import Login from "@/components/Login";
import DownLoadButton from "@/components/DownLoadButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import StarButton from "@/components/StarButton.vue";
import ShowMore from "@/components/ShowMore.vue";
// 用来预览组件
export default {
  name: "csh",
  // components: { TestCard, Share },
  // components: { Login },
  components: { StarButton, BaseButton, DownLoadButton, Login, ShowMore },
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
      activeName: "step",
      showHeight: 50,
      contentHeight: 0,
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
