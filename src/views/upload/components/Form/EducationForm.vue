<template>
  <div v-if="isShow" class="education-form-container">
    <div v-if="['Subject', 'Grade', 'Standards'].includes(name)">
      <el-select v-model="value" :placeholder="placeholder" style="width: 80%">
        <el-option
          v-for="item in showList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div v-if="'Skills Learned' === name">
      <span>Enter each skill and press enter to add it as a tagged skill</span>
      <el-input placeholder="Choose Skills"></el-input>
    </div>
    <div v-if="'Duration of Lesson' === name">
      <el-input placeholder="Enter a value"></el-input>
    </div>
    <div v-if="'Handouts and Assets' === name">
      <span>
        Upload any files, docs, etc. They will be found under the Files tab on
        the Thing Page.
      </span>
      <br />
      <!-- 这个action地址需要修改 -->
      <el-upload
        class="upload-demo"
        action="http://localhost:8080/user/receiveImg"
        multiple
        :on-success="handelSuccess"
        style="text-align: center"
      >
        <el-button type="primary">BROWSE</el-button>
      </el-upload>
    </div>
  </div>
</template>
<script>
export default {
  name: "EducationForm",
  components: {},
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  mounted() {
    if (this.nameList.includes(this.name)) this.isShow = true;
    if (this.name === "Grade") {
      this.showList = this.gradeList;
      this.placeholder =
        "Choose a range, help teachers see if this is a fit for their class";
    } else if (this.name === "Subject") {
      this.showList = this.subjectList;
      this.placeholder = "Choose a Subject, Make your project more findable";
    } else {
      this.showList = this.standardsList;
      this.placeholder = "Choose a Requirement this lesson meets";
    }
  },
  methods: {
    handelSuccess(res, file) {
      console.log(res, file);
    },
  },
  data() {
    return {
      isShow: false,
      nameList: [
        "Grade",
        "Subject",
        "Standards",
        "Skills Learned",
        "Duration of Lesson",
        "Handouts and Assets",
      ],
      gradeList: [
        {
          value: "Kindergarten",
          label: "Kindergarten",
        },
        {
          value: "1st Grade",
          label: "1st Grade",
        },
        {
          value: "2nd Grade",
          label: "2nd Grade",
        },
        {
          value: "3rd Grade",
          label: "3rd Grade",
        },
        {
          value: "4th Grade",
          label: "4th Grade",
        },
        {
          value: "5th Grade",
          label: "5th Grade",
        },
        {
          value: "6th Grade",
          label: "6th Grade",
        },
        {
          value: "7th Grade",
          label: "7th Grade",
        },
        {
          value: "8th Grade",
          label: "8th Grade",
        },
        {
          value: "9th Grade",
          label: "9th Grade",
        },
        {
          value: "10th Grade",
          label: "10th Grade",
        },
        {
          value: "11th Grade",
          label: "11th Grade",
        },
        {
          value: "12th Grade",
          label: "12th Grade",
        },
        {
          value: "Higher Education",
          label: "Higher Education",
        },
      ],
      subjectList: [
        {
          value: "Science",
          label: "Science",
        },
        {
          value: "Math",
          label: "Math",
        },
        {
          value: "Engineering",
          label: "Engineering",
        },
        {
          value: "History",
          label: "History",
        },
        {
          value: "Geography",
          label: "Geography",
        },
        {
          value: "Art",
          label: "Art",
        },
        {
          value: "Languages",
          label: "Languages",
        },
        {
          value: "Music",
          label: "Music",
        },
        {
          value: "Technology",
          label: "Technology",
        },
        {
          value: "Special Ed",
          label: "Special Ed",
        },
      ],
      standardsList: [
        {
          value: "NGSS",
          label: "NGSS",
        },
        {
          value: "CCSS",
          label: "CCSS",
        },
      ],
      value: "",
      showList: [],
      placeholder: "",
    };
  },
};
</script>
<style lang="scss">
.education-form-container {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  background-color: #fff;
}
.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
</style>
