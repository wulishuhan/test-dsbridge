<template>
  <div @mouseover="enterFollowing" @mouseleave="leaveFollowing">
    <el-button type="primary" @click="changeFollowState">
      {{ followText }}
    </el-button>
  </div>
</template>
<script>
export default {
  name: "FollowButton",
  props: {
    follow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEnterFollowingBox: false,
      isFollow: false,
    };
  },
  created() {
    this.isFollow = this.follow;
  },
  computed: {
    followText() {
      return this.isFollow
        ? this.isEnterFollowingBox
          ? "UNFOLLOW"
          : "FOLLOWING"
        : "FOLLOW";
    },
  },
  methods: {
    changeFollowState() {
      this.isFollow = !this.isFollow;
    },
    enterFollowing() {
      if (this.isFollow) this.isEnterFollowingBox = true;
    },
    leaveFollowing() {
      if (this.isFollow) this.isEnterFollowingBox = false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
