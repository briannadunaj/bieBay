DROP DATABASE IF EXISTS biebay;
CREATE DATABASE bieber;

USE biebay;

CREATE TABLE JBproducts(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (100) NOT NULL,
	department_name VARCHAR (50) NOT NULL,
	price INT NOT NULL,
	stock_quantity INT,
	autographed INT(1),
	PRIMARY KEY(item_id)
);