<template>
  <div class="container">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
        <el-tab-pane label="ALL ACTIVITY" name="first">
          <dashBoardPanel></dashBoardPanel>
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
        <el-tab-pane label="MY ACTIVITY" name="second">MY ACTIVITY</el-tab-pane>
        <el-tab-pane label="FRIENDS ACTIVITY" name="third"
          >FRIENDS ACTIVITY</el-tab-pane
        >
        <el-tab-pane label="WATCHLIST" name="fourth">WATCHLIST</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import dashBoardPanel from "@/views/dashboard/components/dashBoardPanel";
import ResourceCard from "@/components/ResourceCard.vue";
import { getActivityList } from "@/api/dashboard";

export default {
  /* eslint-disable */
  components:{
    dashBoardPanel,
    ResourceCard
  },
  name: "Dashboard",
  data() {
    return {
      activity:[],
      activeName: 'first'
    };
  },
  mounted () {
    
    this.getActivity(this.pagination);
    ;
  },
  methods: {
      getActivity(pagination) {
    
      getActivityList({
      }).then((res) => {
        this.activity = res.data.data;
      //  debugger
      });
    },
    handleClick(e) {
      debugger
    }
  },
};
</script>
<style scoped>
  /deep/ .resource_card {
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
    border-radius:50%;
    vertical-align: middle;
    margin-right: 20px;
  }
  }
 
}
</style>
