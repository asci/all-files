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

```
const {getFilenames} = require('node-all-files');
const folder = __dirname + '/test-dir';
const isJS = /\.js$/i;

getFilenames(folder, isJS.test.bind(isJS)).then(({ files }) => {
  console.log(files);
});

```
### processFiles
Showing content length of the files

```
const {processFiles} = require('node-all-files');
const files = [__filename];

processFiles(files, (buff) => {
  console.log(buff.toString().length);
});

```
## How to test
- `npm test`
