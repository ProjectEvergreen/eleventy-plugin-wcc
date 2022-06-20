const wccPlugin = require('./src/index');

module.exports = function(eleventyConfig) {
  console.debug('.eleventy.js is running.....');
  // eleventyConfig.addPassthroughCopy('./_js');
  eleventyConfig.addPlugin(wccPlugin);

  return {
    dir: {
      input: './demo'
    }
  }
};