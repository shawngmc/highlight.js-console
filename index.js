var Promise = require('bluebird');
var hljs = require("highlight.js")
var h2j = require('html2json');
var css2json = require('css2json');
var chalk = require("chalk")
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var readStylesheet = async function(name) {
  var styleRaw = await fs.readFileAsync(path.join(__dirname, 'node_modules', 'highlight.js', 'styles', name + '.css'));
  return css2json(styleRaw.toString());
};

var stylize = function(name, text, styleData) {
  var currentStyle = styleData['.'+name];
  if (currentStyle !== null) {
    // Handle foreground color
    if (currentStyle.color !== undefined) {
      if (currentStyle.color.startsWith('#')) {
        if (currentStyle.color.length === 4) {
          var expandColor = '#';
          var char = currentStyle.color.substring(1,2);
          expandColor = expandColor + char + char;
          char = currentStyle.color.substring(2,3);
          expandColor = expandColor + char + char;
          char = currentStyle.color.substring(3,4);
          expandColor = expandColor + char + char;
          text = chalk.hex(expandColor)(text);
        } else {
          text = chalk.hex(currentStyle.color)(text);
        }
      } else {
        text = chalk.keyword(currentStyle.color)(text);
      }
    }

    // Handle background color
    var backColorString = undefined;
    if (currentStyle['background-color'] !== undefined) {
      backColorString = currentStyle['background-color'];
    } else if (currentStyle.background !== undefined) {
      backColorString = currentStyle.background;
    }
    if (backColorString !== undefined) {
      if (backColorString.startsWith('#')) {
        if (backColorString.length === 4) {
          var expandColor = '#';
          var char = backColorString.substring(1,2);
          expandColor = expandColor + char + char;
          char = backColorString.substring(2,3);
          expandColor = expandColor + char + char;
          char = backColorString.substring(3,4);
          expandColor = expandColor + char + char;
          text = chalk.bgHex(expandColor)(text);
        } else {
          text = chalk.bgHhex(backColorString)(text);
        }
      } else {
        text = chalk.bgKeyword(backColorString)(text);
      }
    }
    
    // Handle bold/italics/underline
    if (currentStyle["text-decoration"] !== undefined &&
        currentStyle["text-decoration"].toLowerCase() === "underline") {
      text = chalk.underline(text);
    }
    
    if (currentStyle["font-weight"] !== undefined &&
        currentStyle["font-weight"].toLowerCase() === "bold") {
      text = chalk.bold(text);
    }
    
    if (currentStyle["font-style"] !== undefined &&
        currentStyle["font-style"].toLowerCase() === "italics") {
      text = chalk.italics(text);
    }
  }
  return text;
};

var deentitize = function(str) {
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&apos;/g, "'");
    str = str.replace(/&amp;/g, '&');
    return str;
};
var replaceSpan = function(obj, styleData) {
    // If there are child objects, convert on each child first
    if (obj.child) {
        for (var i = 0; i < obj.child.length; i++) {
            obj.child[i] = replaceSpan(obj.child[i], styleData);
        }
    }

    if (obj.node === "element") {
        return stylize(obj.attr.class, obj.child.join(''), styleData);
    } else if (obj.node === "text") {
        return obj.text;
    } else if (obj.node === "root") {
        return obj.child.join('');
    } else {
        console.error("Found a node type of " + obj.node + " that I can't handle!");
    }
};

var convertHLJS = async function(hljsHTML, styleName) {
  var styleData = await readStylesheet(styleName);
  var json = h2j.html2json(hljsHTML);
  var text = replaceSpan(json, styleData);
  text = stylize('hljs', text, styleData);
  text = deentitize(text);
  return text;
}

exports.convert = function(hljsHTML, styleName) {
  return convertHLJS(hljsHTML, styleName);
};
