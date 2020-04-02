# Extending

For convenience, some internal functions are exposed as you might need them.

## Listing

This function will list all matches in an array.

**example:**

```javascript
anchorme.list(
	`github.com bing.com 127.0.0.1 mail@example.com file:///c:/file.zip`
);
```

**output:**

```json
[
	{ "start": 0, "end": 10, "string": "github.com" },
	{ "start": 11, "end": 19, "string": "bing.com" },
	{ "start": 20, "end": 29, "string": "127.0.0.1" },
	{ "start": 30, "end": 46, "string": "mail@example.com" },
	{ "start": 47, "end": 66, "string": "file:///c:/file.zip" }
]
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/7v4nt6d9/4/)**

## Validation

This function will validate a given string as URL, email, file, ip

**example:**

```javascript
anchorme.validate.email("mail@example.com"); // true
anchorme.validate.email("mail@@example.com"); // false
anchorme.validate.url("github.com/some/path"); // true
anchorme.validate.url("127.0.1.1"); // true
anchorme.validate.url("127.0.1.1:8000/some/path"); // true
anchorme.validate.url("127.0.1.300"); // false
anchorme.validate.url("127.0.1.500:8000/some/path"); // false
anchorme.validate.ip("127.0.1.1"); // true
anchorme.validate.ip("127.0.1.1/path"); // false (only validates pure IPs - not URLs)
anchorme.validate.ip("127.400.1.1"); // false
anchorme.validate.ip("777.0.1.1:8000/some/path"); // false
anchorme.validate.file("file:///c:/some/file.zip"); // true
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/64tozj28/15/)**
