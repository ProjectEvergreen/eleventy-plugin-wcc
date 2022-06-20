console.log('hello world???');

function configFunction(eleventyConfig) {
  console.log('hello world from 11ty plugin!');
  console.debug({ eleventyConfig });
}

export {
  configFunction
}

export default function(args) {
  console.debug('default function', args);
}