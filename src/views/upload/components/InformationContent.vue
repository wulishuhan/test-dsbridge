<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div>
          <h5>Add Basic Information Modules</h5>
          <filter-box
            v-for="item in infomationModules"
            :name="item.value"
            :key="item.key"
            style="margin-top: 5px"
          ></filter-box>
        </div>
        <div>
          <h5>Add EDU Instructions</h5>
          <div class="edu-container">
            <div class="edu-title" @click="eduCollapse">
              This is an Education Project
            </div>
            <div class="education-list" v-if="isCollapse">
              <filter-box
                v-for="item in educationInstructions"
                :name="item.value"
                :key="item.key"
              ></filter-box>
            </div>
          </div>
        </div>
        <div class="add-other-details">
          <h5>Add Other Details</h5>
          <filter-box
            :name="'Custom Section'"
            @addCustomSection="addCustomSection"
          ></filter-box>
        </div>
      </el-col>
      <el-col :span="16" id="right-container">
        <information-card :name="'Summary'" :isSummary="true">
        </information-card>
        <information-card
          v-for="item in [...infomationModules, ...educationInstructions]"
          :key="item.key"
          :name="item.value"
          ref="informationCard"
        >
        </information-card>
        <information-card
          v-for="item in customSections"
          :key="item.key"
          :name="item.value"
          :id="item.id"
          @closeCustomSection="closeCustomSection"
        >
        </information-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import FilterBox from "./FilterBox";
import InformationCard from "./InformationCard";
export default {
  // eslint-disable-next-line
  name: "InformationContent",
  components: { FilterBox, InformationCard },
  data() {
    return {
      infomationModules: [
        {
          value: "Print Setting",
          key: Math.random(),
        },
        {
          value: "Post-Printing",
          key: Math.random(),
        },
        {
          value: "How I Designed This",
          key: Math.random(),
        },
      ],
      educationInstructions: [
        {
          value: "Grade",
          key: Math.random(),
        },
        {
          value: "Subject",
          key: new Date().getTime(),
        },
        {
          value: "Standards",
          key: Math.random(),
        },
        {
          value: "Overview and Background",
          key: Math.random(),
        },
        {
          value: "Lesson Plan and Activity",
          key: Math.random(),
        },
        {
          value: "Materials Needed",
          key: Math.random(),
        },
        {
          value: "Skills Learned",
          key: Math.random(),
        },
        {
          value: "Duration of Lesson",
          key: Math.random(),
        },
        {
          value: "Preparation",
          key: Math.random(),
        },
        {
          value: "Handouts and Assets",
          key: Math.random(),
        },
        {
          value: "Rubric and Assessment",
          key: Math.random(),
        },
        {
          value: "References",
          key: Math.random(),
        },
      ],
      isCollapse: false,
      printSettings: false,
      filterBoxSelector: false,
      customSections: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    eduCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    addCustomSection() {
      this.customSections.push({
        value: "Custom Section",
        key: Math.random(),
        id: Math.random(),
      });
    },
    closeCustomSection(id) {
      this.customSections = this.customSections.filter((k) => {
        return k.id !== id;
      });
    },
  },
};
</script>
<style>
.edu-title {
  width: 280px;
  height: 35px;
  color: #888;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
