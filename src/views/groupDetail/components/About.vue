<template>
  <div>
    <h2>Description</h2>
    <div class="description">
      {{ this.description }}
    </div>
    <h2>Featrued Things</h2>
    <el-row>
      <el-col v-for="item in featuredThings" :key="item.thingsId" :span="8">
        <things-card :things="item"></things-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ThingsCard from "@/components/ThingsCard";
import { getGroupAboutInfo } from "@/api/groups";
export default {
  // eslint-disable-next-line
  name: "About",
  components: { ThingsCard },
  mounted() {
    getGroupAboutInfo({
      groupId: this.$route.params.groupId,
    }).then((res) => {
      console.log(res);
      this.description = res.data.data.description;
      this.featuredThings = res.data.data.featuredThings;
    });
  },
  data() {
    return {
      description: "",
      featuredThings: [],
    };
  },
};
</script>
<style lang="scss" scoped>
.description {
  width: 100%;
  background-color: #fff;
  padding: 5px;
}
h2 {
  color: #666;
}
</style>
