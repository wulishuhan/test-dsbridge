<template>
  <div class="wrapper" v-if="isShowPanel">
    <span class="ortur-icon-cancel" @click="handleCloseClick"></span>
    <div class="read" @click="handleReadClick">标记为已读</div>
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="全部" name="first">
        <div class="scroll">
          <NoticeItem
            v-for="item in noticeArr"
            :noticeInfo="item"
            :key="item.id"
          ></NoticeItem>
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统" name="second">
        <div class="scroll">
          <NoticeItem
            v-for="item in noticeArr"
            :noticeInfo="item"
            :key="item.id"
          ></NoticeItem>
        </div>
      </el-tab-pane>
      <el-tab-pane label="评论" name="third">
        <div class="scroll">
          <NoticeItem
            v-for="item in noticeArr"
            :noticeInfo="item"
            :key="item.id"
          ></NoticeItem>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关注你的人" name="fourth">
        <div class="scroll">
          <NoticeItem
            v-for="item in noticeArr"
            :noticeInfo="item"
            :key="item.id"
          ></NoticeItem>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NoticeItem from "@/components/NoticeItem.vue";

export default {
  components: {
    NoticeItem,
  },
  data() {
    return {
      isShowPanel: false,
      activeName: "first",
      noticeArr: [
        {
          url: "https://cdn.thingiverse.com/assets/a0/23/4c/6f/68/medium_thumb_Headset_Holder_v1.png",
          userName: "yang",
          userId: "111",
          time: "20220708",
          thing: "3d 裸眼",
          thingId: "5453",
          comment: "真不错",
          yourComment:
            "还行真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错真不错",
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
          type: "message",
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
          type: "message",
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
    getAllList() {
      //console.log(e)
    },
    getSystemList() {
      //console.log(e)
    },
    getCommentList() {
      //console.log(e)
    },
    getFollowList() {
      //console.log(e)
    },
    showPanel() {
      this.isShowPanel = !this.isShowPanel;
    },
    handleCloseClick() {
      this.isShowPanel = false;
    },
    handleReadClick() {
      console.log(11);
    },
    handleTabClick() {
      if (this.activeName == "first") {
        this.getAllList();
      } else if (this.activeName == "second") {
        this.getSystemList();
      } else if (this.activeName == "third") {
        this.getCommentList();
      } else if (this.activeName == "fourth") {
        this.getFollowList();
      }
    },
  },
};
</script>

<style></style>

<style lang="scss" scoped>
.wrapper {
  width: 712px;
  height: 750px;
  background: #ffffff;
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 23px;
  position: relative;
  .ortur-icon-cancel {
    position: absolute;
    top: 23px;
    right: 23px;
    z-index: 100;
    cursor: pointer;
  }
  .read {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #1e78f0;
    bottom: 23px;
    right: 23px;
    position: absolute;
    cursor: pointer;
  }
  .scroll {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 600px;
    width: 100%;
  }
}
</style>
