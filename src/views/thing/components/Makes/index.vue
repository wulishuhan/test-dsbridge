<template>
  <div>
    <el-row>
      <el-col v-for="item in makes" :key="item.id" :span="8">
        <resource-card :info="item"></resource-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ResourceCard from "./components/ResouceCard.vue";
import { getUserMakesByThingId } from "@/api/thing";
export default {
  // eslint-disable-next-line
  name: "Makes",
  components: { ResourceCard },
  data() {
    return {
      user: {},
      makes: [],
    };
  },
  mounted() {
    getUserMakesByThingId({
      thingId: this.$route.params.thingId,
    }).then((res) => {
      this.makes = res.data.data.makes;
    });
  },
};
</script>
<style lang="scss" scoped></style>
