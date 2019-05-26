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

CREATE TABLE IF NOT EXISTS story (
    id SERIAL PRIMARY KEY,
    words TEXT
);

INSERT INTO users (username, password) VALUES ('user', '1234');
INSERT INTO users (username, password) VALUES ('admin', '1234');

INSERT INTO todos (task) VALUES ('wash the car');
INSERT INTO todos (task) VALUES ('buy milk');
INSERT INTO todos (task) VALUES ('walk the dog');
INSERT INTO todos (task) VALUES ('go to the pharmacy');
INSERT INTO todos (task) VALUES ('print documents');

INSERT INTO story (words) VALUES ('Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.');
INSERT INTO story (words) VALUES ('No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original.');
INSERT INTO story (words) VALUES ('Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.');