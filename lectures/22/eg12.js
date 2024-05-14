const fs = require('fs');

function makeDirectory (){
    return new Promise((res, rej)=>{
        fs.rm("abc",  // complete path will be deleted. 
        // here rmdir is depricated you can use Rm instead
        // If you want to delete all data insize just give the root directory name
            {recursive: true},  
            function(e){ 
            if(e)
                rej(e)
            else    
                res("Folder deleted");
        });
    });
}

const main = async ()=>{
    let file = await makeDirectory(); 
    // folder Created
    // If we pass recursive True then it will create complete path. 
    
    console.log(file);
    console.log("Directory deleted");
}
main();
/*
folder created
Directory Created


*/ // Sync