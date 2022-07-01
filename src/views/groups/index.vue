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
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
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
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
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
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <el-input
          placeholder="请输入搜索关键词"
          suffix-icon="el-icon-search"
          v-model="keywords"
        ></el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <router-link to="/groups/create">
          <el-button>CREATE A GROUP</el-button>
        </router-link>
      </el-col>
    </el-row>
    <group-card
      v-for="item in groups"
      :key="item.id"
      :group="item"
    ></group-card>
    <pagination ref="groupsPagination" @getData="getGroups"></pagination>
  </div>
</template>
<script>
import GroupCard from "./components/GroupCard";
import pagination from "@/components/pagination";
import { getGroupsList } from "@/api/groups";
export default {
  // eslint-disable-next-line
  name: "groups",
  components: { GroupCard, pagination },
  mounted() {
    this.getGroups();
  },
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
        pageSize: 10,
        currentPage: 1,
      },
    };
  },
  methods: {
    getGroups(pagination) {
      if (pagination) {
        this.pagination = pagination;
      }
      getGroupsList({ ...this.pagination })
        .then((res) => {
          this.groups = res.data.data;
          this.$refs.groupsPagination.total = res.data.length;
        })
        .catch((err) => {
          console.error("err:", err);
        });
    },
    typeChange(val) {
      this.typeSelector = val;
      console.log("typeChange", val);
      this.getGroups();
    },
    groupChange(val) {
      console.log("groupChange", val);
      this.getGroups();
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
@media screen and (max-width: 768px) {
  .el-select {
    width: 100%;
  }
  .el-button {
    width: 100%;
  }
}
</style>
