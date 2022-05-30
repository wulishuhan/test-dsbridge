<template>
  <div>
    <div class="resource_card">
      <div class="user-info">
        <div @click="viewAuthorInfo(thing.userId)">
          <el-avatar :size="20" :src="thing.avatar"></el-avatar>
        </div>
        <span>
          {{ thing.thingName }}
        </span>
      </div>

      <img :src="thing.url" alt="" @click="toDetail(thing.thingId)" />
      <div class="card-footer">
        <div class="collect-thing">
          <i class="el-icon-plus"></i>
          Collect Thing
        </div>
        <div class="icon-number-show">
          <div @click="like">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-heart"
              viewBox="0 0 16 16"
              :class="{ 'red-icon': isLike }"
            >
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
              />
            </svg>
            <span>
              {{ likes }}
            </span>
          </div>
          <div>
            <i class="el-icon-upload2"></i>
            <span> Share </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ResourceCard",
  props: {
    thing: {
      type: Object,
      default: function () {
        return {
          name: "Red-Eyed Crocodile Skink - Articulated - Re",
          avatar:
            "https://cdn.thingiverse.com/renders/6a/52/f6/58/c6/a9c90eaf75b82c1f3fec42ac55fdc88b_thumb_medium.jpg",
          uploadImg:
            "https://cdn.thingiverse.com/assets/11/e9/ac/64/3f/card_preview_Fusion2.jpg",
          like: 2047,
        };
      },
    },
  },
  data() {
    return {
      likes: 0,
      isLike: false,
    };
  },
  mounted() {
    this.likes = this.thing.likes;
    this.isLike = this.thing.isLike;
  },
  methods: {
    toDetail(id) {
      console.log(id);
      this.$router.push("/thing/" + id);
    },
    like() {
      this.isLike = !this.isLike;
      if (this.isLike) {
        this.likes = Number(this.likes) - 1;
      } else {
        this.likes = 1 + Number(this.likes);
      }
    },
    viewAuthorInfo(userId) {
      this.$router.push("/design/" + userId);
    },
  },
};
</script>
<style lang="scss" scoped>
.resource_card {
  width: 300px;
  height: 340px;
  margin: 5px auto;
  background-color: white;
  img {
    width: 300px;
    height: 225px;
    cursor: pointer;
  }
  .card-footer {
    display: flex;
  }
  .user-info {
    display: flex;
    width: 100%;
    height: 38px;
    align-items: center;
    .el-avatar {
      margin: 0 5px;
      cursor: pointer;
    }
    span {
      font-size: 12px;
      color: #555;
    }
  }
  .collect-thing {
    display: flex;
    width: 70%;
    height: 77px;
    align-items: center;
    justify-content: center;
  }
  .icon-number-show {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    div {
      display: flex;
      justify-content: flex-start;
      cursor: pointer;
      span {
        margin-left: 5px;
      }
    }
  }
  .el-icon-upload2 {
    font-size: 20px;
    margin-left: -2.5px;
  }
  .red-icon {
    color: red;
  }
}
</style>
