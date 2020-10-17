const inquirer = require('inquirer');

// Inquirer prompts for userResponses
const questions = [
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

        // Prompt Inquirer questions
        const userSelections = await inquirer.prompt(questions);
        console.log("Your responses: ", userSelections);

    } catch (error) {
        console.log(error);
    }
};

init();