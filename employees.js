const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = mysql.createConnection('mysql://root:root@localhost/employees_db')

db.connect((err) => {
  if (err) {
    throw err
  }
})

const updateEmployeeRole = (res) => {
  const query = `UPDATE employees SET roleId="${res.role}" WHERE id=${res.id}`
  db.query(query, (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    intro()
  })
}

const updateEmployeeRolePrompt = () => {
  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "Enter employee ID:",
    },
    {
      name: "role",
      type: "input",
      message: "Enter role ID:",
    },
  ])
  .then(res => {
    updateEmployeeRole(res)
  })
  .catch(err => {
    console.log(err)
  })
}

const addEmployee = (res) => {
  const query = `INSERT INTO employees (firstName, lastName, roleId, managerId) VALUES ("${res.fname}", "${res.lname}", ${res.role}, ${res.manager})`
  db.query(query, (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    intro()
  })
}

const addEmployeePrompt = () => {
  inquirer.prompt([
    {
      name: "fname",
      type: "input",
      message: "Enter employee first name:",
    },
    {
      name: "lname",
      type: "input",
      message: "Enter employee last name:",
    },
    {
      name: "role",
      type: "input",
      message: "Enter role ID:",
    },
    {
      name: "manager",
      type: "input",
      message: "Enter manager ID:",
    },
  ])
  .then(res => {
    addEmployee(res)
  })
  .catch(err => {
    console.log(err)
  })
}

const addRole = (res) => {
  const query = `INSERT INTO roles (title, salary, departmentId) VALUES ("${res.title}", ${res.salary}, "${res.department}")`
  db.query(query, (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    intro()
  })
}

const addRolePrompt = () => {
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "Enter role title:",
    },
    {
      name: "salary",
      type: "input",
      message: "Enter role salary:",
    },
    {
      name: "department",
      type: "input",
      message: "Enter department ID:",
    },
  ])
  .then(res => {
    addRole(res)
  })
  .catch(err => {
    console.log(err)
  })
}

const addDepartment = (department) => {
  const query = `INSERT INTO departments (name) VALUES ("${department}")`
  db.query(query, (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    intro()
  })
}

const addDepartmentPrompt = () => {
  inquirer.prompt([
    {
      name: "department",
      type: "input",
      message: "Enter the department name:",
    }
  ])
  .then(res => {
    addDepartment(res.department)
  })
  .catch(err => {
    console.log(err)
  })
}

const viewDepartments = () => {
  const query = `SELECT id, name FROM departments`
  db.query(query, (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    console.log("\n")
    console.log("DEPARTMENTS")
    console.log("--------------------------")
    console.log("id\tname")
    console.log("--------------------------")
    for (let i = 0; i < res.length; i++) {
      let row = res[i]
      console.log(row.id + "\t" + row.name)
    }
    console.log("--------------------------")
  })

  intro()
}

const viewRoles = () => {
  const query = `SELECT id, title, salary, departmentId FROM roles`
  db.query(query, (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    console.log("\n")
    console.log("ROLES")
    console.log("------------------------------------------")
    console.log("id\ttitle\tsalary\tdepartmentId")
    console.log("------------------------------------------")
    for (let i = 0; i < res.length; i++) {
      let row = res[i]
      console.log(row.id + "\t" + row.title + "\t" + row.salary + "\t" + row.departmentId)
    }
    console.log("------------------------------------------")
  })

  intro()
}

const viewEmployees = () => {
  const query = `SELECT id, firstName, lastName, roleId, managerId FROM employees`
  db.query(query, (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    console.log("\n")
    console.log("EMPLOYEES")
    console.log("------------------------------------------")
    console.log("id\tfirstName\tlastName\troleId\tmanagerId")
    console.log("------------------------------------------")
    for (let i = 0; i < res.length; i++) {
      let row = res[i]
      console.log(row.id + "\t" + row.firstName + "\t" + row.lastName + "\t" + row.roleId + "\t" + row.managerId)
    }
    console.log("------------------------------------------")
  })

  intro()
}

const intro = () => {
  inquirer.prompt([
    {
      name: "choices",
      type: "list",
      message: "Welcome. What would you like to do?",
      choices: [
        'Add Department', 
        'Add Role', 
        'Add Employee',
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee Role",
      ]
    }
  ])
  .then(res => {
    switch (res.choices) {
      case "Add Department":
        addDepartmentPrompt()
        break
      case "Add Role":
        addRolePrompt()
        break
      case "Add Employee":
        addEmployeePrompt()
        break
      case "View Departments":
        viewDepartments()
        break
      case "View Roles":
        viewRoles()
        break
      case "View Employees":
        viewEmployees()
        break
      case "Update Employee Role":
        updateEmployeeRolePrompt()
        break
      default:
        intro()
    }
  })
  .catch(err => {
    console.log(err)
  })
}
intro()