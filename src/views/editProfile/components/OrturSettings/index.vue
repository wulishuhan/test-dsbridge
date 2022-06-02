<template>
  <div class="container">
    <section class="edit-section">
      <div class="center-content">
        <h1>ABOUT YOU</h1>
        <el-form :label-position="'top'">
          <el-row>
            <el-col :span="11">
              <el-form-item label="Location">
                <el-input v-model="form.location"></el-input>
              </el-form-item>
              <el-form-item label="Design skill level">
                <el-select
                  placeholder="--- Choose Design Level ---"
                  v-model="form.designLevel"
                >
                  <el-option
                    v-for="item in designLevel"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="What 3D printer do you use?">
                <el-select
                  placeholder="What 3D printer are you using?"
                  v-model="form.using3DPrinter"
                  multiple
                >
                  <el-option
                    v-for="item in using3DPrinter"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-form-item label="Who are you?">
                <el-select
                  placeholder="--- Select up to 3 ---"
                  v-model="form.who"
                  multiple
                >
                  <el-option
                    v-for="item in who"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Design Tools Used">
                <el-select
                  placeholder="Select Programs"
                  v-model="form.designToolsUsed"
                  multiple
                >
                  <el-option
                    v-for="item in designToolsUsed"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="Industry">
                    <el-select
                      placeholder="Maker/Consumer"
                      v-model="form.industry"
                      @change="changeIndustry"
                    >
                      <el-option
                        v-for="item in industry"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Subindustry">
                    <el-select
                      placeholder="Personal Use/Consum"
                      v-model="form.subindustry"
                    >
                      <el-option
                        v-for="item in subindustry"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <bio :name="'Bio'" @changeBio="changeBio"></bio>
        </el-form>
      </div>
    </section>
    <section class="edit-section profile-section">
      <div class="center-content">
        <el-row>
          <el-col :span="12">
            <h1>COVER PHOTO & AVATAR</h1>
            <profile-card></profile-card>
          </el-col>
          <el-col :span="12">
            <h1>WEBSITE & SOCIAL MEDIA</h1>
            <el-form>
              <el-form-item label="Website:">
                <el-input v-model="form.website"></el-input>
              </el-form-item>
              <el-form-item label="PayPal.me username:">
                <el-input
                  placeholder="https://paypal.me/"
                  v-model="form.paypal"
                ></el-input>
              </el-form-item>
              <el-form-item label="Twitter:">
                <el-button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
                    />
                  </svg>
                  Sign in with Twitter
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="editor-section">
      <div class="center-content favorites-content">
        <h1>YOUR FAVORITES</h1>
        <h2>
          Select up to 6 of your favorite designs, collections or makes to share
          with visitors to your profile
        </h2>
        <el-row class="favorite-card-content">
          <el-col v-for="item in 6" :key="item" :span="8">
            <favorite-designs-card></favorite-designs-card>
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="edit-section">
      <div class="center-content edit-page">
        <el-row>
          <el-col :span="11">
            <h1>BROWSE SETTINGS</h1>
            <switch-card
              :text="'Use pagination instead of infinite scroll.'"
            ></switch-card>
            <switch-card :text="'Show NSFW content.'"></switch-card>
          </el-col>
          <el-col :span="11" :offset="2">
            <h1>DEFAULT LICENSE</h1>
            <h2>The default license for your newly uploaded things</h2>
            <el-select v-model="licenseValue">
              <el-option
                v-for="item in licenses"
                :key="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </section>
    <section class="edit-section">
      <div class="center-content email-me-content">
        <h1>EMAIL ME WHEN…</h1>
        <switch-card
          v-for="item in emailMeSwitchList"
          :key="item"
          :text="item"
        ></switch-card>
      </div>
    </section>
    <section class="edit-section">
      <div class="delete-account-content center-content">
        <h1>DELETE ACCOUNT</h1>
        <h2>This cannot be undone</h2>
        <el-button type="danger">DELETE USER</el-button>
      </div>
    </section>
  </div>
