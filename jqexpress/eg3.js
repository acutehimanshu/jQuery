const express = require('express');
const oracle = require('oracledb');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const urlEncodedBodyparser = bodyParser.urlencoded({extended:false});

class Employee {
    constructor(id, fn, ln){
        this.id = id; 
        this.firstName = fn;
        this.lastName = ln;
    }
    getId(){return this.id; }
    getFirstName(){return this.firstName; }
    getLastName(){return this.lastName; }
}

app.use(express.static("learn")); // to read static data from learn directory
app.get("/", function(request, response){
    response.redirect('/index.html');
});

app.get("/getEmployees", async function(request, response){
    var connection = null;
    try {
        connection = await oracle.getConnection({
            'user':'hr',
            'password':'hr',
            'connectionString':'//localhost:1521/xepdb1'
        });
        let resultset = await connection.execute('Select employee_id, first_name, last_name FROM employees ORDER BY first_name');
        var i = 0;
        var emps=[];
        var emp;
        while(i<resultset.rows.length){
            emp = new Employee(resultset.rows[i][0],resultset.rows[i][1],resultset.rows[i][2]);
            emps.push(emp);
            i++;
        }
        await connection.close();
        response.send(emps);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/getNames", urlEncodedBodyparser,  async function(request, response){
    let connection = null;
    try{
        connection = await oracle.getConnection({
            user:"hr",
            password:"hr",
            connectionString:"//localhost:1521/xepdb1"
        });
        var firstNamePattern = request.query.firstNamePattern;
        console.log(firstNamePattern)
        // let resultSet = await connection.execute("select first_name from employees where first_name like 'A%' order by first_name");
        let resultSet = await connection.execute(`select first_name from employees where lower(first_name) like '${firstNamePattern}%' order by first_name`);
        var list = [];
        resultSet.rows.forEach((item)=>{
            console.log(item)
            list.push(item[0]);
        });
        response.send(list);
    }catch(err){
        console.log(err.message)
    }
    finally{
        if (connection) {
            try {
                await connection.close();
            } catch (closeErr) {
                console.error('Error closing the connection:', closeErr);
            }
        }
    }
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