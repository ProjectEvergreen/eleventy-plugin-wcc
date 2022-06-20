// TODO - currently this breaks 11ty :(
// import { renderFromHTML } from 'wc-compiler';

export default function(eleventyConfig) {
  eleventyConfig.addTransform('wcc', async (content) => {
    console.debug({ content });

    return content; // await renderFromHTML(content);
  })
}