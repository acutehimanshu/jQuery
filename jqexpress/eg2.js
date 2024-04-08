const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("learn")); // to read static data from learn directory
app.get("/", function(request, response){
    response.redirect('/index.html');
});

app.listen(port, function(error){
    if(error){
        console.log(`Some problem ${error}`);
    }
    console.log(`Server is ready to accpet Request on Port: ${port}`);
});