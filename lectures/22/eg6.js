const fs = require('fs');
fs.mkdir("newDirectory", {} , (e)=>{
	if(e)
		console.log(e)
	else
		console.log("folder created");
});
console.log("Directory Created");

/*

Directory Created
folder created

*/ // THIS IS ASYNC CODE