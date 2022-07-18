<template>
  <div class="share-thing">
    <span>Share this thing</span>
    <div class="social-icon">
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
    <div class="send-email">
      <span>Send to Ortur user</span>
      <el-input placeholder="Enter user name or email"></el-input>
    </div>
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
.share-thing {
  width: 100%;
  height: 255px;
  color: #555;
  background-color: #fff;
  margin-top: 10px;
  padding: 10px 0px 10px 10px;
  box-sizing: border-box;
  span {
    font-size: 16px;
  }
  .social-icon {
    margin-top: 10px;
    svg {
      width: 30px;
      height: 30px;
      margin-left: 10px;
      margin-top: 10px;
      color: #666;
    }
  }
  .bi:hover {
    color: #248bfb;
  }
  .send-email {
    span {
      font-size: 12px;
      padding: 10px;
      float: left;
    }
    .el-input {
      margin-top: 20px;
    }
  }
}
</style>
