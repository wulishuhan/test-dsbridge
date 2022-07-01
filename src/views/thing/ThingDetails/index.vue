<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <widget-container :title="'Contents'">
          <div>
            <a
              href="#"
              v-for="item in details.content"
              :key="item"
              style="float: left"
            >
              {{ item }}
            </a>
          </div>
        </widget-container>
        <widget-container :title="'Tags'">
          <a href="#" v-for="item in details.tags" :key="item">{{ item }}</a>
        </widget-container>
        <widget-container :title="'License'">
          <p>
            {{ thingName }}
            <span>
              is licensed under the
              <a href="#" v-for="item in details.license" :key="item">
                {{ item }}
              </a>
              license.
            </span>
          </p>
        </widget-container>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="{ span: 15, offset: 1 }"
        :lg="{ span: 15, offset: 1 }"
        :xl="{ span: 15, offset: 1 }"
      >
        <Summary :summary="details.summary"></Summary>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import WidgetContainer from "../components/WidgetContainer";
import Summary from "./components/Summary.vue";
import { getThingDetails } from "@/api/thing";
export default {
  name: "ThingDetails",
  components: { WidgetContainer, Summary },
  props: {
    thingName: {
      type: String,
      default: "shutest",
    },
  },
  data() {
    return {
      details: {},
    };
  },
  mounted() {
    getThingDetails({
      thingId: this.$route.params.thingId,
    }).then((res) => {
      this.details = res.data.data;
    });
  },
};
</script>
<style lang="scss" scoped></style>
