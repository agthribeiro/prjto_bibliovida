# 📚 ReBook — Plataforma de Renovação e Venda de Livros Usados

> Projeto Integrador | Tecnólogo em Análise e Desenvolvimento de Sistemas

---

## 🌱 Sobre o Projeto

O **ReBook** é uma plataforma web desenvolvida como Projeto Integrador com o objetivo de dar uma segunda vida a livros usados. O sistema conecta pessoas que desejam doar ou vender seus livros com novos leitores interessados, promovendo a reutilização sustentável e a renovação física dos exemplares com materiais ecológicos.

**Pilares do projeto:**

- ♻️ **Sustentabilidade** — renovação de livros com materiais ecológicos (papel reciclado, cola natural, capa de tecido reutilizado)
- 🤝 **Comunidade** — conexão entre doadores/vendedores e novos leitores
- 🛒 **Comércio consciente** — venda a preços acessíveis, incentivando a leitura

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Front-end | HTML5, CSS3, JavaScript |
| Back-end | PHP |
| Banco de dados | MySQL |

---

## 📁 Estrutura de Arquivos

```
rebBook/
├── index.html              # Página inicial / vitrine de livros
├── cadastro.html           # Cadastro de novo usuário
├── login.html              # Login de usuário
├── livro.html              # Detalhes de um livro
├── carrinho.html           # Carrinho de compras
├── css/
│   ├── style.css           # Estilos globais
│   ├── header.css          # Estilo do cabeçalho
│   └── responsive.css      # Media queries / responsividade
├── js/
│   ├── main.js             # Lógica geral e interações
│   ├── carrinho.js         # Controle do carrinho (localStorage)
│   └── validacao.js        # Validação de formulários
├── php/
│   ├── conexao.php         # Conexão com o banco de dados MySQL
│   ├── cadastro.php        # Processamento de cadastro de usuário
│   ├── login.php           # Autenticação de usuário
│   ├── livros.php          # CRUD de livros
│   └── pedido.php          # Registro de pedidos/compras
└── sql/
    └── banco.sql           # Script de criação do banco de dados
```

---

## 🗄️ Banco de Dados

O banco de dados MySQL é composto pelas seguintes tabelas principais:

```sql
-- Usuários da plataforma
CREATE TABLE usuarios (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nome        VARCHAR(100)        NOT NULL,
    email       VARCHAR(150) UNIQUE NOT NULL,
    senha       VARCHAR(255)        NOT NULL,
    criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Catálogo de livros
CREATE TABLE livros (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    titulo      VARCHAR(200)        NOT NULL,
    autor       VARCHAR(150)        NOT NULL,
    descricao   TEXT,
    preco       DECIMAL(10,2)       NOT NULL,
    estado      ENUM('bom','regular','renovado') NOT NULL,
    imagem      VARCHAR(255),
    usuario_id  INT,
    criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Pedidos realizados
CREATE TABLE pedidos (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id  INT         NOT NULL,
    livro_id    INT         NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (livro_id)   REFERENCES livros(id)
);
```

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

- [XAMPP](https://www.apachefriends.org/) ou similar (Apache + PHP + MySQL)
- Navegador moderno

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/rebook.git

# 2. Mova a pasta para o diretório do servidor local
# No XAMPP: C:/xampp/htdocs/rebook

# 3. Acesse o phpMyAdmin e crie o banco de dados
#    Nome sugerido: rebook_db

# 4. Importe o script SQL
#    Arquivo: sql/banco.sql

# 5. Configure a conexão no arquivo php/conexao.php
```

```php
<?php
// php/conexao.php
$host   = "localhost";
$usuario = "root";
$senha  = "";            // senha do seu MySQL local
$banco  = "rebook_db";

$conn = new mysqli($host, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>
```

```
# 6. Acesse no navegador
http://localhost/rebook/index.html
```

---

## ✨ Funcionalidades

- [x] Cadastro e login de usuários
- [x] Listagem de livros disponíveis
- [x] Página de detalhes do livro
- [x] Carrinho de compras com JavaScript
- [x] Registro de pedidos no banco de dados
- [x] Filtro por estado do livro (bom, regular, renovado)
- [ ] Painel do usuário (em desenvolvimento)
- [ ] Sistema de avaliações (em desenvolvimento)
- [ ] Upload de imagem do livro (em desenvolvimento)

---

## 🌿 Processo de Renovação Ecológica

Livros classificados como **"renovados"** passaram pelo processo de restauro sustentável da equipe, que inclui:

- Substituição da lombada com fita de papel kraft reciclado
- Colagem de páginas soltas com cola à base de amido
- Reencadernação com capas de papelão reaproveitado e tecido de algodão
- Limpeza das páginas com borracha seca (sem produtos químicos)

---

## 👥 Equipe

| Nome | Função |
|---|---|
| — | Desenvolvimento Front-end (HTML/CSS/JS) |
| — | Desenvolvimento Back-end (PHP/MySQL) |
| — | Design & UX |
| — | Documentação & Testes |

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do **Projeto Integrador** do curso de Tecnologia em Análise e Desenvolvimento de Sistemas.

---

> *"Um livro velho não é um livro morto — é um livro esperando um novo começo."*
