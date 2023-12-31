CREATE DATABASE IF NOT EXISTS csticket;

USE csticket;

CREATE TABLE IF NOT EXISTS agents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(150)
);

CREATE INDEX IF NOT EXISTS idx_email ON agents (email);
