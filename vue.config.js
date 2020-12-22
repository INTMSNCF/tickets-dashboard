const packageDefinition = require("./package.json");

const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
require("dayjs/locale/fr");

dayjs.locale("fr");
dayjs.extend(localizedFormat);

const productionConfig = {
  productionSourceMap: false,
  publicPath: "",
  lintOnSave: true,
  filenameHashing: false,
  css: {
    extract: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          // Custom common chunk
          bundle: {
            name: "bundle",
            chunks: "all",
            minChunks: 1,
            reuseExistingChunk: false
          }
        }
      }
    },
    plugins: [
      new ScriptExtHtmlWebpackPlugin({
        inline: /\.js$/
      })
    ]
  },
  chainWebpack: config => {
    config.plugins.store.delete("prefetch");
    config.plugins.store.delete("preload");
    config.plugin("html").tap(args => {
      args[0].title = "INTM - Ticket Client Dashboard";
      args[0].version = packageDefinition.version;
      args[0].build = dayjs().format("llll");
      return args;
    });
    const maxSize = 1024 * 1024 * 1024 * 1024 * 1024;
    config.module
      .rule("fonts")
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: maxSize,
        encoding: "base64"
      })
      .end();
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: maxSize,
        encoding: "base64"
      })
      .end();
  }
};

module.exports = {
  transpileDependencies: ["vuetify"],
  ...productionConfig
};
