<template>
  <div>
    <div class="resource_card">
      <el-row>
        <el-avatar :size="20" :src="user.avatar"></el-avatar>{{ user.name }}
      </el-row>

      <img :src="user.uploadImg" alt="" />
      <el-row>
        <el-col :span="16" style="padding: 15px">
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU4ICg4NDY2MykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+R3JvdXAgQ29weSA1PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSI+CiAgICAgICAgPGcgaWQ9InRoaW5nLXBhZ2Utd2l0aC1vdmVybGF5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTE2Mi4wMDAwMDAsIC0xNzUuMDAwMDAwKSIgc3Ryb2tlPSIjODY4Njg2Ij4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLUNvcHktNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE2My4wMDAwMDAsIDE3Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01LDAgTDUsMTAiIGlkPSJMaW5lLTItQ29weS0yIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNSwwLjMzMzMzMzMzMyBMNSw5LjY2NjY2NjY3IiBpZD0iTGluZS0yLUNvcHktMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS4wMDAwMDAsIDUuMDAwMDAwKSByb3RhdGUoLTI3MC4wMDAwMDApIHRyYW5zbGF0ZSgtNS4wMDAwMDAsIC01LjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
            alt=""
            srcset=""
          />
          <br />
          Collect Thing
        </el-col>
        <el-col :span="8" style="padding: 15px">
          <div>
            <img
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxN3B4IiB2aWV3Qm94PSIwIDAgMjAgMTciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU4ICg4NDY2MykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+UGFnZSAxIENvcHkgMTM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgIDxnIGlkPSJ0aGluZy1wYWdlLXdpdGgtb3ZlcmxheSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExNTguMDAwMDAwLCAtMjEzLjAwMDAwMCkiIHN0cm9rZT0iIzY2NjY2NiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMTc1LjUzMDUsMjE1LjI3MDQ3NyBMMTE3NS41MzA1LDIxNS4yNzA0NzcgQzExNzQuNjk4MSwyMTQuNDU3MDM0IDExNzMuNTY5NCwyMTQgMTE3Mi4zOTIyMSwyMTQgTDExNzIuMzIxNzksMjE0IEMxMTcwLjg4NDE5LDIxNCAxMTY5LjUwNjM3LDIxNC41NTc2NTkgMTE2OC40ODkyOCwyMTUuNTUwOTI5IEMxMTY4LjIxODksMjE1LjgxNTE1MiAxMTY3Ljc4MTEsMjE1LjgxNTE1MiAxMTY3LjUxMDcyLDIxNS41NTA5MjkgQzExNjYuNDkzNjMsMjE0LjU1NzY1OSAxMTY1LjExNTE1LDIxNCAxMTYzLjY3ODIxLDIxNCBMMTE2My42MDcxMiwyMTQgQzExNjIuNDI5OTMsMjE0IDExNjEuMzAxMjQsMjE0LjQ1NzAzNCAxMTYwLjQ2OTUsMjE1LjI3MDQ3NyBMMTE2MC40NjgxNywyMTUuMjcxMTI2IEMxMTU5LjUyODE0LDIxNi4xODk3MzggMTE1OSwyMTcuNDM2MTk1IDExNTksMjE4LjczNTIzNiBMMTE1OSwyMTguNzM2NTM1IEMxMTU5LDIyMC4wMzU1NzYgMTE1OS41MjgxNCwyMjEuMjgxMzgzIDExNjAuNDY3NSwyMjIuMTk5OTk2IEwxMTY3LjAyMDQ1LDIyOC42MDM2NjYgQzExNjcuNTYxODcsMjI5LjEzMjExMSAxMTY4LjQzODEzLDIyOS4xMzIxMTEgMTE2OC45Nzk1NSwyMjguNjAzNjY2IEwxMTc1LjUzMTgzLDIyMi4xOTk5OTYgQzExNzYuNDcxODYsMjIxLjI4MTM4MyAxMTc3LDIyMC4wMzU1NzYgMTE3NywyMTguNzM2NTM1IEMxMTc3LDIxNy40MzYxOTUgMTE3Ni40NzExOSwyMTYuMTg5NzM4IDExNzUuNTMwNSwyMTUuMjcwNDc3IFoiIGlkPSJQYWdlLTEtQ29weS0xMyI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
              alt=""
              srcset=""
            />
            {{ user.like }}
          </div>
          <div>
            <img
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTUgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlc2M+Q3JlYXRlZCB3aXRoIEx1bmFjeTwvZGVzYz4KICA8ZyBpZD0iUGFnZS0xLUNvcHktMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC41IDAuNSkiPgogICAgPHBhdGggZD0iTTEzLjE1NjggMEwxMy4xNTY4IDYuNzQ3NzlMMCA2Ljc0Nzc5TDAgMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA1KSIgaWQ9IlN0cm9rZS0xIiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjY2NjYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPgogICAgPHBhdGggZD0iTTAgNi42ODEyTDAgMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi41IDEpIiBpZD0iU3Ryb2tlLTMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY2NjY2NiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+CiAgICA8cGF0aCBkPSJNMCAzLjYyMTEyTDMuNjIxMTIgMEw3LjIyNDk0IDMuNjA0MzQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgLTYuNDM5Mjk0RS0xNSkiIGlkPSJTdHJva2UtNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2NjY2IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KICA8L2c+Cjwvc3ZnPg=="
              alt=""
              srcset=""
            />
            Share
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "ResourceCard",
  props: {
    user: {
      type: Object,
      default: function () {
        return {
          name: "Red-Eyed Crocodile Skink - Articulated - Re",
          avatar:
            "https://cdn.thingiverse.com/renders/6a/52/f6/58/c6/a9c90eaf75b82c1f3fec42ac55fdc88b_thumb_medium.jpg",
          uploadImg:
            "https://cdn.thingiverse.com/assets/11/e9/ac/64/3f/card_preview_Fusion2.jpg",
          like: 2047,
        };
      },
    },
  },
};
</script>
<style scope>
.resource_card {
  width: 300px;
  margin: 0 auto;
  margin-top: 15px;
  text-align: center;
  background-color: white;
}
</style>
