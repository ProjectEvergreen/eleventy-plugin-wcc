import { wccPlugin } from './src/index.js';

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(wccPlugin, {
    definitions: [
      new URL('./demo/components/greeting.js', import.meta.url)
    ]
  });

  return {
    dir: {
      input: './demo'
    }
  }
};