const { getFilenames } = require('../src/index.js');
const root = __dirname + '/test-dir';
const promises = [
  getFilenames(root, /\.js$/i),
  getFilenames(root, '.js'),
  getFilenames(root, (f) => ~f.indexOf('.js'))
];

Promise.all(promises).then((results) => {
  console.assert(results[0].files[0] === results[1].files[0]);
  console.assert(results[0].files[0] === results[1].files[0]);
  console.assert(results[0].files.length === 3);
  console.assert(results[0].files.length === results[1].files.length);
  console.assert(results[0].files.length === results[1].files.length);
  return '';
}, err => {
  console.log('=========================err==========================');
  console.dir(err);
}).then(console.log.bind(console, 'getFilenames: DONE'));
