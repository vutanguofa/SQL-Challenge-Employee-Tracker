const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const sqlite3 = require('sqlite3').verbose();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vutang",
    database: "employees_db"
});

// Create table and insert section
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     //const sql = "CREATE TABLE department (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
//     //const sql = "CREATE TABLE role (id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY, title VARCHAR(30) NOT NULL, salary DECIMAL NOT NULL, department_id INTEGER UNSIGNED NOT NULL)";
//     //const sql = "CREATE TABLE employee (id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(30) NOT NULL, last_name VARCHAR(30) NOT NULL, role_id INTEGER UNSIGNED, manager_id INTEGER UNSIGNED)";
//     //const sql = "INSERT INTO department (name) VALUES ('Management')";
//     const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?";
//     const values = [
//         ['John', 'Doe', 1, 1],
//         ['John', 'Doe', 1, 1],
//         ['[Jane', 'Smith', 2, 2],
//         ['hris', 'Jackson', 3, 3],
//         ['Ryan', 'Johnson', 4, 4],
//         ['Jessica', 'Reed', 5, 5],
//         ['Michelle', 'Miller', 6, 6],
//         ['Amber', 'Jones', 7, 7],
//         ['[Dan', 'Jordan', 9, 9],
//         ['Bobby', 'Miles', 10, null]
//     ];
//     con.query(sql, [values], function (err, result) {
//         if (err) throw err;
//         console.log("Success! Here are the results: " + result);
//     });
// });
// Create table and insert section


// Query data section
// con.connect(function (err) {
//     if (err) throw err;
//     con.query("SELECT * FROM employee_db", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// });
// Query data section

init = () => {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM role", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
};

init();



