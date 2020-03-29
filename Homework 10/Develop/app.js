const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

let employees = []
function createTeam(){
    inquirer.prompt([
         {
             type: "input",
             name: "name",
             message: "What is the Employee's name?"
         },
         {
             type: "input",
             name: "id",
             message: "What is the Employee's ID Number?"
         },
         {
             type: "input",
             name: "email",
             message: "What is the Employee's email address?"
         },
         {
             type: "list",
             name: "employeeType",
             message: "What is your position?",
             choices: ["Intern", "Engineer", "Manager"]
         },

        ]).then((data) => {
            if (data.employeeType == "Engineer") {
                createEngineer(data)
            } else if (data.employeeType == "Manager"){
                createManager(data)
            } else if (data.employeeType == "Intern"){
                createIntern(data)
            }
        }) 
    }


function createEngineer(employeeInfo){
    inquirer.prompt([{
        type: "input",
        message: "What is your Github",
        name: "github"
    },
        {
            type:"confirm",
            name: "moreEmployees",
            message: "Would you like to add more?"
        }
    ]).then((data) => {

        const {name, id, email} = employeeInfo
        const {github} = data

        let newEngineer = new Engineer(name, id, email, github)
        employees.push(newEngineer)
        if(data.moreEmployees){
            createTeam()
        } else {
            finished()
        }
    })
}

function createManager(employeeInfo){
inquirer.prompt([{
    type:"input",
    message: "What is the office number",
    name: "officeNumber"
},
{
    type:"confirm",
    name: "moreEmployees",
    message: "Would you like to add more?"
}
]).then((data) => {

        const {name, id, email} = employeeInfo
        const {officeNumber} = data

        let newManager = new Manager(name, id, email, officeNumber)
        employees.push(newManager)
        if(data.moreEmployees){
            createTeam()
        } else {
            finished()
        }
    })
}

function createIntern(employeeInfo){
    inquirer.prompt([{
        type:"input",
        message: "What is your University",
        name: "school"
    },
    {
        type:"confirm",
        name: "moreEmployees",
        message: "Would you like to add more?"
    }
    ]).then((data) => {
            const {name, id, email} = employeeInfo
        const {school} = data

        let newIntern = new Intern(name, id, email, school)
        employees.push(newIntern)
        if(data.moreEmployees){
            createTeam()
        } else {
            finished()
        }
    })
}

function finished(){
fs.writeFile(outputPath,render(employees), (err,data)=>{
    console.log("done")
})
}

    createTeam()
