<template>
  <div class="container">
    <header class="groups-header">
      <div>
        <h1 class="group-title">ORTUR GROUPS</h1>
        <p>
          Find, join, and create groups around specific topics to start
          conversations and share Things.
        </p>
      </div>
    </header>
    <br />
    <el-row style="text-align: center">
      <el-col :span="6">
        <el-select
          v-model="groupsSelector"
          placeholder="My Groups"
          @change="groupChange"
        >
          <el-option
            v-for="item in groupsFilter"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select
          v-model="typeSelector"
          placeholder="Most Members"
          @change="typeChange"
        >
          <el-option
            v-for="item in typeFilter"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input
          placeholder="请输入搜索关键词"
          suffix-icon="el-icon-search"
          v-model="keywords"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-button>CREATE A GROUP</el-button>
      </el-col>
    </el-row>
    <group-card
      v-for="item in groups"
      :key="item.id"
      :group="item"
    ></group-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    >
    </el-pagination>
  </div>
</template>
<script>
import GroupCard from "./components/GroupCard";
import { getGroupsList } from "@/api/groups";
export default {
  // eslint-disable-next-line
    name: "groups",
  components: { GroupCard },
  data() {
    return {
      groupsFilter: [
        {
          value: "all",
          label: "All Groups",
        },
        {
          value: "my",
          label: "My Groups",
        },
      ],
      groupsSelector: "",
      typeFilter: [
        {
          value: "Most Members",
          label: "Most Members",
        },
        {
          value: "Most Topics",
          label: "Most Topics",
        },
        {
          value: "Most Things",
          label: "Most Things",
        },
        {
          value: "newst",
          label: "Newst",
        },
      ],
      typeSelector: "",
      keywords: "",
      groups: [],
      pagination: {
        total: 100,
        pageSize: 10,
        currentPage: 1,
      },
    };
  },
  mounted() {
    this.getGroups();
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getGroups();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getGroups();
    },
    getGroups(typeSelector) {
      console.log({ ...this.pagination, typeSelector });
      getGroupsList({ ...this.pagination, typeSelector }).then((res) => {
        this.groups = res.data.data;
        console.log("this.groups", this.groups);
      });
    },
    typeChange(val) {
      this.typeSelector = val;
      this.getGroups(val);
    },
    groupChange(val) {
      this.getGroups(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background: #f5f5f5;
}
.groups-header {
  background: #409eff;
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
.el-pagination {
  text-align: center;
}
</style>
