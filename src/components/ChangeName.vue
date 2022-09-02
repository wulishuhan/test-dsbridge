<template>
  <div>
    <el-dialog
      width="396px"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :title="$t('setting.changeName')"
    >
      <div>
        <el-form :model="registerForm" ref="registerForm">
          <el-form-item prop="currentPassword">
            <el-input
              v-model="registerForm.Name"
              autocomplete="off"
              :placeholder="$t('setting.newName')"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <div class="submit">
              <div></div>
              <el-button @click="changePassword('registerForm')">{{
                $t("setting.submit")
              }}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <el-dialog width="396px" :visible.sync="innerVisible" append-to-body>
        <div class="loading-box" v-loading="loading"></div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dialogVisible: function () {
      return this.visible;
    },
  },
  data() {
    return {
      registerForm: {
        Name: "",
      },
      innerVisible: false,
      loading: true,
    };
  },
  methods: {
    handleEnter() {
      this.login("loginForm");
    },

    changePassword() {
      console.log(this.registerForm);
      debugger;
      this.$store
        .dispatch("user/register", {
          auto_login: true,
          client_subtype: "Windows",
          client_type: "pc",
          ...this.registerForm,
        })
        .then((res) => {
          if (res.code == 0) {
            this.handleClose();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleClose() {
      this.$emit("handleClose");
    },
  },
};
</script>
<style scoped>
.submit {
  display: flex;
  justify-content: space-between;
}
.forget {
}

.loading-box {
  width: 100%;
  height: 198px;
}
.login-text-nav {
  display: flex;
  flex-direction: column;
}

.el-button {
  background: #1e78f0;
  color: #fff;
  font-size: 18px;
  font-weight: 200;
  border-radius: 5px;
}
::v-deep .el-input__inner {
  height: 48px;
  width: 312px;
  font-size: 18px;
  font-weight: 200;
}
::v-deep .el-dialog {
  border-radius: 15px;
  font-weight: 400;
  font-family: Source Han Sans CN;
}
.login-text {
  font-size: 15px;
  color: #000;
  text-align: center;
}

.el-form-item {
  margin-bottom: 18px;
}
.el-form-item__content {
  line-height: 36px;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: #1e78f0;
}
::v-deep .el-form {
  width: 312px;
  margin: 0 auto;
}
::v-deep .el-dialog__headerbtn .el-dialog__close {
  font-size: 11px;
  color: #000;
  border-radius: 15px;
}
::v-deep .el-form-item__error {
  margin-top: 5px;
  position: relative;
}
</style>
