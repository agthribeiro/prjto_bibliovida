<?php
// === CORS ===
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// === CONEXÃO (MySQLi) ===
require_once __DIR__ . "/config/connection.php";

// === VARIÁVEIS ===
$route = $_GET["route"] ?? '';
$method = $_SERVER["REQUEST_METHOD"];
$input = json_decode(file_get_contents("php://input"), true) ?? [];

// MOCK DE PRODUTOS
function getMockedProducts() {
    return [
        ['id' => 1, 'title' => 'A Metamorfose', 'author' => 'Franz Kafka', 'price' => 45.90],
        // … (resto dos livros)
    ];
}

// === ROTAS GET ===
if ($method === "GET" && $route === "products") {
    echo json_encode([
        "success" => true,
        "message" => "Catálogo carregado",
        "data" => getMockedProducts()
    ]);
    exit;
}

// === ROTAS POST ===
if ($method === "POST") {
    switch ($route) {

        // ===========================================
        // ✅ CADASTRO
        // ===========================================
        case "register":

            $email = $input["email"] ?? '';
            $password = $input["password"] ?? '';
            $data_nasc = $input["data_nascimento"] ?? null;

            if (!$email || !$password || !$data_nasc) {
                http_response_code(422);
                echo json_encode(["success" => false, "message" => "Preencha todos os campos."]);
                exit;
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(422);
                echo json_encode(["success" => false, "message" => "E-mail inválido."]);
                exit;
            }

            // Verifica se existe
            $stmt = $mysqli->prepare("SELECT id_usuario FROM usuarios WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                http_response_code(409);
                echo json_encode(["success" => false, "message" => "E-mail já cadastrado."]);
                exit;
            }

            $stmt->close();

            // Insere usuário
            $senha_hash = password_hash($password, PASSWORD_DEFAULT);

            $stmt = $mysqli->prepare(
                "INSERT INTO usuarios (email, senha, data_nasc) VALUES (?, ?, ?)"
            );
            $stmt->bind_param("sss", $email, $senha_hash, $data_nasc);

            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Cadastro realizado com sucesso!"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Erro no servidor: " . $stmt->error]);
            }

            exit;

        // ===========================================
        // ✅ LOGIN
        // ===========================================
        case "login":

            $email = $input["email"] ?? '';
            $password = $input["password"] ?? '';

            if (!$email || !$password) {
                http_response_code(422);
                echo json_encode(["success" => false, "message" => "Informe e-mail e senha."]);
                exit;
            }

            $stmt = $mysqli->prepare("SELECT id_usuario, senha FROM usuarios WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($user = $result->fetch_assoc()) {
                if (password_verify($password, $user["senha"])) {
                    echo json_encode([
                        "success" => true,
                        "message" => "Login bem-sucedido!",
                        "token" => "token_" . uniqid()
                    ]);
                } else {
                    http_response_code(401);
                    echo json_encode(["success" => false, "message" => "Senha incorreta."]);
                }
            } else {
                http_response_code(404);
                echo json_encode(["success" => false, "message" => "Usuário não encontrado."]);
            }

            exit;

        // ===========================================
        // ✅ CONTATO
        // ===========================================
        case "contact":

            if (
                empty($input["name"]) ||
                empty($input["email"]) ||
                empty($input["message"])
            ) {
                http_response_code(422);
                echo json_encode(["success" => false, "message" => "Preencha todos os campos."]);
                exit;
            }

            echo json_encode(["success" => true, "message" => "Mensagem recebida!"]);
            exit;
    }
}

// === ROTA 404 ===
http_response_code(404);
echo json_encode([
    "success" => false,
    "message" => "Rota '{$route}' não encontrada."
]);