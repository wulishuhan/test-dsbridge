<template>
  <div>
    <resource-card></resource-card>
  </div>
</template>
<script>
import ResourceCard from "./ResouceCard";
import { getUserList } from "@/api/user";
export default {
  // eslint-disable-next-line
  name: "Likes",
  components: { ResourceCard },
  mounted() {
    getUserList({
      currentPage: 1,
      pageSize: 10,
    }).then((res) => {
      console.log(res.data.data);
    });
  },
};
</script>
<style lang="scss"></style>
