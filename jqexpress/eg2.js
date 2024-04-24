const express = require('express');
const oracle = require('oracledb');
const app = express();
const port = 3000;

app.use(express.static("learn")); // to read static data from learn directory
app.get("/", function(request, response){
    response.redirect('/index.html');
});
app.get('/employees', async function(req, res){
    let connection = null;
    try {
        connection = await oracle.getConnection({
            user: "hr",
            password: "hr",
            connectionString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=xepdb1)))"
        });
        const result = await connection.execute("select * from employees");
        const rows = result.rows;
        let html = '<ul>';
        rows.forEach(row => {
            html += `<li>${row[0]}, ${row[1]}, ${row[2]}</li>`;
        });
        html += '</ul>';
        res.send(html);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (closeErr) {
                console.error('Error closing the connection:', closeErr);
            }
        }
    }
});


app.listen(port, function(error){
    if(error){
        console.log(`Some problem ${error}`);
    }
    console.log(`Server is ready to accpet Request on Port: ${port}`);
});