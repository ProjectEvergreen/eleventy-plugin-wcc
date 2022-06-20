const path = require('path');
const { pathToFileURL } = require('url');
const wccPlugin = require('./src/index');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(wccPlugin, {
    dependencies: [
      pathToFileURL(path.join(__dirname, './demo/components/greeting.js'))
    ]
  });

  return {
    dir: {
      input: './demo'
    }
  }
};