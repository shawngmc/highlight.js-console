var hljs2cli = require('../index.js');
var hljs = require("highlight.js")
var fs = require('fs');


var text = fs.readFileSync('test.html').toString();
var hlText = hljs.highlightAuto(text);
hljs2cli.convert(hlText.value, 'vs')
  .then(function(converted) {
    console.log(converted);
  })
  .catch(function(ex) {
    console.error(ex);
  });
