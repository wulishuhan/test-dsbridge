<template>
  <div class="container">
    <div class="item-header">
      <el-row>
        <el-col :span="6">
          <el-avatar
            :size="'medium'"
            :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
          ></el-avatar
        ></el-col>
        <el-col :span="18">
          <span>Thing Name</span>
          <div class="item-header-flex">
            <span>by UserName</span>
            <span>public time</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="item-image">
      <img
        src="https://cdn.thingiverse.com/renders/4f/5f/2d/a4/80/CCC_V32_preview_card.jpg"
        alt=""
        srcset=""
      />
    </div>
    <div class="item-interactions">
      <div class="item-flex percentage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-heart"
          viewBox="0 0 16 16"
        >
          <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
          />
        </svg>
        <span>1234</span>
      </div>
      <div class="item-flex percentage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-collection"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"
          />
        </svg>
        <span>1234</span>
      </div>
      <div class="item-flex percentage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chat-left"
          viewBox="0 0 16 16"
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
          />
        </svg>
        <span>1234</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PopularCard",
};
</script>
<style lang="scss" scoped>
.el-avatar {
  margin-left: 5px;
}
.item-header-flex {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
}
.container {
  width: 296px;
  height: 265px;
  display: inline-block;
  border: 2px solid #ececec;
  border-radius: 3px;
  font-size: 0;
  line-height: 0;
  position: relative;
  margin-bottom: 20px;
  background: #fff;
  overflow: hidden;
  .item-header {
    position: absolute;
    width: 100%;
    height: 60px;
    font-size: 12px;
    line-height: 1.25em;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }
  .item-image {
    width: 100%;
    height: 219px;
  }
  .item-interactions {
    width: 100%;
    height: 42px;
    font-size: 16px;
    .item-flex {
      display: flex;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      border-right: solid 1px #ccc;
      float: left;
    }
  }
}
.percentage {
  width: 32.9%;
  height: 100%;
}
</style>
