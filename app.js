const mysql = require('mysql');
const inquirer = require('inquirer')

//making the connection to the database

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'employee',
    database: 'employee_listDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connection made!')

})

//function that will be used to prompt the user in the right direction to updating and viewing information about there employees.

function runSearch() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What action would you like to perform?',
            choices: [
                'Add new department?',
                'Add new Employee role?',
                'Add new Employee?',
                'View different departments?',
                'View all Employee roles?',
                'View all Employees?',
                'Update Employee?',
                'Exit Application?'
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case 'Add new department?':
                    addDepartment();
                    break;

                case 'Add new Employee role?':
                    addRole();
                    break;

                case 'Add new Employee?':
                    addEmployee();
                    break;

                case 'View different departments?':
                    viewDepartment();
                    break;

                case 'View all Employee roles?':
                    viewRoles();
                    break;

                case 'View all Employees?':
                    viewEmloyees();
                    break;

                case 'Update Emloyee?':
                    updateEmloyees();
                    break;

                case 'Exit Application?':
                    console.log('Press: Ctrl + C')
                    break;
            }
        })
}
runSearch();

//adding a new department to the database
function addDepartment() {
    inquirer
        .prompt({
            name: 'department',
            type: 'list',
            message: 'Would you like to add a new department?',
            choices: [
                'Sales',
                'Engineering',
                'Finance',
                'Legal team',
                'Manager'
            ]

        })
        .then(function (answer) {
            const query = 'INSERT INTO department (department_name) VALUES (?)';
            connection.query(query, [answer.department], function (err, res) {
                if (err) throw err;
                console.log(res)
                runSearch();
            });
        });
};

//adding a new Role to the database

function addRole() {
    inquirer
        .prompt([{
                name: 'title',
                type: 'list',
                message: 'What role would you like to add?',
                choices: [
                    'Sales team leader',
                    'salesperson',
                    'Engineering',
                    'Lead Engineer',
                    'Finance',
                    'Legal team',
                    'Manager'
                ]
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Employee salary?'
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'Enter department_id number:'
            }
        ])
        .then(function (answer) {
            const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            connection.query(query, [answer.title, answer.salary, answer.department_id], function (err, res) {
                if (err) throw err;
                console.log(res);
                runSearch()
            });
        });
};

//adding a new Employee to the database

function addEmployee() {
    inquirer
        .prompt([{
                name: 'first_name',
                type: 'input',
                message: 'Employee First Name?'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Employee Last Name?'
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'Enter role id number:'

            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'Enter maneger id number:'

            }

        ])
        .then(function (answer) {
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)';
            connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function (err, res) {
                if (err) throw err;
                console.log(res)
                runSearch();
            });
        });
};

//view the new department to the data set 
//also as asked in the bonus this function allows you to view all employees from any job posisiton

function viewDepartment() {
    inquirer
        .prompt([{
            name: 'departments',
            type: 'list',
            message: 'Would you like to view all stored departments?',
            choices: [
                'Sales',
                'Engineering',
                'Finance',
                'Legal team',
                'Manager'
            ]
        }])
        .then(function (answer) {
            const query = 'SELECT * FROM department WHERE ?';
            connection.query(query, {
                department_name: answer.departments
            }, function (err, res) {
                if (err) throw err;
                console.table(res)
                runSearch();
            });
        });
};

//view the new roles to the data set 


function viewRoles() {
    inquirer
        .prompt([{
            name: 'roles',
            type: 'list',
            message: 'Would you like to view all sorted roles?',
            choices: [
                'Sales team leader',
                'salesperson',
                'Engineering',
                'Lead Engineer',
                'Finance',
                'Legal team',
                'Manager'
            ]
        }])
        .then(function (answer) {
            const query = 'SELECT * FROM role WHERE ?';
            connection.query(query, {
                title: answer.roles
            }, function (err, res) {
                if (err) throw err;
                console.table(res);
                runSearch();
            })
        })
}



//view the new employees to the data set 

function viewEmloyees() {
    inquirer
        .prompt([{
            name: 'employees',
            type: 'input',
            message: 'Search Employee by ther name:'
        }])
        .then(function (answer) {
            const query = 'SELECT * FROM employee WHERE ?';
            connection.query(query, {
                first_name: answer.employees
            }, function (err, res) {
                if (err) throw err;
                console.table(res);
                runSearch();
            });
        });
};


function updateEmloyees() {
    inquirer
        .prompt([{
            name: 'update',
            type: 'input',
            message: 'Type in the Employee you wish to update?'
        }])
        .then(function (answer) {
            const query = 'UPDATE employee SET first_name, last_name, role_id, manager_id WHERE ?, ?, ?, ?';
            connection.query(query, {
                first_name: answer.update
            }, function (err, res) {
                if (err) throw err;
                console.table(res);
                runSearch();
            });
        });
};