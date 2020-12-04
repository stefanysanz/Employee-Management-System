require("console.table");
const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = mysql.createConnection('mysql://root:Enzo@2016@localhost/employees_db')

db.connect(function (err) {
  if (err) throw err;
  console.log("OK!")
});

inquirer.prompt([
  {
    name: "choices",
    type: "list",
    message: "Welcome. What would you like to do?",
    choices: ['View all employees', 'Add an employee', 'Delete an employee']
  }
])
  .then(res => {
    console.log(res);

    switch (res.choices) {
      case "View all employees":
        db.query('SELECT * FROM employees', (err, rows) => {
          for (let i = 0; i < rows.length; i++) {
            console.log(rows[i]);
          }
        });
        break;
      case "Add an employee":
        db.query(`INSERT INTO employees (firstName, lastName, roleId, managerId) VALUES ('stef', 'sanz', 1, 3)`, (err, res) => { });
        break;
      case "Delete an employee":
        db.query(`DELETE FROM employees WHERE firstName='stef' AND lastName='sanz'`, (err, res) => { });
        break;
      default:
        console.log("do something else")
    }
  })
  .catch(err => console.log(err))