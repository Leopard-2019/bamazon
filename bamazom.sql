DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
deparment_name VARCHAR(45) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(10) NOT NULL,
primary key(item_id)
);

INSERT INTO products (product_name, deparment_name, price,stock_quantity)
VALUES ("Eco Dot", "Electronics", 24.99, 100);

INSERT INTO products (product_name, deparment_name, price,stock_quantity)
VALUES ("PlayStation 4", "Video Games", 268.99, 50);

INSERT INTO products (product_name, deparment_name, price,stock_quantity)
VALUES ("Phone Tripod", "Camera & Photo", 14.99, 40);

INSERT INTO products (product_name, deparment_name, price,stock_quantity)
VALUES ("Singing Machine SML385UW Bluetooth Karaoke System", "Musical Instruments", 69.99, 25);

INSERT INTO products (product_name, deparment_name, price,stock_quantity)
VALUES ("Razor A Kick Scooter", "Sports & Outdoors", 45.42, 35);

INSERT INTO products (product_name, deparment_name, price,stock_quantity)
VALUES ("Reload Your Balance", "Gift Cards", 100.00, 1000);

INSERT INTO products (product_name, deparment_name, price,stock_quantity)
VALUES ("Sharpie Electro Pop Permanent Markers", "Office Products", 10.78, 100);

INSERT INTO products (product_name, deparment_name, price,stock_quantity)
VALUES ("2019 Topps Baseball", "Sports Collectibles", 44.99, 77);

INSERT INTO products (product_name, deparment_name, price,stock_quantity)
VALUES ("Square Reader for magstripe", "Industrial & Scientific", 4.99, 250);

INSERT INTO products (product_name, deparment_name, price,stock_quantity)
VALUES ("Dash Mini Maker", " Kitchen & Dining", 9.99, 120);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Toronbolo777';

SELECT * FROM products;