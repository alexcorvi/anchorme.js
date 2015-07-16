# Anchorme.js v0.3
Javascript function to convert URLs in text to clickable HTML anchor links.

## Features:
1. Highly sensitive
2. Least false positives
3. Skips HTML (won't break it if it had a URL as an attribute of some element)
4. Would make links if they have protocols or not
5. Also works with IPs, FTPs, Emails
6. Very small in size (6KB full, 4KB when minified)
7. No regex involved, very readable and maintainable
8. High performance

## How to use:
**A. include the anchorme.js file in your HTML:**
```html
<script type="text/javascript" src="anchorme.js"></script>
```
**B. call the method:**
```
var someText = "this is a text with a link www.github.com ..";
var result = anchorme.anchor(someText);
```
**C. Profit...**

## Test it before using..
You can test how effiecient this code is from <a href="http://ali-saleem.github.io/anchorme.js/">here</a>.
