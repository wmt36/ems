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
            'Exit Application?'
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case 'Add new department?':
                addDepartment();                
            break;

            case 'Add new role?':
                addRole();                
            break;

            case 'Add new Employee?':
                addEmployee();                
            break;

            case 'View different departments?':
                viewDepartment();             
            break;

            case 'View all roles?':
                viewRoles();                
            break;

            case 'View all Employees?':
                viewEmloyees();              
            break;

            case 'Exit Application':
                //clearApp();
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
        type: 'input',
        message: 'Would you like to add a new department?'
    })
    .then(function(answer) {
        const query =  'INSERT INTO department (department_name) VALUES (?)';
        connection.query(query, [ answer.department ], function(err, res) {
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
            type: 'input',
            message: 'What role would you like to add?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Employee salary?'
        }
    ])
    .then(function(answer) {
        const query = 'INSERT INTO role (title, salary) VALUES (?, ?)';
        connection.query(query, [ answer.title, answer.salary ], function(err, res) {
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
    }
    ])
    .then(function(answer) {
        const query = 'INSERT INTO employee (first_name, last_name) VALUE (?, ?)';
        connection.query(query, [answer.first_name, answer.last_name ], function(err, res) {
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
        type: 'input',
        message: 'Would you like to view all stored departments?'
    }
    ])
    .then(function(answer) {
           const query =  'SELECT * FROM department WHERE ?';
        connection.query(query, { department_name: answer.departments }, function(err, res) {
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
        type: 'input',
        message: 'Would you like to view all sorted roles?'
    }
    ])
    .then(function(answer) {
        const query = 'SELECT * FROM role WHERE ?';
        connection.query(query, { salary: answer.roles }, function(err, res) {
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
        message: 'Would you like to view the Employees?'
    }
    ])
    .then(function(answer) {
        const query = 'SELECT * FROM employee WHERE ?';
        connection.query(query, { first_name: answer.employees }, function(err, res) {
            if(err) throw err;
            console.table(res);
            runSearch();
        })
    })
}




 
 