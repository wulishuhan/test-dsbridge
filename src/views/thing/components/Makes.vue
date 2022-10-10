<template>
  <div>
    <div class="make-link-box">
      <a class="more-font post-make" @click="openPostMakeDialog">
        <i class="el-icon-plus"></i>
        Post a make
      </a>
      <a class="view-more" @click="dialogViewMake = true"> View all </a>
    </div>
    <PostMakeDialog
      :isShow.sync="dialogPostMake"
      :customClass="'make-dialog'"
      @addMake="addMake"
    ></PostMakeDialog>
    <el-row>
      <el-col
        :span="8"
        v-for="(item, index) in makes.slice(0, 6)"
        :key="item.id"
      >
        <make
          :make="item"
          :index="index"
          @openMake="openMake"
          @getIndex="getIndex"
        ></make>
      </el-col>
    </el-row>
    <ElImageViewer
      class="imageViewer"
      v-if="showMake"
      :on-close="closeMake"
      :url-list="makes"
      :isMake="true"
      :initialIndex="index"
    ></ElImageViewer>
    <ViewMake
      :makes="makes"
      :isShow.sync="dialogViewMake"
      @addMake="addMake"
    ></ViewMake>
  </div>
</template>
<script>
import PostMakeDialog from "./PostMakeDialog.vue";
import ElImageViewer from "@/components/ImageViewer";
import Make from "./Make.vue";
import ViewMake from "./ViewMake.vue";
import { getMakeList } from "@/api/user";
export default {
  name: "Makes",
  components: { Make, PostMakeDialog, ViewMake, ElImageViewer },
  mounted() {
    getMakeList({ resId: this.$route.params.thingId }).then((res) => {
      console.log("makes", res);
      this.makes = res.data.rows;
      this.makes.map((item) => {
        item.url = item.image;
      });
    });
  },
  data() {
    return {
      dialogPostMake: false,
      dialogViewMake: false,
      makes: [],
      showMake: false,
      index: 0,
    };
  },
  methods: {
    getIndex(index) {
      console.log(index);
      this.index = index;
    },
    openMake() {
      this.showMake = true;
      document.documentElement.style.overflowY = "hidden";
    },
    closeMake() {
      this.showMake = false;
      document.documentElement.style.overflowY = "scroll";
      getMakeList({ resId: this.$route.params.thingId }).then((res) => {
        console.log("makes", res);
        this.makes = res.data.rows;
        this.makes.map((item) => {
          item.url = item.image;
        });
      });
    },
    addMake() {
      //   this.makes.push(make);
      getMakeList({ resId: this.$route.params.thingId }).then((res) => {
        console.log("makes", res);
        this.makes = res.data.rows;
        this.makes.map((item) => {
          item.url = item.image;
        });
      });
    },
    openPostMakeDialog() {
      if (!this.$store.getters.isLogin) {
        this.showLoginDialog();
        return;
      }
      this.dialogPostMake = true;
    },
    showLoginDialog() {
      let payload = { loginDialogVisible: true, isLoginForm: true };
      this.$store.dispatch("user/switchLoginRegisteForm", payload);
    },
  },
};
</script>
<style scoped lang="scss">
.view-more {
  font-size: 16px;
  color: #1e78f0;
  cursor: pointer;
}
.more-font {
  font-size: 20px;
  color: #1a1a1a;
  font-weight: 400;
}
.post-make {
  cursor: pointer;
}
.make-link-box {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
}
</style>
