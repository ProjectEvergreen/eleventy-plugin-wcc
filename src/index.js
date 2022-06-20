const path = require('path');
const { renderFromHTML } = require('./lib/wcc.dist');
const { pathToFileURL } = require('url');

module.exports = function (eleventyConfig) {

  // console.debug({ eleventyConfig });
  eleventyConfig.addTransform('wcc', async (content) => {
    // TODO deps should come from config
    const { html } = await renderFromHTML(content, [
      pathToFileURL(path.join(__dirname, '../demo/components/greeting.js'))
    ]);

    return html;
  })
}