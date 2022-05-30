<template>
  <div v-if="isShow" class="printSettings-container">
    <el-form :label-position="'top'">
      <el-row>
        <el-col :span="12">
          <el-form-item label="Printer Brand">
            <el-select
              v-model="form.region"
              placeholder="Which 3D Printer are you using?"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Rafts">
            <el-select v-model="form.region" placeholder="--- Choose one ---">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Resolution">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Filament Brand">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Filament Material">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Printer Model"></el-form-item>
          <el-form-item label="Supports">
            <el-select v-model="form.region" placeholder="--- Choose one ---">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="infill">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Filament Color">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Misc Notes">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "PrintSettings",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  mounted() {
    if (this.name == "Print Setting") this.isShow = true;
  },
  data() {
    return {
      form: {
        region: "",
      },
      isShow: false,
    };
  },
};
</script>
<style lang="scss">
.printSettings-container {
  background: #fff;
}
.el-input {
  width: 270px;
}
.el-select {
  width: 270px;
}
.el-form {
  padding-top: 10px;
}

.el-form--label-top .el-form-item__label {
  float: none;
  display: inline-block;
  text-align: left;
  padding: 0;
}
</style>
