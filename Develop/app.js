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
        type: 'input',
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
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
