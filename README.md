
# highlight.js-console

## Description
highlight.js-console is a node module to take the stylized output from 
[highlight.js](https://highlightjs.org) and make it convert the theming
to work in a node command line.

## Features
* Preserves Whitespace
* Will attempt to use bold/italics/underline
* Will apply foreground and background colors
  * Colors often work, but may substitute down if [chalk](https://github.com/chalk/chalk) detects a non-true-color terminal


## Installation
```console
$ npm install highlight.js-console
```

## Usage
Use highlight.js's ```highlightAuto()``` function to create the html output, then use highlight.js-console's ```convert``` function to convert the text to character codes.

```js
var hljs = require('highlight.js');
var h2c = require('highlight.js-console'); 
var text = fs.readFileSync('test.html').toString();
var hlText = hljs.highlightAuto(text);
h2c.convert(hlText.value, 'vs')
  .then(function(converted) {
    console.log(converted);
  })
  .catch(function(ex) {
    console.error(ex);
  });
```

## Troubleshooting
* Make sure your terminal/emulator/network tool support this feature
* Try a different theme - aggressive substitution makes some themes subtle or ineffective

## TODO
* Test with tabs?
* Improve bgcolor coverage (full width)

## License
Apache 2.0
