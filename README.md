# Anchorme.js 0.6.0

A library to convert URLs to a clickable HTML anchor elements


## Document Contents:

* Features
* Getting started
* Options
* Other uses
* Contributers

* * *
## Features

*   Highly sensitive.
*   produces the least possible false positives if any.
*   Skips HTML, so it doesn't break your HTML if it had a URL as an attribute for an element.
*   Links with or without protocols.
*   Preserve upper and lower case, altough when detecting, it's basically case insensitive.
*   Supports checking against an almost full IANA list.
*   Works with IPs, FTPs, Emails and files.
*   Also works when ports are defined.
*   Small in size.
*   No regex involved, very readable and maintainable.
*   High performance.
*   Supports setting custom attributes with any values.
*   Supports checking for only IPs or for only Emails, or for only URLs
*   Helper methods can be used for other purposes.


* * *

## Getting Started

To use this library, first download the source code located in the `src` folder.

##### 1\. Include the library file in your HTML

`<script type="text/javascript" src="anchorme.min.js"></script>`

##### 2\. Call the method

`var someText = "this is a text with a link www.github.com ..";  
var result = anchorme.js(someText);`

* * *

## Options

Optionally, you can pass an object to the method on which you define some options

``` javascript
var options = {
  "attributes":{
    "class":"someClassHere",
    "id":"someIdHere",
    "anyAttribute":"anyValue",
  },
  "html":true,
  ips:true,
  emails:true,
  urls:true,
  TLDs:20,
  defaultProtocol:"http://"
};

anchorme.js("www.google.com",options);
```

#### Explaination:

*   `attributes` - Default: `false`, if you want your anchors links to have attributes just like the example above.
*   `html` - Default: `true`, set this to true if you'll be passing HTML elements that has URLs i their attrivute to avoid breaking them. set this to false if you're not passing HTML to have better performance.
*   `ips` - Default: `true`, whether or not to detect IPs.
*   `emails` - Default: `true`, whether or not to detect emails.
*   `urls` - Default: `true`, whether or not to detect URLs other than emails and IPs.
*   `TLDs` - Default: `20`, the number of the TLDs to check. although the library has a large iana list of TLDs, but due to performance issues you might want to limit the number of TLDs that are checked, to the first most popular 20 TLDs for example. Enter `901` to check the full list, but be warned that checking against the full list of TLDs have adverse perforamance effects. However, if you want 100% sensitivity with the least possible false positives and you have a decent computing power, then go for it.
*   `defaultProtocol` - Default: `"http://"`, for links that doesn't have protocol defined.


* * *

## Other uses

Although the main purpose of this library is to convert unclickable text strings into an HTML anchor links, you can surely use it's methods for other purposes.

The source code is very readable, don't be afraid to check it.

An example of "other uses", is checking if a string is a valid email or not:

`anchorme.checks.email("ali.a.saleem@outlooks.com",50)`

Where `50` is the number of TLDs to check.

* * *


## Test it before using

To test how this library would work for you, head over to [here](http://ali-saleem.github.io/anchorme.js/) to test it.

* * *

## Performance and benchmark

I've tested it against autolinker.js and linkify for performance comparision. On all browsers, anchorme.js scored competitive perforamance, and very well faster than both other libraries when tested on FireFox.


* * *

License: The MIT License (MIT) - Copyright (c) 2015 Ali Saleem