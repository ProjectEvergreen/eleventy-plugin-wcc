import * as parse5 from 'parse5';

export const stripWrappingParagraphs = (html) => {
  const parsedHtml = parse5.parseFragment(html);
  parsedHtml.childNodes = parsedHtml.childNodes.flatMap((node) => {
    if (
      node.nodeName === 'p' &&
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeName.includes('-')
    ) {
      return node.childNodes[0];
    }
    return node;
  });

  return parse5.serialize(parsedHtml);
};
