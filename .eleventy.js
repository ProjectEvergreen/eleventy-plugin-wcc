const wccPlugin = require('./src/index');

module.exports = function(eleventyConfig) {
  console.debug('.eleventy.js is running.....');
  eleventyConfig.addPlugin(wccPlugin, {
    componentModules: [
      'components/greeting.js'
    ]
  });

  return {
    dir: {
      input: './demo'
    }
  }
};