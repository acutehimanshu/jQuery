const fs = require('fs');
fs.readdir(".", // . means we are talking about current directory
function(e, files){
	files.forEach(function(file){
	fs.stat(file, function(e, stat){
	if(stat.isFile()) console.log("File: "+file );
	if(stat.isDirectory()) console.log("Directoy : "+file );
});
	});
}
);