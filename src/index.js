const { renderFromHTML } = require('./lib/wcc.dist');

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform('wcc', async (content) => {
    const { html } = await renderFromHTML(content);

    console.debug('FROM WCC!!!!!!', html);

    return html;
  })
}