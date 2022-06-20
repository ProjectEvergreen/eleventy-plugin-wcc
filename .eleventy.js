import wccPlugin from './src/index.js';

export default function(eleventyConfig) {
  console.debug('.eleventy.js is running.....');
  // eleventyConfig.addPassthroughCopy('./_js');
  eleventyConfig.addPlugin(wccPlugin);

  return {
    dir: {
      input: './demo'
    }
  }
};