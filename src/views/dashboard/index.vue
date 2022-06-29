<template>
  <div class="container">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
        <el-tab-pane label="ALL ACTIVITY" name="first">
          <DashBoardPanel></DashBoardPanel>
          <div
            v-for="item in activity"
            :key="item.thingId"
            class="activityItem"
          >
            <div class="top">
              <div>
                <router-link :to="'/thing/' + item.thingId">
                  <img class="img" :src="item.avatar" alt="" />
                </router-link>
                <router-link :to="'/thing/' + item.thingId">
                  {{ item.userName }}
                </router-link>
                published
                <router-link :to="'/thing/' + item.thingId"
                  >{{ item.thingName }}
                </router-link>
              </div>
              <div>{{ item.publicTime }}</div>
            </div>
            <resource-card :thing="item"></resource-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MY ACTIVITY" name="second">
          <DashBoardPanel></DashBoardPanel>
          <IndexDesignerList :designerList="designerList"></IndexDesignerList>
        </el-tab-pane>
        <el-tab-pane label="FRIENDS ACTIVITY" name="third">
          <DashBoardPanel></DashBoardPanel>
          <IndexDesignerList :designerList="designerList"></IndexDesignerList>
        </el-tab-pane>
        <el-tab-pane label="WATCHLIST" name="fourth">
          <DashBoardPanel></DashBoardPanel>
          <div
            v-for="item in watchList"
            :key="item.thingId"
            class="activityItem"
          >
            <!-- <div class="closeIcon" @click="onCloseClick(item.id)">x</div> -->
            <div class="top">
              <div>
                <router-link :to="'/thing/' + item.thingId">
                  <img class="img" :src="item.avatar" alt="" />
                </router-link>
                <router-link :to="'/thing/' + item.thingId">
                  {{ item.userName }}
                </router-link>
                published
                <router-link :to="'/thing/' + item.thingId"
                  >{{ item.thingName }}
                </router-link>
              </div>
              <div>{{ item.publicTime }}</div>
            </div>
            <resource-card :thing="item"></resource-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import DashBoardPanel from "@/views/dashboard/components/IndexDashBoardPanel.vue";
import ResourceCard from "@/components/ResourceCard.vue";
import {
  getActivityList,
  getDesignerList,
  getWatchList,
} from "@/api/dashboard";
import IndexDesignerList from "./components/IndexDesignerList.vue";
export default {
  components: {
    DashBoardPanel,
    IndexDesignerList,
    ResourceCard,
  },
  name: "DashBoard",
  data() {
    return {
      activity: [],
      watchList: [],
      activeName: "first",
      designerList: [],
    };
  },
  mounted() {
    this.getActivity(this.pagination);
  },
  methods: {
    getWatchList() {
      getWatchList({}).then((res) => {
        this.watchList = res.data.data;
        //  debugger
      });
    },
    getActivity() {
      getActivityList({}).then((res) => {
        this.activity = res.data.data;
        //  debugger
      });
    },
    getDesignerList() {
      getDesignerList({}).then((res) => {
        this.designerList = res.data.data;
        debugger;
      });
    },
    handleClick(index) {
      if (index == "first") {
        this.getActivity();
      } else if (index == "second" || index == "third") {
        this.getDesignerList();
      } else if (index == "fourth") {
        this.getWatchList();
      }
    },
  },
};
</script>
<style scoped>
.activityItem /deep/ .resource_card {
  margin: 10px 0 0px 10px;
}
</style>
<style lang="scss" scoped>
.container {
  background-color: #f5f5f5;
  height: 100%;
  color: #666;
  .content {
    width: 970px;
    margin: 0 auto;
  }
}
.activityItem {
  position: relative;
  .closeIcon {
    display: none;
    position: absolute;
    right: 0;
    top: 20px;
    font-size: 20px;
  }
  width: 100%;
  text-align: left;
  background-color: #fff;
  margin-top: 10px;
  .top {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 20px;
    }
  }
}
.activityItem:hover .closeIcon {
  display: inline;
}
</style>
