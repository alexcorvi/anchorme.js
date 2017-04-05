# Anchorme.js
![npm](https://img.shields.io/npm/dm/anchorme.svg)
![npm](https://img.shields.io/npm/v/anchorme.svg)
![GitHub release](https://img.shields.io/github/release/alexcorvi/anchorme.js.svg)
![license](https://img.shields.io/github/license/alexcorvi/anchorme.js.svg)
![David](https://img.shields.io/david/alexcorvi/anchorme.js.svg)
![David](https://img.shields.io/david/dev/alexcorvi/anchorme.js.svg)


[![Documentation](http://puu.sh/ukS4g/ccc520ade4.jpg)](http://alexcorvi.github.io/anchorme.js/)

Tiny, fast, efficient, feature rich Javascript library to detect links / URLs / Emails in text and convert them to clickable HTML anchor links.
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
