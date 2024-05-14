const fs = require('fs');

function makeDirectory (dName){
    return new Promise((res, rej)=>{
        fs.mkdir(dName, {}, function(e){
            if(e)
                rej(e)
            else    
                res("Folder Created");
        });
    });
}

const main = async ()=>{
    let file = await makeDirectory("SyncDirectory");
    console.log(file);
    console.log("Directory Created");
}
main();
/*
folder created
Directory Created


*/ // Sync