import { stripWrappingParagraphs } from '../src/utils.js';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('stripWrappingParagraphs', () => {
  it('removes wrapping p tags', async () => {
    const input = '<p><x-greeting></x-greeting></p>';
    const expected = '<x-greeting></x-greeting>';

    const result = stripWrappingParagraphs(input);

    assert.equal(result, expected);
  });

  it('removes wrapping p tags (inner content)', async () => {
    const input = '<p><x-greeting>inner content</x-greeting></p>';
    const expected = '<x-greeting>inner content</x-greeting>';

    const result = stripWrappingParagraphs(input);

    assert.equal(result, expected);
  });

  it('removes wrapping p tags (inner content, newlines)', async () => {
    const input = '<p><x-greeting>inner\ncontent</x-greeting></p>';
    const expected = '<x-greeting>inner\ncontent</x-greeting>';

    const result = stripWrappingParagraphs(input);

    assert.equal(result, expected);
  });

  it('removes wrapping p tags (whitespace)', async () => {
    const input = '<p> \n\t<x-greeting></x-greeting> \n</p>';
    const expected = '<x-greeting></x-greeting>';

    const result = stripWrappingParagraphs(input);

    assert.equal(result, expected);
  });

  it('does not remove wrapping p tags if it includes other content', async () => {
    const input = '<p>Hello <x-greeting></x-greeting></p>';

    const result = stripWrappingParagraphs(input);

    assert.equal(result, input);
  });

  it('removes wrapping p tags (multiple)', async () => {
    const input = '<p><x-greeting></x-greeting></p>\n<p><x-test></x-test></p>';
    const expected = '<x-greeting></x-greeting>\n<x-test></x-test>';

    const result = stripWrappingParagraphs(input);

    assert.equal(result, expected);
  });

  it('removes nested wrapping p tags', async () => {
    const input = '<main><p><x-greeting></x-greeting></p></main>';
    const expected = '<main><x-greeting></x-greeting></main>';

    const result = stripWrappingParagraphs(input);

    assert.equal(result, expected);
  });
});
