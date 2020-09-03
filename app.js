const mysql = require('mysql');
const inquirer = require('inquirer')

const connection = mysql.createConnection({
    host: 'localhost',
    
    port: 3636,

    user: 'root',

    password: 'employee',
    database: 'empolyee_listDB'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connection made!')

}) 