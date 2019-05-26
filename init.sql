DROP DATABASE IF EXISTS dictanote_db;
CREATE DATABASE dictanote_db;
\c dictanote_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    task TEXT
);

INSERT INTO users (username, password) VALUES ('user', '1234');
INSERT INTO users (username, password) VALUES ('admin', '1234');

INSERT INTO todos (task) VALUES ('read a book');
INSERT INTO todos (task) VALUES ('buy milk');