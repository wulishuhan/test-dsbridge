<template>
  <div>
    <el-row>
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        v-for="item in users"
        :key="item.thingName"
      >
        <resource-card :user="item" :avatar="avatar"></resource-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ResourceCard from "./ResouceCard";
import { getUserInfoByUserId } from "@/api/user";
export default {
  // eslint-disable-next-line
  name: "Designs",
  components: { ResourceCard },
  data() {
    return {
      users: [],
      avatar: "",
    };
  },
  mounted() {
    getUserInfoByUserId({ id: 1 }).then((res) => {
      this.users = res.data.data.design;
      this.avatar = res.data.data.avatar;
    });
  },
};
</script>
<style lang="scss"></style>
