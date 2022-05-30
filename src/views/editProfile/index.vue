<template>
  <div>
    <header class="header">
      <div class="nav-center-content">
        <div class="nav">
          <span
            @click="switchView('THINGIVERSE SETTINGS')"
            :class="{
              'select-span-color': isThingiverseSettingsView,
            }"
          >
            THINGIVERSE SETTINGS
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
          <el-button type="primary">SAVE</el-button>
        </div>
      </div>
    </header>
    <div v-if="isThingiverseSettingsView">
      <thingiverse-settings></thingiverse-settings>
    </div>
    <div v-if="isOrturAccountView">
      <ortur-account></ortur-account>
    </div>
    <div v-if="isAppSettingsView">
      <app-settings></app-settings>
    </div>
  </div>
</template>
<script>
import OrturAccount from "./components/OrturAccount";
import ThingiverseSettings from "./components/ThingiverseSettings";
import AppSettings from "./components/AppSettings";
export default {
  name: "EditProfile",
  components: { OrturAccount, ThingiverseSettings, AppSettings },
  data() {
    return {
      activeName: "first",
      activeNavName: "THINGIVERSE SETTINGS",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    save() {
      console.log("save");
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
    isThingiverseSettingsView() {
      return this.activeNavName === "THINGIVERSE SETTINGS";
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
.center-content {
  margin: 0 auto;
  box-sizing: border-box;
  width: 970px;
}
.header {
  width: 100%;
  height: 100px;
  padding: 30px 0;
  border-bottom: 2px solid #ccc;
  display: flex;
  box-sizing: border-box;
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
    .buttom-group {
    }
  }
}
</style>
