DROP DATABASE IF EXISTS speechnote_db;
CREATE DATABASE speechnote_db;
\c speechnote_db;

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

INSERT INTO todos (task) VALUES ('honey');
INSERT INTO todos (task) VALUES ('broccoli');
INSERT INTO todos (task) VALUES ('dog shampoo');
INSERT INTO todos (task) VALUES ('butter');
INSERT INTO todos (task) VALUES ('eggs');
INSERT INTO todos (task) VALUES ('carrots');
INSERT INTO todos (task) VALUES ('steak');
INSERT INTO todos (task) VALUES ('bread');
INSERT INTO todos (task) VALUES ('sausages');

INSERT INTO story (words) VALUES ('Mama always said life was like a box of chocolates. You never know what you''re gonna get.');
INSERT INTO story (words) VALUES ('And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers. And you will know my name is the Lord when I lay my vengeance upon you!');
INSERT INTO story (words) VALUES ('For no particular reason I just kept on going. I ran clear to the ocean. And when I got there, I figured, since I’d gone this far, I might as well turn around, just keep on going. When I got to another ocean, I figured, since I’d gone this far, I might as well just turn back, keep right on going.');
INSERT INTO story (words) VALUES ('You''re gonna need a bigger boat!');