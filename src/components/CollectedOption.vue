<template>
  <div v-show="show" class="collected-option-box">
    <span class="collect-to">Collect to</span>
    <el-radio-group class="folder-button-box" v-model="select">
      <el-radio-button class="folder-button" label="Draft"></el-radio-button>
      <el-radio-button
        class="folder-button"
        v-for="item in folders"
        :label="item"
        :key="item.id"
      >
        <i class="el-icon-folder"></i>
        <span class="folder-button-text">
          {{ item.name }}
        </span>
      </el-radio-button>
    </el-radio-group>
    <a
      v-if="isNewFileLink"
      class="el-icon-plus new-file"
      @click="isNewFileLink = false"
      >New File</a
    >
    <el-input
      v-if="!isNewFileLink"
      v-model="newFolderName"
      @keyup.enter.native="addFolder"
      class="new-file-input"
      placeholder="press enter to add new folder"
    ></el-input>
    <div class="button-group">
      <el-button class="cancel-button" @click="cancelFolder">Cancel</el-button>
      <el-button
        class="move-button"
        :class="{ 'input-move-button-background': !isNewFileLink }"
        :disabled="!isNewFileLink"
        @click="selectFolderToCollected"
      >
        Move
      </el-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    folders: {
      type: Array,
      default: () => [
        {
          name: "a",
          id: 1,
        },
        {
          name: "b",
          id: 2,
        },
        {
          name: "c",
          id: 3,
        },
      ],
    },
  },
  mounted() {},
  data() {
    return {
      isNewFileLink: true,
      select: "Draft",
      newFolderName: "",
    };
  },
  methods: {
    addFolder() {
      this.isNewFileLink = true;
      if (this.newFolderName !== "") {
        this.$emit("addFolder", this.newFolderName);
      }
    },
    cancelFolder() {
      this.newFolderName = "";
      this.isNewFileLink = true;
      this.$emit("close");
    },
    selectFolderToCollected() {
      this.$emit("moveFolder", this.select);
      this.$emit("close");
    },
  },
};
</script>

<style></style>
<style lang="scss" scoped>
.collected-option-box {
  z-index: 1000;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 224px;
  height: 360px;
  background: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0px 8px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  border: solid 1px #ccc;
  .collect-to {
    height: 36px;
    width: 208px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    text-align: center;
    line-height: 36px;
    border-bottom: solid #ccc 1px;
  }
  .folder-button-box {
    height: 144px;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    .folder-button {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #1a1a1a;
      width: 100%;
      height: 48px;
      line-height: 48px;
      border-radius: 8px;
      text-align: start;
      .folder-button-text {
        margin-left: 8px;
      }
      .el-icon-folder {
        font-size: 16px;
      }
    }
    ::v-deep .el-radio-button__inner {
      width: 100%;
      border: none;
      text-align: left;
    }
    ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: #fff;
      background-color: #8ab5ef;
      box-shadow: -1px 0 0 0 #409eff;
      border-radius: 8px;
    }
  }
  .new-file {
    width: 208px;
    height: 48px;
    font-size: 14px;
    color: #1e78f0;
    line-height: 48px;
  }
  .new-file-input {
    height: 48px;
    width: 208px;
    line-height: 48px;
  }
  .button-group {
    height: 64px;
    width: 208px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: solid 1px #ccc;
    .cancel-button {
      border: 1px solid #999999;
      border-radius: 4px;
      color: #000;
    }
    .move-button {
      background: #1e78f0;
      border-radius: 4px;
      color: #fff;
    }
    .input-move-button-background {
      background: #999999;
    }
  }
}

/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 1px;
  height: 16px;
  background-color: #f5f5f5;
  position: absolute;
  right: 0px;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>
