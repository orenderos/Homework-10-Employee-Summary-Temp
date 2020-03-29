// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// name
// id
// title
// getName()
// getId()
// getEmail()
// getRole() // Returns 'Employee
// github  // GitHub username
// getGithub()
// getRole() // Overridden to return 'Engineer'

const Employee = require("../lib/Employee")

class Engineer extends Employee{
    constructor (name, id, email, github){
        super(name, id, email);
        this.github = github;
    }

getRole(){
    return "Engineer"
}

getGithub(){
    return this.github
}

}

module.exports = Engineer