<template>
  <div>
    <section class="edit-section">
      <div class="center-content setting-app">
        <h1>THING SETTINGS FOR APPS</h1>
        <span>Default Tips for Apps</span>
        <br />
        <span
          >Some apps allow for design tips, set a default price for all your
          Things.
        </span>
        <br />
        <br />
        <el-select v-model="cost" placeholder="请选择">
          <el-option
            v-for="item in costs"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <span class="radio-group">
          <el-radio v-model="radio" label="1">Suggested</el-radio>
          <el-radio v-model="radio" label="2">Required</el-radio>
        </span>
        <h4>Manage Thing access for Apps</h4>
        <p>
          All Things are automatically allowed to be used by an App under most
          licenses. If you'd like to change what Apps can access a Thing, then
          enable or disable each App by editing the Thing. Alternatively, to
          manage Things on an App level, visit the
          <a href="#">Thingiverse App Portal</a>

          select the App you want to manage, and click the Thing Settings button
          to add or remove which Things are usable by that App.
        </p>
      </div>
    </section>
    <section class="edit-section app-account">
      <div class="center-content">
        <h1>APPS THAT ACCESS MY ACCOUNT</h1>
        <h2>
          These are the applications that you have permitted to access your data
          on Thingiverse
        </h2>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "AppSettings",
  props: {},
  data() {
    return {
      radio: "1",
      cost: "",
      costs: [
        "0",
        "$1.00 USD",
        "$2.00 USD",
        "$3.00 USD",
        "$5.00 USD",
        "$8.00 USD",
        "$13.00 USD",
        "$21.00 USD",
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.center-content {
  margin: 0 auto;
  box-sizing: border-box;
  width: 970px;
}
.edit-section {
  padding: 40px 0 20px;
  overflow: hidden;
  background-color: #f5f5f5;
}
.app-account {
  background-color: #ececec;
  h2 {
    border-bottom: 1px solid #ccc;
    color: #666;
    font-size: 14px;
    padding-bottom: 20px;
  }
}
.setting-app {
  font-size: 11pt;
  color: #666;
  a {
    color: #248bfb;
  }
}
.radio-group {
  margin-left: 30px;
}
@media screen and (max-width: 768px) {
  .radio-group {
    margin-left: 0px;
  }
  .center-content {
    width: 100%;
  }
}
</style>
