-- CREATES DATABASE --
CREATE DATABASE cheffs_db; 

-- CREATES TABLES--
USE cheffs_db;
CREATE TABLE Recipes (
	id INT AUTO_INCREMENT,
    chef_id INT NOT NULL, 
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    steps TEXT NOT NULL, 
    img_url VARCHAR(255) DEFAULT 'https://www.krsaddleshop.com/sca-dev-montblanc/img/no_image_available.jpeg',
    PRIMARY KEY (id)
);

CREATE TABLE Edamam_recipes (
	id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    categories VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    steps TEXT NOT NULL, 
    img_url VARCHAR(255) DEFAULT 'https://www.krsaddleshop.com/sca-dev-montblanc/img/no_image_available.jpeg',
    PRIMARY KEY (id)
);

CREATE TABLE Categories (
	id INT AUTO_INCREMENT,
	category VARCHAR(40) NOT NULL,
	recipe_id INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Chefs (
	id INT AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	picture_url VARCHAR(255) DEFAULT 'https://www.krsaddleshop.com/sca-dev-montblanc/img/no_image_available.jpeg',
	PRIMARY KEY (id)
);