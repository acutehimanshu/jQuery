const express = require('express');
const oracle = require('oracledb');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const urlEncodedBodyparser = bodyParser.urlencoded({extended:false});

const timepass = (ms)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, ms);
    });
}

class Department{
    constructor(id, name){
        this.id = id;
        this.name= name;
    }
    getId(){return this.id; }
    getName(){return this.name; }
}
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

app.get("/getDepartments", async function(request, response){
    var connection = null;
    try {
        connection = await oracle.getConnection({
            'user':'hr',
            'password':'hr',
            'connectionString':'//localhost:1521/xepdb1'
        });
        let resultset = await connection.execute('Select department_id, department_name FROM departments ORDER BY department_name');
        var i = 0;
        var departments=[];
        var dep;
        while(i<resultset.rows.length){
            dep = new Department(resultset.rows[i][0],resultset.rows[i][1]);
            departments.push(dep);
            i++;
        }
        await connection.close();
        response.send(departments);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/getEmpoloyeesByDepartment", urlEncodedBodyparser,  async function(request, response){
    await timepass(2500);  // its await so once this function end then only it will execute next line. 
    let connection = null;
    try{
        connection = await oracle.getConnection({
            user:"hr",
            password:"hr",
            connectionString:"//localhost:1521/xepdb1"
        });
        var departmentId = parseInt(request.query.departmentId);
        // let resultSet = await connection.execute("select first_name from employees where first_name like 'A%' order by first_name");
        let resultSet = await connection.execute(`select employee_id,first_name,last_name from employees where department_id = '${departmentId}' order by first_name`);
        if(resultSet.rows.length == 0){
            await connection.close();
            response.sendStatus(404);
            return;
        }
        var employees = [];
        resultSet.rows.forEach((item)=>{
            employees.push(new Employee(item[0], item[1] ,item[2]));
        });
        response.send(employees);
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

app.get("/getNames", urlEncodedBodyparser,  async function(request, response){
    let connection = null;
    try{
        connection = await oracle.getConnection({
            user:"hr",
            password:"hr",
            connectionString:"//localhost:1521/xepdb1"
        });
        var firstNamePattern = request.query.firstNamePattern;
        // let resultSet = await connection.execute("select first_name from employees where first_name like 'A%' order by first_name");
        let resultSet = await connection.execute(`select distinct first_name from employees where lower(first_name) like '${firstNamePattern}%' order by first_name`);
        var list = [];
        resultSet.rows.forEach((item)=>{
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