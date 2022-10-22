<template>
  <div class="container" ref="container">
    <div class="content">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        class="search"
        show-action
        clear-trigger="always"
        @focus="focus"
        @blur="blur"
        @input="input"
        @search="search"
        @cancel="cancel"
      >
        <template #left-icon>
          <img src="@/assets/icon-search.png" alt="" class="search-img" />
        </template>
      </van-search>
      <div
        v-show="showHistory && searchHistory.length > 0"
        class="search-history-container"
      >
        <div class="search-history-header">
          <span>历史记录</span>
          <img
            src="@/assets/icon-search-history-delete.png"
            alt=""
            @click="showDialog"
          />
        </div>
        <search-history-button
          v-for="(item, index) in searchHistory"
          :key="index"
          :name="item"
          @click="searchByHistory(item)"
        ></search-history-button>
      </div>
      <div v-show="!showHistory">
        <div v-if="searchResults.length > 0">
          <SearchResultCell
            v-for="item in searchResults"
            :key="item.id"
            :result="item"
          ></SearchResultCell>
        </div>
        <div class="no-search-results" v-else>
          <img src="@/assets/no-search-result.png" alt="" />
          <span>没有搜索结果</span>
        </div>
      </div>
    </div>
    <van-dialog
      v-model="show"
      :show-cancel-button="false"
      :show-confirm-button="false"
    >
      <div class="dialog-container">
        <div class="dialog-title">提示</div>
        <div class="dialog-content">是否确认清除历史记录</div>
        <div class="dialog-footer">
          <van-button
            color="#1E78F0"
            class="dialog-button"
            @click="comfirmClearHistory"
          >
            确认
          </van-button>
          <van-button
            color="#1E78F0"
            plain
            class="dialog-button"
            @click="cancelClearHistory"
          >
            取消
          </van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { Search, Dialog, Button } from "vant";
import { search } from "@/api/question.js";
import SearchHistoryButton from "./components/SearchHistoryButton.vue";
import SearchResultCell from "./components/SearchResultCell.vue";
export default {
  name: "result",
  components: {
    [Search.name]: Search,
    // [Dialog.name]: Dialog,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
    SearchHistoryButton,
    SearchResultCell,
  },
  data() {
    return {
      value: "",
      searchHistory: [],
      searchResults: [],
      showHistory: true,
      show: false,
    };
  },
  mounted() {
    let faqSearchHistory = JSON.parse(localStorage.getItem("faqSearchHistory"));
    if (!faqSearchHistory) {
      localStorage.setItem("faqSearchHistory", JSON.stringify([]));
      faqSearchHistory = [];
    }
    this.searchHistory = faqSearchHistory;
    this.$refs.container.style.minHeight = window.screen.height + "px";
  },
  methods: {
    comfirmClearHistory() {
      this.searchHistory = [];
      localStorage.setItem("faqSearchHistory", JSON.stringify([]));
      this.show = false;
    },
    cancelClearHistory() {
      this.show = false;
    },
    clear() {
      console.log("clear");
    },
    cancel() {
      this.$router.push("/");
    },
    input() {},
    showDialog() {
      this.show = true;
    },
    focus() {
      this.showHistory = true;
    },
    blur() {
      if (this.value.length <= 0) {
        return;
      }
      this.setHistoryInLocalStorage();
      this.serachFaq(this.value);
    },
    search() {
      console.log("search");
      // this.setHistoryInLocalStorage();
      // this.serachFaq(this.value);
    },
    searchByHistory(value) {
      this.serachFaq(value);
    },
    setHistoryInLocalStorage() {
      if (this.searchHistory.includes(this.value)) {
        return;
      }
      if (this.searchHistory.length >= 5) {
        this.searchHistory.shift();
      }
      this.searchHistory.push(this.value);
      localStorage.setItem(
        "faqSearchHistory",
        JSON.stringify(this.searchHistory)
      );
    },
    serachFaq(value) {
      search({
        title: value,
      }).then((res) => {
        this.showHistory = false;
        this.searchResults = res.data.data;
      });
    },
  },
};
</script>
<style scoped lang="less">
.container {
  background: #fff;
}
.content {
  padding: 0 30px;
  margin-bottom: 294px;
}
.search {
  margin-top: 24px;
}
.dialog-container {
  width: 560px;
  height: 304px;
  .dialog-title {
    font-size: 36px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #121212;
    margin-top: 30px;
  }
  .dialog-content {
    margin-top: 61px;
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #141414;
  }
  .dialog-footer {
    display: flex;
    justify-content: space-between;
    margin: 61px auto 32px;
    width: 440px;
    ::v-deep .van-button {
      height: 56px;
    }
    .dialog-button {
      padding: 14px 69px;
      font-size: 30px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      border-radius: 10px;
    }
  }
}

.no-search-results {
  margin-top: 332px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 320px;
    height: 335px;
    /* border: dashed 1px #999; */
  }

  span {
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    margin-top: 50px;
  }
}

.search-history-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 31px;

  .search-history-header {
    display: flex;
    justify-content: space-between;
    width: 690px;

    span {
      font-size: 30px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #1a1a1a;
    }

    img {
      width: 30px;
      height: 30px;
      /* border: dashed 1px #999; */
    }
  }
}
.search-img {
  width: 30px;
  height: 30px;
  position: relative;
  top: 8px;
  /* border: dashed 1px #999; */
}
::v-deep .van-field__control {
  font-size: 24px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #999999;
}
::v-deep .van-icon-search {
  font-size: 30px;
}
::v-deep .van-search__content {
  border: 1px solid #1a1a1a;
  border-radius: 12px;
  height: 73px;
}
::v-deep .van-field__control {
  /* height: 73px; */
}
::v-deep .van-search__action {
  margin-left: 30px;
  font-size: 26px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #1a1a1a;
}
::v-deep .van-cell {
  line-height: 63px;
}

::v-deep .van-field__clear {
  font-size: 30px;
  color: #999;
  /* border: dashed 1px #999; */
  line-height: 30px;
  padding: 0px;
  margin-right: 22px;
}

::v-deep .van-field__left-icon {
  margin: 0px 12px;
}
</style>
