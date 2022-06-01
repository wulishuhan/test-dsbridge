<template>
  <div v-if="isShow" class="printSettings-container">
    <el-form :label-position="'top'">
      <el-row>
        <el-col :span="12">
          <el-form-item label="Printer Brand">
            <el-select
              v-model="form.printerBrand"
              placeholder="Which 3D Printer are you using?"
              @change="changePrinterBrand"
            >
              <el-option
                v-for="item in printerBrand"
                :label="item"
                :value="item"
                :key="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Rafts">
            <el-select v-model="form.rafts" placeholder="--- Choose one ---">
              <el-option
                v-for="item in rafts"
                :label="item"
                :value="item"
                :key="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Resolution">
            <el-input v-model="form.resolution"></el-input>
          </el-form-item>
          <el-form-item label="Filament Brand">
            <el-input v-model="form.brand"></el-input>
          </el-form-item>
          <el-form-item label="Filament Material">
            <el-input v-model="form.filamentMaterial"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Printer Model">
            <el-select v-model="form.printerModel" placeholder="Choose Model">
              <el-option
                v-for="item in printerModel"
                :label="item"
                :value="item"
                :key="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Supports">
            <el-select v-model="form.supports" placeholder="--- Choose one ---">
              <el-option
                v-for="item in supports"
                :label="item"
                :value="item"
                :key="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="infill">
            <el-input v-model="form.infill"></el-input>
          </el-form-item>
          <el-form-item label="Filament Color">
            <el-input v-model="form.filamentColor"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Misc Notes">
            <el-input type="textarea" v-model="form.miscNotes"></el-input>
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
  methods: {
    changePrinterBrand(printerBrand) {
      console.log("changePrinterBrand", printerBrand);
      if (printerBrand === "MakerBot") {
        this.printerModel = [
          "MakerBot Replicator",
          "MakerBot Replicator 2",
          "MakerBot Replicator (5th Generation)",
          "MakerBot Replicator Mini",
          "MakerBot Replicator 2X",
          "MakerBot Replicator Z18",
          "MakerBot Replicator Dual",
          "Thing-O-Matic",
          "Cupcake CNC",
          "MakerBot Replicator+",
          "MakerBot Replicator Mini+",
          "MakerBot METHOD",
          "MakerBot METHOD X",
          "MakerBot SKETCH,Sketch",
        ];
      }
    },
  },
  data() {
    return {
      form: {
        printerBrand: "",
        rafts: "",
        resolution: "",
        brand: "",
        filamentMaterial: "",
        printerModel: "",
        supports: "",
        infill: "",
        filamentColor: "",
        miscNotes: "",
      },
      rafts: ["Doesn't Matter", "Yes", "No"],
      supports: ["Doesn't Matter", "Yes", "No"],
      printerModel: [],
      printerBrand: [
        "MakerBot",
        "Afinia",
        "Airwolf 3D",
        "B9Creations",
        "CEL",
        "Deezmaker",
        "Deltaprintr",
        "Formlabs",
        "Hyrel 3D",
        "Leapfrog",
        "LulzBot",
        "MakerGear",
        "Printrbot",
        "RepRap",
        "Robo 3D",
        "SeeMeCNC",
        "Solidoodle",
        "Stratasys",
        "Tinkerine",
        "Type A Machines",
        "Ultimaker",
        "Up",
        "3D Systems",
        "Zortrax",
        "FlashForge",
        "BCN3D",
        "PowerSpec",
        "Prusa",
        "BoXZY",
        "Wanhao",
        "Rostock",
        "AutoDesk",
        "DAGOMA",
        "MK3",
        "XYZprinting",
        "TEVO",
        "Creality",
        "H800",
        "eMotion Tech",
        "Anycubic",
        "Monoprice",
        "Dremel Digilab",
        "Anet",
        "Sculpto",
        "Peopoly",
        "Tiertime",
        "Zonestar",
        "Dagoma",
        "Velleman",
        "Raise3D",
      ],
      isShow: false,
    };
  },
};
</script>
<style lang="scss">
.printSettings-container {
  background: #fff;
  padding: 10px;
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
