<template>
  <transition name="viewer-fade">
    <div
      tabindex="-1"
      ref="el-image-viewer__wrapper"
      class="el-image-viewer__wrapper"
      :style="{ 'z-index': viewerZIndex }"
    >
      <div class="el-image-viewer__mask" @click.self="handleMaskClick"></div>
      <!-- CLOSE -->
      <!-- <span class="el-image-viewer__btn el-image-viewer__close" @click="hide">
        <i class="el-icon-close"></i>
      </span> -->
      <!-- ARROW -->
      <!-- <template v-if="!isSingle">
        <span
          class="el-image-viewer__btn el-image-viewer__prev"
          :class="{ 'is-disabled': !infinite && isFirst }"
          @click="prev"
        >
          <i class="el-icon-arrow-left" />
        </span>
        <span
          class="el-image-viewer__btn el-image-viewer__next"
          :class="{ 'is-disabled': !infinite && isLast }"
          @click="next"
        >
          <i class="el-icon-arrow-right" />
        </span>
      </template> -->
      <!-- ACTIONS -->
      <div class="el-image-viewer__btn el-image-viewer__actions">
        <div class="el-image-viewer__actions__inner">
          <i class="el-icon-zoom-out" @click="handleActions('zoomOut')"></i>
          <i class="el-icon-zoom-in" @click="handleActions('zoomIn')"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i :class="mode.icon" @click="toggleMode"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i
            class="el-icon-refresh-left"
            @click="handleActions('anticlocelise')"
          ></i>
          <i
            class="el-icon-refresh-right"
            @click="handleActions('clocelise')"
          ></i>
        </div>
      </div>
      <!-- CANVAS -->
      <div
        class="el-image-viewer__canvas"
        :style="imgStyle"
        :class="[isMake ? 'make-canvas-img' : 'canvas-img']"
      >
        <!-- eslint-disable-next-line -->
        <div v-for="(item, i) in urlList">
          <img
            v-if="i === index"
            ref="img"
            class="el-image-viewer__img"
            :key="item.id"
            :src="currentImg"
            :style="imgStyle"
            @load="handleImgLoad"
            @error="handleImgError"
            @mousedown="handleMouseDown"
            :class="[isMake ? 'make-canvas-img' : 'canvas-img']"
          />
        </div>
        <template v-if="!isSingle">
          <span
            class="el-image-viewer__btn el-image-viewer__prev"
            :class="[
              !infinite && isFirst ? 'is-disabled' : '',
              !isMake ? 'up-box' : '',
            ]"
            @click="prev"
            v-show="!isMake"
          >
            <i class="ortur-icon-arrow-up" />
          </span>
          <span
            class="el-image-viewer__btn el-image-viewer__next"
            :class="[
              !infinite && isFirst ? 'is-disabled' : '',
              !isMake ? 'down-box' : '',
            ]"
            @click="next"
            v-show="!isMake"
          >
            <i class="ortur-icon-arrow-bottom" />
          </span>
          <span
            class="el-image-viewer__btn el-image-viewer__prev make-left-box"
            :class="{ 'is-disabled': !infinite && isFirst }"
            @click="prev"
            v-show="isMake"
          >
            <!-- <i class="el-icon-arrow-left" /> -->
            <svg-icon
              icon-class="left"
              class-name="make-left"
              class="make-left"
            ></svg-icon>
          </span>
          <span
            class="el-image-viewer__btn el-image-viewer__next make-right-box"
            :class="{ 'is-disabled': !infinite && isLast }"
            @click="next"
            v-show="isMake"
          >
            <!-- <i class="el-icon-arrow-right" /> -->
            <svg-icon
              icon-class="right"
              class-name="make-right"
              class="make-right"
            ></svg-icon>
          </span>
        </template>
        <span
          class="el-image-viewer__btn el-image-viewer__close"
          @click="hide"
          :class="[isMake ? 'makes-close' : 'img-close']"
        >
          <i v-if="!isMake" class="ortur-icon-shrink"></i>
          <i v-else class="el-icon-close"></i>
        </span>
        <div v-if="isMake" class="open-comment-box" @click="openComment">
          <i class="el-icon-arrow-left"></i>
          <i class="ortur-icon-message"></i>
        </div>
        <el-menu @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <div v-if="isCollapse" class="comment-box">
            <el-button @click="closeComment"
              ><i class="el-icon-arrow-right"></i
            ></el-button>
            <div style="height: 100%; width: 100%; overflow-y: scroll">
              <MakesCommentWidget
                :make="urlList[index]"
                @closeAll="closeAll"
              ></MakesCommentWidget>
            </div>
          </div>
        </el-menu>
        <div v-if="isMake" class="left-top-scacel-box">
          scacel {{ Math.floor(this.transform.scale * 100) }}%
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { on, off } from "element-ui/src/utils/dom";
import { rafThrottle, isFirefox } from "element-ui/src/utils/util";
import { PopupManager } from "element-ui/src/utils/popup";
import MakesCommentWidget from "@/components/Comment/MakesCommentWidget.vue";
const Mode = {
  CONTAIN: {
    name: "contain",
    icon: "el-icon-full-screen",
  },
  ORIGINAL: {
    name: "original",
    icon: "el-icon-c-scale-to-original",
  },
};

