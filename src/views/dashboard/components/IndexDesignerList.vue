<template>
  <div>
    <div class="top">
      <h1>FOLLOW DESIGNERS</h1>
      <div class="subtitle">
        Follow clever designers to keep track of their latest and greatest
        designs.
      </div>
    </div>
    <div class="item" v-for="item in designerList" :key="item.id">
      <div class="left">
        <router-link :to="'/design/Favorites/' + item.userId">
          <div class="avatar">
            <!-- Avatar image -->
            <img class="avatar__image" :src="item.avatar" />
          </div>
        </router-link>
        <div class="desc">
          <div class="username">{{ item.userName }}</div>
          <div class="intro">
            {{ item.designs }} Designs, {{ item.designs }} Liked Designs.
          </div>
          <FollowButton></FollowButton>
        </div>
      </div>
      <div class="right">
        <img
          :src="subitem"
          alt=""
          v-for="(subitem, index) in item.imgUrls"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FollowButton from "@/components/FollowButton.vue";
export default {
  components: {
    FollowButton,
  },
  props: {
    designerList: {
      type: Array,
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
  text-align: center;
}
.item {
  width: 100%;
  background-color: #fff;
  padding: 15px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  margin-top: 10px;
  .right {
    img {
      width: 120px;
      margin-left: 5px;
    }
  }
  .left {
    display: flex;
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
  }
}
</style>
