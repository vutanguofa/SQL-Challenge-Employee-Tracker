const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
        message: "What would you like to do?",
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ]
    }
];

// Main menu function
async function mainMenu() {
    try {
        // Prompt Inquirer menuSelection
        const userSelection = await inquirer.prompt(menuSelection);
        if (userSelection.selection === 'View all departments') {
            departments();
        };

        if (userSelection.selection === 'View all roles') {
            roles();
        };

        if (userSelection.selection === 'View all employees') {
            employees();
        };

        if (userSelection.selection === 'Add a department') {
            addDepartment();
        };

        if (userSelection.selection === 'Add a role') {
            addRole();
        };

        if (userSelection.selection === 'Add an employee') {
            addEmployee();
        };

        if (userSelection.selection === 'Update an employee role') {
            updateEmployeeRoleupdateEmployeeRole();
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
        con.query("SELECT * FROM department", function (err, result) {
            if (err) throw err;
            const departmentTable = cTable.getTable(result);
            console.log(departmentTable);
            mainMenu();
        });
    });
};

roles = () => {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM role", function (err, result) {
            if (err) throw err;
            const rolesTable = cTable.getTable(result);
            console.log(rolesTable);
            mainMenu();
        });
    });
};

employees = () => {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM employee", function (err, result) {
            if (err) throw err;
            const employeesTable = cTable.getTable(result);
            console.log(employeesTable);
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
            const sql = "INSERT INTO department (name) VALUES ('" + departAnswer + "')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Success!");
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
            message: 'What department would you like to add this role to?' + '\n' + 'Select (1) for Frontend' + '\n' + 'Select (2) for Support' + '\n' + 'Select (3) for Management' + '\n',
            choices: [
                '1',
                '2',
                '3',
            ]
        }
    ]).then(answer => {
        const roleAnswer = answer.rolename;
        const salaryAmtAnswer = answer.salaryamount;
        const departNameAnswer = answer.departmentname;
        con.connect(function (err) {
            if (err) throw err;
            const sql = "INSERT INTO role (title, salary, department_id) VALUES ?";
            const values = [
                [roleAnswer, salaryAmtAnswer, departNameAnswer]
            ];
            con.query(sql, [values], function (err) {
                if (err) throw err;
                console.log("Success!");
                mainMenu();
            });
        });
    });
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
                    console.log("Please eneter the manager's ID.");
                    return false;
                }
            }
        }
    ]).then(answer => {
        const firstNameAnswer = answer.firstname;
        const lastNameAnswer = answer.lastname;
        const roleNameAnswer = answer.rolename;
        const managerIdAnswer = answer.managerid;
        con.connect(function (err) {
            if (err) throw err;
            const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?";
            const values = [
                [firstNameAnswer, lastNameAnswer, roleNameAnswer, managerIdAnswer]
            ];
            con.query(sql, [values], function (err) {
                if (err) throw err;
                console.log("Success!");
                mainMenu();
            });
        });
    });
};
// Add selection

// Update selection
updateEmployeeRoleupdateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: "Enter employee ID.",
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log("Please enter the employee's ID.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'newRole',
            message: 'What would you like to change the employee role to?' + '\n' + 'Select (1) for CS Agent 1' + '\n' + 'Select (2) for Team Lead' + '\n' + 'Select (3) for Supervisor' + '\n' + 'Select (4) for Technical Support' + '\n' + 'Select (5) for IT Support' + '\n' + 'Select (6) for Engineer' + '\n' + 'Select (7) for Project Manager' + '\n' + 'Select (8) for Work Director' + '\n' + 'Select (9) for Director' + '\n',
            choices: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9'
            ],
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log("Please enter the employee's last name.");
                    return false;
                }
            }
        },
    ]).then(answer => {
        const employeeIdAnswer = answer.employeeId;
        const newRoleAnswer = answer.newRole;
        con.connect(function (err) {
            if (err) throw err;
            const sql = "UPDATE employee SET role_id = '" + newRoleAnswer + "'" + "WHERE id = '" + employeeIdAnswer + "'";
            con.query(sql, function (err) {
                if (err) throw err;
                console.log("Success!");
                mainMenu();
            });
        });
    });
};
// Update selection

mainMenu();
