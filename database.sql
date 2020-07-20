CREATE DATABASE users_database;

--\c into todo_database
CREATE TABLE users(
    name_id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    

);