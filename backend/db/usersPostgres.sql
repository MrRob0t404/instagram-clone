DROP DATABASE IF EXISTS instagram;
CREATE DATABASE instagram;

\c accounts;
CREATE TABLE accounts (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,
  email VARCHAR,
  bio VARCHAR);

\c following;
CREATE TABLE following (
  follows_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES accounts,
  following_id INTEGER REFERENCES accounts);

\c posts;
CREATE TABLE posts (
  posts_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES accounts,
  post_descrip, VARCHAR,
  img VARCHAR);

\c comments;
CREATE TABLE comments (
  comments_id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts,
  user_id INTEGER REFERENCES accounts,
  comment VARCHAR);

\c likes;
CREATE TABLE likes (
  likes_id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts,
  user_id INTEGER);
