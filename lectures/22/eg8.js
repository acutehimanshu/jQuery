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
    let file = await makeDirectory("abc/xyz/lmn/cool"); 
    // Error
    // this will assume abc, xyz and lmn should be there
    // then it will create cool otherqwise Error
    console.log(file);
    console.log("Directory Created");
}
main();
/*
folder created
Directory Created


*/ // Sync