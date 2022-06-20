console.log('hello world???');

export default function(eleventyConfig) {
  console.log('hello world from 11ty plugin!');
  console.debug({ eleventyConfig });
}