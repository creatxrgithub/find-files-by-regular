const fs = require('fs');
const path = require('path');


const files = [];


function findFiles(startNode, pattern, ignoreCase=false, recursive=true, dirOnly=false) {
	//搜索條件爲空，則默認只返回目錄作爲搜索結果。
	if(pattern==null) {
		dirOnly = true;
		pattern = '';
	} else if(pattern.trim()=='') {
		dirOnly = true;
	}
	
	if(dirOnly==false) {
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
					if(recursive) findFiles(ofile, pattern, ignoreCase, recursive, dirOnly);  //爲了尾遞歸優化，深度優先的目錄深入遞歸的代碼當在最後一行
				}
			}
		}
	} else {
		let reg = null;
		if(ignoreCase==true) {
			reg = new RegExp(pattern,'gi');
		} else {
			reg = new RegExp(pattern,'g');
		}
		let stats = fs.statSync(startNode);
		if(stats.isDirectory()) {
			let list = fs.readdirSync(startNode);
			for(let i=0; i<list.length; i++) {
				let ofile = path.join(startNode,list[i]);
				if(fs.statSync(ofile).isDirectory()) {
					if(list[i].match(reg))	{
						files.push(ofile);
					}
					if(recursive) findFiles(ofile, pattern, ignoreCase, recursive, dirOnly);  //爲了尾遞歸優化，深度優先的目錄深入遞歸的代碼當在最後一行
				}
			}
			if(startNode.match(reg)) {  //如果根目錄符合搜索條件
				if(files.includes(startNode)==-1) {  //如果沒有符合搜索條件的子目錄
					files.push(startNode);  //則將根目錄加入結果列表
				}
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
 * dirOnly: default is false
 * @return
 * return: array of  files collection, if catch exception, will return empty array
 */
function result(startNode, pattern, ignoreCase=false, recursive=true, dirOnly=false) {
	try {
		findFiles(startNode, pattern, ignoreCase, recursive, dirOnly);
	} catch(e) {
		//捕獲錯誤
//		console.log(`\x1b[31m請檢查起始搜索路徑\x1b[0m﹝${startNode}﹞\x1b[31m或文件名匹配表達式\x1b[0m﹝${pattern}﹞\x1b[31m是否正確\x1b[0m`);
		console.log(`\x1b[31m Please check if the path name \x1b[0m﹝${startNode}﹞\x1b[31m or regular expression\x1b[0m﹝${pattern}﹞\x1b[31m is correct. \x1b[0m`);
	}
	return files;
}


module.exports = result;