const mousewheelEventName = isFirefox() ? "DOMMouseScroll" : "mousewheel";
/* eslint-disable */
export default {
  name: "ImageViwer",
  components: { MakesCommentWidget },
  props: {
    urlList: {
      type: Array,
      default: () => [],
    },
    zIndex: {
      type: Number,
      default: 2000,
    },
    onSwitch: {
      type: Function,
      default: () => {},
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    isMake: {
      type: Boolean,
      default: false,
    },
    isVertical: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      index: this.initialIndex,
      isShow: false,
      infinite: true,
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false,
      },
      isCollapse: false,
    };
  },
  computed: {
    isSingle() {
      return this.urlList.length <= 1;
    },
    isFirst() {
      return this.index === 0;
    },
    isLast() {
      return this.index === this.urlList.length - 1;
    },
    currentImg() {
      return this.urlList[this.index].url;
    },
    imgStyle() {
      const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
      // const style = {
      //   transform: `scale(${scale}) rotate(${deg}deg)`,
      //   transition: enableTransition ? "transform .3s" : "",
      //   // "margin-left": `${offsetX}px`,
      //   // "margin-top": `${offsetY}px`,
      // };
      let style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? "transform .3s" : "",
        // "margin-left": `${offsetX}px`,
        // "margin-top": `${offsetY}px`,
      };
      if (!this.isMake) {
        style = {};
      }
      if (this.mode === Mode.CONTAIN) {
        style.maxWidth = style.maxHeight = "100%";
      }
      return style;
    },
    viewerZIndex() {
      if (this.isMake) {
        return 9999;
      }
      const nextZIndex = PopupManager.nextZIndex();
      return this.zIndex > nextZIndex ? this.zIndex : nextZIndex;
    },
  },
  watch: {
    index: {
      handler: function (val) {
        this.reset();
        this.onSwitch(val);
      },
    },
    currentImg(val) {
      this.$nextTick((_) => {
        const $img = this.$refs.img[0];
        if (!$img.complete) {
          this.loading = true;
        }
      });
    },
  },
  methods: {
    hide() {
      this.deviceSupportUninstall();
      this.onClose();
    },
    deviceSupportInstall() {
      this._keyDownHandler = (e) => {
        e.stopPropagation();
        const keyCode = e.keyCode;
        switch (keyCode) {
          // ESC
          case 27:
            this.hide();
            break;
          // SPACE
          case 32:
            this.toggleMode();
            break;
          // LEFT_ARROW
          case 37:
            this.prev();
            break;
          // UP_ARROW
          case 38:
            this.handleActions("zoomIn");
            break;
          // RIGHT_ARROW
          case 39:
            this.next();
            break;
          // DOWN_ARROW
          case 40:
            this.handleActions("zoomOut");
            break;
        }
      };
      this._mouseWheelHandler = rafThrottle((e) => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
        if (delta > 0) {
          this.handleActions("zoomIn", {
            zoomRate: 0.015,
            enableTransition: false,
          });
        } else {
          this.handleActions("zoomOut", {
            zoomRate: 0.015,
            enableTransition: false,
          });
        }
      });
      on(document, "keydown", this._keyDownHandler);
      on(document, mousewheelEventName, this._mouseWheelHandler);
    },
    deviceSupportUninstall() {
      off(document, "keydown", this._keyDownHandler);
      off(document, mousewheelEventName, this._mouseWheelHandler);
      this._keyDownHandler = null;
      this._mouseWheelHandler = null;
    },
    handleImgLoad(e) {
      this.loading = false;
    },
    handleImgError(e) {
      this.loading = false;
      e.target.alt = "加载失败";
    },
    handleMouseDown(e) {
      if (this.loading || e.button !== 0) return;

      const { offsetX, offsetY } = this.transform;
      const startX = e.pageX;
      const startY = e.pageY;
      this._dragHandler = rafThrottle((ev) => {
        this.transform.offsetX = offsetX + ev.pageX - startX;
        this.transform.offsetY = offsetY + ev.pageY - startY;
      });
      on(document, "mousemove", this._dragHandler);
      on(document, "mouseup", (ev) => {
        off(document, "mousemove", this._dragHandler);
      });

      e.preventDefault();
    },
    handleMaskClick() {
      if (this.maskClosable) {
        this.hide();
      }
    },
    reset() {
      this.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false,
      };
    },
    toggleMode() {
      if (this.loading) return;

      const modeNames = Object.keys(Mode);
      const modeValues = Object.values(Mode);
      const index = modeValues.indexOf(this.mode);
      const nextIndex = (index + 1) % modeNames.length;
      this.mode = Mode[modeNames[nextIndex]];
      this.reset();
    },
    prev() {
      if (this.isFirst && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index - 1 + len) % len;
      this.closeComment();
    },
    next() {
      if (this.isLast && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index + 1) % len;
      this.closeComment();
    },
    handleActions(action, options = {}) {
      if (this.loading) return;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options,
      };
      const { transform } = this;
      switch (action) {
        case "zoomOut":
          if (transform.scale > 0.2) {
            transform.scale = parseFloat(
              (transform.scale - zoomRate).toFixed(3)
            );
          }
          break;
        case "zoomIn":
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
          break;
        case "clocelise":
          transform.deg += rotateDeg;
          break;
        case "anticlocelise":
          transform.deg -= rotateDeg;
          break;
      }
      transform.enableTransition = enableTransition;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    openComment() {
      this.isCollapse = true;
      off(document, mousewheelEventName, this._mouseWheelHandler);
    },
    closeComment() {
      this.isCollapse = false;
      on(document, mousewheelEventName, this._mouseWheelHandler);
    },
    closeAll() {
      this.isCollapse = false;
      this.hide();
    },
  },
  mounted() {
    this.deviceSupportInstall();
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
    // add tabindex then wrapper can be focusable via Javascript
    // focus wrapper so arrow key can't cause inner scroll behavior underneath
    this.$refs["el-image-viewer__wrapper"].focus();
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
};
</script>
<style scoped>
.el-image-viewer__canvas {
  position: relative;
  /* width: 1432px; */
  /* height: 880px; */
  margin: 0 auto;
  /* margin-top: 96px; */
  background: rgba(255, 255, 255, 0.8);
}
.make-canvas-img {
  width: 1440px !important;
  height: 896px !important;
  /* margin-top: 288px; */
}
.canvas-img {
  width: 1432px !important;
  height: 880px !important;
  /* margin-top: 96px; */
}
.el-image-viewer__img {
  object-fit: contain;
}
.left-top-scacel-box {
  width: 120px;
  height: 40px;
  background: rgba(26, 26, 26, 0.3);
  border-radius: 8px;
  position: absolute;
  left: 16px;
  top: 16px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
}
.comment-box {
  width: 100%;
  height: 896px;
  background: #fff;
  display: flex;
  align-items: center;
}
.open-comment-box {
  width: 64px;
  height: 160px;
  background: rgba(26, 26, 26, 0.3);
  border-radius: 6px;
  position: absolute;
  right: 16px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.open-comment-box:hover {
  cursor: pointer;
}
.el-menu {
  position: absolute;
  right: 0px;
  width: 816px;
  z-index: 3000;
}
.el-button {
  border: none;
}
.el-image-viewer__prev {
  background-color: rgba(26, 26, 26, 0.3);
}

.el-image-viewer__btn {
  border-radius: 6px;
}

.el-icon-close:before {
}

.el-image-viewer__actions {
  display: none;
}

.up-box {
  width: 432px;
  height: 80px;
  /* background: #1a1a1a; */
  /* opacity: 0.3; */
  background: rgba(26, 26, 26, 0.3);
  border-radius: 6px;
  transform: translateX(-50%);
  left: 50%;
  top: 12px;
}

.down-box {
  width: 432px;
  height: 80px;
  background: rgba(26, 26, 26, 0.3);
  /* background: #1a1a1a; */
  /* opacity: 0.3; */
  border-radius: 6px;
  /* transform: translateX(-50%); */
  /* left: 50%; */
  transform: translateX(-50%);
  left: 50%;
  bottom: 12px;
  top: auto;
}

.el-image-viewer__close {
  width: 60px;
  height: 60px;
  /* background: #1a1a1a;
    opacity: 0.3; */
  background: rgba(26, 26, 26, 0.3);
  border-radius: 6px;
  /* top: 12px; */
  /* right: 13px; */
}
.makes-close {
  width: 40px;
  height: 40px;
  top: 16px;
  right: 24px;
}
.img-close {
  width: 60px;
  height: 60px;
  top: 12px;
  right: 13px;
}

.make-left-box {
  width: 32px;
  height: 80px;
  left: -100px;
  border-radius: 0;
  background: none;
  color: #fff;
}
.make-left {
  width: 100% !important;
  height: 100% !important;
}
.make-right-box {
  width: 32px;
  height: 80px;
  right: -100px;
  border-radius: 0;
  background: none;
  font-size: 70px;
  color: #fff;
}
.make-right {
  width: 100% !important;
  height: 100% !important;
}
</style>
