// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
// Add class for GitHub for Engineer
class Engineer extends Employee {
    constructor (name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getGithub() {
        console.log(this.github);
        return this.github;
    }
}

module.exports = Engineer;
