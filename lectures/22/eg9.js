const fs = require('fs');

function makeDirectory (dName){
    return new Promise((res, rej)=>{
        fs.mkdir(dName, 
            {recursive:true},  // change here 
            function(e){ 
            if(e)
                rej(e)
            else    
                res("Folder Created");
        });
    });
}

const main = async ()=>{
    let file = await makeDirectory("abc/xyz/lmn/cool"); 
    // folder Created
    // If we pass recursive True then it will create complete path. 
    
    console.log(file);
    console.log("Directory Created");
}
main();
/*
folder created
Directory Created


*/ // Sync