import wccPlugin from './src/index.js';

console.debug('????????');

export default function (eleventyConfig) {
  // eleventyConfig.addPassthroughCopy('./_js');
  eleventyConfig.addPlugin(wccPlugin);
};