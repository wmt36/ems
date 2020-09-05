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
    department_id INT UNSIGNED AUTO_INCREMENT,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT UNSIGNED NOT NULL,
INDEX role_ind (role_id),
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
manager_id INT UNSIGNED,
INDEX man_ind (manager_id),
CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL

);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee; 


Error Code: 1075. Incorrect table definition; there can be only one auto column and it must be defined as a key
