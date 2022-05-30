const { defineConfig } = require("@vue/cli-service");
const path = require('path');
const Mock = require('./mock/mock.js');
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Ortur Resource";
      return args;
    });
  },
  devServer: {
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      // devServer.app.get("/some/path", function (req, res) {
      //   res.json({ custom: "response" });
      // });
      Mock(devServer.app);
    },
  },
});
