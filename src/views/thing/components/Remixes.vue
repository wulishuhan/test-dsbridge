<template>
  <div>
    <div class="remix-link-box">
      <a class="more-font post-remix" @click="toUpload">
        <i class="el-icon-plus"></i>
        Post a Remix
      </a>
      <a class="view-more" @click="dialogRemixes = true"> View all </a>
    </div>

    <el-row>
      <el-col :span="8" v-for="item in remixes" :key="item.id">
        <el-image
          class="more-image"
          :src="item.image"
          @click="toRemix(item.id)"
        >
        </el-image>
      </el-col>
    </el-row>

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
import { getResourceListById } from "@/api/resource";
export default {
  components: {
    ViewMore,
  },
  mounted() {
    this.getResourceList();
  },
  data() {
    return {
      dialogRemixes: false,
      viewMoreActive: "Remixes",
      remixes: [],
    };
  },
  methods: {
    toUpload() {
      this.$router.push(`/upload?refId=${this.$route.params.thingId}`);
    },
    getResourceList() {
      let parameters = {
        pageSize: 6,
        pageNum: 1,
        type: "remix",
        resId: this.$route.params.thingId,
      };
      getResourceListById(parameters)
        .then((res) => {
          console.log("okok", res.data.rows);
          this.remixes = res.data.rows;
        })
        .catch(() => {
          this.loading = false;
          this.noMore = true;
        });
    },
    toRemix(id) {
      this.$router.push(`/thing/${id}`);
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
.more-image {
  width: 184px;
  height: 112px;
  margin-top: 5px;
  cursor: pointer;
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
