const { renderFromHTML } = require('./lib/wcc.dist'); // TODO should come from npm

module.exports = {
  configFunction: function (eleventyConfig, options = {}) {
    const { dependencies = [] } = options;

    eleventyConfig.addTransform('wcc', async (content, outputPath) => {
      if(!outputPath.endsWith('.html')) {
        return;
      }

      const { html } = await renderFromHTML(content, dependencies);

      console.debug({ html });
      return html;
    })
  }
}