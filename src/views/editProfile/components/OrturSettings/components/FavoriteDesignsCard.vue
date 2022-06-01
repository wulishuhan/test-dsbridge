<template>
  <div>
    <div
      class="favorite-card"
      @click="openDialog"
      @mouseenter="enter"
      @mouseleave="out"
    >
      <div>
        <i class="el-icon-plus" v-if="iconShow"></i>
        <p>{{ text }}</p>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="65%" @closed="closeDialog">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="THINGS" name="first">things</el-tab-pane>
        <el-tab-pane label="COLLECTIONS" name="second">collections</el-tab-pane>
        <el-tab-pane label="MAKES" name="third">makes</el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "FavoriteDesignsCard",
  props: {
    name: {
      type: String,
      default: "",
    },
    isSummary: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      activeName: "second",
      text: "",
      dialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    enter() {
      this.text =
        "Click here to select a Design, Collection or Make to feature on your profile.";
    },
    out() {
      this.text = "";
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    openDialog() {
      this.dialogVisible = true;
    },
  },
  computed: {
    iconShow() {
      return this.text === "";
    },
  },
};
</script>
<style lang="scss" scoped>
.favorite-card {
  background: #e4e4e4;
  color: #666;
  width: 296px;
  height: 265px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 10px;
  .el-icon-plus {
    font-size: 50px;
  }
  p {
    text-align: center;
  }
}
</style>
