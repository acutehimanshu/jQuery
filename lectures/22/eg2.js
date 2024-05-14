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
    console.log(res);
    console.log("Details of File eg1.js");
}
main();

/*
output // in sync fashion

Stats {
  dev: 812619810,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 34058472182102276,
  size: 673,
  blocks: 1,
  atimeMs: 1715704929009.104,
  mtimeMs: 1715704928976.1123,
  ctimeMs: 1715704928976.1123,
  birthtimeMs: 1715704828576.9563,
  atime: 2024-05-14T16:42:09.009Z,
  mtime: 2024-05-14T16:42:08.976Z,
  ctime: 2024-05-14T16:42:08.976Z,
  birthtime: 2024-05-14T16:40:28.577Z
}
Details of File eg1.js

*/