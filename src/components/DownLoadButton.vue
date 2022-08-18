<template>
  <span @click="closeDownPanel">
    <el-button class="baseButton button" @click.stop="showDownPanel">
      <div class="downPanel" v-show="isShowDownPanel">
        <div class="downLoadAll">
          <span class="fileNum">
            {{ fileNum }}{{ $t("download.fileNum") }}
          </span>
          <a style="color: #1e78f0" @click="downLoadAll">{{
            $t("download.downloadAll")
          }}</a>
        </div>
        <download-card
          v-for="item in fileList"
          :file="item"
          :key="item.id"
        ></download-card>
      </div>
      <span class="el-icon--left ortur-icon-file-download">
        <span class="path1"></span><span class="path2"> </span>
      </span>
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
            type: "png",
          },
          {
            name: 111,
            size: "20kb",
            updatedTime: 2012,
            downloadNumber: 111,
            url: "https://cdn.thingiverse.com/assets/a0/23/4c/6f/68/medium_thumb_Headset_Holder_v1.png",
            type: "stl",
          },
        ];
      },
    },
    downLoadNum: {
      type: Number,
      default: 0,
    },
    fileNum: {
      type: Number,
      default: 12,
    },
  },
};
</script>

<style></style>
<style lang="scss" scoped>
.button {
  width: 120px;
  position: relative;
  color: #000;
  .num {
    color: #000;
  }
  .downPanel {
    position: absolute;
    width: 592px;
    height: 480px;
    background: #ffffff;
    border-radius: 20px;
    top: 42px;
    /* left: -358px; */
    right: 0px;
    overflow: auto;
    z-index: 9;
    .downLoadAll {
      .fileNum {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
      }
      display: flex;
      justify-content: space-between;
      padding: 15px 29px;
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
.ortur-icon-file-download {
  font-size: 18px;
}
</style>
