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
                :label="item.brand"
                :value="item.brand"
                :key="item.brand"
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
  watch: {
    form: {
      handler(newVal) {
        this.$store.commit("upload/SET_UPLOADFORM", newVal);
      },
      deep: true,
    },
  },
  methods: {
    changePrinterBrand(printerBrand) {
      for (const iterator of this.printerBrand) {
        if (printerBrand === iterator.brand) {
          this.printerModel = iterator.model;
          break;
        }
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
        {
          brand: "MakerBot",
          model: [
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
          ],
        },
        { brand: "Afinia", model: ["AFNIA H480", "AFNIA H800", "AFNIA H400"] },
        {
          brand: "Airwolf 3D",
          model: [
            "AW3D HD",
            "AW3D XL",
            "AW3D V5",
            "Axiom Dual",
            "Axiom Single",
            "Axiom 20",
            "EVO",
            "EVO-22",
          ],
        },
        { brand: "B9Creations", model: ["B9Creator"] },
        { brand: "CEL", model: ["Robox", "CEL Robox"] },
        { brand: "Deezmaker", model: ["Bukito", "Bukobot V2"] },
        {
          brand: "Deltaprintr",
          model: ["Deltaprintr Kit", "Deltaprintr Assembled"],
        },
        { brand: "Formlabs", model: ["Formlabs Form 1", "Formlabs Form 2"] },
        {
          brand: "Hyrel 3D",
          model: [
            "Tinkerer",
            "Hobbyist",
            "Apprentice",
            "Journeyman",
            "Professional",
          ],
        },
        { brand: "Leapfrog", model: ["Creatr", "Creatr XL", "Xeed"] },
        {
          brand: "LulzBot",
          model: [
            "TAZ 3",
            "LulzBot Clonedel Repstrap",
            "Prusa 1.0",
            "Prusa 2.0",
            "AO-100",
            "AO-101",
            "TAZ 1",
            "TAZ 2",
            "TAZ 4",
            "TAZ 5",
            "Mini",
            "TAZ 6",
            "Mini 2",
            "TAZ Workhorse",
            "TAZ Pro",
          ],
        },
        { brand: "MakerGear", model: ["MakerGear M2"] },
        {
          brand: "Printrbot",
          model: [
            "Printrbot Plus",
            "Simple Black",
            "Simple Red",
            "Simple White",
            "Simple Silver",
            "Printrbot Go V2",
            "Printrbot Simple Metal",
            "Play",
            "Model 3 Kit",
          ],
        },
        {
          brand: "RepRap",
          model: ["RepRap Ord Bot Hadron", "RepRap Kossel", "RepRap Kossel XL"],
        },
        {
          brand: "Robo 3D",
          model: ["R1 PLA Model", "R1 ABS + PLA Model", "C2 R2"],
        },
        {
          brand: "SeeMeCNC",
          model: [
            "ORION Delta 3D Printer",
            "Rostock MAX BYOE",
            "Rostock MAX BYOL",
            "Rostock MAX",
            "Rostock MAX v2",
            "Rostock MAX v3",
            "Artemis 300 ARP",
            "Eris",
            "Rostock Max v3.2",
          ],
        },
        {
          brand: "Solidoodle",
          model: [
            "Solidoodle 2 - Base",
            "Solidoodle 2 - Pro",
            "Solidoodle 2 - Expert",
            "Solidoodle 3",
            "Solidoodle 4",
            "Workbench",
            "Workbench Apprentice",
            "Press",
          ],
        },
        {
          brand: "Stratasys",
          model: [
            "Mojo",
            "uPrint SE",
            "uPrint SE Plus",
            "Fortus 400mc",
            "Dimension SST 1200es",
            "Connex3 Objet260",
            "F170",
            "F270",
            "F370",
            "Objet Eden260VS",
            "Objet30 Prime",
            "Objet30 PRO",
            "Fortus 250mc",
            "J750",
            "F120",
          ],
        },
        { brand: "Tinkerine", model: ["Litto", "Ditto +", "Ditto Pro"] },
        {
          brand: "Type A Machines",
          model: [
            "Type A Machines 2014 Series 1",
            "Type A Machines 2015 Series 1",
          ],
        },
        {
          brand: "Ultimaker",
          model: [
            "Ultimaker Original",
            "Ultimaker 2",
            "Ultimaker",
            "Ultimaker 3",
            "Ultimaker 2 Extended",
            "Ultimaker 3 Extended",
            "S5",
          ],
        },
        { brand: "Up", model: ["Up Mini", "Up Plus", "Up Plus2"] },
        {
          brand: "3D Systems",
          model: [
            "CubePro",
            "Cube 3",
            "Cube",
            "Cube X",
            "ProJet 1000",
            "ProJet 1500",
            "ProJet 160",
            "ProJet 260",
          ],
        },
        {
          brand: "Zortrax",
          model: [">M200", "M200 Plus", "M300", "Inventure"],
        },
        {
          brand: "FlashForge",
          model: [
            "Creator Pro",
            "Finder",
            "Dreamer",
            "Inventor",
            "Inventor II",
            "Guider II",
            "Hunter",
            "Adventurer 3",
          ],
        },
        { brand: "BCN3D", model: ["BCN3D SIGMA", "BCN3D+"] },
        {
          brand: "PowerSpec",
          model: ["PowerSpec 3D Pro", "Duplicator I3 PLUS", "Ultra 3D"],
        },
        {
          brand: "Prusa",
          model: [
            "Prusa Steel",
            "Prusa Mk1",
            "Prusa Mk2",
            "Prusa Clone",
            "i3 MK2S",
            "i3 MK2 MMU",
            "i3 MK3",
            "i3 MK2.5",
            "i3 MK3 MMU 2",
            "I3 MK3S",
            "Mk2.5s",
            "MMU2s",
          ],
        },
        { brand: "BoXZY", model: ["BoXZY"] },
        {
          brand: "Wanhao",
          model: [
            "Wanhao Duplicator i3 V2",
            "Wanhao Duplicator i3 Plus",
            "Duplicator 6",
            "Duplicator 4S",
            "Duplicator 4",
            "Duplicator 4X",
            "Duplicator 5",
            "Duplicator 5s",
            "Wanhao Duplicator i3 V1",
            "i3 Mini",
            "D7",
            "Duplicator9",
          ],
        },
        { brand: "Rostock", model: ["Rostock MAX V2"] },
        { brand: "AutoDesk", model: ["Fusion 360"] },
        { brand: "DAGOMA", model: ["Neva", "Discoeasy 200"] },
        { brand: "MK3", model: ["Prusa i3"] },
        {
          brand: "XYZprinting",
          model: [
            "da Vinci Color",
            "da Vinci Jr. 2.0 Mix",
            "Nobel 1.0A",
            "da Vinci miniMaker",
            "da Vinci 1.0 Pro 3in1",
            "da Vinci Jr. 1.0 Pro",
            "da Vinci nano",
            "da Vinci mini w",
          ],
        },
        {
          brand: "TEVO",
          model: [
            "Tornado",
            "Delta (Little Monster)",
            "Tarantula",
            "Black Widow",
            "Michelangelo",
            "Flash",
            "Nereus",
          ],
        },
        {
          brand: "Creality",
          model: [
            "CR-10",
            "CR-10S",
            "CR-10 Mini",
            "Ender 2",
            "Ender 4",
            "Ender 3",
            "CR-X",
            "LD-001",
            "CR-20",
            "Ender 5",
            "CR10S PRO",
            "Ender 3 Pro",
            "CR-10 MAX",
          ],
        },
        { brand: "H800", model: ["Afinia"] },
        {
          brand: "eMotion Tech",
          model: [
            "MicroDelta Rework",
            "MicroDelta Original",
            "i3 Metal Motion",
            "Prusa i3 Rework 1.5",
          ],
        },
        {
          brand: "Anycubic",
          model: [
            "Photon",
            "Large Size Chiron",
            "All-metal Mega",
            "Semi-closed 4Max",
            "Kossel",
            "Predator",
          ],
        },
        {
          brand: "Monoprice",
          model: [
            "Maker Select Plus",
            "Select Mini",
            "Maker Select",
            "Maker Ultimate",
            "Mini Delta",
            "Voxel",
          ],
        },
        {
          brand: "Dremel Digilab",
          model: ["3D45", "3D40", "3D40-EDU", "3D20"],
        },
        {
          brand: "Anet",
          model: ["A4", "A3", "A6", "A8", "N3", "E2", "E10", "E12"],
        },
        { brand: "Sculpto", model: ["Sculpto", "Sculpto+"] },
        { brand: "Peopoly", model: ["MOAI"] },
        { brand: "Tiertime", model: ["Up300"] },
        {
          brand: "Zonestar",
          model: ["P802C", "ZF5", "ZF5M", "Z6", "Z10M2", "Z5M2"],
        },
        { brand: "Dagoma", model: ["Neva", "Discoeasy 200"] },
        { brand: "Velleman", model: ["K8400", "K8200", "K8800", "K8600"] },
        { brand: "Raise3D", model: ["N2", "N2+", "Pro2", "Pro2+"] },
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
