<template>
  <div class="container">
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
            @click="clearSearchHistory"
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
  </div>
</template>
<script>
import { Search, Dialog } from "vant";
import { search } from "@/api/question.js";
import SearchHistoryButton from "./components/SearchHistoryButton.vue";
import SearchResultCell from "./components/SearchResultCell.vue";
export default {
  name: "result",
  components: {
    [Search.name]: Search,
    [Dialog.name]: Dialog,
    SearchHistoryButton,
    SearchResultCell,
  },
  data() {
    return {
      value: "",
      searchHistory: [],
      searchResults: [],
      showHistory: true,
    };
  },
  mounted() {
    let faqSearchHistory = JSON.parse(localStorage.getItem("faqSearchHistory"));
    if (!faqSearchHistory) {
      localStorage.setItem("faqSearchHistory", JSON.stringify([]));
      faqSearchHistory = [];
    }
    this.searchHistory = faqSearchHistory;
  },
  methods: {
    clear() {
      console.log("clear");
    },
    input() {},
    clearSearchHistory() {
      Dialog.confirm({
        message: "是否清除历史记录",
        cancelButtonText: "否",
        cancelButtonColor: "#999",
        confirmButtonText: "是",
        confirmButtonColor: "#1E78F0",
        beforeClose: (action, done) => {
          if (action === "confirm") {
            localStorage.setItem("faqSearchHistory", JSON.stringify([]));
            this.searchHistory = [];
            done();
          } else {
            done();
          }
        },
      });
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
    border: dashed 1px #999;
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
      border: dashed 1px #999;
    }
  }
}
.search-img {
  width: 30px;
  height: 30px;
  position: relative;
  top: 11px;
  border: dashed 1px #999;
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
  border: dashed 1px #999;
  line-height: 30px;
  padding: 0px;
  margin-right: 22px;
}

::v-deep .van-field__left-icon {
  margin: 0px 12px;
}
</style>
