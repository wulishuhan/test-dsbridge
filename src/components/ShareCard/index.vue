<template>
  <div class="share-box">
    <a class="share-icon-box" @click="share(shareLink.facebook)">
      <i class="ortur-icon-facebook ortur-icon"></i>
    </a>
    <a class="share-icon-box" @click="share(shareLink.twitter)">
      <i class="ortur-icon-twitter ortur-icon"></i>
    </a>
    <a class="share-icon-box" @click="share(shareLink.whatsapp)">
      <i class="ortur-icon-whats-app ortur-icon"></i>
    </a>
    <a class="share-icon-box" @click="share(shareLink.instagram)">
      <i class="ortur-icon-ins ortur-icon"></i>
    </a>
  </div>
</template>

<script scoped>
export default {
  name: "ShareSocialMedia",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      shareLink: {
        // text文本后边可以传要分享的url，注意后期修改
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/thing/${this.id}`,
        twitter: `https://twitter.com/share?url=${window.location.origin}/thing/${this.id}`,
        whatsapp: `https://web.whatsapp.com/send?text=${window.location.origin}/thing/${this.id}`,
        instagram: "https://www.instagram.com/",
      },
    };
  },
  methods: {
    share(url) {
      let name = ""; //网页名称，可为空;
      let iWidth = 500; //弹出窗口的宽度;
      let iHeight = 670; //弹出窗口的高度;
      //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
      let iTop = (window.screen.height - iHeight) / 2; //获得窗口的垂直位置;
      let iLeft = (window.screen.width - iWidth) / 2; //获得窗口的水平位置;
      let strWindowFeatures = `top=${iTop},left=${iLeft},height= ${iHeight} ,innerHeight= ${iHeight} ,width= ${iWidth} ,innerWidth=${iWidth} ,toolbar=no,menubar=no,scrollbars=auto,resizable=no,location=no,status=no`;
      window.open(url, name, strWindowFeatures);
    },
  },
};
</script>
<style lang="scss" scoped>
.share-box {
  width: 180px;
  height: 54px;
  background: #ffffff;
  box-shadow: 0px 2px 8px 0px rgba(18, 18, 18, 0.07);
  border-radius: 8px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.ortur-icon {
  color: #686565;
  font-size: 30px;
}
.share-icon-box {
  text-decoration: none;
}
</style>
