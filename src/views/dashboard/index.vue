<template>
  <div class="container">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
        <el-tab-pane label="ALL ACTIVITY" name="first">
          <DashBoardPanel></DashBoardPanel>
          <div v-for="item in activity" :key="item.thingId">
            <div class="activityItem" v-if="item.type == 'image'">
              <div class="top">
                <div>
                  <router-link :to="'/thing/' + item.thingId">
                    <img class="img" :src="item.avatar" alt="" />
                  </router-link>
                  <router-link :to="'/thing/' + item.thingId">
                    {{ item.author }}
                  </router-link>
                  published
                  <router-link :to="'/thing/' + item.thingId"
                    >{{ item.thingsName }}
                  </router-link>
                </div>
                <div>{{ item.publicTime }}</div>
              </div>
              <ThingsCard :things="item"></ThingsCard>
            </div>
            <div class="activityText" v-if="item.type == 'text'">
              <IndexActivityText :activityTextItem="item"></IndexActivityText>
            </div>
            <div class="activityText" v-if="item.type == 'topic'">
              <IndexActivityGroup :activityTextItem="item"></IndexActivityGroup>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MY ACTIVITY" name="second">
          <DashBoardPanel></DashBoardPanel>
          <div v-for="item in activity" :key="item.thingId">
            <div class="activityItem" v-if="item.type == 'image'">
              <div class="top">
                <div>
                  <router-link :to="'/thing/' + item.thingId">
                    <img class="img" :src="item.avatar" alt="" />
                  </router-link>
                  <router-link :to="'/thing/' + item.thingId">
                    {{ item.author }}
                  </router-link>
                  published
                  <router-link :to="'/thing/' + item.thingId"
                    >{{ item.thingsName }}
                  </router-link>
                </div>
                <div>{{ item.publicTime }}</div>
              </div>
              <ThingsCard :things="item"></ThingsCard>
            </div>
            <div class="activityText" v-if="item.type == 'text'">
              <IndexActivityText :activityTextItem="item"></IndexActivityText>
            </div>
            <div class="activityText" v-if="item.type == 'topic'">
              <IndexActivityGroup :activityTextItem="item"></IndexActivityGroup>
            </div>
          </div>
          <IndexDesignerList
            :designerList="designerList"
            v-show="activity.length == 0"
          ></IndexDesignerList>
        </el-tab-pane>
        <el-tab-pane label="FRIENDS ACTIVITY" name="third">
          <DashBoardPanel></DashBoardPanel>
          <div v-for="item in activity" :key="item.thingId">
            <div class="activityItem" v-if="item.type == 'image'">
              <div class="top">
                <div>
                  <router-link :to="'/thing/' + item.thingId">
                    <img class="img" :src="item.avatar" alt="" />
                  </router-link>
                  <router-link :to="'/thing/' + item.thingId">
                    {{ item.author }}
                  </router-link>
                  published
                  <router-link :to="'/thing/' + item.thingId"
                    >{{ item.thingsName }}
                  </router-link>
                </div>
                <div>{{ item.publicTime }}</div>
              </div>
              <ThingsCard :things="item"></ThingsCard>
            </div>
            <div class="activityText" v-if="item.type == 'text'">
              <IndexActivityText :activityTextItem="item"></IndexActivityText>
            </div>
            <div class="activityText" v-if="item.type == 'topic'">
              <IndexActivityGroup :activityTextItem="item"></IndexActivityGroup>
            </div>
          </div>
          <IndexDesignerList
            :designerList="designerList"
            v-show="activity.length == 0"
          ></IndexDesignerList>
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
                  {{ item.author }}
                </router-link>
                published
                <router-link :to="'/thing/' + item.thingId"
                  >{{ item.thingsName }}
                </router-link>
              </div>
              <div>{{ item.publicTime }}</div>
            </div>
            <ThingsCard :things="item"></ThingsCard>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import DashBoardPanel from "@/views/dashboard/components/IndexDashBoardPanel.vue";
import IndexActivityText from "@/views/dashboard/components/IndexActivityText.vue";
import IndexActivityGroup from "@/views/dashboard/components/IndexActivityGroup.vue";
import ThingsCard from "@/views/groupDetail/components/Things/components/ThingsCard.vue";
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
    IndexActivityText,
    IndexActivityGroup,
    ThingsCard,
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
    this.getActivity("all");
    this.getDesignerList();
  },
  methods: {
    getWatchList() {
      getWatchList({}).then((res) => {
        this.watchList = res.data.data;
        //  debugger
      });
    },
    getActivity(type) {
      getActivityList({ type: type }).then((res) => {
        this.activity = res.data.data;
        // debugger;
      });
    },
    getDesignerList() {
      getDesignerList({}).then((res) => {
        this.designerList = res.data.data;
        // debugger;
      });
    },
    handleClick(index) {
      if (index == "first") {
        this.getActivity("all");
      } else if (index == "second") {
        this.getActivity("my");
      } else if (index == "third") {
        this.getActivity("friend");
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
    width: 60%;
    margin: 0 auto;
  }
}
.activityText {
  width: 70%;
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
  width: 70%;
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
