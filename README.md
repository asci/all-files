# all-files

![Build](https://github.com/asci/all-files/workflows/Build/badge.svg?branch=master)

Helpers to process files recursively in folder with promises

## Prereq
- node 4
- \*nix, macOs

## How to install
###### From NPM
`npm install node-all-files` or `yarn add node-all-files`

## How to use
### getFilenames

Getting all `*.js` files in folder `./test-dir`:

```javascript
const { getFilenames } = require('node-all-files');
const folder = __dirname + '/test-dir';

// Supports RegExp, String and Function for filtering:
getFilenames(folder, /\.js$/i);
//or
getFilenames(folder, '.js');
//or
getFilenames(folder, (f) => ~f.indexOf('.js'))
.then(({ files }) => {
  console.log(files);
});

```
### processFiles
Showing content length of the files

```javascript
const { processFiles } = require('node-all-files');
const files = [__filename];

processFiles(files, (buff, filename) => {
  // process file immediately
  console.log(buff.toString().length);

  // or return Promise
  return new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
}).then(({results, errors}) => {
  // results - array of results
  // errors - object (map) with filename as key, and error (or reject reason) as value
  console.log('All files were processed');
});

```
## How to test
- `npm test`
