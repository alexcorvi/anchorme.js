# Anchorme.js

A library to convert URLs to a click-able HTML anchor elements

## Features

*   Highly sensitive.
*   produces the least possible false positives if any.
*   Skips HTML, so it doesn't break your HTML if it had a URL as an attribute for an element.
*   Links with or without protocols.
*   Preserve upper and lower case, although when detecting, it's basically case insensitive.
*   Checks against full IANA list of TLDs.
*   Works with IPs, FTPs, Emails and files.
*   Also works when ports are defined.
*   Small in size.
*   No RegExp involved, very readable and maintainable.
*   Supports setting custom attributes with any values.
*   Supports checking IPs only, Emails only, or URLs only.
*   Helper methods can be used for other purposes.

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
  attribute:{
    "target":"_blank"
  }
})

```

#### Available options

Option key | Default value | Description
--- | --- | ---
`attributes` | `false` | An object of attributes to be added to each anchor tag
`html` | `true` | If you're expecting HTML input, this will make sure that your HTML won't break
`ips` | `true` | Detect IPs
`urls` | `true` | Detect URLs
`email` | `true` | Detect Emails
`truncate` | `0` | Truncate long links
`defaultProtocol` | `"http://"` | Default protocol to be added when no protocol has been defined in the input


### Validation

it can also be used for validation:

```javascript
anchorme.validate.ip("1.1.1.1:3000/something"); // returns true
anchorme.validate.email("alex@array.com"); // return true
anchorme.validate.url("google.co.uk"); // returns true
```


## Demo

To test how this library would work for you, head over to [here](http://alexcorvi.github.io/test/demo.html) to test it.

* * *

License: The MIT License (MIT) - Copyright (c) 2016 Alex Corvi
