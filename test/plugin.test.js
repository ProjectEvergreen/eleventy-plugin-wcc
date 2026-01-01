import Eleventy from '@11ty/eleventy';
import { wccPlugin } from '../src/index.js';
import assert from 'node:assert/strict';
import { describe, it, before } from 'node:test';

describe('WCC plugin', () => {
  describe('Default options', () => {
    let indexMdFile;

    before(async () => {
      const templates = await setUpTemplates();
      ({ indexMdFile } = templates);
    });

    it('prints the header', () => {
      const expected = '<h2>11ty + WCC Demo</h2>';

      assert.ok(indexMdFile.content.includes(expected), 'Header not found');
    });

    it('prints the greeting component', () => {
      const contentNormalized = indexMdFile.content
        .replaceAll(/\s+/g, ' ')
        .trim();
      const expected =
        '<x-greeting><template shadowrootmode="open"> <p>Hello from the greeting component!</p> </template></x-greeting>';

      assert.ok(
        contentNormalized.includes(expected),
        'x-greeting component not found'
      );
    });

    it('removes wrapping p tags', () => {
      const regexp = new RegExp('<p><x-greeting>(.|\\s)*</x-greeting></p>');

      assert.doesNotMatch(indexMdFile.content, regexp);
    });
  });

  describe('trimParagraphTagsInMd: false', () => {
    it('leaves wrapping p tags', async () => {
      const eleventy = setUpEleventy({ trimParagraphTagsInMd: false });
      const { indexMdFile } = await setUpTemplates(eleventy);
      const regexp = new RegExp('<p><x-greeting>(.|\\s)*</x-greeting></p>');

      assert.match(indexMdFile.content, regexp);
    });
  });
});

function setUpEleventy(pluginOptions = {}) {
  return new Eleventy('test_fixtures', 'test/output', {
    configPath: null,
    config: function (eleventyConfig) {
      eleventyConfig.addPlugin(wccPlugin, {
        definitions: [
          new URL('../test_fixtures/components/greeting.js', import.meta.url)
        ],
        ...pluginOptions
      });
    }
  });
}

async function setUpTemplates(eleventy = null) {
  eleventy ??= setUpEleventy();

  await eleventy.init();
  const elevOutput = await eleventy.toJSON();

  const indexMdFile = elevOutput.find(
    (template) => template.inputPath === './test_fixtures/index.md'
  );

  assert.ok(indexMdFile, 'Precondition failed: demo/index.md not found');

  return { indexMdFile };
}

