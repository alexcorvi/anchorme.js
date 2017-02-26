# Anchorme.js

A library to convert URLs to a click-able HTML anchor elements

## What's Included

* __Sensitivity__: It's Highly sensitive with the least false positives.
	- It validates URLs and Emails against full IANA list
	- Validates port numbers (if present)
	- Validates IP octet numbers (if present)
* __Robustness__:
	- Skips HTML, so it doesn't break your HTML if it had a URL as an attribute for an element.
	- Links with or without protocols.
	- Works with IPs, FTPs, Emails and files.
	- Can detect parenthesis and quotation marks as part of the URL or as a surrounding to the URL.
* __Fast__: It's definitely fast! processing H.G. Wells _The Time Machine_ novel with over 1500 URLs inserted at random places takes only 3.5 seconds.
* __Light Weight__: Although it's a feature full library with a full IANA list included, it's only __6KB__ when minified and gzipped.

## Getting Started

### Download

#### File

Download the library from `dist` folder (either `anchorme.js` or `anchorme.min.js`).

#### NPM

Install via NPM: `npm install anchorme`

### Usage

```javascript

var anchorme = require("anchorme"); // if installed via NPM

var someText = "this is a text with a link www.github.com ..";
var result = anchorme(someText);

// You can also pass few options

anchorme(someText,{

	// attributes to add to the anchor tags
	attributes:[
		// can be objects
		{
			name:"target",
			value:"_blank",
		},
		// or functions
		function(obj){
			if(obj.reason === "email") return {name:"class",value:"email"};
			else return {name:"class",value:"regular-link"}
		}
		// read below to know more about this
		// and other options
	],
})

```

## Demo

To test how this library would work for you, head over to [here](http://alexcorvi.github.io/anchorme.js/) to test it.

## Available options

### Truncation

This will convert a long like like this: 
https://raw.githubusercontent.com/alexcorvi/anchorme.js/gh-pages/src/tests/hasprotocol.js
to this:
[https://raw.githubusercontent.com/alexcorv...](https://raw.githubusercontent.com/alexcorvi/anchorme.js/gh-pages/src/tests/hasprotocol.js)


**Default Value:** `0` (Won't truncate)

**Example**

```javascript

	anchorme(string,{
		truncate:40
	})

```

### Truncate from the middle

This will make the truncation (as seen above) removing characters from the middle instead of the end. So it will produce a link like this one: [raw.githubusercontent.com/.../hasprotocol.js](https://raw.githubusercontent.com/alexcorvi/anchorme.js/gh-pages/src/tests/hasprotocol.js)

```javascript

	anchorme(string,{
		truncate:[26,15],
		// means 26 characters from the beginning
		// and 15 characters from the end
	})

```

### Excluding 

You can exclude IPs/Emails/URLs/Files like this:

```javascript

	anchorme(string,{
		emails:false,
		urls:false,
		ips:false,
		files:false
	})
	// the example above won't do anything to your string
	// since you're excluding every possible change
```

**Default Value:** all are `true`



### Adding attributes

You can add attributes to the links produced by anchorme. using the `attributes` prop in the options. this options should be an array of the attributes you'd like to pass.

Values of this array can be:

* Plain objects
```javascript
	anchorme(string,{
		attributes:[
			{
				// attribute name
				name:"class",
				// attribute value
				value:"something"
			},
			{
				name:"target",
				value:"blank"
			}
		]
	});
```

* Functions that return an object
```javascript
anchorme(string,{
	attributes:[
		{
			name:"class",
			value:"link"
		},
		function(data){
			if(data.reason === "ip") return {name:"class",value:"ip-link"};
		},
		function(data){
			if(data.protocol !== "mailto:") return {name:"target",value:"blank"};
			// following conditions can also be used:
			// if(data.raw.indexOf("@") > 0) return {name:"target",value:"blank"};
			// if(data.reason !== "email") return {name:"target",value:"blank"};
		}
	]
});
```

Where `data` is an object containing detailed info about the link in question. The example above will add `ip-link` class to all the links that are IPs, and add `target='_blank'` to all the links that are not emails.

If you log the data object you'll get something similar to this:

```javascript

{
	// the reason this fragment
	// was detected
	// possible reasons: "file", "url", "ip", "email"
    "reason": "email",
    
    // the protocol that the link came with
    // or the protocol that was added to the link
    "protocol": "mailto:",
    
    // the link (without any modification)
    "raw": "a@b.co",
    
    // the encoded version of the link
    // i.e. non-Latin characters -> URI encoding
    // also doesn't have a protocol (if it came with any)
    "encoded": "a@b.co",
}

```

### Setting default protocol

If the link came without protocol, like `www.google.com` then anchorme will add the `http://` by default. However you can set your own default protocol.


```javascript
anchorme(string,{
	defaultProtocol:"ftp://",
	// ... or anything
})
```

In some cases, you might want the protocol to be set conditionally. Anchorme allows you to pass a function as the `defaultProtocol` and uses whatever this function returns.

```javascript
anchorme(string,{
	defaultProtocol:function(url){
		// where url is like: "www.google.com"
		if(url.indexOf("secure") > 0) return "https://";
		else return "http://";
	},
})
```


## Additional functionalities

### Listing all valid URLs

Although anchorme was authored to transform URLs in text strings to a click-able HTML anchor tags, passing `true` to `list` property in options will change the library's behavior and instead of returning a text with an HTML tags it will only return an array of valid URLs.

```javascript

anchorme(myText,{
	list:true
})

```

### Validating


it can also be used for validation:

```javascript
anchorme.validate.ip("1.1.1.1:3000/something"); // returns true
anchorme.validate.email("alex@array.com"); // return true
anchorme.validate.url("google.co.uk"); // returns true
```

## Contributing

- Clone this repository
- `cd anchorme.js && npm install`
- install mocha globally (for running the tests): `mocha test/run`
- .. 
- Build `node build/build`
- Test `node test/run`

* * 

License: The MIT License (MIT) - Copyright (c) 2017 Alex Corvi