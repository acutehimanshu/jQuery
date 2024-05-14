const fs = require('fs');
function getStats(f){
    return new Promise((resolve, reject)=>{
        fs.stat(f, function(e,s){
            resolve(s);
        });
    });
}
async function main(){
    let res = await getStats("eg1.js");
    console.log(res.isFile()); // true for eg1.js
    console.log(res.isDirectory()); // false for eg1.js
    console.log("Details of File eg1.js");
}
main();

/*


*/