const fs = require('fs');
const util = require('util');
const path = process.argv[2];
var readFile = util.promisify(fs.readFile);
var stat = util.promisify(fs.stat);
var exists = util.promisify(fs.exists);
var getFileContents = util.promisify(getFileContents);

function callback(err, contents) {
  if (err) {
    console.error(`There was an error getting contents for ${path}`, err);
    return;
  }
  console.info('File was found and the contents were loaded');
}

function getFileContents(path, callback) {
    exists(path).then(bool => {
        if (bool) {
            console.log('exists');
            stat(path).then(stats => {
              console.log(stats);
              if (stats.size > 0) {
                  readFile(path).then(buffer => callback(null, buffer)).catch(err => callback(new Error('Error trying to get stats')))
              } else {
                return callback(new Error('File exists but there is no content'));
              }
            }).catch(err => callback(new Error('Error trying to get stats')))
          } else {
            return callback(new Error('File does not exist'));
          }
    })
}


getFileContents(path, callback);
