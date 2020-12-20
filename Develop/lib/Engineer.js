// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

// Add class for GitHub for Engineer
class Engineer extends Employee {
    addGitHub(engineer) {
        classes = classes.filter(en => {
            return en.gitHub != engineer.gitHub
        })
    }
}
