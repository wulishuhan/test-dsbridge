<template>
  <div>
    <header style="display: flex; justify-content: space-between">
      <div>
        <el-button type="primary" class="el-icon-plus"
          ><b>JOIN</b> TO POST A THING</el-button
        >
      </div>
      <div style="display: flex; justify-content: space-between; width: 50%">
        <el-button type="text">NEWEST</el-button>
        <el-button type="text">POPULAR</el-button>
        <el-input
          placeholder="search"
          prefix-icon="el-icon-search"
          v-model="keywords"
          style="margin-left: 20px; width: 50%"
        ></el-input>
      </div>
    </header>
    <el-row style="margin-top: 20px">
      <el-col :span="8">
        <things-card></things-card>
      </el-col>
      <el-col :span="8">
        <things-card></things-card>
      </el-col>
      <el-col :span="8">
        <things-card></things-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ThingsCard from "./components/ThingsCard";
export default {
  // eslint-disable-next-line
  name: "Things",
  components: { ThingsCard },
  data() {
    return {
      keywords: "",
    };
  },
};
</script>
<style lang="scss" scoped></style>
