# Options

You can pass options to the library like this:

```javascript
anchorme({
	input: "input string with a link.com",
	options: {
		attributes: {
			target: "_blank",
			class: "some-class"
		},
		truncate: 6,
		middleTruncation: true,
		exclude: string => string.startsWith("file://"),
		protocol: "http://",
		specialTransform: [
			{
				test: /\.img$/,
				transform: string => `<a href="${string}">IMAGE FILE</a>`
			},
			{
				test: /^http:\/\//,
				transform: () => `<a href="${string}">INSECURE URL</a>`
			}
		]
	}
});
```

All options can either be conditional (by passing a function as the value), or general (by passing the option value).

---

## Truncation

> **Default Behaviour**: no truncation

This options lets you convert a long link like this: [https://github.com/alexcorvi/anchorme.js/blob/e883ad9802149286969504991d4db8a74534ec31/src/transform/transform.ts](https://github.com/alexcorvi/anchorme.js/blob/e883ad9802149286969504991d4db8a74534ec31/src/transform/transform.ts) to this: [https://github.com/ale...](https://github.com/alexcorvi/anchorme.js/blob/e883ad9802149286969504991d4db8a74534ec31/src/transform/transform.ts) or this [https://github.com/alexcorvi/...orm/transform.ts](https://github.com/alexcorvi/anchorme.js/blob/e883ad9802149286969504991d4db8a74534ec31/src/transform/transform.ts)

**Example:**

```javascript
const input = `
github.com/alexcorvi/anchorme.js
www.google.com/search?q=anchorme&sourceid=chrome&ie=UTF-8
www.npmjs.com/package/anchorme
`;
const resultA = anchorme({
	input,
	options: {
		// any link above 6 characters will be truncated
		// to 6 characters and ellipses at the end
		truncate: 6,
		// characters will be taken out of the middle
		middleTruncation: true
	}
});
const resultB = anchorme({
	input,
	options: {
		// any link that has with "google.com/search?"
		// will be truncated to 40 characters,
		// github links will not be truncated
		// other links will truncated to 10 characters
		truncate: function(string) {
			if (string.indexOf("google.com/search?") > -1) {
				return 40;
			} else if (string.indexOf("github.com/") > -1) {
				return Infinity;
			} else {
				return 10;
			}
		},
		// characters will be taken out of the end
		middleTruncation: false
	}
});
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/g1xpah9y/3/)**

---

## Adding attributes

> **Default Behaviour**: no attributes will be added

You can add attributes to the links produced by anchorme. using the \`attributes\` key in the options object.

**Example:**

```javascript
const input = `
bing.com/search?q=anchorme
google.com/search?q=anchorme
npmjs.com/package/anchorme
`;
const resultA = anchorme({
	input,
	options: {
		// any link will have the attribute "class='link'"
		// and will be downloaded
		attributes: {
			class: "link",
			download: true
		}
	}
});
const resultB = anchorme({
	input,
	options: {
		// all links will be opened in a new window
		// google links will have "google" class
		// bing links will have "bing" class
		// other links will have "other" class
		// links that end with ".zip" will be downloaded
		attributes: function(string) {
			const attributes = {
				target: "_blank"
			};
			if (string.indexOf("google.com") > -1) {
				attributes["class"] = "google";
			} else if (string.indexOf("bing.com") > -1) {
				attributes["class"] = "bing";
			} else {
				attributes["class"] = "other";
			}
			if (string.endsWith("zip")) {
				attributes["download"] = true;
			}
			return attributes;
		}
	}
});
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/6Lph7xke/1/)**

---

## Default protocol

> **Default Behaviour**: using `http://` for URLs & `mailto:` for emails

The library will use the appropriate default protocol for your links & emails, however if you want to change this behaviour you can use this option.

**Example:**

```javascript
const input = `
bing.com/search?q=anchorme
mail@example.com
`;
const resultA = anchorme({
	input,
	options: {
		// everything will have the https:// protocol
		protocol: "https://"
	}
});
const resultB = anchorme({
	input,
	options: {
		// URLs will have the http:// protocol
		// while emails will have the mailto: protocol
		// (same as default behaviour)
		protocol: function(string) {
			if (anchorme.validate.email(string)) {
				return "mailto:";
			} else {
				return "http://";
			}
		}
	}
});
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/0r3c14gw/1/)**

---

## Excluding

> **Default Behaviour**: No exclusions will occur, everything will be linked.

You can use the `exclude` option to conditionally exclude matches from the transformation.

**Example:**

```javascript
const input = `
bing.com/search?q=anchorme
mail@example.com
file:///c:/file.zip
`;
const resultA = anchorme({
	input,
	options: {
		// everything will be excluded, nothing will be changed
		// unless its included in specialTransform
		exclude: true
	}
});
const resultB = anchorme({
	input,
	options: {
		// Emails & files will be excluded
		exclude: function(string) {
			if (anchorme.validate.email(string)) {
				return true;
			} else if (string.startsWith("file:///")) {
				return true;
			} else {
				return false;
			}
		}
	}
});
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/86yz30Lg/2/)**

## Special transformation

> **Default Behaviour**: No special transformation

This option to setup special transformation for special matches, as you will have full control over the transformation function.

**Example:**

```javascript
const input = `
youtube.com/watch?v=ZYxRxWal1EE
dummyimage.com/30.png
github.com
`;
const result = anchorme({
	input,
	options: {
		// everything will be excluded
		exclude: true,
		// except ...
		// using the special transformation function
		// 1. images will be transformed to <img> tag (not <a> tags)
		// 2. youtube videos will be transformed to iframes (not <a> tags)
		specialTransform: [
			{
				test: /.*\.(png|jpg|gif)$/,
				transform: s =>
					`<img src="${s.startsWith("http://") ? s : `http://${s}`}">`
			},
			{
				test: /youtube\.com\/watch\?v\=/,
				transform: str =>
					`<iframe src="https://www.youtube.com/embed/${str.replace(
						/.*watch\?v\=(.*)$/,
						"$1"
					)}"/>`
			}
		]
	}
});
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/jbucrys1/2/)**
