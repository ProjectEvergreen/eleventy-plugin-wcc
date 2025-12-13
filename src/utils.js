import * as parse5 from 'parse5';

function isWhitespaceTextNode(node) {
  return node.nodeName === '#text' && (/^[\t\n\r ]*$/).test(node.value);
}

export const stripWrappingParagraphs = (html) => {
  const parsedHtml = parse5.parseFragment(html);
  parsedHtml.childNodes = parsedHtml.childNodes.flatMap((node) => {
    if (node.nodeName !== 'p') {
      return node;
    }

    // Ignore whitespace-only text nodes
    const meaningfulChildren = node.childNodes.filter(
      (child) => !isWhitespaceTextNode(child)
    );

    if (
      meaningfulChildren.length === 1 &&
      meaningfulChildren[0].nodeName.includes('-')
    ) {
      return meaningfulChildren[0];
    }

    return node;
  });

  return parse5.serialize(parsedHtml);
};
