<template>
  <div class="wrapper">
    <div class="container" v-for="item in userList" :key="item.userId">
      <div class="left">
        <img class="img" :src="item.avatar" alt="" />
        <div class="center">
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
      <div class="right">
        <FollowButton
          :follow="myFollowList.includes(item.id)"
          ref="followBtn"
          :userId="item.id"
          :key="item.id"
          v-show="myUserId !== item.id"
        ></FollowButton>
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
    myUserId: [String, Number],
    userList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    myFollowList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 350px;
  overflow: auto;
}
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
