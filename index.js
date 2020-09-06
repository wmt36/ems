const mysql = require('mysql');
const inquirer = require('inquirer')

const connection = mysql.createConnection({
    host: 'localhost',
     
    port: 3306,

    user: 'root',

    password: 'employee',
    database: 'employee_listDB'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connection made!')

}) 



function runSearch () {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What action would you like to perform?',
        choices: [
            'Add new department?',
            'Add new role?',
            'Add new Employee?',
            'View different departments?',
            'View all roles?',
            'View all Employees?',
            'Update Employee roles?',
            'Exit Application?'
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case 'Add new department?':
                addDepartment();                
            break;

            case 'Add new role?':
                //newRoll();                
            break;

            case 'Add new Employee?':
                //newEmployee();                
            break;

            case 'View different departments?':
                //switchDepartment();             
            break;

            case 'View all roles?':
                //viewRoles();                
            break;

            case 'View all Employees?':
                //viewEmloyees();              
            break;

            case 'Update Employee roles?':
                //updateRole();
            break;

            case 'Exit Application':
                //clearApp();
            break;
        }
    })
}
runSearch();


function addDepartment() {
    inquirer
    .prompt({
        name: 'department',
        type: 'input',
        message: 'Add a new department?'
    })
    .then(function(answer) {
        const query =  'SELECT * department_name, FROM department WHERE ?';
        connection.query(query, { department: answer.department }, function(err, res) {
            if (err) throw err;
            for(let i = 0; i < res.length; i++) {
                console.log("Deparment Name:" + res[1].department_name)
            }
            runSearch();
        });     
    });
};
