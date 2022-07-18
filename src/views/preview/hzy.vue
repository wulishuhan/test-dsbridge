<template>
  <div>
    <ShareSocialMedia></ShareSocialMedia>
    <CollectButton :isCollect="true"></CollectButton>
    <CollectButton></CollectButton>
    <StarButton></StarButton>
    <StarButton :isCollect="true"></StarButton>
    <DownLoadButton></DownLoadButton>
    <BaseButton>基础按钮</BaseButton>
  </div>
</template>
<script>
import ShareSocialMedia from "@/components/ShareSocialMedia.vue";
import StarButton from "@/components/StarButton.vue";
import CollectButton from "@/components/CollectButton.vue";
import DownLoadButton from "@/components/DownLoadButton.vue";
import BaseButton from "@/components/BaseButton.vue";

// 用来预览组件
export default {
  // eslint-disable-next-line
  name: "hzy",
  components: {
    ShareSocialMedia,
    StarButton,
    DownLoadButton,
    CollectButton,
    BaseButton,
  },
};
</script>
