const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = []

//Questions for standard employee data
const standardQuestions =  [
    {
        type: "list",
        name: "type",
        message: "What kind of employee are you trying to add to the site?",
        choices: [ "Manager", "Engineer", "Intern" ]
    },
    {
        type: "input",
        name: "name",
        message: `What is this employee's name?`
    },
    {
        type: "input",
        name: "id",
        message: "What is this employee's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is this employee's email?"
    }
]

//Manager specific questions
const managerQuestions = [
    {
        type: "input",
        name: "officeNumber",
        message: `What is this employees office number?`
    }
]

//Engineer specific questions
const engineerQuestions = [
    {
        type: "input",
        name: "answer",
        message: `What is this employees github?`
    }
]

//Intern specific questions
const internQuestions = [
    {
        type: "input",
        name: "answer",
        message: `What is this employees school name?`
    }
]

//Asking if you want to add more employees
const addMoreEmployees = [
    {
        type: "list",
        name: "yesNoAnswer",
        message: "Would you like to add more employees to the site?",
        choices: [ "Yes","No"]
    }
]

//Will ask all the proper question to create an employee object
addEmployee = () => {
    inquirer.prompt(standardQuestions).then((standardAnswers)=> {
    
        //Defines out what type of employee was selected
        let employeeType = standardAnswers.type.toLowerCase() + "Questions"
    
        //String references to question variables defined above
        const questionRef = {"managerQuestions": managerQuestions, "engineerQuestions": engineerQuestions, "internQuestions": internQuestions}
    
        //Asking employee type specific questions
        inquirer.prompt(questionRef[employeeType]).then( specificAnswers =>{

            const typeRef = {"Manager": Manager, "Engineer": Engineer, "Intern": Intern}
            
            //Create correct employee object and push it to the employee array
            employeeArray.push(new typeRef[standardAnswers.type](standardAnswers.name,  standardAnswers.id, standardAnswers.email, specificAnswers.answer))
    
            //Ask the user if they would like to add more employees if yes loop through everything again else return
            inquirer.prompt(addMoreEmployees).then(response =>{
                if(response.yesNoAnswer === "Yes"){ 
                    console.log("")
                    console.log("=========================================")
                    console.log("")
                    addEmployee()
                }else{
                    fs.writeFile("./output/log.html", render(employeeArray), err => {
                        if(err){
                            return console.log(err)
                        }
                        console.log("Your file has been created")
                    });
  
                }   
            })

        })
    })
}


addEmployee()

