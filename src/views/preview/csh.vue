<template>
  <div>
    <div style="width: 486px">
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
    <div style="margin-top: 50px">
      <preview></preview>
    </div>
  </div>
</template>
<script>
import Login from "@/components/Login";
import ShowMore from "@/components/ShowMore.vue";
import Preview from "@/components/Preview.vue";
// 用来预览组件
export default {
  name: "csh",
  components: {
    Login,
    ShowMore,
    Preview,
  },
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
      showHeight: 100,
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
