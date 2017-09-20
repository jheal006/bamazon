DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT(10.4) NOT NULL,
  stock_quantity INT default 50,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("57' LG LED TV", "Electronics", 399.99, 110), ("German National Team Jersey", "Sports", 269, 82),
("Mr. Coffee", "Appliances", 99.99, 13), ("Food Processor", "Appliances", 57, 123),
("Long Sleeved Tee", "Apparel", 19, 40), ("Board Shorts", "Apparel", 39, 88),
("Buddy Lee Jeans", "Apparel", 38, 68), ("Sports Coat", "Apparel", 89, 23);



SELECT * FROM bamazon_db.products;


SELECT stock_quantity FROM `products` WHERE item_id = '2';