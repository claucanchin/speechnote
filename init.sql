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
INSERT INTO story (words) VALUES ('Mama always said life was like a box of chocolates. You never know what you''re gonna get.');
INSERT INTO story (words) VALUES ('In public speaking class, they say, tell a story, some anecdote that let’s your audience know who you are. When I was six, I was a proud bluebird of the Camp Fire Girls of America! As a bluebird, I had to sell mint thins door to door. When my older brother heard, he started laughing. He told my mom, “How is she supposed to sell them if she never makes a peep?”');
INSERT INTO story (words) VALUES ('For no particular reason I just kept on going. I ran clear to the ocean. And when I got there, I figured, since I’d gone this far, I might as well turn around, just keep on going. When I got to another ocean, I figured, since I’d gone this far, I might as well just turn back, keep right on going.');