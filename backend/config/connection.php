<?php

$host = "sql302.infinityfree.com";
$username = "if0_40376576";
$password = "HPmsRbzlqKaF";
$dbname = "if0_40376576_bibliovida";

$mysqli = new mysqli($host, $username, $password);

if ($mysqli->connect_error) {
    die("Falha na conexão: " . $mysqli->connect_error);
}

$mysqli->query("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci");

// Conecta no banco criado
$mysqli->select_db($dbname);

// Cria tabela se não existir
$sql = "
    CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(150) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        data_nasc DATE NOT NULL
    )
";

$mysqli->query($sql);

?>