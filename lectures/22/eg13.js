const fs = require('fs');
fs.readdir(".", // . means we are talking about current directory
function(e, files){
	console.log(files);
}
);