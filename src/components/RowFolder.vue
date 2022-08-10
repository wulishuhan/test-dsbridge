<template>
  <div class="container" @mouseover="addScrollEvent" id="container">
    <div id="folderWrapper" class="folderWrapper">
      <div
        class="folderContainer"
        v-for="item in folders"
        :key="item.id"
        @click="handleClickFolder(item)"
      >
        <div class="folder">
          <span class="ortur-icon-file"></span>
          <div class="title" v-if="!item.isEdit" @click="handleEdit(item)">
            {{ item.name }}
          </div>
          <input
            ref="folderInputs"
            @blur="handleEdited(item)"
            @change="handleEdited(item)"
            class="editInput"
            type="text"
            v-model="item.name"
            v-else
          />
        </div>
        <span
          v-show="isYourAccount && item.id !== '0'"
          @click.stop="handleClickMore(item)"
          class="moreMenuIcon"
          id="moreMenuIcon"
        >
          <div class="moreMenu" v-if="item.showMoreMenu">
            <div class="moreMenuItem" @click.stop="handleDelClick(item)">
              Delete
            </div>
          </div>
          ···
        </span>
      </div>
    </div>
    <div class="plus" @click="addFolder" v-show="isYourAccount && !isEdit">
      +
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return [
          {
            name: "111",
            id: "1",
            isEdit: false,
            showMoreMenu: false,
          },
        ];
      },
    },
    isYourAccount: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    onFolderAdd: {
      type: Function,
      default: () => {},
    },
  },
  // computed: {
  //   folders: {
  //     get() {
  //       return [...this.value];
  //     },
  //     set(val) {
  //       this.$emit("input", [...val]);
  //     },
  //   },
  // },
  computed: {
    folders() {
      // debugger;
      return [
        {
          name: "draft",
          id: "0",
        },
      ].concat(this.value);
    },
  },
  data() {
    return {
      isEdit: false,
      // folders: this.value,
    };
  },
  mounted() {},
  methods: {
    handleClickMore(item) {
      item.showMoreMenu = !item.showMoreMenu;
    },
    handleDelClick(item) {
      this.$emit("delFolder", item);
      item.showMoreMenu = false;
    },
    handleClickFolder(item) {
      this.$emit("clickFolder", item);
    },
    addScrollEvent() {
      let element = document.getElementById("container");
      element.addEventListener("wheel", (event) => {
        event.preventDefault();
        element.scrollBy({
          left: event.deltaY < 0 ? -1 : 1, // >0 是下滑，<0是上滑
        });
      });
    },
    handleEdit(item) {
      console.log("item: ", item);
      // return;
      // item.isEdit = true;
    },
    handleEdited(item) {
      this.onFolderAdd(item).then(() => {
        item.isEdit = false;
        this.isEdit = false;
      });
      // this.$emit("input", [...this.folders]);
    },
    addFolder() {
      this.isEdit = true;
      this.folders.push({
        name: this.folders.length + 1,
        id: this.folders.length + 1,
        isEdit: true,
        showMoreMenu: false,
      });
      this.$nextTick(() => {
        console.log(this.$refs.folderInputs[0].focus());
        // [this.folders.length - 1].focus();
      });
    },
  },
};
</script>

<style></style>
<style lang="scss" scoped>
.container::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 2px;
}
.container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  // box-shadow: inset 0 0 5px red;
  background: #ccc;
}

.container::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.container {
  width: 400px;
  margin: 0 auto;
  display: flex;
  overflow-y: visible;
  overflow-x: auto;
  height: 128px;

  .plus {
    font-size: 26px;
    font-weight: 400;
    margin: auto 0;
  }

  .folderWrapper {
    display: flex;
    align-items: center;
    margin-right: 32px;
    .folderContainer {
      position: relative;
      .moreMenuIcon {
        text-align: center;
        width: 32px;
        height: 24px;
        line-height: 24px;
        background: #e8ebf4;
        border-radius: 4px;
        position: absolute;
        right: 0px;
        top: 0px;
        .moreMenu {
          position: absolute;
          width: 160px;
          height: 62px;
          background: #ffffff;
          box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.07);
          border-radius: 10px;
          top: 0px;
          left: 30px;
          text-align: left;
          z-index: 500;
          .moreMenuItem {
            width: 144px;
            height: 48px;
            border-radius: 8px;
            line-height: 48px;
            margin: 8px auto;
            padding-left: 25px;
            z-index: 500;
          }
          .moreMenuItem:hover {
            background: #8ab5ef;
          }
        }
      }
      .folder:hover {
        background: #1e78f0;
        opacity: 0.5;
        border-radius: 12px;
      }

      .folder {
        overflow: visible;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
        height: 128px;
        .ortur-icon-file {
          margin-bottom: 12px;
          font-size: 60px;
        }
        .editInput {
          width: 112px;
          height: 24px;
          background: #f0f3fa;
          border: 1px solid #999999;
          border-radius: 4px;
          margin-bottom: 16px;
          outline-color: #999999;
        }
        .title {
          width: 112px;
          font-size: 14px;
          text-align: center;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #999999;
          /* 1.溢出隐藏 */
          overflow: hidden;
          /* 2.用省略号来代替超出文本 */
          text-overflow: ellipsis;
          /* 3.设置盒子属性为-webkit-box  必须的 */
          display: -webkit-box;
          /* 4.-webkit-line-clamp 设置为2，表示超出2行的部分显示省略号，如果设置为3，那么就是超出3行部分显示省略号 */
          -webkit-line-clamp: 2;
          /* 5.字面意思：单词破坏：破坏英文单词的整体性，在英文单词还没有在一行完全展示时就换行  即一个单词可能会被分成两行展示 */
          word-break: break-all;
          // /* 6.盒子实现多行显示的必要条件，文字是垂直展示，即文字是多行展示的情况下使用 */
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
