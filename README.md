# find files by regular expression



function findFiles(startNode, pattern, ignoreCase=false, recursive=true)


npm install find-files-by-regular

const findfiles = require('find-files-by-regular');

let fileNamePattern = /\.js$/;

let startFolder='.';

let files = findfiles(startFolder, fileNamePattern);

console.log(files);
