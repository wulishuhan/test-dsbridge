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
        <resource-card :thing="item"></resource-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ResourceCard from "@/components/ResourceCard";
import { ByUserId } from "@/api/user";
export default {
  // eslint-disable-next-line
  name: "Likes",
  components: { ResourceCard },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    ByUserId({ id: this.$route.params.userId }).then((res) => {
      this.users = res.data.data.likes;
      for (let i = 0; i < this.users.length; i++)
        this.users[i].avatar = res.data.data.avatar;
    });
  },
};
</script>
<style lang="scss"></style>
