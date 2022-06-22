<template>
  <div>
    <el-select
      v-model="selectPopular"
      placeholder="select popular"
      @change="handleChange"
    >
      <el-option
        v-for="item in popularFilter"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "PopularFilter",
  data() {
    return {
      popularFilter: [
        {
          value: "7",
          label: "Popular Last 7 Days",
        },
        {
          value: "30",
          label: "Popular Last 30 Days",
        },
        {
          value: "365",
          label: "Popular This Year",
        },
        {
          value: "1",
          label: "Popular ALL Time",
        },
        {
          value: "0",
          label: "Newest",
        },
        {
          value: "-1",
          label: "Most Makes",
        },
      ],
      selectPopular: "",
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
      this.$emit("setFilter", val);
    },
  },
};
</script>
