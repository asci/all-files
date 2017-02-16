'use strict';

var fs = require('fs');
var spawn = require('child_process').spawn;

/**
 * get filenames form directory
 * @param  {String} rootDir root directory
 * @param  {Function|String|Regex} [filter=Boolean] filter
 * @return {Object} {errors, files}
 */
module.exports = function getFilenames(rootDir) {
  var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Boolean;

  var filterFunc = filter;

  if (typeof filter === 'string') {
    filterFunc = function filterFunc(str) {
      return ~str.indexOf(filter);
    };
  }

  if (filter instanceof RegExp) {
    filterFunc = filter.test.bind(filter);
  }

  return new Promise(function (resolve) {
    var find = spawn('find', [rootDir]);
    var errors = [];
    var output = '';

    find.stdout.on('data', function (data) {
      output += data.toString();
    });

    find.stderr.on('data', function (data) {
      errors.push(data.toString());
    });

    find.on('close', function () {
      var files = output.split('\n').filter(filterFunc);

      resolve({
        errors: errors,
        files: files
      });
    });
  });
};