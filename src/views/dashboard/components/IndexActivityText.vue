<template>
  <div>
    <div class="item">
      <div class="left">
        <router-link :to="'/design/Favorites/' + activityTextItem.userId">
          <div class="avatar">
            <!-- Avatar image -->
            <img class="avatar__image" :src="activityTextItem.avatar" />
          </div>
        </router-link>
        <div class="desc">
          <div class="username">{{ activityTextItem.author }}</div>
          <div class="intro">
            {{ activityTextItem.publicTime }}
          </div>
          <p class="text">
            {{ activityTextItem.content }}
          </p>
        </div>
      </div>
    </div>
    <!-- <div
      style="
        height: 20px;
        background-color: #777;
        text-align: right;
        padding-right: 10px;
        color: blue;
      "
    >
      flag
    </div> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    activityTextItem: {
      type: Object,
    },
  },
  mounted() {
    // console.log(this.designerList);
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  background-color: #fff;
  padding: 15px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  margin-top: 10px;
  .avatar {
    /* Rounded border */
    border-radius: 50%;
    height: 64px;
    width: 64px;
    margin-right: 20px;
  }

  .avatar__image {
    /* Rounded border */
    border-radius: 50%;

    /* Take full size */
    height: 100%;
    width: 100%;
  }
  .left {
    width: 100%;
    display: flex;

    .desc {
      width: 100%;

      .username {
        font-size: 20px;
      }
      .text {
        width: 80%;
        word-wrap: break-word;
        margin-top: 20px;
      }
    }
  }
}
</style>
