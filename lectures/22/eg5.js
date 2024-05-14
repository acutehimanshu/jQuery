const fs = require('fs');
fs.stat('abc.xyz', (e,s)=>{
    if(e){
        console.log(e);
    }else{
        console.log(s);
    }
});

/*

[Error: ENOENT: no such file or directory, stat 'C:\technology\jQuery\lectures\22\abc.xyz'] {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'stat',
  path: 'C:\\technology\\jQuery\\lectures\\22\\abc.xyz'
}

*/