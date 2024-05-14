const fs = require('fs');
fs.stat("eg1.js", function(e,s){
    console.log(s);
});
console.log("Details of file eg1.js. ");


/*

Output

Details of file eg1.js. // this line show data is running in async Mode. 
Stats {
  dev: 812619810,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: 4096,
  ino: 34058472182102276,
  size: 125,
  blocks: 0,
  atimeMs: 1715704909644.7207,
  mtimeMs: 1715704906296.1091,
  ctimeMs: 1715704906296.1091,
  birthtimeMs: 1715704828576.9563,
  atime: 2024-05-14T16:41:49.645Z,
  mtime: 2024-05-14T16:41:46.296Z,
  ctime: 2024-05-14T16:41:46.296Z,
  birthtime: 2024-05-14T16:40:28.577Z
}

*/ 