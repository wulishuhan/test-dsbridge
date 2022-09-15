<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :width="width"
      :custom-class="customClass"
      :append-to-body="true"
    >
      <el-button
        class="post-make-button"
        type="text"
        @click="showPostForm = true"
        slot="title"
      >
        <i class="el-icon-plus"></i>
        post make
      </el-button>
      <PostMakeDialog :isShow.sync="showPostForm"></PostMakeDialog>
      <el-row>
        <el-col :span="6" v-for="(item, index) in makes" :key="item.id">
          <make
            :make="item"
            :index="index"
            @openMake="openMake"
            @getIndex="getIndex"
          ></make>
        </el-col>
      </el-row>
    </el-dialog>
    <ElImageViewer
      class="imageViewer"
      v-if="showMake"
      :on-close="closeMake"
      :url-list="makes"
      :isMake="true"
      :initialIndex="index"
    ></ElImageViewer>
  </div>
</template>
<script>
import ElImageViewer from "@/components/ImageViewer";
import Make from "./Make.vue";
import PostMakeDialog from "./PostMakeDialog.vue";
export default {
  name: "ViewMake",
  components: { Make, PostMakeDialog, ElImageViewer },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "1136px",
    },
    makes: {
      type: Array,
      default: () => {
        return [
          {
            url: "https://orturbucket.s3.amazonaws.com/assets/2022/08/30/abcddd_20220830153658A043.png",
            id: 1234,
          },
        ];
      },
    },
  },
  data() {
    return {
      showPostForm: false,
      showMake: false,
      index: 0,
      url: "https://orturbucket.s3.amazonaws.com/assets/2022/08/30/abcddd_20220830153658A043.png",
    };
  },
  computed: {
    visible: {
      get() {
        return this.isShow;
      },
      set(val) {
        console.log("val", val);
        this.$emit("update:isShow", false);
      },
    },
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
    },
  },
  watch: {
    visible(val) {
      // 在此做显示与隐藏的交互
      if (val === false) {
        // 重置操作
      } else {
        // 展示时操作
      }
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-image-viewer__img {
  width: 1084px;
  height: 660px;
}
::v-deep .el-image-viewer__close {
  background-color: rgba(26, 26, 26, 0.3);
  border-radius: 0px;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  font-size: 14px;
}
::v-deep .more-image {
  width: 228px;
  height: 139px;
}
::v-deep .makes-mask {
  width: 227px;
  height: 40px;
  line-height: 40px;
}
::v-deep .ortur-icon-message {
  font-size: 18px;
}
::v-deep .el-icon-arrow-right {
  font-size: 18px;
}
.post-make-button:hover {
  background: #ececec;
  color: #606266;
}
.post-make-button {
  color: #606266;
  padding: 10px;
  font-size: 16px;
}
.el-icon-plus {
  margin-right: 5px;
  font-size: 16px;
}
</style>
