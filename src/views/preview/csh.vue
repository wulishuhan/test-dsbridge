<template>
  <div style="background-color: #fff">
    <test-card :thing="test"></test-card>
    <share></share>
  </div>
</template>
<script>
import TestCard from "@/components/ResourceCard/index";
import Share from "@/components/ShareCard/index";
// 用来预览组件
export default {
  // eslint-disable-next-line
  name: "csh",
  components: { TestCard, Share },
  data() {
    return {
      test: {
        avatar: "http://dummyimage.com/300x200/f27982/FFF&text=vknro",
        id: "620000197009121720",
        isCollected: true,
        isLike: false,
        likes: 737,
        publicTime: "1976 02 23",
        thingId: "620000197009121720",
        thingName: "ccdfsctohgg",
        url: "http://dummyimage.com/300x200/79a5f2/FFF&text=gxmorr",
        userId: "620000197009121720",
        userName: "gcxzxpbyne",
      },
    };
  },
};
</script>
