// Imports
const fs = require('fs');
const spawn = require('child_process').spawn;

// Exports
module.exports.getFilenames = getFilenames;
module.exports.processFiles = processFiles;

// Code
function getFilenames(rootDir, filter = Boolean) {
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
      const files = output.split('\n').filter(filter);

      resolve({
        errors,
        files
      });
    });
  });
}

function processFiles(filenames, processor) {
  const errors = {};
  let processed = 0;

  // TODO make it with limits (like not more then 10 files opened at the same time)
  const promises = filenames.map(filename => {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, (err, buff) => {
        if (err) {
          processed++;
          errors[filename] = err;
          resolve();
          return;
        }

        let result;
        try {
          result = processor(buff);
        } catch (err) {
          return reject(err);
        }

        // if it is a Promise-like object - wait for resolving
        if (result && result.then && typeof result.then === 'function') {
          return result.then(resolve).catch((err) => {
            errors[filename] = err;
            resolve();
          });
        }

        resolve(result);
      });
    });
  });

  return Promise.all(promises);
}
