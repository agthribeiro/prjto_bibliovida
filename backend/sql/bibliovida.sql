CREATE DATABASE IF NOT EXISTS bibliovida;
USE bibliovida;

CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_nasc DATE NOT NULL
);