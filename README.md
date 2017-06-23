
# highlight.js-cli

## Description
highlight.js-cli is a node module to take the stylized output from 
[highlight.js](https://highlightjs.org) and make it convert the theming
to work in a node command line.

## Styles copied
* Bold and italics usually work
* Colors often work, but may substitute down if [chalk](https://github.com/chalk/chalk) detects a non-true-color terminal
* Underline sometimes works


## Installation
```console
$ npm install highlight.js-cli
```

## Usage
Use highlight.js's ```highlightAuto()``` function to create the html output, then use highlight.js-cli's ```convert``` function to convert the text to character codes.

```js
var text = fs.readFileSync('test.html').toString();
var hlText = hljs.highlightAuto(text);
hljs2cli.convert(hlText.value, 'vs')
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
