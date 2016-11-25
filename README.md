# all-files
Few helpers to process all of the files in some folder with promises

## Prereq
- node 6

## How to install
###### From NPM
`npm install node-all-files`

###### or from Github
`npm install https://github.com/asci/all-files`

## How to use
### getFilenames
Getting all `*.js` files in folder `./test-dir`:

```javascript
const { getFilenames } = require('node-all-files');
const folder = __dirname + '/test-dir';

// Supports RegExp, String and Function for filtering:
getFilenames(root, /\.js$/i);
//or
getFilenames(root, '.js');
//or
getFilenames(root, (f) => ~f.indexOf('.js'))
.then(({ files }) => {
  console.log(files);
});

```
### processFiles
Showing content length of the files

```javascript
const { processFiles } = require('node-all-files');
const files = [__filename];

processFiles(files, (buff) => {
  console.log(buff.toString().length);
});

```
## How to test
- `npm test`
