<template>
  <div>
    <test-card :thing="test"></test-card>
  </div>
</template>
<script>
import TestCard from "@/components/TestCard";
// 用来预览组件
export default {
  // eslint-disable-next-line
  name: "csh",
  components: { TestCard },
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
        thingName: "ccdfsctoh",
        url: "http://dummyimage.com/300x200/79a5f2/FFF&text=gxmorr",
        userId: "620000197009121720",
        userName: "gcxzxpbyne",
      },
    };
  },
};
</script>
