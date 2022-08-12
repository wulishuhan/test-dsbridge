<template>
  <div>
    <div class="download-card">
      <div class="left">
        <img :src="file.url" alt="" />
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
import request from "@/utils/request";
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
    this.type = arr[arr.length - 1];
    console.log(this.file.updatedTime);
  },
  methods: {
    download() {
      request({
        url: this.file.url,
        method: "get",
      }).then((res) => {
        console.log("res: ", res);
        const blob = new Blob([res.data]);
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        link.download = res.headers.filename;
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.appendChild(link);
      });
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
