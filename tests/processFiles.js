const { getFilenames, processFiles } = require('../src/index.js');
const root = __dirname + '/test-dir';
const processed = [];

getFilenames(root, '.js').then(({ files }) => {
  return processFiles(files, (buffer, filename) => {
    console.assert(~files.indexOf(filename), 'filename is not in files list');
    return new Promise((resolve) => {
      setTimeout(()=> {
        processed.push(filename);
        resolve();
      }, 100);
    });
  });
}, err => {
  console.log('=========================err==========================');
  console.dir(err);
})
.then(() => {
  console.assert(processed.length === 3, 'processed.length is incorrect', processed.length);
  console.log('processFiles: DONE');
});
