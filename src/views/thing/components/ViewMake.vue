<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :width="width"
      :custom-class="customClass"
      :append-to-body="true"
    >
      <a @click="showPostForm = true" slot="title">post make</a>
      <PostMakeDialog :isShow.sync="showPostForm"></PostMakeDialog>
      <el-row>
        <el-col :span="8" v-for="(item, index) in makes" :key="item.id">
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
      default: "840px",
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
</style>
