const { renderFromHTML } = require('wc-compiler/dist/wcc.dist.cjs');

module.exports = {
  configFunction: function (eleventyConfig, options = {}) {
    const { definitions = [] } = options;

    eleventyConfig.addTransform('wcc', async (content, outputPath) => {
      if (!outputPath.endsWith('.html')) {
        return;
      }

      const { html } = await renderFromHTML(content, definitions);

      return html;
    });
  }
};