import Eleventy from '@11ty/eleventy';
import { wccPlugin } from '../src/index.js';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('WCC plugin', () => {
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
