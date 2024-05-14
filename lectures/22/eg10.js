const fs = require('fs');

function makeDirectory (){
    return new Promise((res, rej)=>{
        fs.rmdir("abc/xyz/lmn/cool",  // only cool folder will be deleted.
            {},  // if any file exist in cool it will not delete
            // if you want to delete it force fully make it recursive true
            function(e){ 
            if(e)
                rej(e)
            else    
                res("Folder Deleted");
        });
    });
}

const main = async ()=>{
    let file = await makeDirectory(); 
    // folder Created
    // If we pass recursive True then it will create complete path. 
    
    console.log(file);
    console.log("Directory Deleted");
}
main();
/*
folder created
Directory Created


*/ // Sync