const mysql = require('mysql2');
const inquirer = require('inquirer');
//const cTable = require('console.table');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'vutang',
    password: 'vutang',
    database: 'employees'
});

connection.connect(err => {
    if (err) throw err;
    console.log(' WELCOME TO EMPLOYEE TRACKER!')

    init();
});

init = () => {
    connection.query(
        'SELECT * FROM role',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
};

