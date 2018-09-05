# Settings Base

The main package that all storage options extend.

## Installation

This package is available on NPM under the organization's scope:

    npm install @snooful/settings-base

Use it like so:

```js
const { debug, BSM } = require("@snooful/settings-base");

module.exports = class extends BSM {
	constructor() {
		super();
		debug("this is our special little settings manager!");
	}
}
```