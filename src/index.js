const { renderFromHTML } = require('wc-compiler/dist/wcc.dist.cjs');

module.exports = {
  configFunction: function (eleventyConfig, options = {}) {
    const { definitions = [] } = options;
    const definitionPathnames = definitions.map(definition => definition.pathname);

    for (const definition of definitions) {
      eleventyConfig.addWatchTarget(definition.pathname);
    }

    eleventyConfig.addTransform('wcc', async (content, outputPath) => {
      if (!outputPath.endsWith('.html')) {
        return;
      }

      const { html } = await renderFromHTML(content, definitions);

      return html;
    });

    eleventyConfig.on('eleventy.beforeWatch', async (changedFiles) => {
      for(const file of changedFiles) {
        if(definitionPathnames.includes(file)) {
          delete require.cache[require.resolve(file)];
        }
      }
    });
  }
};