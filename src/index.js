import { renderFromHTML } from 'wc-compiler';
import { stripWrappingParagraphs } from './utils.js';

export const wccPlugin = {
  configFunction: function (eleventyConfig, options = {}) {
    const { definitions = [] } = options;
    const definitionPathnames = definitions.map(definition => definition.pathname);

    for (const definition of definitions) {
      eleventyConfig.addWatchTarget(definition.pathname);
    }

    eleventyConfig.addTransform('wcc', async function (content, outputPath) {
      if (!outputPath.endsWith('.html')) {
        return;
      }

      const processedContent = this.inputPath.endsWith('.md')
        ? stripWrappingParagraphs(content)
        : content;

      const { html } = await renderFromHTML(processedContent, definitions);
      return html;
    });

    eleventyConfig.on('eleventy.beforeWatch', async (changedFiles) => {
      for (const file of changedFiles) {
        if (definitionPathnames.includes(file)) {
          // naive cache busting solution for ESM
          // https://github.com/nodejs/help/issues/2806
          await import(`${file}?t=${Date.now()}`); 
        }
      }
    });
  }
};