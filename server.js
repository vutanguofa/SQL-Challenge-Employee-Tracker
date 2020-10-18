const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'vutang',
    database: 'employees'
});

init = () => {
    // simple query
    connection.query(
        'SELECT * FROM employee',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
};

init();



// // Inquirer prompts for userSelection
// const menuSelection = [
//     {
//         type: 'list',
//         name: 'selection',
//         message: "Please select an option.",
//         choices: [
//             'view all departments',
//             'view all roles',
//             'view all employees',
//             'add a department',
//             'add a role',
//             'add an employee',
//             'update an employee role'
//         ]
//     }
// ];

// // Main function
// async function init() {
//     try {

//         // Prompt Inquirer menuSelection
//         const userSelection = await inquirer.prompt(menuSelection);

//         console.log("Your responses: ", userSelection.selection);
//         if (userSelection.selection == 'view all departments') {
//             departments();
//         };

//         if (userSelection.selection === 'view all roles') {
//             roles();
//         };

//         if (userSelection.selection === 'view all employees') {
//             employees();
//         };

//         if (userSelection.selection === 'add a department') {
//             addDepartment();
//         };

//         if (userSelection.selection === 'add a role') {
//             addRole();
//         };

//         if (userSelection.selection === 'add an employee') {
//             addEmployee();
//         };

//         if (userSelection.selection === 'update an employee role') {
//             updateEmployeeRole();
//         };

//     } catch (error) {
//         console.log(error);
//     }
// };

// departments = () => {
//     connection.query(`SELECT * FROM department`, (err, res) => {
//         if (err) throw err;
//         const table = cTable.getTable(res);
//         console.log(table);
//         init();
//     })
// };

// roles = () => {
//     const sql = `SELECT * FROM role`;
//     const params = [];
//     connection.query(sql, params, (err, rows) => {
//         if (err) throw err;

//         console.table(rows);

//         init();
//     });
//     console.log('You selected to view roles');
// };

// employees = () => {
//     const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary 
//                 FROM employee LEFT JOIN role ON employee.role_id = role.id 
//                 LEFT JOIN department ON role.department_id = department.id `;
//     const params = [];
//     connection.query(sql, params, (err, rows) => {
//         if (err) throw err;

//         console.table(rows);

//         init();

//     });
//     console.log('You selected to view employees');
// };

// addDepartment = () => {
//     inquirer.prompt(
//         {
//             type: 'input',
//             name: 'departmentname',
//             message: 'What is the name of the department?',
//             validate: answer => {
//                 if (answer) {
//                     return true;
//                 } else {
//                     console.log('Please enter a department name!');
//                     return false;
//                 }
//             }
//         }
//     )
//         .then(answer => {
//             connection.query(`INSERT INTO department SET ?`, {
//                 name: answer.departmentName
//             });

//             console.log('Department added');

//             init();
//         });
//     console.log('You selected to add a department');
// };

// addRole = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'rolename',
//             message: 'What is the name of the role?',
//             validate: answer => {
//                 if (answer) {
//                     return true;
//                 } else {
//                     console.log('Please enter a valid role!');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'input',
//             name: 'salaryamount',
//             message: 'Please enter a salary amount.',
//             validate: answer => {
//                 if (answer) {
//                     return true;
//                 } else {
//                     console.log('Please enter a valid amount');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'list',
//             name: 'departmentname',
//             message: 'What department would you like to add this role to?',
//             choices: function () {
//                 var depArray = [];

//                 res.forEach(department => {
//                     depArray.push(department.name)
//                 });
//                 return depArray;
//             }
//         }
//     ])
//         .then(answer => {
//             connection.query(`INSERT INTO role SET ?`, {
//                 title: answer.rolename,
//                 salary: answer.salaryamount,
//                 department_id: answer.departmentName
//             }),
//                 console.log('Role added')

//             init();
//         })

//     console.log('You selected to add a role');
// };

// addEmployee = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'firstname',
//             message: "What is the employee's first name?",
//             validate: answer => {
//                 if (answer) {
//                     return true;
//                 } else {
//                     console.log("Please enter the employee's first name.");
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'input',
//             name: 'lastname',
//             message: "What is the employee's last name?",
//             validate: answer => {
//                 if (answer) {
//                     return true;
//                 } else {
//                     console.log("Please enter the employee's last name.");
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'input',
//             name: 'rolename',
//             message: "What is the employee's role ID?",
//             validate: answer => {
//                 if (answer) {
//                     return true;
//                 } else {
//                     console.log("Please enter a role ID for the employee.");
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'input',
//             name: 'managerid',
//             message: "What is the manager's ID?",
//             validate: answer => {
//                 if (answer) {
//                     return true;
//                 } else {
//                     console.log("Pkease eneter the manager's ID.");
//                     return false;
//                 }
//             }

//         }

//     ])
//         .then(answer => {
//             connection.query(`INSERT INTO employee SET ?`, {
//                 first_name: answer.first.name,
//                 last_name: answer.lastname,
//                 role_id: answer.rolename,
//                 manager_id: answer.managerid
//             });
//             console.log('New employee added');

//             init();
//         });
//     console.log('You selected to add an employee ');
// };

// updateEmployeeRole = () => {
//     console.log('You selected to update an employee role');
// };