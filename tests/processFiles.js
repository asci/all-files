const { getFilenames, processFiles } = require('../src/index.js');
const root = __dirname + '/test-dir';
const processed = [];

getFilenames(root, '.js').then(({ files }) => {
  return processFiles(files, (buffer, filename) => {
    console.assert(~files.indexOf(filename), 'filename is not in files list');
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        processed.push(filename);
        if (~filename.indexOf('2')) {
          reject('eg. Currupted file');
          return;
        }
        resolve();
      }, 100);
    });
  });
}, err => {
  console.log('=========================err==========================');
  console.dir(err);
})
.then(({results, errors}) => {
  console.log('=========================res==========================');
  console.dir(results);
  console.log('=========================errors==========================');
  console.dir(errors);
  console.assert(processed.length === 3, 'processed.length is incorrect', processed.length);
  console.assert(Object.keys(errors).length === 1, 'processed.length is incorrect', processed.length);
  console.log('processFiles: DONE');
});
