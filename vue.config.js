const packageDefinition = require("./package.json");
const country = "fr";
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const https = require("https");
const fs = require("fs");
const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
require(`dayjs/locale/${country}`);

dayjs.locale("fr");
dayjs.extend(localizedFormat);

console.group("Descarga de dias festivos");
function downloadHolydays(country, year) {
  console.group("Descargando", country, year);
  try {
    const hollydays = `src/data/${country}/holydays/${year}.json`;
    if (!fs.existsSync(hollydays)) {
      const request = https.get(
        `https://date.nager.at/api/v2/PublicHolidays/${year}/${country}`,
        function(response) {
          if (response.statusCode === 200) {
            let file = fs.createWriteStream(hollydays);
            response.pipe(file);
            console.info("Exitoso");
          }
          request.setTimeout(12000, function() {
            console.error("Fallido");
            request.abort();
          });
        }
      );
    } else console.info("Existente");
  } catch (err) {
    console.error(err, country, year);
  }
  console.groupEnd();
}
downloadHolydays(country, dayjs().year());
downloadHolydays(country, dayjs().year() + 1);
console.groupEnd();

const maxSize = 1024 * 1024 * 1024 * 1024 * 1024;

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

const developConfig = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "INTM - Ticket Client Dashboard";
      args[0].version = packageDefinition.version;
      args[0].build = dayjs().format("llll");
      return args;
    });
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
  ...(process.env.NODE_ENV === "production" ? productionConfig : developConfig)
};
