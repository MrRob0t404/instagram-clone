DROP DATABASE IF EXISTS instagram;
CREATE DATABASE instagram;

\c instagram

CREATE TABLE accounts (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  email VARCHAR,
  bio VARCHAR);


CREATE TABLE following (
  follows_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES accounts,
  username  VARCHAR REFERENCES accounts(username));


CREATE TABLE posts (
  posts_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES accounts,
  post_descrip VARCHAR,
  img VARCHAR);


CREATE TABLE comments (
  comments_id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts,
  user_id INTEGER REFERENCES accounts,
  comment VARCHAR);


CREATE TABLE likes (
  likes_id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts,
  user_id INTEGER);
