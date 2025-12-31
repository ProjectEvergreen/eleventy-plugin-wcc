import * as parse5 from 'parse5';

function isWhitespaceTextNode(node) {
  return node.nodeName === '#text' && (/^[\t\n\r ]*$/).test(node.value);
}

export const stripWrappingParagraphs = (html) => {
  const parsedHtml = parse5.parseFragment(html);
  parsedHtml.childNodes = parsedHtml.childNodes.map(traverseNodes);

  return parse5.serialize(parsedHtml);
};

function traverseNodes(node) {
  node = stripWrappingParagraph(node);

  // Don't traverse children of custom elements
  if (node.childNodes && !node.nodeName.includes('-')) {
    node.childNodes = node.childNodes.map(traverseNodes);
  }

  return node;
}

function stripWrappingParagraph(node) {
  if (node.nodeName !== 'p') {
    return node;
  }

  // Ignore whitespace-only text nodes
  const meaningfulChildren = node.childNodes.filter(
    (child) => !isWhitespaceTextNode(child)
  );

  if (meaningfulChildren.length === 1 &&
    meaningfulChildren[0].nodeName.includes('-')) {
    return meaningfulChildren[0];
  }

  return node;
}

