<template>
  <span @click="closeDownPanel">
    <el-button class="baseButton button" @click.stop="showDownPanel">
      <div class="downPanel" v-show="isShowDownPanel">
        <div class="downLoadAll">
          <span> 128</span>
          <el-button type="primary" @click="downLoadAll">downLoadAll</el-button>
        </div>
        <download-card
          v-for="item in fileList"
          :file="item"
          :key="item.id"
        ></download-card>
      </div>
      <i class="el-icon--left">
        <svg
          width="15"
          height="15"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.19503 16.7812H3.49164C2.5042 16.7812 2.01048 16.7812 1.6307 16.5952C1.26706 16.4171 0.973022 16.123 0.794881 15.7594C0.608826 15.3796 0.608826 14.8859 0.608826 13.8984V4.10157C0.608826 3.11413 0.608826 2.62041 0.794881 2.24062C0.973022 1.87699 1.26706 1.58295 1.6307 1.40481C2.01048 1.21875 2.5042 1.21875 3.49164 1.21875H5.46812C5.84649 1.21875 6.03568 1.21875 6.21638 1.25566C6.39056 1.29123 6.55861 1.35207 6.7152 1.43625C6.87764 1.52358 7.02298 1.6447 7.31365 1.88693L8.92986 3.23376C9.22054 3.47599 9.36587 3.59711 9.52832 3.68444C9.6849 3.76862 9.85295 3.82946 10.0271 3.86503C10.2078 3.90194 10.397 3.90194 10.7754 3.90194H16.5083C17.4958 3.90194 17.9895 3.90194 18.3693 4.088C18.7329 4.26614 19.027 4.56018 19.2051 4.92381C19.3912 5.3036 19.3912 5.79732 19.3912 6.78476V8.19504M15.3664 9.98314V13.3822M15.3664 13.3822V16.7812M15.3664 13.3822H11.9673M15.3664 13.3822H18.7654"
            stroke="black"
            stroke-linecap="round"
          />
        </svg>
      </i>
      <span class="num">{{ downLoadNum }}k</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
  </span>
</template>

<script>
import DownloadCard from "./DownloadCard";

export default {
  components: {
    DownloadCard,
  },
  data() {
    return {
      isShowDownPanel: false,
    };
  },
  methods: {
    downLoadAll() {},
    closeDownPanel() {
      //console.log(e)
      this.isShowDownPanel = false;
    },
    showDownPanel() {
      this.isShowDownPanel = !this.isShowDownPanel;
    },
  },
  props: {
    fileList: {
      type: Array,
      default: () => {
        return [
          {
            name: 111,
            size: "20kb",
            updatedTime: 2012,
            downloadNumber: 111,
            url: "https://cdn.thingiverse.com/assets/a0/23/4c/6f/68/medium_thumb_Headset_Holder_v1.png",
          },
          { name: 111, size: "20kb", updatedTime: 2012, downloadNumber: 111 },
          { name: 111, size: "20kb", updatedTime: 2012, downloadNumber: 111 },
          { name: 111, size: "20kb", updatedTime: 2012, downloadNumber: 111 },
          { name: 111, size: "20kb", updatedTime: 2012, downloadNumber: 111 },
          { name: 111, size: "20kb", updatedTime: 2012, downloadNumber: 111 },
          { name: 111, size: "20kb", updatedTime: 2012, downloadNumber: 111 },
          { name: 111, size: "20kb", updatedTime: 2012, downloadNumber: 111 },
          { name: 111, size: "20kb", updatedTime: 2012, downloadNumber: 111 },
          { name: 111, size: "20kb", updatedTime: 2012, downloadNumber: 111 },
          { name: 111, size: "20kb", updatedTime: 2012, downloadNumber: 111 },
        ];
      },
    },
    downLoadNum: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style></style>
<style lang="scss" scoped>
.button {
  // width: 90px;
  position: relative;
  margin-left: 24px;

  .num {
    color: #000;
  }
  .downPanel {
    position: absolute;
    width: 500px;
    height: 500px;
    top: 45px;
    border: 1px solid #000;
    left: -20px;
    overflow: auto;
    .downLoadAll {
      display: flex;
      justify-content: space-between;
      padding: 15px;
    }
  }
  .downPanel::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .downPanel::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }
  .downPanel::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
}
// .button:hover .downPanel {
//   display: block;
// }
</style>
