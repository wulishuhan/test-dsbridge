<template>
  <div>
    <div class="app-header__search">
      <el-button class="el-btn-avatar"
        ><img src="http://dummyimage.com/300x200/ef79f2/FFF&text=yqqmj"
      /></el-button>
      <el-input
        placeholder="Add a comment"
        v-model="keywords"
        class="el-input-search input-with-select"
      >
      </el-input>
      <el-button class="el-btn-post">Post</el-button>
    </div>
  </div>
</template>

<script>
import { getInfo } from "@/api/user";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      keywords: "",
      select: "",
    };
  },
  mounted() {
    getInfo().then(function (res) {
      console.log(res.data.data.avatar);
    });
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.app-header__search {
  width: 80%;
  margin: 0px auto;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border: 1px solid #88bbf3 !important;
  border-radius: 4px;
  .el-input-search {
    width: 100%;
    padding-left: 50px;
    padding-right: 120px;
    border: unset;
  }
  ::v-deep .el-input__inner {
    border: none !important;
    background: unset;
  }
  .el-btn-avatar {
    padding: unset;
    z-index: 1;
    position: absolute;
    height: 34px;
    width: 34px;
    border-radius: 50%;
    top: 3px;
    left: 10px;
    color: #ffffff;
    img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
    }
  }
  .el-btn-post {
    position: absolute;
    background: #1e78f0;
    height: 34px;
    top: 3px;
    right: 30px;
    color: #ffffff;
  }
}
</style>
