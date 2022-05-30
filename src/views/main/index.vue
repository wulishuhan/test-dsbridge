<template>
  <div class="main">
    <header class="groups-header">
      <div>
        <h1 class="group-title">ORTUR GROUPS</h1>
        <p>
          Find, join, and create groups around specific topics to start
          conversations and share Things.
        </p>
      </div>
    </header>
    <el-row :gutter="20" class="filter">
      <el-col :span="8">
        <popular-filter></popular-filter>
      </el-col>
      <el-col :span="8">
        <type-filter></type-filter>
      </el-col>
      <el-col :span="8"> </el-col>
    </el-row>
    <el-row class="row">
      <el-col
        v-for="item in things"
        :key="item.id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
      >
        <resource-card :thing="item"></resource-card>
      </el-col>
    </el-row>
    <pagination @getThingLists="getThingLists" :total="total"></pagination>
  </div>
</template>
<script>
import ResourceCard from "./components/ResouceCard.vue";
import TypeFilter from "./components/Filter/TypeFilter.vue";
import PopularFilter from "./components/Filter/PopularFilter.vue";
import pagination from "./components/Pagination.vue";
import { getThingList } from "@/api/thing";
export default {
  // eslint-disable-next-line
  name: "Main",
  components: { ResourceCard, TypeFilter, PopularFilter, pagination },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      things: [],
      total: 0,
    };
  },
  mounted() {},
  methods: {
    getThingLists(pageSize, currentPage) {
      getThingList({
        currentPage: currentPage,
        pageSize: pageSize,
      }).then((res) => {
        this.things = res.data.data;
        this.total = res.data.length;
      });
    },
  },
};
</script>

<style scope>
.main {
  text-align: center;
  background-color: #f2f2f2;
}
.filter {
  padding: 10px;
}
a {
  text-decoration-line: none;
  color: #303133;
}
.groups-header {
  background: #000;
  height: 220px;
  width: 100%;
  text-align: center;
  color: aliceblue;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}
</style>
