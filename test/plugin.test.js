import Eleventy from '@11ty/eleventy';
import { wccPlugin } from '../src/index.js';
import assert from 'node:assert/strict';
import { describe, it, before } from 'node:test';

describe('WCC plugin', () => {
  let indexMdFile;

  before(async () => {
    const elev = new Eleventy('demo', 'test/output', {
      config: function (eleventyConfig) {
        eleventyConfig.addPlugin(wccPlugin.configFunction);
      }
    });

    await elev.init();
    const elevOutput = await elev.toJSON();

    indexMdFile = elevOutput.find(
      (file) => file.inputPath === './demo/index.md'
    );
    assert.ok(indexMdFile, 'Precondition failed: demo/index.md not found');
  });

  it('prints the header', () => {
    const expected = '<h2>11ty + WCC Demo</h2>';

    assert.ok(indexMdFile.content.includes(expected), 'Header not found');
  });

  it('prints the greeting component', () => {
    const contentNormalized = indexMdFile.content.replaceAll(/\s+/g, ' ').trim();
    const expected =
      '<x-greeting><template shadowrootmode="open"> <p>Hello from the greeting component!</p> </template></x-greeting>';

    assert.ok(
      contentNormalized.includes(expected),
      'x-greeting component not found'
    );
  });

  it('removes wrapping p tags', async () => {
    const elev = new Eleventy('demo', 'test/output', {
      config: function (eleventyConfig) {
        eleventyConfig.addPlugin(wccPlugin.configFunction);
      }
    });

    await elev.init();
    const elevOutput = await elev.toJSON();
    const result = elevOutput[0].content;

    const regexp = new RegExp('<p><x-greeting>(.|\\s)*</x-greeting></p>');
    assert.doesNotMatch(result, regexp);
  });
});

function setUpEleventy(pluginOptions = {}) {
  return new Eleventy('demo', 'test/output', {
    config: function (eleventyConfig) {
      eleventyConfig.addPlugin(wccPlugin, {
        definitions: [
          new URL('../demo/components/greeting.js', import.meta.url)
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
    (template) => template.inputPath === './demo/index.md'
  );
  assert.ok(indexMdFile, 'Precondition failed: demo/index.md not found');

  return { indexMdFile };
}

