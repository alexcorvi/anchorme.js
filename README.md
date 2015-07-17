# Anchorme.js v0.3.1
Javascript library to convert URLs in text to clickable HTML anchor links.

## Features:
1. Highly sensitive.
2. Least possible false positives with high sensitivity.
3. Skips HTML (won't break it if it had a URL as an attribute of some element).
4. Would make links if they have protocols (eg. http://) or not.
5. Supports all TLDs in accordance to an up-to-date IANA list.
5. Also works with IPs, FTPs, and Emails.
6. Also works when ports defined (eg. mywebsite:80/page.html)
6. Very small in size (14KB).
7. No regex involved, very readable and maintainable
8. Higher performance than similar libraries
9. Tested against Autolinker.js and linkifyjs on FireFox. After 10000 iterations anchorme.js scored 300ms while others where around 1200m.

## How to use:
**A. include the library file in your HTML:**
```html
<script type="text/javascript" src="anchorme.min.js"></script>
```
**B. call the method:**
```
var someText = "this is a text with a link www.github.com ..";
var result = anchorme.anchor(someText);
```
**C. Profit...**

## Test it before using..
You can test how effiecient this code is from <a href="http://ali-saleem.github.io/anchorme.js/">here</a>.
