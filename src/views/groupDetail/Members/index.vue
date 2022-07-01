<template>
  <div>
    <div class="table-header">
      <span>userName</span>
      <span>name</span>
    </div>
    <div v-for="item in tableData" :key="item.userId">
      <user-info-card :user="item"></user-info-card>
    </div>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>
<script>
import { throttle } from "@/utils/cache.js";
import { getGroupsMembers } from "@/api/groups";
import UserInfoCard from "./components/UserInfoCard";
export default {
  // eslint-disable-next-line
  name: "Members",
  components: { UserInfoCard },
  mounted() {
    getGroupsMembers(this.pagination).then((res) => {
      this.tableData.push(...res.data.data);
    });
    this.load = throttle(() => {
      // 距离底部200px时加载一次
      let bottomOfWindow =
        document.documentElement.offsetHeight -
          document.documentElement.scrollTop -
          window.innerHeight <=
        200;
      if (bottomOfWindow && !this.loading && !this.noMore) {
        this.pagination.currentPage++;
        console.log("addEventListener");
        getGroupsMembers(this.pagination)
          .then((res) => {
            console.log(res);
            this.tableData.push(...res.data.data);
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
            this.noMore = true;
          });
      }
    }, 1500);
    window.addEventListener("scroll", this.load);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.load);
  },
  data() {
    return {
      loading: false,
      tableData: [],
      dataTotal: 0,
      pagination: {
        currentPage: 1,
        pageSize: 10,
      },
      noMore: false,
      rowStyle: {
        height: "100px",
      },
      load: () => {},
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    to(id) {
      this.$router.push(`/design/Designs/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
p {
  text-align: center;
}
.table-header {
  border-bottom: 1px solid #ccc;
  height: 82px;
  width: 100%;
  margin-top: 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.username {
  display: flex;
  align-items: center;
  .el-button {
    margin-left: 15px;
  }
}
</style>
