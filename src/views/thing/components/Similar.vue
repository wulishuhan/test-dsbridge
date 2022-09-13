<template>
  <div>
    <div class="similar-container">
      <h2 class="more-font">Similar with this</h2>
      <a class="view-more" @click="openViewAllDialog('view-similar')">
        View all
      </a>
    </div>
    <div class="more-image-box">
      <el-image
        v-for="item in similars"
        :key="item.id"
        class="more-image"
        :src="item.image"
        @click="toMore(item.id)"
      ></el-image>
    </div>
  </div>
</template>
<script>
import { getSimilar } from "@/api/resource";
export default {
  data() {
    return {
      similars: [],
    };
  },
  mounted() {
    getSimilar({
      pageSize: 3,
      pageNum: 1,
      resId: this.$route.params.thingId,
    }).then((res) => {
      this.similars = res.data.rows;
      console.log("similars: ", res);
    });
  },
  methods: {
    openViewAllDialog(name) {
      this.$emit("openViewAllDialog", name);
    },
    toMore(id) {
      this.$router.push(`/thing/${id}`);
    },
  },
};
</script>
<style scoped lang="scss">
.similar-container {
  display: flex;
  justify-content: space-between;
  margin-top: 35px;

  .more-font {
    font-size: 24px;
    color: #1a1a1a;
    font-weight: 400;
  }
  .view-more {
    font-size: 20px;
    cursor: pointer;
    color: #1e78f0;
  }
}
.more-image-box {
  margin-top: 31px;
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(3, 184px);
  justify-content: space-between;
}
.more-image {
  width: 184px;
  height: 112px;
  margin-top: 5px;
}
</style>
