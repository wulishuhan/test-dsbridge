<template>
  <div>
    <el-row>
      <el-col :span="17" class="download-container">
        <h1>{{ thingName }}</h1>
        <download-card
          v-for="item in fileList"
          :file="item"
          :key="item.id"
        ></download-card>
      </el-col>
      <el-col :span="6" :offset="1">
        <widget-container :title="'License'">
          <p>
            {{ thingName }}
            <span>
              is licensed under the
              <a href="#"
                >Creative Commons - Attribution - Non-Commercial - No
                Derivatives</a
              >
              license.
            </span>
          </p>
        </widget-container>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import WidgetContainer from "../WidgetContainer";
import DownloadCard from "./components/DownloadCard";
import { getThingDownloadInfo } from "@/api/thing";
export default {
  name: "ThingFiles",
  components: { WidgetContainer, DownloadCard },
  props: {
    thingName: {
      type: String,
      default: "shutest",
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  mounted() {
    getThingDownloadInfo({
      thingId: this.$route.params.thingId,
    }).then((res) => {
      this.fileList = res.data.data;
    });
  },
};
</script>
<style lang="scss" scoped>
.download-container {
  background-color: #fff;
  margin-top: 10px;
  box-sizing: border-box;
  h1 {
    color: #555;
    font-size: 18px;
    font-weight: 400;
    margin-left: 20px;
  }
}
</style>
