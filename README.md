# Settings Base

[![GitHub release](https://img.shields.io/github/release/Snooful/Settings-Base.svg?style=popout&label=github)](https://github.com/Snooful/Settings-Base/releases/latest)
[![npm](https://img.shields.io/npm/v/@snooful/settings-base.svg?style=popout&colorB=red)](https://www.npmjs.com/package/@snooful/settings-base)
[![Travis (.com)](https://img.shields.io/travis/com/Snooful/Settings-Base.svg?style=popout)](https://travis-ci.com/Snooful/Settings-Base)

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
};
```