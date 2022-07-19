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
  border-radius: 10px;
  width: 250px;
  height: 70px;
  border: solid 1px #ccc;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 1px 1px 5px #ccc;
  background-color: #fff;
}
i {
  color: #000;
  font-size: 30px;
}
a {
  text-decoration: none;
}
</style>
