<template>
  <div>
    <div class="content">
      <div class="title">
        <span>
          {{ detail.title }}
        </span>
      </div>
      <div class="description">
        <span>
          {{ detail.content }}
        </span>
      </div>
      <div class="img-canvas">
        <img src="@/assets/no-search-result.png" alt="" />
      </div>
      <div v-show="!showFadebackTip" class="fadeback">
        <span class="ask"> 是否解决了您的问题？ </span>
        <div class="button-container">
          <van-button class="fadeback-button" @click="unsatisfied">
            <div class="button-inner-text">
              <img src="@/assets/unagree.png" alt="" />
              <span> 未解决 </span>
            </div>
          </van-button>
          <van-button class="fadeback-button" @click="satisfactory">
            <div class="button-inner-text">
              <img src="@/assets/agree.png" alt="" />
              <span> 已解决 </span>
            </div>
          </van-button>
        </div>
      </div>
      <div v-show="showFadebackTip" class="fadeback-after">
        <div class="fadeback-after-inner" v-show="showUnsatisfiedTip">
          <span
            >对问题仍有疑问? &nbsp;<a @click="hasProblem"
              >对问题仍有疑问?</a
            ></span
          >
          <img src="@/assets/unsatisfied.png" alt="" />
        </div>

        <div class="fadeback-after-inner" v-show="showSatisfactoryTip">
          <span>感谢反馈</span>
          <img src="@/assets/satisfactory.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from "vant";
import { getFaqDetail, feedback } from "@/api/question.js";
export default {
  name: "detail",
  components: {
    [Button.name]: Button,
  },
  mounted() {
    getFaqDetail(this.$route.params.questionId).then((res) => {
      console.log("getFaqDetail", res);
      this.detail = res.data.data;
    });
  },
  data() {
    return {
      showUnsatisfiedTip: false,
      showSatisfactoryTip: false,
      showFadebackTip: false,
      detail: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    satisfactory() {
      feedback({
        id: this.$route.params.questionId,
        solved: 1,
      }).then(() => {
        this.showFadebackTip = true;
        this.showSatisfactoryTip = true;
      });
    },
    unsatisfied() {
      feedback({
        id: this.$route.params.questionId,
        solved: 2,
      }).then(() => {
        this.showFadebackTip = true;
        this.showUnsatisfiedTip = true;
      });
    },
    hasProblem() {
      this.$dsbridge.call("routeTo", "suggest");
    },
  },
};
</script>
<style scoped lang="less">
.content {
  padding: 0 35px;
  margin-top: 41px;
  padding-bottom: 254px;
  .title {
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #121212;
  }
  .description {
    width: 677px;
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #666666;
    margin-top: 33px;
    text-align: start;
    span {
      white-space: pre-line;
    }
  }
  .img-canvas {
    width: 690px;
    height: 352px;
    background: #ffffff;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 45px;
    img {
      width: 396px;
      height: 245px;
      object-fit: contain;
    }
  }
  .fadeback {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 45px;
    .ask {
      /* width: 226px; */
      height: 24px;
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #4d4d4d;
      /* line-height: 48px; */
    }
    .button-container {
      margin-top: 35px;
      width: 528px;
      display: flex;
      justify-content: space-between;
      .fadeback-button {
        width: 240px;
        height: 73px;
        border-radius: 12px;
        background: #e8ebf4;
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #1a1a1a;
        display: flex;
        justify-content: center;
        .button-inner-text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 130px;
          img {
            width: 40px;
            height: 40px;
            /* border: 1px dashed #999; */
          }
          span {
            font-size: 24px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #1a1a1a;
          }
        }
      }
    }
  }
  .fadeback-after {
    margin-top: 45px;
    .fadeback-after-inner {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 91px;
      img {
        width: 40px;
        height: 40px;
        /* border: 1px dashed #000; */
      }
      span {
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #4d4d4d;
        a {
          color: #1e78f0;
        }
      }
    }
  }
}
</style>
