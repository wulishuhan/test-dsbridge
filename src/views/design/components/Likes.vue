<template>
  <div>
    <resource-card></resource-card>
  </div>
</template>
<script>
import ResourceCard from "@/components/ResourceCard.vue";
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
