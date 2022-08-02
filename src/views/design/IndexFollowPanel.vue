<template>
  <div class="wrapper">
    <div class="container" v-for="item in userList" :key="item.userId">
      <div class="left">
        <img class="img" :src="item.imgUrl" alt="" />
        <div class="center">
          <div class="name">{{ item.userName }}</div>
        </div>
      </div>
      <div class="right">
        <FollowButton :follow="item.isFollow" ref="followBtn"></FollowButton>
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
  mounted() {},
  methods: {},
  props: {
    userList: {
      type: Array,
      default: () => {
        return [
          { userName: "yang", userId: "111", imgUrl: "", isFollow: true },
          { userName: "yang", userId: "111", imgUrl: "", isFollow: false },
        ];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 16px 16px;
  text-align: left;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
