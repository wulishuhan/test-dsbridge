<template>
  <div class="share-box">
    <a :href="shareLink.facebook">
      <i class="ortur-icon-facebook"></i>
    </a>
    <a :href="shareLink.twitter">
      <i class="ortur-icon-twitter"></i>
    </a>
    <a :href="shareLink.whatsapp">
      <i class="ortur-icon-whats-app"></i>
    </a>
    <a href="mailto:nowhere@mozilla.org">
      <i class="ortur-icon-ins"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: "ShareSocialMedia",
  data() {
    return {
      shareLink: {
        // text文本后边可以传要分享的url，注意后期修改
        facebook:
          "https://www.facebook.com/sharer/sharer.php?u=test.leadiffer.com",
        twitter: "https://twitter.com/share?url=test.leadiffer.com",
        whatsapp: "https://web.whatsapp.com/send?text=test.leadiffer.com",
      },
    };
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
i {
  color: #686565;
  font-size: 30px;
}
a {
  text-decoration: none;
}
</style>
