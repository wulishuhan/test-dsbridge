<template>
  <div>
    <div class="download-card">
      <img :src="file.url" alt="" />
      <div>
        <div>{{ file.name }}</div>
        <div>
          <span>{{ file.size }}kb |</span>
          <span>updated {{ file.updatedTime }} |</span>
          <span>{{ file.downloadNumber }} Downloads</span>
        </div>
      </div>
      <el-button
        @click.prevent="download"
        type="primary"
        icon="el-icon-download"
        >Download</el-button
      >
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
  width: 100%;
  padding: 10px 18px;
  border-bottom: solid 1px #ccc;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
    font-size: 18px;
    font-weight: 400;
    max-width: 280px;
    box-sizing: border-box;
  }
  img {
    width: 55px;
    height: 44px;
    margin-right: 10px;
  }
  span {
    font-size: 12px;
    margin-right: 5px;
  }
}
</style>
