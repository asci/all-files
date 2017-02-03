# all-files
Helpers to process files recursively in folder with promises

## Prereq
- node 4
- \*nix, macOs

## How to install
###### From NPM
`npm install node-all-files`

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
  console.log(buff.toString().length);
}).then(() => {
  console.log('All files were processed');
});

```
## How to test
- `npm test`
