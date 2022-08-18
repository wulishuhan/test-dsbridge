<template>
  <div>
    <div class="download-card">
      <div class="left">
        <img :id="'file-' + file.id" :src="file.url" alt="" />
        <div>
          <el-tooltip effect="dark" placement="bottom">
            <div style="max-width: 270px" slot="content">{{ file.name }}</div>
            <div class="name">{{ file.name }}</div>
          </el-tooltip>
          <!-- <div class="name">{{ file.name }}</div> -->
          <div>
            <span>{{ Math.floor(file.size / 1000) }}kb</span>
            <span v-if="type == 'stl'" class="type">stl</span>
            <span v-else-if="type == 'png'" class="type">png</span>
            <span v-else-if="type == 'jpg'" class="type">jpg</span>
            <span v-else-if="type == 'obj'" class="type">obj</span>
            <span v-else-if="type == 'code'" class="type">code</span>
            <span v-else class="type">other</span>
          </div>
          <div class="time">
            <span>updated {{ $d(new Date(file.createTime), "short") }} </span>
          </div>
        </div>
      </div>
      <el-button @click.prevent="download" type="primary">
        {{ $t("download.download") }} <span>{{ file.downloadNumber }} </span>
      </el-button>
    </div>
  </div>
</template>
<script>
// import request from "@/utils/request";
// import { downloadResourceFile } from "@/api/resource";
import { saveAs } from "file-saver";
// import { testDownload } from "@/api/resource";
export default {
  name: "DownloadCard",
  props: {
    file: Object,
    default: () => {
      return {
        name: "Headset_Holder_v1.stl",
        url: "https://cdn.thingiverse.com/assets/a0/23/4c/6f/68/medium_thumb_Headset_Holder_v1.png",
        size: "1 mb",
        updatedTime: "05-17-2022",
        downloadNumber: 511,
        type: "stl",
      };
    },
  },
  data() {
    return {
      type: "",
    };
  },
  mounted() {
    let arr = this.file.name.split(".");
    this.type = arr[arr.length - 1].toLocaleLowerCase();
  },
  methods: {
    download() {
      let imageType = ["jpg", "png", "jpeg", "gif"];
      if (imageType.includes(this.type)) {
        this.downloadUsingCanvas();
      } else if (this.type === "svg") {
        console.log("svg!");
        // let image = new Image();
        // image.src = this.file.url;
        // var that = this;
        // image.crossOrigin = "anonymous";
        // image.onload = function () {
        //   let c = document.createElement("canvas");
        //   let ctx = c.getContext("2d");
        //   c.width = this.width;
        //   c.height = this.height;
        //   ctx.clearRect(0, 0, c.width, c.height);
        //   ctx.drawImage(image, 0, 0, c.width, c.height);
        //   c.toBlob(function (blob) {
        //     saveAs(blob, that.file.name + ".jpg");
        //   });
        // };
        this.baseDownload(
          this.file.url + "?" + new Date().getTime(),
          this.file.name
        );
      } else {
        window.open(this.file.url);
      }
    },
    downloadUsingCanvas() {
      console.log("图片!");
      let image = new Image();
      image.src = this.file.url;
      var that = this;
      image.crossOrigin = "anonymous";
      image.onload = function () {
        let c = document.createElement("canvas");
        let ctx = c.getContext("2d");
        c.width = this.width;
        c.height = this.height;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(image, 0, 0, c.width, c.height);
        c.toBlob(function (blob) {
          saveAs(blob, that.file.name);
        });
      };
    },
    baseDownload(imgUrl, name) {
      console.log("baseDownload", imgUrl, name);
      // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
      if (window.navigator.msSaveOrOpenBlob) {
        var bstr = atob(imgUrl.split(",")[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new Blob([u8arr]);
        window.navigator.msSaveOrOpenBlob(blob, name);
      } else {
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = imgUrl; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.download-card {
  background-color: #fff;
  width: 544px;
  padding: 10px 1px;
  text-align: left;
  margin: 0 auto;
  // border-bottom: solid 1px #ccc;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
  }
  .name {
    width: 288px;
    overflow: hidden;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #1a1a1a;
    margin-bottom: 2px;
  }
  .type {
    width: 28px;
    height: 12px;
    background: #1a1a1a;
    border-radius: 3px;
    padding: 0 5px;
    margin-left: 2px;
    color: white;
  }
  .time {
    margin-top: 2px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
  }
  img {
    width: 88px;
    height: 56px;
    margin-right: 10px;
  }
  span {
    font-size: 11px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    margin-right: 5px;
  }
}
.el-button {
  width: 152px;
  height: 48px;
  background: #1e78f0;
  border-radius: 8px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
}
</style>
