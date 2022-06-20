# eleventy-plugin-wcc

## Overview

[**Eleventy**](https://www.11ty.dev/) plugin for rendering native Web Components using [**Web Components Compiler (WCC)**](https://github.com/ProjectEvergreen/wcc).

## Installation

Install from NPM.

```sh
$ npm install eleventy-plugin-wcc --save-dev
```

## Configuration

Add the plugin to your _eleventy.js_ config and provide a `URL` for all _top level_ custom element definitions you use.
```js
const path = require('path');
const { pathToFileURL } = require('url');
const wccPlugin = require('./src/index');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(wccPlugin, {
    definitions: [
      pathToFileURL(path.join(__dirname, './src/js/my-element.js'))
    ]
  });
};
```

## Usage

### 1. Create a Component
```js
// src/js/greeting.js
const template = document.createElement('template');

template.innerHTML = `
  <p>Hello from the greeting component!</p>
`;

class GreetingComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

module.exports = GreetingComponent; // using module.exports!

customElements.define('x-greeting', GreetingComponent);
```

> **Note**: Since [Eleventy does not support ESM yet](https://github.com/11ty/eleventy/issues/836), you will need to use `module.exports = XXX` instead of `export default XXX` for your definitions.

### 2. Use it
```md
<!-- src/index.md -->
# 11ty + WCC

<x-greeting></x-greeting>
```

### 3. Update Configuration
Make sure to use this path in your _.eleventy.js_
```js
const path = require('path');
const { pathToFileURL } = require('url');
const wccPlugin = require('eleventy-plugin-wcc');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(wccPlugin, {
    definitions: [
      pathToFileURL(path.join(__dirname, './src/js/greeting.js'))
    ]
  });
};
```

----

Run `eleventy` and you should get an _index.html_ in your _site/_ directory.
```html
<h2>11ty + WCC Demo</h2>
<p>
  <x-greeting>
    <template shadowroot="open">
      <p>Hello from the greeting component!</p>
    </template>
  </x-greeting>
</p>
```

## Options

Coming soon!

> _Please follow along in our [issue tracker](https://github.com/ProjectEvergreen/eleventy-plugin-wcc/issues) or make a suggestion!_