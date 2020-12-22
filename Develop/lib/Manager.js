// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

// Add class for Office Number for Manager
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getOfficeNumber () {
        console.log(this.officeNumber);
        return this.officeNumber;
    }
}

module.exports = Manager;
