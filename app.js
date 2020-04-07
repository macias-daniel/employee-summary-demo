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
                    console.log(employeeArray)
                }
            })
        })
    })
}



addEmployee()



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
