const {getFilenames, processFiles} = require('./index.js');
const root = __dirname + '/test-dir';
const isJS = /\.js$/i;

getFilenames(root, isJS.test.bind(isJS)).then(({ files }) => {
  console.log('=========================files==========================');
  console.log(files);
  processFiles(files, (buff) => {
    console.log(buff.toString());
  }).then(() => {
    console.log('=========================done==========================');
  })
}, err => {
  console.log('=========================err==========================');
  console.dir(err);
});
