const fs = require('fs');
function getStats(f){
    return new Promise((resolve, reject)=>{
        fs.stat(f, function(e,s){
            resolve(s);
        });
    });
}
async function main(){
    let res = await getStats("eg1.jss");
    console.log(res.isFile()); 
    console.log(res.isDirectory()); 
    console.log("Details of File eg1.js");
}
main();

/*


*/