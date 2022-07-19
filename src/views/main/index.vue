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
    <div class="content">
      <el-row :gutter="20" class="filter">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <!-- <popular-filter @setFilter="setFilterPopular"></popular-filter> -->
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <!-- <type-filter @setFilter="setFilterType"></type-filter> -->
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4"> </el-col>
      </el-row>
      <el-row class="row">
        <el-col
          v-for="item in things"
          :key="item.thingId"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
        >
          <resource-card :thing="item"></resource-card>
        </el-col>
      </el-row>
      <pagination
        ref="mainPagination"
        @getData="getThings"
        :total="total"
      ></pagination>
    </div>
  </div>
</template>
<script>
import ResourceCard from "@/components/ResourceCard";
// import TypeFilter from "./components/TypeFilter.vue";
// import PopularFilter from "./components/PopularFilter.vue";
import pagination from "@/components/Pagination.vue";
import { getThingList } from "@/api/thing";
export default {
  // eslint-disable-next-line
  name: "Main",
  components: { ResourceCard, pagination },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      things: [],
      total: 0,
      filterPopular: "",
      filterType: "",
      pagination: {
        pageSize: 10,
        currentPage: 1,
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  mounted() {
    this.getThings(this.pagination);
  },
  methods: {
    getThings(pagination) {
      if (pagination) {
        this.currentPage = pagination.currentPage;
        this.pageSize = pagination.pageSize;
      }
      getThingList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        filterPopular: this.filterPopular,
        filterType: this.filterType,
      }).then((res) => {
        this.things = res.data.data;
        this.$refs.mainPagination.total = res.data.length;
        this.total = res.data.length;
        console.log("things", this.things);
      });
    },
    setFilterPopular(value) {
      this.filterPopular = value;
      this.getThings();
    },
    setFilterType(value) {
      this.filterType = value;
      this.getThings();
    },
  },
};
</script>

<style scoped>
.main {
  text-align: center;
  background-color: #fff;
}
.content {
  width: 90%;
  margin: 0 auto;
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
@media screen and (max-width: 768px) {
  .content {
    width: 100%;
  }
}
</style>
