# robots-dot-txt

A simple crawler made in JavaScript for Node.

## Installation

```bash
$ npm install robots-dot-txt
```

This should install the package in your project.

## Usage

```javascript
const { RobotsParser } = require("../index.js");
const robots = `
# this is a comment
User-agent: Googlebot
Disallow: /nogoogle/*
Allow: /nobing/*

User-agent: Bingbot
Disallow: /nobing/*
    
User-agent: *
Disallow: /tmp/*`;

robotsParser = new RobotsParser(robots);
console.log(robotsParser.parse());
// Output:
// {
//   Googlebot: { disallow: [ '/nogoogle/*' ], allow: [ '/nobing/*' ] },
//   Bingbot: { disallow: [ '/nobing/*' ], allow: [] },
//   '*': { disallow: [ '/tmp/*' ], allow: [] }
// }

console.log(robotsParser.canAccess("Googlebot", "/nogoogle/test")) // false
console.log(robotsParser.canAccess("Googlebot", "/some/path")) // true
console.log(robotsParser.canAccess("NotARealUA", "/some/path")) // true
```
