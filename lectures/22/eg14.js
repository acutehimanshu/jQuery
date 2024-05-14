const fs = require('fs');
fs.readdir(".", // . means we are talking about current directory
function(e, files){
	files.forEach(function(file){
	console.log(file);
	});
}
);