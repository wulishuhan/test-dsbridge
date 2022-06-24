<template>
  <div style="background-color: #f2f2f2">
    <div class="content">
      <el-row class="content-img-form">
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <img
            src="https://cdn.thingiverse.com/site/assets/edu-page-header.png"
            alt="loding"
            class="education-img"
          />
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="{ span: 8, offset: 2 }"
          :lg="{ span: 8, offset: 2 }"
          :xl="{ span: 8, offset: 2 }"
        >
          <section class="education-form">
            <p>
              Discover how to elevate STEM learning in the classroom with
              MakerBot Education.
            </p>
            <el-form
              ref="form"
              :model="form"
              label-width="80px"
              :label-position="'top'"
            >
              <el-form-item label="Email Address:">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="Grade:">
                    <el-select v-model="form.region" placeholder="select...">
                      <el-option value="University/College">
                        University/College
                      </el-option>
                      <el-option value="High School"> High School </el-option>
                      <el-option value="Middle School">
                        Middle School
                      </el-option>
                      <el-option value="Elementary School">
                        Elementary School
                      </el-option>
                      <el-option value="Library/Makerspace">
                        Library/Makerspace
                      </el-option>
                      <el-option value="STEM Enrichment Organization">
                        STEM Enrichment Organization
                      </el-option>
                      <el-option value="Trade School/Vocational">
                        Trade School/Vocational
                      </el-option>
                      <el-option value="Non-profit Organization">
                        Non-profit Organization
                      </el-option>
                      <el-option value="District"> District </el-option>
                      <el-option value="For profit business">
                        For profit business
                      </el-option>
                      <el-option value="Other Education">
                        Other Education
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                  <el-form-item label="Country:">
                    <el-select v-model="form.region" placeholder="select...">
                      <el-option
                        v-for="item in country"
                        :key="item"
                        :value="item"
                        :label="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">
                  Sign Up For More Info
                </el-button>
              </el-form-item>
            </el-form>
            <p>
              The information submitted above will be used to send you
              communications from MakerBot (or MakerBot content providers) about
              MakerBot products, services, and sales. You can unsubscribe from
              these communications at any time. For more details, please read
              our Privacy Policy
            </p>
          </section>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <p>Filter Lessons by Subject</p>
          <el-row>
            <!-- eslint-disable-next-line -->
            <div v-for="item in filterBySubject">
              <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
                <filter-subject
                  :subject="item"
                  @setSubject="setSubject"
                  @getUserLists="getUsers"
                ></filter-subject>
              </el-col>
            </div>
          </el-row>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="{ span: 8, offset: 2 }"
          :lg="{ span: 8, offset: 2 }"
          :xl="{ span: 8, offset: 2 }"
        >
          <p>Filter Lessons by Grade</p>
          <div v-for="item in filterByGrade" :key="item">
            <el-col :xs="12" :sm="8" :md="12" :lg="12" :xl="12">
              <filter-grade
                :grade="item"
                @setGrade="setGrade"
                @getUserLists="getUsers"
              ></filter-grade>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col
          v-for="item in user"
          :key="item.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
        >
          <resource-card :thing="item"></resource-card>
        </el-col>
      </el-row>
      <pagination ref="educationPagination" @getData="getUsers"></pagination>
    </div>
  </div>
</template>
<script>
import ResourceCard from "@/components/ResourceCard";
import FilterGrade from "./components/FilterGrade";
import FilterSubject from "./components/FilterSubject";
import Pagination from "@/components/pagination";
import { getUserList } from "@/api/user";
export default {
  /* eslint-disable */
  name: "Education",
  components: { ResourceCard, FilterSubject, FilterGrade, Pagination },
  data() {
    return {
      form: {
        email: "",
        regions: "",
      },
      filterBySubject: [
        "Art",
        "Engineering",
        "Geography",
        "History",
        "Science",
        "Special Ed",
        "Technology",
        "Languages",
        "Math",
        "Reset",
      ],
      filterByGrade: ["K-6", "7-12", "University", "Reset"],
      country: [
        "United States",
        "Canada",
        "Afghanistan",
        "Aland Islands",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia, Plurinational State of",
        "Bonaire, Saint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Cape Verde",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands",
        "Colombia",
        "Comoros",
        "Congo, the Democratic Republic of the",
        "Cook Islands",
        "Costa Rica",
        "Cote d'Ivoire",
        "Croatia",
        "Curaçao",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands (Malvinas)",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (Vatican City State)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea, Republic of",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Macedonia, the former Yugoslav Republic of",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia",
        "Moldova, Republic of",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States Minor Outlying Islands",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela, Bolivarian Republic of",
        "Vietnam",
        "Virgin Islands, British",
        "Virgin Islands, U.S.",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
      user: {},
      currentPage: 1,
      pageSize: 10,
      subject: "Art",
      grade: "K-6",
      total: 0,
    };
  },
  mounted() {
    getUserList({
      currentPage: 1,
      pageSize: 10,
      subject: "Art",
      grade: "K-6",
    }).then((res) => {
      this.user = res.data.data;
      this.total = res.data.length;
      this.$refs.educationPagination.total = this.total;
    });
  },
  methods: {
    onSubmit() {
      console.log("onSubmit");
    },
    getUsers(pagination) {
      if (pagination) {
        this.currentPage = pagination.currentPage;
        this.pageSize = pagination.pageSize;
      }
      getUserList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        subject: this.subject,
        grade: this.grade,
      }).then((res) => {
        this.user = res.data.data;
        this.total = res.data.length;
        this.$refs.educationPagination.total = this.total;
        console.log(this.user);
      });
    },
    setSubject(subject) {
      this.subject = subject;
    },
    setGrade(grade) {
      this.grade = grade;
    },
    setPagination(currentPage, pageSize) {
      this.currentPage = currentPage;
      this.pageSize = pageSize;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 90%;
  margin: 0 auto;
}
.content-img-form {
  padding: 15px;
}
.education-form {
  padding: 15px;
  background-color: white;
}
.education-img {
  object-fit: contain;
  width: 100%;
}
@media screen and (max-width: 768px) {
  .content {
    width: 100%;
  }
}
</style>
