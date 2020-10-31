const fs = require('fs');
const path = require('path');


const files = [];


function findFiles(startNode, pattern, ignoreCase=false, recursive=true) {
	let reg = null;
	if(ignoreCase==true) {
		reg = new RegExp(pattern,'gi');
	} else {
		reg = new RegExp(pattern,'g');
	}
	let stats = fs.statSync(startNode);
	if(stats.isFile()) {
		if(startNode.match(reg)) {
			files.push(startNode);
		}
	} else if(stats.isDirectory()) {
		let list = fs.readdirSync(startNode);
		for(let i=0; i<list.length; i++) {
			let ofile = path.join(startNode,list[i]);
			if(fs.statSync(ofile).isFile()) {
				if(list[i].match(reg))	{
					files.push(ofile);
				}
			} else if(fs.statSync(ofile).isDirectory()) {
				if(recursive) findFiles(ofile, pattern, ignoreCase, recursive);  //爲了尾遞歸優化，深度優先的目錄深入遞歸的代碼當在最後一行
			}
		}
	}
}


/**
 * @params
 * startNode: path or file 's name
 * pattern: regular expression for file 's name
 * ignoreCase: default is false
 * recursive: default is true
 * @return
 * return: array of  files collection, if catch exception, will return empty array
 */
function result(startNode, pattern, ignoreCase=false, recursive=true) {
	try {
		findFiles(startNode, pattern, ignoreCase, recursive);
	} catch(e) {
		//捕獲錯誤
//		console.log(`\x1b[31m請檢查起始搜索路徑\x1b[0m﹝${startNode}﹞\x1b[31m或文件名匹配表達式\x1b[0m﹝${pattern}﹞\x1b[31m是否正確\x1b[0m`);
		console.log(`\x1b[31m Please check if the path name \x1b[0m﹝${startNode}﹞\x1b[31m or regular expression\x1b[0m﹝${pattern}﹞\x1b[31m is correct. \x1b[0m`);
	}
	return files;
}


module.exports = result;

