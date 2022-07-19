<template>
  <div>
    <div class="container" v-if="noticeInfo.type == 'comment'">
      <div v-show="noticeInfo.isRead" class="dot">未读</div>
      <div class="left">
        <router-link :to="'/design/Favorites/' + noticeInfo.userId">
          <img :src="noticeInfo.url" class="img" alt="" />
        </router-link>
      </div>
      <div class="right">
        <div class="name">
          <span class="username">
            <router-link :to="'/design/Favorites/' + noticeInfo.userId">
              {{ noticeInfo.userName }}
            </router-link>
          </span>
          <span class="info"> left a comment to you on </span>
          <span class="thing">
            <router-link :to="'/thing/' + noticeInfo.thingId">
              {{ noticeInfo.thing }}
            </router-link>
          </span>
        </div>
        <div class="time">
          <span>updated {{ noticeInfo.time }} </span>
        </div>
        <div>{{ noticeInfo.comment }}</div>
        <div>{{ noticeInfo.yourComment }}</div>
      </div>
    </div>
    <div class="container" v-if="noticeInfo.type == 'message'">
      <div v-show="noticeInfo.isRead" class="dot">未读</div>
      <div class="left">
        <router-link :to="'/design/Favorites/' + noticeInfo.userId">
          <img :src="noticeInfo.url" class="img" alt="" />
        </router-link>
      </div>
      <div class="right">
        <div class="name">
          <span class="username">
            <router-link :to="'/design/Favorites/' + noticeInfo.userId">
              {{ noticeInfo.userName }}
            </router-link>
          </span>
          <span class="info"> {{ noticeInfo.type }} you </span>
        </div>
        <div class="time">
          <span>updated {{ noticeInfo.time }} </span>
        </div>
        <div>{{ noticeInfo.message }}</div>
      </div>
    </div>
    <div class="container" v-if="noticeInfo.type == 'system'">
      <div v-show="noticeInfo.isRead" class="dot">未读</div>
      <div class="left">
        <router-link :to="'/design/Favorites/' + noticeInfo.userId">
          <img :src="noticeInfo.url" class="img" alt="" />
        </router-link>
      </div>
      <div class="right">
        <div class="name">
          <span class="username">
            <router-link :to="'/design/Favorites/' + noticeInfo.userId">
              {{ noticeInfo.userName }}
            </router-link>
          </span>
          <span class="info"> {{ noticeInfo.type }} you </span>
        </div>
        <div class="time">
          <span>updated {{ noticeInfo.time }} </span>
        </div>
      </div>
    </div>
    <div
      class="container"
      v-if="noticeInfo.type == 'follow' || noticeInfo.type == 'unFollow'"
    >
      <div v-show="noticeInfo.isRead" class="dot">未读</div>
      <div class="left">
        <router-link :to="'/design/Favorites/' + noticeInfo.userId">
          <img :src="noticeInfo.url" class="img" alt="" />
        </router-link>
      </div>
      <div class="right">
        <div class="name">
          <span class="username">
            <router-link :to="'/design/Favorites/' + noticeInfo.userId">
              {{ noticeInfo.userName }}
            </router-link>
          </span>
          <span class="info"> {{ noticeInfo.type }} you </span>
        </div>
        <div class="time">
          <span>updated {{ noticeInfo.time }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noticeInfo: {
      type: Object,
      default: () => {
        return {
          url: "https://cdn.thingiverse.com/assets/a0/23/4c/6f/68/medium_thumb_Headset_Holder_v1.png",
          userName: "yang",
          userId: "111",
          time: "20220708",
          thing: "3d 裸眼",
          thingId: "5453",
          comment: "真不错",
          yourComment: "还行",
          type: "comment",
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #ccc;
  width: 100%;
  padding: 10px 1px;
  text-align: left;
  box-sizing: border-box;
  display: flex;
  /* justify-content: space-around; */
  position: relative;
  .dot {
    position: absolute;
    top: 2px;
    left: 20px;
  }
}

.left {
  display: flex;
  align-items: flex-start;
  margin-top: 12px;
}

.img {
  width: 66px;
  height: 42px;
  margin-right: 10px;
}
</style>
