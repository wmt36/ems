DROP DATABASE  IF EXISTS    employee_listDB;


CREATE DATABASE employee_listDB;


USE employee_listDB;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    depatment_name VARCHAR(30) NOT NULL 

);

CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    INDEX dep_ind (department_id),
    CONSTRAINT FK_department FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    frst_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    INDEX role_ind (role_id),
    CONSTRAINT FK_role FOREIGN KEY (role_id)
    REFERENCES role(id),
    INDEX man_ind (manager_id),
    CONSTRAINT FK_employee FOREIGN KEY (manager_id)
    REFERENCES role(id)

);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee; 


Error Code: 1075. Incorrect table definition; there can be only one auto column and it must be defined as a key
