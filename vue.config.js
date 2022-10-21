const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "@/style/app-style.less";`,
          },
        },
      },
    },
  },
  devServer: {
    // setupMiddlewares: (middlewares, devServer) => {
    //   if (!devServer) {
    //     throw new Error("webpack-dev-server is not defined");
    //   }
    //   // Mock(devServer.app);
    //   mockServer(devServer.app);
    //   return middlewares;
    // },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: "https://api.leadiffer.cn",
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
});
