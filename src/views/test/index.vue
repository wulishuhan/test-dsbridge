<template>
  <div>
    test页面
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
  </div>
</template>
<script>
import { Grid, GridItem } from "vant";
export default {
  name: "index",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  data() {
    return {};
  },
  method() {},
};
</script>
