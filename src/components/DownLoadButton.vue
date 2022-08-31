<template>
  <div @click="closeDownPanel">
    <el-button class="baseButton button" @click.stop="showDownPanel">
      <div class="downPanel" @click.stop="stopBublet" v-show="isShowDownPanel">
        <div class="downLoadAll">
          <span class="fileNum">
            {{ fileNum }}{{ $t("download.fileNum") }}
          </span>
          <a class="download-all-tag" @click="downLoadAll">{{
            $t("download.downloadAll")
          }}</a>
        </div>
        <download-card
          v-for="item in fileList"
          :file="item"
          :key="item.id"
        ></download-card>
      </div>
      <span class="el-icon--left ortur-icon-file-download" style="color: #fff">
        <span class="path1"></span><span class="path2"> </span>
      </span>
      <span class="download-text"> Download </span>
      <span class="num">{{ numText }}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
  </div>
</template>

<script>
import DownloadCard from "./DownloadCard";
import { getFileData } from "@/utils/exportZip.js";
import { saveAs } from "file-saver";
import JSZip from "jszip";
export default {
  components: {
    DownloadCard,
  },
  data() {
    return {};
  },
  computed: {
    numText() {
      let numText = "";
      if (this.downLoadNum < 0) {
        numText = "0";
      } else if (this.downLoadNum < 1000) {
        numText = "" + this.downLoadNum;
      } else {
        numText = Math.floor(this.downLoadNum / 1000) + "k";
      }
      return numText;
    },
  },
  methods: {
    async downLoadAll() {
      let zip = new JSZip();
      for (let i = 0; i < this.fileList.length; i++) {
        const element = this.fileList[i];
        let res = await getFileData(element.id);
        zip.file(element.name, res);
      }
      zip.generateAsync({ type: "blob" }).then((content) => {
        // see FileSaver.js
        saveAs(content, this.resourceName + ".zip");
      });
    },
    closeDownPanel() {
      //console.log(e)
      // this.isShowDownPanel = false;
    },
    showDownPanel() {
      this.$emit("click");
      // this.isShowDownPanel = !this.isShowDownPanel;
    },
    stopBublet() {},
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
    isShowDownPanel: {
      type: Boolean,
      default: false,
    },
    resourceName: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  width: 248px;
  height: 56px;
  position: relative;
  background-color: #1e78f0;
  color: #fff;
  padding: 0px 5px;
  .num {
    color: #fff;
    opacity: 0.5;
    padding: 0px 10px;
    font-size: 20px;
  }
  .downPanel {
    position: absolute;
    width: 592px;
    height: 480px;
    background: #ffffff;
    border-radius: 20px;
    top: 60px;
    /* left: -358px; */
    right: 0px;
    overflow: auto;
    z-index: 9;
    .downLoadAll {
      .fileNum {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
      }
      display: flex;
      justify-content: space-between;
      padding: 15px 29px;
      .download-all-tag {
        font-size: 16px;
        color: #1e78f0;
      }
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
/* .button:hover .downPanel { */
/* display: block; */
/* } */
.ortur-icon-file-download {
  font-size: 25px;
  color: #fff;
}
.path1::before,
.path2::before {
  color: #fff;
  font-size: 25px;
}
.download-text {
  font-size: 20px;
}
</style>