</template>
<script>
import Bio from "./components/Bio";
import SwitchCard from "./components/SwitchCard";
import FavoriteDesignsCard from "./components/FavoriteDesignsCard";
import ProfileCard from "../ProfileCard";
export default {
  name: "ThingiverseSettings",
  components: { Bio, FavoriteDesignsCard, SwitchCard, ProfileCard },
  props: {},
  data() {
    return {
      value: true,
      form: {
        designLevel: "",
        using3DPrinter: [],
        who: [],
        designToolsUsed: [],
        industry: "",
        subindustry: "",
        introduction: "",
        location: "",
        website: "",
        paypal: "https://paypal.me/",
      },
      emailMeSwitchList: [
        "Someone posts a new comment on something you designed.",
        "Someone posts a new comment on something you made.	",
        "Someone posts a new comment on a Group topic you started.	",
        "Someone creates a remixes from of one of your things.	",
        "Someone physically makes one of your things.	",
        "One of your things has been featured.	",
        "Someone sends you a new message.",
      ],
      licenseValue: "",
      licenses: [
        "Creative Commons - Attribution",
        "Creative Commons - Attribution - Share Alike",
        "Creative Commons - Attribution - No Derivatives",
        "Creative Commons - Attribution - Non-Commercial",
        "Creative Commons - Attribution - Non-Commercial - Share Alike",
        "Creative Commons - Attribution - Non-Commercial - No Derivatives",
        "Creative Commons - Public Domain Dedication",
        "GNU - GPL",
        "GNU - LGPL ",
        "BSD License",
      ],
      designLevel: ["Novice", "Intermediate", "Advanced"],
      using3DPrinter: [
        "Other",
        "MakerBot",
        "Afinia",
        " Airwolf 3D",
        "B9Creations",
        "CEL",
        "Deezmaker",
        "Deltaprintr",
        "Formlabs",
        "Hyrel 3D ",
        "Leapfrog",
        "LulzBot",
        "MakerGear",
        "Printrbot",
        "RepRap",
        " Robo 3D   ",
        "SeeMeCNC   ",
        "Solidoodle  ",
        "Stratasys    ",
        "Tinkerine     ",
        "Type A Machines",
        "Ultimaker",
        "Up       ",
        "3D Systems ",
        "Zortrax     ",
        "FlashForge   ",
        "BCN3D        ",
        "PowerSpec    ",
        "Prusa        ",
        "BoXZY       ",
        "Wanhao       ",
        "Rostock    ",
        "AutoDesk   ",
        "DAGOMA     ",
        "MK3        ",
        "XYZprinting ",
        "TEVO         ",
        "Creality     ",
        "H800         ",
        "eMotion Tech ",
        "Anycubic     ",
        "Monoprice    ",
        "Dremel Digilab",
        "Anet         ",
        "Sculpto      ",
        "Peopoly      ",
        "Tiertime    ",
        "Zonestar    ",
        "Dagoma      ",
        "Velleman    ",
        "Raise3D      ",
      ],
      who: [
        "Artist",
        "Designer",
        "Engineer",
        "Maker",
        "Professional",
        "Student",
        "Teacher",
      ],
      designToolsUsed: [
        "123D Catch",
        "123D Design",
        "3D Tin",
        "Blender",
        "Thingiverse Customizer",
        "Illustrator",
        "Inkscape",
        "Inventor",
        "Mathematica",
        "Maya",
        "MeshLab",
        "MeshMixer",
        "OpenSCAD",
        "Photoshop",
        "PrintShop",
        "Rhino",
        "Sculptris",
        "Sketchup",
        "Solidworks     ",
        "Tinkercad      ",
        "TopMod        ",
        "ZBrush    ",
        "FreeCAD     ",
        "Fusion 360    ",
        "Microsoft 3D Builder      ",
        "CATIA        ",
        "Autodesk 3ds Max    ",
        "Shapr3d     ",
        "Orchard    ",
        "Other",
      ],
      industry: ["Commercial/Professional", "Education", "Maker/Consumer"],
      subindustry: [],
    };
  },
  methods: {
    changeIndustry() {
      console.log("changeIndustry", this.form.industry);
      if (this.form.industry === "Commercial/Professional") {
        this.subindustry = [
          "Aerospace",
          "Architecture",
          "Arts and Entertainment",
          "Automotive",
          "Commercial/Industrial",
          "Consumer Electronics",
          "Consumer Goods",
          "Medical/Dental",
          "Other Professional",
          "Services/Consulting",
          "Machine Shops",
          "Military and Defense",
          "Research & Development",
        ];
      } else if (this.form.industry === "Education") {
        this.subindustry = [
          "Trade School/Vocational",
          "Elementary School",
          "High School",
          "Library/Makerspace",
          "Middle School",
          "Other Education",
          "University/College",
          "STEM Enrichment Organization",
          "Non-profit Organization",
          "District",
          "For profit business",
        ];
      } else {
        this.subindustry = ["Personal Use/Consumer"];
      }
    },
    changeBio(text) {
      this.form.introduction = text;
    },
    submitForm() {
      console.log(this.form);
    },
  },
};
</script>
<style lang="scss" scope>
.container {
  background-color: #f5f5f5;
}
.el-form {
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
.edit-section {
  padding: 40px 0 20px;
  overflow: hidden;
}
.profile-section {
  background-color: #ececec;
}
.center-content {
  margin: 0 auto;
  box-sizing: border-box;
  width: 970px;
}
.favorites-content {
  h2 {
    border-bottom: 1px solid #ccc;
    color: #666;
    font-size: 14px;
    padding-bottom: 20px;
  }
  .favorite-card-content {
    background: #fff;
  }
}
.edit-page {
  .el-row {
    .el-col {
      h2 {
        font-family: "AntennaLight", Helvetica, Arial, sans-serif;
        font-weight: normal;
        color: #666;
        font-size: 14px;
        margin-top: -15px;
      }
      h1 {
        color: #666;
      }
    }
  }
}
.email-me-content {
  h1 {
    border-bottom: solid 2px #ccc;
    padding-bottom: 20px;
  }
}
.delete-account-content {
  h2 {
    font-family: "AntennaLight", Helvetica, Arial, sans-serif;
    font-weight: normal;
    color: #666;
    font-size: 14px;
    margin-top: -15px;
    padding-bottom: 15px;
    border-bottom: solid 2px #ccc;
  }
}
</style>
