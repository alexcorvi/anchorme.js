# Getting started

You can get this library via NPM or yarn

```
npm i anchorme
yarn add anchorme
```

or download the single file compiled version from [the github repository](https://github.com/alexcorvi/anchorme.js). Then you can use it like the example below:

```javascript
// If you're using NPM/Yarn, then you need
// to require the library first
const anchorme = require("anchorme").default; // like this
import anchorme from "anchorme"; // or this

// the library will export a single function
// that you can use like the examples below
const input = "some text with a link.com";
const resultA = anchorme(input);
const resultB = anchorme({ input });
const resultC = anchorme({
	input,
	// use some options
	options: {
		attributes: {
			target: "_blank",
			class: "detected",
		},
	},
	// and extensions
	extensions: [
		// an extension for hashtag search
		{
			test: /#(\w|_)+/gi,
			transform: (string) =>
				`<a href="https://a.b?s=${string.substr(1)}">${string}</a>`,
		},
		// an extension for mentions
		{
			test: /@(\w|_)+/gi,
			transform: (string) =>
				`<a href="https://a.b/${string.substr(1)}">${string}</a>`,
		},
	],
});
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/hLwjkyq6/13/)**
