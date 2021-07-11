# find files by regular expression


/**
	if pattern is null or empty string, dirOnly will set to true by default
*/

function findFiles(startNode, pattern, ignoreCase=false, recursive=true, dirOnly=false)

npm install find-files-by-regular

const findfiles = require('find-files-by-regular');

let fileNamePattern = /\.js$/;

let startFolder='.';

let files = findfiles(startFolder, fileNamePattern);

console.log(files);
