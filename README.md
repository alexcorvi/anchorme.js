# Anchorme.js

A library to convert URLs to a click-able HTML anchor elements

## [Getting Started, Documentations, Demos and more](http://alexcorvi.github.io/anchorme.js/)

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
* __Light Weight__: Although it's a feature rich library with a full IANA list included, it's only __6KB__ when minified and gzipped.


## Contributing

This project is written in Typescript and compiled to JavaScript.

### Prerequisites:
- Typescript installed globally
- Jest installed globally (for testing)

### How to contribute
- Clone this repository
- `cd anchorme.js && npm install`
- ..
- Add unit tests if needed 
- Run `npm run test` for testing
- Run `npm run build` for building 

-----

License: The MIT License (MIT) - Copyright (c) 2017 Alex Corvi