<template>
  <div>
    <ShareSocialMedia></ShareSocialMedia>
    <CollectButton :isCollect="true"></CollectButton>
    <CollectButton></CollectButton>
    <StarButton @click="onStar"></StarButton>
    <StarButton :isStar="true"></StarButton>
    <DownLoadButton></DownLoadButton>
    <BaseButton @click="test">基础按钮</BaseButton>
    <LabelCard></LabelCard>
    <NoticeItem
      v-for="item in noticeArr"
      :noticeInfo="item"
      :key="item.id"
    ></NoticeItem>
  </div>
</template>
<script>
import ShareSocialMedia from "@/components/ShareSocialMedia.vue";
import StarButton from "@/components/StarButton.vue";
import CollectButton from "@/components/CollectButton.vue";
import DownLoadButton from "@/components/DownLoadButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import LabelCard from "@/components/LabelCard.vue";
import NoticeItem from "@/components/NoticeItem.vue";

// 用来预览组件
export default {
  // eslint-disable-next-line
  name: "hzy",
  data() {
    return {
      noticeArr: [
        {
          url: "https://cdn.thingiverse.com/assets/a0/23/4c/6f/68/medium_thumb_Headset_Holder_v1.png",
          userName: "yang",
          userId: "111",
          time: "20220708",
          thing: "3d 裸眼",
          thingId: "5453",
          comment: "真不错",
          yourComment: "还行",
          type: "comment",
          isRead: true,
        },
        {
          url: "https://cdn.thingiverse.com/assets/a0/23/4c/6f/68/medium_thumb_Headset_Holder_v1.png",
          userName: "yang",
          userId: "111",
          time: "20220708",
          message: "加个好友",
          type: "message",
          isRead: true,
        },
        {
          url: "https://cdn.thingiverse.com/assets/a0/23/4c/6f/68/medium_thumb_Headset_Holder_v1.png",
          userName: "yang",
          userId: "111",
          time: "20220708",
          message: "加个好友",
          type: "system",
          isRead: true,
        },
        {
          url: "https://cdn.thingiverse.com/assets/a0/23/4c/6f/68/medium_thumb_Headset_Holder_v1.png",
          userName: "yang",
          userId: "111",
          time: "20220708",
          type: "follow",
          isRead: false,
        },
        {
          url: "https://cdn.thingiverse.com/assets/a0/23/4c/6f/68/medium_thumb_Headset_Holder_v1.png",
          userName: "yang",
          userId: "111",
          time: "20220708",
          type: "unFollow",
          isRead: false,
        },
      ],
    };
  },
  methods: {
    onStar() {
      //console.log(e)
      console.log(111);
    },
    test() {
      console.log(11);
    },
  },
  components: {
    ShareSocialMedia,
    StarButton,
    DownLoadButton,
    CollectButton,
    BaseButton,
    LabelCard,
    NoticeItem,
  },
};
</script>
