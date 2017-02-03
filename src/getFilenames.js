const fs = require('fs');
const spawn = require('child_process').spawn;

/**
 * get filenames form directory
 * @param  {String} rootDir root directory
 * @param  {Function|String|Regex} [filter=Boolean] filter
 * @return {Object} {errors, files}
 */
module.exports = function getFilenames(rootDir, filter = Boolean) {
  let filterFunc = filter;

  if (typeof filter === 'string') {
    filterFunc = (str) => ~str.indexOf(filter);
  }

  if (filter instanceof RegExp) {
    filterFunc = filter.test.bind(filter);
  }

  return new Promise((resolve) => {
    const find = spawn('find', [rootDir]);
    const errors = [];
    let output = '';

    find.stdout.on('data', data => {
      output += data.toString();
    });

    find.stderr.on('data', data => {
      errors.push(data.toString());
    });

    find.on('close', () => {
      const files = output.split('\n').filter(filterFunc);

      resolve({
        errors,
        files
      });
    });
  });
}
