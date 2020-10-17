const inquirer = require('inquirer');

// Inquirer prompts for userSelection
const menuSelection = [
    {
        // WHEN I start the application
        //THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
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

// Main function
async function init() {
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

departments = () => {
    console.log('You selected to view departments');
};

roles = () => {
    console.log('You selected to view roles');
};

employees = () => {
    console.log('You selected to view employees');
};

addDepartment = () => {
    console.log('You selected to add a department');
};

addRole = () => {
    console.log('You selected to add a role');
};

addEmployee = () => {
    console.log('You selected to add an employee ');
};

updateEmployeeRole = () => {
    console.log('You selected to update an employee role');
};

init();