import wccPlugin from './src/index.js';

module.exports = (eleventyConfig) => {
  console.debug('.eleventy.js is running.....');
  // console.debug({ eleventyConfig });
  // eleventyConfig.addPassthroughCopy('./_js');
  eleventyConfig.addPlugin(wccPlugin);

  return {
    dir: {
      input: './demo'
    }
  }
};