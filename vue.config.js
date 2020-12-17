const packageDefinition = require('./package.json');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
require('dayjs/locale/fr');

dayjs.locale('fr');
dayjs.extend(localizedFormat);

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title = "INTM - Ticket Client Dashboard";
          args[0].version = packageDefinition.version;
          args[0].build = dayjs().format('llll');
          return args;
        })
  }
}
