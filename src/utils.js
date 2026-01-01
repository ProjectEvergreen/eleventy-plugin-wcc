import * as parse5 from 'parse5';

function isWhitespaceTextNode(node) {
  return node.nodeName === '#text' && (/^[\t\n\r ]*$/).test(node.value);
}

export const stripWrappingParagraphs = (html) => {
  const isFullHtmlDoc = (/^<(!DOCTYPE )?html>/i).test(html);
  const parsedHtml = isFullHtmlDoc ? parse5.parse(html) : parse5.parseFragment(html);

  const rootNode = chooseRootNode(parsedHtml);
  rootNode.childNodes = rootNode.childNodes.map(traverseNodes);

  return parse5.serialize(parsedHtml);
};

function chooseRootNode(parsedHtml, isFullHtmlDoc) {
  if (isFullHtmlDoc) {
    const rootNode = parsedHtml.childNodes
      .find((x) => x.nodeName === 'html')
      ?.childNodes?.find((x) => x.nodeName === 'body');

    if (!rootNode) {
      throw new Error('html output is missing the body tag');
    }

    return rootNode;
  } else {
    return parsedHtml;
  }
}

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

