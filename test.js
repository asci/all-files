const {getFilenames, processFiles} = require('./index.js');
const root = __dirname + '/test-dir';
const promises = [
  getFilenames(root, /\.js$/i),
  getFilenames(root, '.js'),
  getFilenames(root, (f) => ~f.indexOf('.js'))
];

Promise.all(promises).then((results) => {
  console.assert(results[0].files[0] === results[1].files[0]);
  console.assert(results[0].files[0] === results[1].files[0]);
  console.assert(results[0].files.length === 1);
  console.assert(results[0].files.length === results[1].files.length);
  console.assert(results[0].files.length === results[1].files.length);
  const filenames = results[0].files;
  processFiles(filenames, (buff) => {
    console.log(buff.toString());
  });
}, err => {
  console.log('=========================err==========================');
  console.dir(err);
});
