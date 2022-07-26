<template>
  <div>
    <div class="download-card">
      <div class="left">
        <img :src="file.url" alt="" />
        <div>
          <div class="name">{{ file.name }}</div>
          <div>
            <span>{{ file.size }}kb</span>
            <span v-if="file.type == 'stl'" class="type">stl</span>
            <span v-else-if="file.type == 'png'" class="type">png</span>
            <span v-else-if="file.type == 'jpg'" class="type">jpg</span>
            <span v-else-if="file.type == 'obj'" class="type">obj</span>
            <span v-else-if="file.type == 'code'" class="type">code</span>
            <span v-else class="type">other</span>
          </div>
          <div class="time">
            <span>updated {{ file.updatedTime }} </span>
          </div>
        </div>
      </div>
      <el-button @click.prevent="download" type="primary">
        Download <span>{{ file.downloadNumber }} </span>
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
    return {};
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
  width: 92%;
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
    font-size: 12px;
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
  }
  img {
    width: 66px;
    height: 42px;
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
  width: 114px;
  height: 36px;
  font-size: 12px;
}
</style>
