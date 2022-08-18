<template>
  <div class="more-container" ref="more-container">
    <el-row class="row" ref="content" style="height: 673px">
      <div v-for="item in resources" :key="item.thingId">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <resource-card
            :thing="item"
            :isLike="likeList.includes(item.id)"
            :isCollected="collectedList.includes(item.id)"
          ></resource-card>
        </el-col>
      </div>
    </el-row>
    <p v-if="loading">loading...</p>
    <p v-if="noMore">no more</p>
  </div>
</template>
<script>
import ResourceCard from "@/components/ResourceCard";
import { throttle } from "@/utils/cache.js";
import { getLikelist } from "@/api/like";
// import { getThingList } from "@/api/thing";
import { getResourceListById } from "@/api/resource";
import { mapGetters } from "vuex";
import { getCollectionResourceList } from "@/api/collection";
export default {
  name: "ViewMore",
  components: { ResourceCard },
  props: {
    creator: {
      type: Object,
      default: () => {
        return {
          avatar: "",
          name: "",
          id: "",
        };
      },
    },
  },
  data() {
    return {
      pagination: {
        pageSize: 10,
        pageNum: 1,
      },
      load: () => {},
      resources: [],
      loading: false,
      resourcesTotal: 0,
      noMore: false,
      likeList: [],
      collectedList: [],
      folders: [],
    };
  },
  computed: {
    ...mapGetters(["isLogin", "userInfo"]),
  },
  mounted() {
    getLikelist({
      userId: this.userInfo.user_id,
    })
      .then((res) => {
        for (let i = 0; i < res.data.rows.length; i++) {
          const element = res.data.rows[i];
          this.likeList.push(element.id);
        }
      })
      .then(() => {
        getCollectionResourceList({
          userId: this.userInfo.user_id,
        }).then((res) => {
          for (let i = 0; i < res.data.rows.length; i++) {
            const element = res.data.rows[i];
            this.collectedList.push(element.id);
          }
        });
      })
      .then(() => {
        this.getResourceList();
      })
      .then(() => {
        let container = this.$refs["more-container"];
        this.load = throttle(() => {
          // 距离底部200px时加载一次
          let bottomOfWindow =
            container.scrollHeight -
              container.offsetHeight -
              container.scrollTop <=
            200;
          if (bottomOfWindow && !this.loading && !this.noMore) {
            this.pagination.pageNum++;
            if (
              this.pagination.pageNum <=
              Math.ceil(this.resourcesTotal / this.pagination.pageSize)
            ) {
              this.getResourceList();
            }
          }
        }, 1000);
        container.addEventListener("scroll", this.load);
      });
  },
  beforeDestroy() {
    this.$refs["more-container"].removeEventListener("scroll", this.load);
  },
  methods: {
    getResourceList() {
      getResourceListById({ ...this.pagination, userId: this.creator.id })
        .then((res) => {
          let resource = res.data.rows;
          for (let i = 0; i < resource.length; i++) {
            const element = resource[i];
            element.creator = this.creator;
          }
          this.resources.push(...resource);
          this.resourcesTotal = res.data.total;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.noMore = true;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.more-container {
  overflow-y: auto;
  height: 672px;
}
::v-deep .collected-option-container {
  top: 0px;
  right: 0px;
}
</style>
