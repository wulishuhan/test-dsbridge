<template>
  <div class="container">
    <div id="folderWrapper" class="folderWrapper" @mouseover="addScrollEvent">
      <div class="folder" v-for="item in folders" :key="item.id">
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
    </div>
    <div class="plus" @click="addFolder" v-show="!isEdit">+</div>
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
          },
        ];
      },
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
  data() {
    return {
      isEdit: false,
      folders: [...this.value],
    };
  },
  mounted() {},
  methods: {
    addScrollEvent() {
      let element = document.getElementById("folderWrapper");
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
      item.isEdit = false;
      this.isEdit = false;

      this.$emit("input", [...this.folders]);
    },
    addFolder() {
      this.isEdit = true;
      this.folders.push({
        name: "",
        id: this.folders.length,
        isEdit: true,
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
.container {
  width: 400px;
  margin: 0 auto;
  display: flex;
  .plus {
    font-size: 26px;
    font-weight: 400;
    margin-top: 10px;
  }

  .folderWrapper::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .folderWrapper::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }

  .folderWrapper::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }

  .folderWrapper {
    overflow: auto;
    display: flex;
    align-items: center;
    margin-right: 32px;

    .folder {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin-right: 5px;
      .ortur-icon-file {
        margin-bottom: 12px;
        font-size: 30px;
      }
      .editInput {
        width: 112px;
        height: 24px;
        background: #f0f3fa;
        border: 1px solid #999999;
        border-radius: 4px;
        margin-bottom: 16px;
      }
      .title {
        width: 112px;
        font-size: 14px;
        height: 40px;
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
</style>
