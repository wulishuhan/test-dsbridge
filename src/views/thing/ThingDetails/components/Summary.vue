<template>
  <div class="settings-container">
    <h1>Summary</h1>
    <span>{{ summary }}</span>
    <h1>Print Settings</h1>
    <div>
      <p>Printer brand:</p>
      <p>{{ printSettings.Printerbrand }}</p>
      <p>MakerBot:</p>
      <p>{{ printSettings.MakerBot }}</p>
      <p>Printer:</p>
      <p>{{ printSettings.Printer }}</p>
      <p>Rafts:</p>
      <p>{{ printSettings.Rafts }}</p>
      <p>Supports:</p>
      <p>{{ printSettings.Supports }}</p>
      <p>Infill:</p>
      <p>{{ printSettings.Infill }}</p>
      <p>Notes:</p>
      <p>{{ printSettings.Notes }}</p>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line
  name: "Summary",
  props: {
    summary: {
      type: String,
      default: "Summary text",
    },
    printSettings: {
      type: Object,
      default: () => {
        return {
          Printerbrand: "",
          MakerBot: "",
          Printer: "MakerBot Replicator",
          Rafts: "Doesn't Matter",
          Supports: "No",
          Resolution: "Does not really matter.",
          Infill: "20%",
          Notes:
            "Some users reported problems for using less than 20% infill. 20% prints fine.",
        };
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.settings-container {
  color: #555;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 3px;
  background-color: #fff;
  margin-top: 10px;
  a {
    text-decoration: none;
    color: #248bfb;
    font-size: 12px;
    margin-left: 5px;
  }
  h1 {
    color: #555;
    font-family: SFUIText-Light;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.2px;
  }
}
</style>
