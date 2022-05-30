<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  /* eslint-disable */
  name: "pagination",
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit("setPagination", this.currentPage, this.pageSize)
      this.$emit("getUserLists");
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit("setPagination", this.currentPage, this.pageSize)
      this.$emit("getUserLists");
    },
  }
};
</script>
<style scope>
.el-pagination {
  text-align: center;
}
</style>
