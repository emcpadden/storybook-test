const path = require("path");

module.exports = function({ config }) {
  config.module.rules.push({
    test: /\.stories\.ts?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {
          parser: 'typescript'
        }
      }
    ],
    enforce: 'pre',
    include: [path.resolve(__dirname, '../src')],
  });

  return config;
};