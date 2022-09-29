<template>
  <el-select v-model="license" placeholder="Select license" style="width: 100%">
    <el-option
      v-for="(licenseItem, licenseKey) in licenseSelectList"
      :label="licenseItem.label"
      :value="licenseItem.value"
      :key="licenseKey"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  model: {
    prop: "data",
    // 随便命名事件，对应下面$emit即可
    event: "changeData",
  },
  data() {
    return {
      license: "",
      licenseSelectList: [
        {
          label: "Creative Commons - Attribution",
          value: "Creative Commons - Attribution",
          url: "https://creativecommons.org/licenses/by/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
          ],
        },
        {
          label: "Creative Commons - Attribution - Share Alike",
          value: "Creative Commons - Attribution - Share Alike",
          url: "https://creativecommons.org/licenses/by-sa/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
            "/license-img/Share Alike.png",
          ],
        },
        {
          label: "Creative Commons - Attribution - No Derivatives",
          value: "Creative Commons - Attribution - No Derivatives",
          url: "https://creativecommons.org/licenses/by-nd/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
            "/license-img/No Derivatives.png",
          ],
        },
        {
          label: "Creative Commons - Attribution - Non-Commercial",
          value: "Creative Commons - Attribution - Non-Commercial",
          url: "https://creativecommons.org/licenses/by-nc/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
            "/license-img/Non-Commercial.png",
          ],
        },
        {
          label:
            "Creative Commons - Attribution - Non-Commercial - Share Alike",
          value:
            "Creative Commons - Attribution - Non-Commercial - Share Alike",
          url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
            "/license-img/Non-Commercial.png",
            "/license-img/Share Alike.png",
          ],
        },
        {
          label:
            "Creative Commons - Attribution - Non-Commercial - No Derivatives ",
          value:
            "Creative Commons - Attribution - Non-Commercial - No Derivatives ",
          url: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
          icon: [
            "/license-img/Creative Commons.png",
            "/license-img/Attribution.png",
            "/license-img/Non-Commercial.png",
            "/license-img/No Derivatives.png",
          ],
        },
        {
          label: "Creative Commons - Public Domain Dedication",
          value: "Creative Commons - Public Domain Dedication",
          url: "https://creativecommons.org/share-your-work/public-domain/cc0/",
          icon: [
            "/license-img/Creative Commons - Public Domain Dedication.png",
          ],
        },
        {
          label: "GNU - GPL",
          value: "GNU - GPL",
          url: "https://www.gnu.org/licenses/gpl-3.0.html",
          icon: ["/license-img/GNU - GPL.png"],
        },
        {
          label: "GNU - LGPL",
          value: "GNU - LGPL",
          url: "https://www.gnu.org/licenses/lgpl-3.0.html",
          icon: ["/license-img/GNU - LGPL.png"],
        },
        {
          label: "BSD License",
          value: "BSD License",
          url: "https://opensource.org/licenses/BSD-3-Clause",
          icon: ["/license-img/BSD.png"],
        },
      ],
    };
  },
  mounted() {
    this.license = this.data;
  },
  watch: {
    license: function (val) {
      this.$emit("changeData", val);
    },
    data: function (val) {
      this.license = val;
    },
  },
  props: {
    data: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select-dropdown {
  .el-scrollbar {
    .el-select-dropdown__wrap {
      .el-select-dropdown__item.selected {
        background: #8ab5ef !important;
        color: #fff !important;
      }
      .el-select-dropdown__item.hover {
        background: #8ab5ef !important;
        color: #fff !important;
      }
    }
  }
}
</style>
