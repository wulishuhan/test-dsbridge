<template>
  <div>
    <el-cascader
      v-model="typeSelect"
      :options="typeFilter"
      :props="{ expandTrigger: 'hover' }"
      @change="handleChange"
      placeholder="select type"
    ></el-cascader>
  </div>
</template>
<script>
import { getTypeFilter } from "@/api/filter.js";
export default {
  name: "TypeFilter",
  data() {
    return {
      typeSelect: [],
      typeFilter: [
        {
          value: "3D printing",
          label: "3D printing",
          children: [
            {
              value: "3D printer Accessories",
              label: "3D printer Accessories",
            },
            {
              value: "3D printer Extruders",
              label: "3D printer Extruders",
            },
            {
              value: "3D printer Parts",
              label: "3D printer Parts",
            },
            {
              value: "3D printers",
              label: "3D printers",
            },
            {
              value: "3D printing Tests",
              label: "3D printing Tests",
            },
          ],
        },
        {
          label: "Art",
          value: "Art",
          children: [
            {
              label: "2D Art",
              value: "2D Art",
            },
            {
              label: "Art Tools",
              value: "Art Tools",
            },
            {
              label: "Coins & Badges",
              value: "Coins & Badges",
            },
            {
              label: "Interactive Art",
              value: "Interactive Art",
            },
            {
              label: "Math Art",
              value: "Math Art",
            },
            {
              label: "Scans & Replicas",
              value: "Scans & Replicas",
            },
            {
              label: "Sculptures",
              value: "Sculptures",
            },
            {
              label: "Signs & Logos",
              value: "Signs & Logos",
            },
          ],
        },
        {
          label: "Fashion",
          value: "Fashion",
          children: [
            {
              label: "Accessories",
              value: "Accessories",
            },
            {
              label: "Bracelets",
              value: "Bracelets",
            },
            {
              label: "Costume",
              value: "Costume",
            },
            {
              label: "Earrings",
              value: "Earrings",
            },
            {
              label: "Glasses",
              value: "Glasses",
            },
            {
              label: "Jewelry",
              value: "Jewelry",
            },
            {
              label: "Keychains",
              value: "Keychains",
            },
            {
              label: "Rings",
              value: "Rings",
            },
          ],
        },
        {
          label: "Gadgets",
          value: "Gadgets",
          children: [
            {
              label: "Audio",
              value: "Audio",
            },
            {
              label: "Camera",
              value: "Camera",
            },
            {
              label: "Computer",
              value: "Computer",
            },
            {
              label: "Mobile Phone",
              value: "Mobile Phone",
            },
            {
              label: "Tablet",
              value: "Tablet",
            },
            {
              label: "Video Games",
              value: "Video Games",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
  mounted() {
    getTypeFilter().then((res) => {
      this.typeFilter = res.data.data.list;
    });
  },
};
</script>
