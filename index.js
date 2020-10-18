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

// init = () => {
//     con.connect(function (err) {
//         if (err) throw err;
//         con.query("SELECT * FROM department", function (err, result, fields) {
//             if (err) throw err;
//             console.log(result);
//         });
//     });
// };

// init();




const menuSelection = [
    {
        type: 'list',
        name: 'selection',
        message: "Please select an option.",
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role'
        ]
    }
];

// Main menu function
async function mainMenu() {
    try {

        // Prompt Inquirer menuSelection
        const userSelection = await inquirer.prompt(menuSelection);

        console.log("Your responses: ", userSelection.selection);
        if (userSelection.selection == 'view all departments') {
            departments();
        };

        if (userSelection.selection === 'view all roles') {
            roles();
        };

        if (userSelection.selection === 'view all employees') {
            employees();
        };

        if (userSelection.selection === 'add a department') {
            addDepartment();
        };

        if (userSelection.selection === 'add a role') {
            addRole();
        };

        if (userSelection.selection === 'add an employee') {
            addEmployee();
        };

        if (userSelection.selection === 'update an employee role') {
            updateEmployeeRole();
        };

    } catch (error) {
        console.log(error);
    }
};
// Main menu function

// View selection
departments = () => {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM department", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            mainMenu();
        });
    });
};

roles = () => {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM role", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            mainMenu();
        });
    });
};

employees = () => {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM employee", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            mainMenu();
        });
    });
};
// View selection

// Add selection
addDepartment = () => {
    inquirer.prompt(
        {
            type: 'input',
            name: 'departmentname',
            message: 'What is the name of the department?',
        }
    ).then(answer => {
        const departAnswer = answer.departmentname;
        con.connect(function (err) {
            if (err) throw err;
            const sql = "INSERT INTO department (name) VALUES" + "('" + departAnswer +"')";
            con.query(sql, [values], function (err, result) {
                if (err) throw err;
                console.log("Success! Here are the results: " + result);
                mainMenu();
            });
        });
    });
};

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'rolename',
            message: 'What is the name of the role?',
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log('Please enter a valid role!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salaryamount',
            message: 'Please enter a salary amount.',
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log('Please enter a valid amount');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'departmentname',
            message: 'What department would you like to add this role to?',
            choices: function () {
                var depArray = [];

                res.forEach(department => {
                    depArray.push(department.name)
                });
                return depArray;
            }
        }
    ])
        .then(answer => {
            connection.query(`INSERT INTO role SET ?`, {
                title: answer.rolename,
                salary: answer.salaryamount,
                department_id: answer.departmentName
            }),
                console.log('Role added')

            mainMenu();
        })

    console.log('You selected to add a role');
};

addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: "What is the employee's first name?",
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log("Please enter the employee's first name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastname',
            message: "What is the employee's last name?",
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log("Please enter the employee's last name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'rolename',
            message: "What is the employee's role ID?",
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log("Please enter a role ID for the employee.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerid',
            message: "What is the manager's ID?",
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log("Pkease eneter the manager's ID.");
                    return false;
                }
            }

        }

    ])
        .then(answer => {
            connection.query(`INSERT INTO employee SET ?`, {
                first_name: answer.first.name,
                last_name: answer.lastname,
                role_id: answer.rolename,
                manager_id: answer.managerid
            });
            console.log('New employee added');

            mainMenu();
        });
    console.log('You selected to add an employee ');
};
// Add selection

// Update selection
updateEmployeeRole = () => {
    console.log('You selected to update an employee role');
    mainMenu();
};
// Update selection

mainMenu();
