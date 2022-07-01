<template>
  <div>
    <header class="header">
      <div class="nav-center-content">
        <div class="nav">
          <span
            @click="switchView('ORTUR SETTINGS')"
            :class="{
              'select-span-color': isOrturSettingsView,
            }"
          >
            ORTUR SETTINGS
          </span>
          <span
            @click="switchView('ORTUR ACCOUNT')"
            :class="{
              'select-span-color': isOrturAccountView,
            }"
            >ORTUR ACCOUNT</span
          >
          <span
            @click="switchView('APP SETTINGS')"
            :class="{
              'select-span-color': isAppSettingsView,
            }"
            >APP SETTINGS</span
          >
        </div>
        <div class="buttom-group">
          <el-button type="danger">CANCEL</el-button>
          <el-button type="primary" @click="save">SAVE</el-button>
        </div>
      </div>
    </header>
    <div v-show="isOrturSettingsView">
      <ortur-settings ref="orturSettings"></ortur-settings>
    </div>
    <div v-show="isOrturAccountView">
      <ortur-account ref="orturAccount"></ortur-account>
    </div>
    <div v-show="isAppSettingsView">
      <app-settings></app-settings>
    </div>
  </div>
</template>
<script>
import OrturAccount from "./OrturAccount";
import OrturSettings from "./OrturSettings";
import AppSettings from "./AppSettings";
import { updateUserProfile } from "@/api/user";
export default {
  name: "EditProfile",
  components: { OrturSettings, OrturAccount, AppSettings },
  data() {
    return {
      activeName: "first",
      activeNavName: "ORTUR SETTINGS",
      componentName: OrturSettings,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    save() {
      let data = {
        ...this.$refs.orturSettings.form,
        ...this.$refs.orturAccount.form,
        userId: this.$store.getters.userId,
      };
      updateUserProfile(data).then((res) => {
        console.log("updated user profile", res);
      });
    },
    cancel() {
      console.log("cancel");
    },
    switchView(view) {
      this.activeNavName = view;
      console.log("name:", view);
    },
  },
  computed: {
    isOrturSettingsView() {
      return this.activeNavName === "ORTUR SETTINGS";
    },
    isOrturAccountView() {
      return this.activeNavName === "ORTUR ACCOUNT";
    },
    isAppSettingsView() {
      return this.activeNavName === "APP SETTINGS";
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100px;
  padding: 30px 0;
  border-bottom: 2px solid #ccc;
  display: flex;
  box-sizing: border-box;
}
.nav-center-content {
  margin: 0 auto;
  box-sizing: border-box;
  width: 970px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}
.nav {
  span {
    margin-right: 50px;
    color: #666;
    font-family: "Antenna", Helvetica, Arial, sans-serif;
    font-weight: normal;
    text-transform: uppercase;
    cursor: pointer;
  }
  .select-span-color {
    color: #248bfb;
  }
  span:hover {
    color: #248bfb;
  }
}
@media screen and (max-width: 768px) {
  .nav {
    display: flex;
    span {
      margin-right: 0px;
    }
  }
  .nav-center-content {
    flex-wrap: wrap;
  }
  .buttom-group {
    margin: 10px auto;
  }
}
</style>
