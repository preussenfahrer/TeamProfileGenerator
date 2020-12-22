const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { userInfo } = require("os");

const employees = [];
const roleQuestion = [
    {
        type: 'list',
        name: 'role',
        message: "What kind of employee would you like to add?",
        choices: ["Intern", "Manager", "Engineer"]
    },
]

const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is your employee's name?",
    },
    {
        type: 'input',
        name: 'id',
        message: "what is your employee's id?",
    },
    {
        type: 'input',
        name: 'email',
        message: "what is your employee's email address?",
    },
]

const internQuestions = [
    {
        type: 'input',
        name: 'school',
        message: "What school did you attend?",
    },
].concat(employeeQuestions);

const engineerQuestions = [
    {
        name: 'github',
        message: "Please provide your GitHub username: ",
    },
].concat(employeeQuestions);

const managerQuestions = [
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is your office number?",
    },
].concat(employeeQuestions);

const continueQuestion = [
    {
        type: 'confirm',
        name: 'continue',
        message: "Would you like to continue?",
    },
]
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function prompt() {
    var role;
    return inquirer.prompt(roleQuestion)
        .then(function (answers) {
            role = answers.role
            switch (answers.role) {
                case "Intern":
                    return inquirer.prompt(internQuestions);
                case "Engineer":
                    return inquirer.prompt(engineerQuestions);
                case "Manager":
                    return inquirer.prompt(managerQuestions);
            }
        })
        .then(function (answers) {
            var employee;
            switch (role) {
                case "Intern":
                    employee = new Intern(answers.name, answers.id, answers.email, answers.school)
                    break;
                case "Engineer":
                    employee = new Engineer(answers.name, answers.id, answers.email, answers.github)
                    break
                case "Manager":
                    employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            }
            employees.push(employee);
            return inquirer.prompt(continueQuestion)
        })
        .then(function (answers) {
            if (answers.continue) {
                return prompt();
            }
            var html = render(employees);
            fs.writeFileSync(outputPath, html, "UTF-8")
        })
        
}

prompt()
