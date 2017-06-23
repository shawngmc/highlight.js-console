
# HLJS2CLI

## Description
HLJS2CLI is a node module to take the stylized output from 
[highlight.js](https://highlightjs.org) and make it convert the theming
to work in a node command line

## Usage





## TODO
* Create highlight.js style reader - npm css2json looks useful
* Test bold/italics/underline (other languages/elements?)
* Test with tabs?
* Split into test and actual module code
* See if swapping to mainline npm chalk and color packages could work (I doubt it, but...)
* Improve bgcolor coverage (full width)

## Tested OK/Fixed
* OK: Newlines are preserved
* OK: Spaces are preserved
* FIX: Base color now properly applied
* OK: Bold/Italics/Underline implemented
* OK: Background color is implemented
