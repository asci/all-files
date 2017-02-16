'use strict';

var fs = require('fs');

module.exports = function processFiles(filenames, processor) {
  var errors = {};
  var processed = 0;

  // TODO make it with limits (like not more then 10 files opened at the same time)
  var promises = filenames.map(function (filename) {
    return new Promise(function (resolve, reject) {
      fs.readFile(filename, function (err, buff) {
        if (err) {
          processed++;
          errors[filename] = err;
          resolve();
          return;
        }

        var result = void 0;
        try {
          result = processor(buff, filename);
        } catch (err) {
          errors[filename] = err;
          resolve();
          return;
        }

        // if it is a Promise-like object - wait for resolving
        if (result && result.then && typeof result.then === 'function') {
          result.then(resolve).catch(function (err) {
            errors[filename] = err;
            resolve();
          });
          return;
        }

        resolve(result);
      });
    });
  });

  return Promise.all(promises).then(function (results) {
    return {
      results: results,
      errors: errors
    };
  });
};