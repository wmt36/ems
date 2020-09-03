DROP DATABASE  IF EXISTS    employee_listDB;
CREATE database employee_listDB;


USE employee_listDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL, 
    PRIVATE KEY (id)   

);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,4) NULL,
    department_id INT NULL,
    PRIVATE KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    frst_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIVATE KEY (id)

);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;