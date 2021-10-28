//install page creator
const generateHTML = require("./src/generateHTML");

//install team profiles
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//install node modules
const fs = require("fs");
const inquirer = require("inquirer");

//creating team array
const teamArray = [];

const addTeam = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "team",
        message: "What is the name of this team?",
        validate: (team) => {
          if (team) {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then((data) => {
      teamArray.push(data);
    });
};
//prompt for manager details
const addManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the Manager of this team?",
        validate: (name) => {
          if (name) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Please input the Manager's ID.",
        validate: (id) => {
          if (isNaN(id)) {
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please input the Manager's Email.",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please input the Manager's office number",
        validate: (number) => {
          if (isNaN(number)) {
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((data) => {
      const { name, id, email, officeNumber } = data;
      const manager = new Manager(name, id, email, officeNumber);
      teamArray.push(manager);
    });
};

//prompts for employee details
const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please choose your Employee's role",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What's the name of the Employee?",
        validate: (name) => {
          if (name) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Please input the Employee's ID.",
        validate: (id) => {
          if (isNaN(id)) {
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please input the employee's email.",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "github",
        message: "Please input the Employee's github username.",
        when: (input) => input.role === "Engineer",
        validate: (username) => {
          if (username) {
            return true;
          } else {
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "Please input the Intern's school",
        when: (input) => input.role === "Intern",
        validate: (school) => {
          if (school) {
            return true;
          } else {
          }
        },
      },
      {
        type: "confirm",
        name: "addNewEmployee",
        message: "Would you like to add more team members?",
        default: false,
      },
    ])
    .then((employeeData) => {
      let { name, id, email, role, github, school, addNewEmployee } =
        employeeData;
      let employee;
      if (role === "Engineer") {
        employee = new Engineer(name, id, email, github);
      } else if (role === "Intern") {
        employee = new Intern(name, id, email, school);
      }
      teamArray.push(employee);
      if (addNewEmployee) {
        return addEmployee(teamArray);
      } else {
        return teamArray;
      }
    });
};

//Generate HTML page file using file system
const writeFile = (data) => {
  fs.writeFile("./dist/index.html", data, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Your Team Profile has been successfully created!");
    }
  });
};

addTeam()
  .then(addManager)
  .then(addEmployee)
  .then((teamArray) => {
    return generateHTML(teamArray);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });
