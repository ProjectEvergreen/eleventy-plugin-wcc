# eleventy-plugin-wcc

## Overview

[**Eleventy**](https://www.11ty.dev/) plugin for rendering native Web Components using [**Web Components Compiler (WCC)**](https://github.com/ProjectEvergreen/wcc).

> _A [starter kit](https://github.com/thescientist13/eleventy-starter-wcc/) for 11ty + WCC is also available._

## Installation

Install from NPM.

```sh
$ npm i -D eleventy-plugin-wcc
```

## Configuration

Add the plugin to your _eleventy.js_ config and provide a [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) for all _top level_ custom element definitions you use.
```js
import { wccPlugin } from './src/index.js';

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(wccPlugin, {
    definitions: [
      new URL('./src/js/my-element.js', import.meta.url)
    ]
  });
};
```

## Usage

### 1. Create a Custom Element

Write a custom element like below.  In this case, we are using [Declarative Shadow DOM](https://web.dev/declarative-shadow-dom/).

```js
// src/components/greeting.js
const template = document.createElement('template');

template.innerHTML = `
  <p>Hello from the greeting component!</p>
`;

export default class GreetingComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('x-greeting', GreetingComponent);
```

### 2. Update Configuration

Add your custom element paths to your _.eleventy.js_ config

```js
import { wccPlugin } from './src/index.js';

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(wccPlugin, {
    definitions: [
      new URL('./src/components/my-element.js', import.meta.url)
    ]
  });
};
```

### 3. Use It!

Now in your content or layouts, use the custom element.
```md
<!-- src/index.md -->
# Hello From 11ty + WCC! 👋

<x-greeting></x-greeting>
```

----

Now if you run `eleventy`, you should get an _index.html_ in your _site/_ directory with the custom element content pre-rendered!  🎈
```html
<h2>Hello From 11ty + WCC!</h2>

<x-greeting>
  <template shadowroot="open">
    <p>Hello from the greeting component!</p>
  </template>
</x-greeting>
```

## Options

`trimParagraphTagsInMd` (bool, default true) - Trims unexpected `<p>` tags that markdown puts around custom elements [more details](https://github.com/ProjectEvergreen/eleventy-plugin-wcc/issues/8).

> _Please follow along in our [issue tracker](https://github.com/ProjectEvergreen/eleventy-plugin-wcc/issues) or make a suggestion!_