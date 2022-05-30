<template>
  <div style="background-color: #f2f2f2">
    <el-row style="padding: 15px">
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <img
          src="https://cdn.thingiverse.com/site/assets/edu-page-header.png"
          alt=""
          srcset=""
        />
      </el-col>
      <el-col
        :xs="24"
        :sm="{ span: 8, offset: 2 }"
        :md="{ span: 8, offset: 2 }"
        :lg="{ span: 8, offset: 2 }"
        :xl="{ span: 8, offset: 2 }"
      >
        <section style="padding: 15px; background-color: white">
          <p>
            Discover how to elevate STEM learning in the classroom with MakerBot
            Education.
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
                    <el-option value="Middle School"> Middle School </el-option>
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
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select> </el-form-item
              ></el-col>
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
            these communications at any time. For more details, please read our
            Privacy Policy
          </p>
        </section>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <p>Filter Lessons by Subject</p>
        <el-row>
          <!-- eslint-disable-next-line -->
          <div  v-for="item in filterBySubject">
            <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6">
              <filter-subject
                :subject="item"
                @setSubject="setSubject"
                @getUserLists="getUserLists"
              ></filter-subject>
            </el-col>
          </div>
        </el-row>
      </el-col>
      <el-col
        :xs="24"
        :sm="{ span: 8, offset: 2 }"
        :md="{ span: 8, offset: 2 }"
        :lg="{ span: 8, offset: 2 }"
        :xl="{ span: 8, offset: 2 }"
      >
        <p>Filter Lessons by Grade</p>
        <!-- eslint-disable-next-line -->
        <div v-for="item in filterByGrade">
          <el-col :xs="8" :sm="12" :md="12" :lg="12" :xl="12">
            <filter-grade
              :grade="item"
              @setGrade="setGrade"
              @getUserLists="getUserLists"
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
        <resource-card :user="item"></resource-card>
      </el-col>
    </el-row>
    <pagination
      @getUserLists="getUserLists"
      @setPagination="setPagination"
      :total="total"
    ></pagination>
  </div>
</template>
<script>
import ResourceCard from "./components/ResourceCard";
import FilterGrade from "./components/FilterGrade";
import FilterSubject from "./components/FilterSubject";
import Pagination from "./components/Pagination";
import { getUserList } from "@/api/user";
export default {
  /* eslint-disable */
    name: "Education",
    components: { ResourceCard, FilterSubject, FilterGrade, Pagination },
    data() {
      return {
          form: {
              email: "",
              regions: ""
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
           "Reset"
          ],
          filterByGrade: [
            "K-6",
            "7-12",
            "University",
            "Reset"
          ],
          user: {},
          currentPage: 1,
          pageSize: 10,
          subject: "Art",
          grade: "K-6",
          total: 0
      };
    },
    mounted() {
        getUserList({
          currentPage: 1,
          pageSize: 10,
          subject: "Art",
          grade: "K-6"
        }).then(res => {
            this.user = res.data.data
            this.total = res.data.length
        });
    },
    methods: {
        onSubmit() {
            console.log("onSubmit")
        },
        getUserLists() {
            getUserList({
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                subject: this.subject,
                grade: this.grade
            }).then(res => {
                console.log(res)
                this.user = res.data.data;
                this.total = res.data.length
            })
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
        }
    },
  };
  </script>
  
  <style scope>
  </style>
  