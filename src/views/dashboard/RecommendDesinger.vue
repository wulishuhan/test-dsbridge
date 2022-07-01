<template>
  <div class="container">
    <IndexDesignerList :designerList="designerList"></IndexDesignerList>
  </div>
</template>

<script>
import IndexDesignerList from "./components/IndexDesignerList.vue";
import { getDesignerList } from "@/api/dashboard";
export default {
  data() {
    return {
      designerList: [],
    };
  },
  components: {
    IndexDesignerList,
  },
  mounted() {
    this.getDesignerList();
  },
  methods: {
    getDesignerList() {
      getDesignerList({}).then((res) => {
        this.designerList = res.data.data;
        // debugger;
      });
    },
  },
};
</script>

<style></style>
<style lang="scss" scoped>
.container {
  color: #777;
  width: 50%;
  margin: 0 auto;
}
</style>
