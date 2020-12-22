// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        console.log(this.name, "is my name");
        return this.name;
    }
    getId() {
        console.log(this.id, "is my id");
        return this.id;
    }
    getEmail() {
        console.log(this.email, "is my email");
        return this.email;
    }
    getRole() {
        console.log(this.constructor.name);
        return this.constructor.name;
    }

}


module.exports = Employee;