<template>
  <div class="container">
    <div class="left">
      <h1 class="title">DASHBOARD</h1>
      <div class="content">
        Your dashboard keeps you up to date on all the activity on Thingiverse
        since your last visit. Since there's nothing here yet, here are some
        great creators to start with. Just click the follow button to get
        started.
      </div>
    </div>
    <div class="right">
      <navigateItem
        title="Your Profile"
        iconName="el-icon-user-solid"
        path="/design/Designs"
      ></navigateItem>
      <navigateItem
        title="Find People to Follow"
        iconName="el-icon-user-solid"
        path="/dashboard/recommend"
      ></navigateItem>
      <div class="ExtItem" @click="onExtShowChange">
        <div>
          <i class="el-icon-data-line"></i>
          <span class="ExtText">Analytics</span>
        </div>
        <div class="ExtArrow">></div>
      </div>
      <div v-show="extShow">
        Activity from the last 30 Days: Views: 0 Downloads: 0 Likes: 0 Collects:
        0 Mades: 0
      </div>
      <navigateItem
        title="Edit Dashboard Feed"
        iconName="el-icon-edit"
        path="/dashboard/edit"
      ></navigateItem>
    </div>
  </div>
</template>

<script>
import navigateItem from "./navigateItem.vue";
export default {
  name: "dashBoardPanel",
  data() {
    return {
      extShow: false,
    };
  },
  components: {
    navigateItem,
  },
  methods: {
    onExtShowChange() {
      //console.log(e)
      this.extShow = !this.extShow;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  color: #666;
  display: flex;
  justify-content: space-between;
  .left {
    width: 634px;
    .title {
      font-family: "Antenna Bold", Helvetica, Arial, sans-serif;
      font-weight: normal;
      font-size: 24px;
      line-height: 1.25em;
      text-transform: uppercase;
      margin: 0 0 10px;
      color: #666;
    }
    .content {
      line-height: 15pt;
      color: #666;
      background-color: #f5f5f5;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 11pt;
    }
  }
  .right {
    width: 296px;
    .ExtItem {
      background-color: #fff;
      padding: 5px;
      display: flex;
      justify-content: space-between;
      .ExtText {
        margin-left: 5px;
      }
      .ExtArrow {
        transform: rotate(90deg);
      }
    }
    .ExtItem:hover {
      background-color: #777 !important;
    }
    .item:hover {
      background-color: #777 !important;
    }
  }
}
</style>
