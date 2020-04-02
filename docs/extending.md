# Extending

A means to extend the library and usage-specific code. An example of this would be adding mentions and hash tags.

**Example:**

```javascript
anchorme({
	input: `here's a mention @bon and a hashtag #some_hash_tag.`,
	extensions: [
		// Hashtags
		{
			test: /#(\w|_)+/gi,
			transform: string =>
				`<a href="https://a.b?s=${string.substr(1)}">${string}</a>`
		},
		// an extension for mentions
		{
			test: /@(\w|_)+/gi,
			transform: string =>
				`<a href="https://a.b?p=${string.substr(1)}">${string}</a>`
		}
	]
});
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/t32bxz6o/6/)**
