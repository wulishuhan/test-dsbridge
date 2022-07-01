<template>
  <div>
    <div class="item">
      <div class="top">
        <div>
          <router-link :to="'/thing/' + activityTextItem.userId">
            <img class="img" :src="activityTextItem.avatar" alt="" />
          </router-link>
          <router-link :to="'/thing/' + activityTextItem.thingId">
            {{ activityTextItem.author }}
          </router-link>
          started a topic
          <router-link :to="'/thing/' + activityTextItem.thingId"
            >{{ activityTextItem.thingsName }}
          </router-link>
        </div>
        <div>{{ activityTextItem.publicTime }}</div>
      </div>
      <div class="left">
        <router-link :to="'/design/Favorites/' + activityTextItem.subUserId">
          <div class="avatar">
            <!-- Avatar image -->
            <img class="avatar__image" :src="activityTextItem.subAvatar" />
          </div>
        </router-link>
        <div class="desc">
          <div class="username">{{ activityTextItem.subAuthor }}</div>
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
.top {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 20px;
  }
}
.item {
  width: 100%;
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 10px;
  .avatar {
    /* Rounded border */
    border-radius: 50%;
    height: 44px;
    width: 44px;
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
    width: 90%;
    margin-left: 20px;
    padding: 10px;
    display: flex;
    border: 1px solid #ccc;
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
