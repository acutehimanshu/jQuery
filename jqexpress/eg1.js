const express = require('express');
const app = express();
const port = 3000;

app.get("/", function(request, response){
    response.send("Thinking machines in action for campus Placement / Internships");
});

app.listen(port, function(error){
    if(error){
        console.log(`Some problem ${error}`);
    }
    console.log(`Server is ready to accpet Request on Port: ${port}`);
});


/*
output: 
-------
on command line: 
Server is ready to accpet Request on Port: 3000

On Browser
localhost:3000
Thinking machines in action for campus Placement / Internships
*/