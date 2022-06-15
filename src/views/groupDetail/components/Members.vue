<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="Username" width="180">
      </el-table-column>
      <el-table-column prop="name" label="Name" width="180"> </el-table-column>
    </el-table>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>
<script>
import { throttle } from "@/utils/cache.js";
import { getGroupsMembers } from "@/api/groups";
export default {
  // eslint-disable-next-line
  name: "Members",
  mounted() {
    getGroupsMembers(this.pagination).then((res) => {
      this.tableData.push(...res.data.data);
    });
    window.addEventListener(
      "scroll",
      throttle(() => {
        // 距离底部200px时加载一次
        let bottomOfWindow =
          document.documentElement.offsetHeight -
            document.documentElement.scrollTop -
            window.innerHeight <=
          100;
        if (bottomOfWindow && !this.loading && !this.noMore) {
          this.pagination.currentPage++;
          getGroupsMembers(this.pagination)
            .then((res) => {
              console.log(res);
              document.documentElement.scrollTop -= 100;
              document.body.scrollTop -= 100;
              this.tableData.push(...res.data.data);
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
              this.noMore = true;
            });
        }
      }, 2000)
    );
  },
  data() {
    return {
      loading: false,
      tableData: [],
      dataTotal: 0,
      pagination: {
        currentPage: 1,
        pageSize: 5,
      },
      noMore: false,
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
