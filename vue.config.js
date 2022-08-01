const { defineConfig } = require("@vue/cli-service");
const mockServer = require("./mock/mock-server.js");
module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack: (config) => {
  //   config.plugin("html").tap((args) => {
  //     args[0].title = "Ortur Resource";
  //     return args;
  //   });
  // },
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
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
