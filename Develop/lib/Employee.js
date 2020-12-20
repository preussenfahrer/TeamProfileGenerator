// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    employeeName() {
        console.log(this.name, "is my name");
        return this;
    }
    employeeId() {
        console.log(this.id, "is my id");
        return this;
    }
    employeeEmail() {
        console.log(this.email, "is my email");
        return this;
    }

}


module.exports() = Employee