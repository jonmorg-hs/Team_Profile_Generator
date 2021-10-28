const generateManager = function (manager) {
  return `
    <div class="card">
            <div class="card-header">
                <h3>${manager.name}</h3>
                <img src='../assets/images/manager.png'>
                <label>Manager</label>
            </div>
            <div class="card-body">
                <br/>
                <p class="id">ID: ${manager.id}</p>
                <p class="email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
                <p class="office">Office Number: ${manager.officeNumber}</p>
            </div>
    </div>
    `;
};

const generateEngineer = function (engineer) {
  return `
    <div class="card">
            <div class="card-header">
                <h3>${engineer.name}</h3>
                <img src='../assets/images/engineer.png'>
                <label>Engineer</label>
            </div>
            <div class="card-body">
                <br/>
                <p>ID: ${engineer.id}</p>
                <p>Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
                <p>Github: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
            </div>
    </div>
    `;
};

const generateIntern = function (intern) {
  return `
    <div class="card">
            <div class="card-header">
                <h3>${intern.name}</h3>
                <img src='../assets/images/intern.png'>
                <label>Intern</label>
            </div>
            <div class="card-body">
                <br/>
                <p>ID: ${intern.id}</p>
                <p>Email:<a href="mailto:${intern.email}">${intern.email}</a></p>
                <p>School: ${intern.school}</p>
            </div>
</div>
    `;
};

generateHTML = (data, teamName) => {
  console.log(JSON.stringify(data));
  pageArray = [];
  teamName = "";
  for (let i = 0; i < data.length; i++) {
    if ("team" in data[i]) {
      teamName = data[i]["team"];
    } else {
      const employee = data[i];
      const role = employee.getRole();
      if (role === "Manager") {
        const managerCard = generateManager(employee);
        pageArray.push(managerCard);
      }
      if (role === "Engineer") {
        const engineerCard = generateEngineer(employee);
        pageArray.push(engineerCard);
      }
      if (role === "Intern") {
        const internCard = generateIntern(employee);
        pageArray.push(internCard);
      }
    }
  }
  const employeeCards = pageArray.join("");
  const generateTeam = generateTeamPage(employeeCards, teamName);
  return generateTeam;
};

const generateTeamPage = function (employeeCards, teamName) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Team Profile Generator</title>
      <link rel="stylesheet" href="../assets/style.css">
  </head>
  <body>
      <header>
              <span>${teamName}</span>
      </header>
      <main>
          <div class="container">
              <div id="team-cards">
                  ${employeeCards}
              </div>
          </div>
      </main>     
  </body>
 </html>
`;
};

module.exports = generateHTML;
