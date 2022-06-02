<template>
  <div class="upload-container">
    <header class="upload-header">
      <div class="header">
        <h1 class="header-title">CREATING A NEW THING</h1>
        <router-link :to="'/'" class="cancel">CANCEL</router-link>
        <div>
          <el-button>SAVE & VIEW</el-button>
          <el-button type="primary" @click="publicThing"
            >PUBLISH THING</el-button
          >
        </div>
      </div>
    </header>
    <br />
    <div class="upload-content">
      <div class="upload-box">
        <el-upload
          class="elupload"
          :on-success="onFileSuccess"
          drag
          action="http://localhost:8080/user/receiveImg"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <p>DRAG YOUR FILES & PHOTOS HERE or CHOOSE FROM</p>
            <el-button type="primary" @click="computeUpload()"
              >MY COMPUTER
            </el-button>
            <el-button type="primary" @click.stop="dropboxUpload()">
              DROPBOX
            </el-button>
            <div class="el-upload__tip" slot="tip">
              <p>Be sure to read the Community Guidelines before submitting.</p>
              Supported 2D & 3D Files: STL, OBJ, THING, SCAD, JPG, TXT, and many
              more.
            </div>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="basic-information-content">
      <div class="basic-information-box box">
        <h1>Basic Information</h1>
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :label-position="'top'"
        >
          <el-row>
            <el-form-item>
              <el-col :span="12">
                <el-form-item label="Thing Name">
                  <el-input v-model="form.name"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Category">
                  <el-select
                    v-model="form.category"
                    placeholder="Please Choose"
                  >
                    <el-option-group
                      v-for="group in categorys"
                      :key="group.label"
                      :label="group.label"
                    >
                      <el-option
                        v-for="item in group.options"
                        :key="item"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item>
              <el-col :span="12">
                <el-form-item label="License">
                  <el-select v-model="form.license" placeholder="Please Choose">
                    <el-option
                      v-for="item in licenses"
                      :label="item"
                      :value="item"
                      :key="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Tags">
                  <el-input v-model="form.tag"> </el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-row>
          <el-form-item>
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="This is a Remix" name="type"></el-checkbox>
              <el-checkbox
                label="This is a Customizer"
                name="type"
              ></el-checkbox>
              <el-checkbox
                label="Submit to Thingiverse Education for Approval "
                name="type"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="edit-section">
      <div class="center-content box">
        <h1 class="section-h1">THING INFORMATION</h1>
        <p class="section-p">
          Share more information and instructions for your Thing
        </p>
        <information-content ref="informationContent"></information-content>
      </div>
    </div>
    <div class="tell-us-more">
      <div class="tell-us-more-content box">
        <h1 class="section-h1">TELL US MORE</h1>
        <p class="section-p">
          Increase discoverability by sharing more about your Thing
        </p>
        <el-form :label-position="'top'">
          <el-row>
            <el-col :span="12">
              <el-form-item class="checkbox">
                <input type="checkbox" id="cbox1" value="first_checkbox" />
                <label for="cbox1">This Thing is a Work-In-Progress</label>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="Share in My Groups (Requires Thing to be published)"
              >
                <el-select v-model="value" placeholder="Select Groups">
                  <el-option
                    v-for="item in groups"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Design Tools Used">
                <el-select
                  v-model="value"
                  multiple
                  placeholder="Select Programs"
                >
                  <el-option
                    v-for="item in designTools"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="thing-app">
      <div class="thing-app-content box">
        <h1 class="section-h1">THING APPS</h1>
        <p class="section-p">Manage App Permissions to Your Things</p>
        <div class="thing-apps">
          <h3>Thing Apps</h3>
          <el-input placeholder="Search for Apps" class="input-with-select">
            <el-button slot="prepend" icon="el-icon-search"></el-button>
          </el-input>
          <p>{{ appEnables.length }} Apps enabled for this Thing</p>
          <apps-enable-card
            v-for="item in appEnables"
            :name="item.name"
            :url="item.url"
            :author="item.author"
            :key="item.name"
          ></apps-enable-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InformationContent from "./components/InformationContent";
import AppsEnableCard from "./components/AppsEnableCard";
export default {
  // eslint-disable-next-line
  name: "upload",
  components: { InformationContent, AppsEnableCard },
  data() {
    return {
      form: {
        name: "",
        type: [],
        license: "",
        category: "",
        tag: "",
      },
      categorys: [
        {
          label: "3D Printing ",
          options: [
            "3D Printer Accessories    ",
            "3D Printer Extruders     ",
            "3D Printer Parts        ",
            "3D Printers            ",
            "3D Printing Tests      ",
          ],
        },

        {
          label: "Art             ",
          options: [
            "2D Art              ",
            "Art Tools            ",
            "Coins & Badges    ",
            "Interactive Art        ",
            "Math Art             ",
            "Scans & Replicas   ",
            "Sculptures             ",
            "Signs & Logos     ",
          ],
        },
        {
          label: "Fashion              ",
          options: [
            "Accessories          ",
            "Bracelets            ",
            "Costume             ",
            "Earrings            ",
            "Glasses              ",
            "Jewelry               ",
            "Keychains           ",
            "Rings    ",
          ],
        },
        {
          label: "Gadgets              ",
          options: [
            "Audio               ",
            "Camera              ",
            "Computer             ",
            "Mobile Phone         ",
            "Tablet               ",
            "Video Games   ",
          ],
        },
        {
          label: "Hobby             ",
          options: [
            "Automotive            ",
            "DIY               ",
            "Electronics         ",
            "Music              ",
            "R/C Vehicles         ",
            "Robotics              ",
            "Sport & Outdoors  ",
          ],
        },
        {
          label: "Household              ",
          options: [
            "Bathroom             ",
            "Containers            ",
            "Decor                ",
            "Household Supplies        ",
            "Kitchen & Dining      ",
            "Office               ",
            "Organization           ",
            "Outdoor & Garden     ",
            "Pets                ",
            "Replacement Parts   ",
          ],
        },
        {
          label: "Learning                ",
          options: [
            "Biology              ",
            "Engineering          ",
            "Math               ",
            "Physics & Astronomy    ",
          ],
        },
        {
          label: "Models              ",
          options: [
            "Animals              ",
            "Buildings & Structures     ",
            "Creatures           ",
            "Food & Drink        ",
            "Model Furniture        ",
            "Model Robots          ",
            "People               ",
            "Props                ",
            "Vehicles   ",
          ],
        },
        {
          label: "Tools               ",
          options: [
            "Hand Tools             ",
            "Parts               ",
            "Machine Tools             ",
            "Tool Holders & Boxes     ",
          ],
        },
        {
          label: "Toys & Games",
          options: [
            "Chess               ",
            "Construction Toys         ",
            "Dice                ",
            "Games                ",
            "Mechanical Toys            ",
            "Playsets               ",
            "Puzzles                ",
            "Toy & Game Accessories   ",
          ],
        },

        {
          label: "Other",
          options: ["Other"],
        },
      ],
      licenses: [
        "Creative Commons - Attribution",
        "Creative Commons - Attribution - Share Alike",
        "Creative Commons - Attribution - No Derivatives",
        "Creative Commons - Attribution - Non-Commercial",
        "Creative Commons - Attribution - Non-Commercial - Share Alike",
        "Creative Commons - Attribution - Non-Commercial - No Derivatives",
        "Creative Commons - Public Domain Dedication",
        "GNU - GPL",
        "GNU - LGPL",
        "BSD License",
      ],
      designTools: [
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
        "Solidworks",
        "Tinkercad",
        "TopMod",
        "ZBrush",
        "FreeCAD",
        "Fusion 360",
        "Microsoft 3D Builder",
        "CATIA",
        "Autodesk 3ds Max",
        "Shapr3d",
        "Orchard",
        "Other",
      ],
      groups: [],
      appEnables: [
        {
          url: "https://cdn.thingiverse.com/renders/ce/96/2a/78/ba/bc48f4232048053be71efddd58a1464e_thumb_tiny.jpg",
          name: "MakePrintable Thing App",
          author: "MixedDimensions",
        },
        {
          url: "https://cdn.thingiverse.com/renders/28/31/42/14/6c/2a4816a865281bdd135e770afd5c6507_thumb_tiny.jpg",
          name: "KiriMoto",
          author: "stewartallen",
        },
      ],
      value: "",
      apps: 0,
    };
  },
  methods: {
    computeUpload() {
      console.log("computeUpload");
    },
    dropboxUpload() {
      console.log("dropboxUpload");
    },
    onFileSuccess(res, file) {
      console.log("onFileSuccess", file);
    },
    publicThing() {
      console.log("public", this.form);
      console.log("public refs", this.$refs.informationContent);
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 970px;
  margin: 0 auto;
}
.section-h1 {
  font-family: "Antenna Bold", Helvetica, Arial, sans-serif;
  font-weight: normal;
  font-size: 24px;
  line-height: 1.25em;
  color: #666;
  text-transform: uppercase;
}
.section-p {
  font-family: "AntennaLight", Helvetica, Arial, sans-serif;
  font-weight: normal;
  color: #666;
  font-size: 14px;
  padding: 5px;
  border-bottom: solid 1px #ccc;
}
.upload-container {
  background-color: #f5f5f5;
  .upload-header {
    width: 100%;
    .header {
      width: 970px;
      height: 91px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      align-content: center;
    }
    .cancel {
      color: #409eff;
      text-decoration: none;
    }
  }
  .upload-content {
    .upload-box {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      .el-upload-dragger {
        width: 970px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
      }
      .el-upload__tip {
        border-top: 1px solid #ccc;
        padding-top: 15px;
        margin-top: 20px;
        font-weight: 200;
        font-size: 13px;
      }
    }
  }
  .basic-information-content {
    .basic-information-box {
      .el-input {
        width: 80%;
      }
      .el-select {
        width: 100%;
      }
      .el-form--label-top .el-form-item__label {
        padding: 0;
      }
    }
  }
  .edit-section {
    background-color: #ececec;
    width: 100%;
    .center-content {
    }
  }
  .tell-us-more {
    width: 100%;
    .tell-us-more-content {
      .el-checkbox__inner {
        width: 32px;
        height: 32px;
      }
    }
  }
  .thing-app {
    .thing-app-content {
      background-color: #ececec;
      .input-with-select {
        background: none;
      }
    }
  }
  .thing-apps {
    h3 {
      border-bottom: solid 1px #ccc;
    }
  }
}
.checkbox {
  color: #666;
  margin-top: 25px;
  #cbox1 {
    width: 32px;
    height: 32px;
    position: relative;
    top: 10px;
  }
}
</style>
