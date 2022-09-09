<template>
  <div>
    <div class="remix-link-box">
      <a class="more-font post-remix" @click="toUpload">
        <i class="el-icon-plus"></i>
        Post a Remix
      </a>
      <a class="view-more" @click="dialogRemixes = true"> View all </a>
    </div>
    <div class="remixes-image-container">
      <div style="position: relative" v-for="i in 6" :key="i">
        <el-image
          class="more-image"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        >
        </el-image>
      </div>
    </div>
    <el-dialog :visible.sync="dialogRemixes" width="1136px">
      <el-tabs class="more-dialog" v-model="viewMoreActive" :stretch="true">
        <el-tab-pane label="Remixes" name="Remixes">
          <view-more
            v-if="viewMoreActive === 'Remixes'"
            :isRemixes="true"
          ></view-more>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import ViewMore from "../ViewMore.vue";
export default {
  components: {
    ViewMore,
  },
  data() {
    return {
      dialogRemixes: false,
      viewMoreActive: "Remixes",
    };
  },
  methods: {
    toUpload() {
      this.$router.push(`/upload?refId=${this.$route.params.thingId}`);
    },
  },
};
</script>
<style scoped lang="scss">
.remix-link-box {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
}
.more-font {
  font-size: 24px;
  color: #1a1a1a;
  font-weight: 400;
}
.post-remix {
  cursor: pointer;
}
.remixes-image-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.more-image {
  width: 184px;
  height: 112px;
  margin-top: 5px;
}
.more-dialog {
  ::v-deep .el-tabs__header .is-top {
    width: 520px;
  }
}
.view-more {
  font-size: 20px;
  cursor: pointer;
  color: #1e78f0;
}
</style>
