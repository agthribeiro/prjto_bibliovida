# 📚 Bibliovida — Plataforma de Renovação e Venda de Livros Usados

> Projeto Integrador | Cursos de Ciência da Computação & Análise e Desenvolvimento de Sistemas

---

## 🌱 Sobre o Projeto

O **Bibliovida** é uma plataforma web desenvolvida como Projeto Integrador com dois objetivos principais: **conectar novos leitores a livros usados** e **restaurar fisicamente exemplares deteriorados** utilizando materiais ecológicos.

A iniciativa também tem impacto social, envolvendo colaboradores em situação de vulnerabilidade nas etapas de triagem e restauração dos livros — gerando renda alternativa e promovendo inclusão.

**Pilares do projeto:**

- ♻️ **Sustentabilidade** — reutilização de livros reduz consumo de papel, água e energia
- 🤝 **Inclusão social** — colaboradores em situação de vulnerabilidade participam do processo de restauração
- 📖 **Acesso à leitura** — catálogo de obras clássicas a preços acessíveis

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Front-end | HTML5, CSS3, JavaScript (ES Modules) |
| Back-end | PHP (API REST com roteamento por `?route=`) |
| Banco de dados | MySQL (hospedagem via InfinityFree) |
| Ícones | Font Awesome 5 |

---

## 📁 Estrutura de Arquivos

```
prjto_bibliovida-main/
├── index.html                          # Página inicial / home
├── backend/
│   ├── api_simples.php                 # API REST (rotas: products, register, login, contact)
│   ├── config/
│   │   └── connection.php              # Conexão MySQLi + criação automática do banco/tabela
│   └── sql/
│       └── bibliovida.sql              # Script de criação do banco de dados
└── frontend/
    ├── css/
    │   └── style.css                   # Estilos globais do site
    ├── img/                            # Imagens institucionais (logo, reciclagem, inclusão, restauração)
    ├── img_livros/                     # Capas dos livros do catálogo
    ├── js/
    │   ├── app.js                      # Ponto de entrada JS — conecta formulários aos módulos
    │   └── modules/
    │       ├── api.js                  # Função centralizada de requisições (fetch wrapper)
    │       ├── auth.js                 # Lógica de cadastro e login
    │       ├── products.js             # Carregamento e renderização do catálogo
    │       └── contact.js             # Envio do formulário de contato
    └── html_main/
        ├── sobre.html                  # Página "Sobre Nós" com missão e impacto
        ├── livros.html                 # Galeria do catálogo de livros
        ├── contato.html               # Formulário de contato
        ├── menu.html                  # Mapa de navegação do site
        ├── meta.html                  # Página individual: A Metamorfose
        ├── Dracula.html               # Página individual: Drácula
        ├── alienista.html             # Página individual: O Alienista
        ├── memorias.html              # Página individual: Memórias Póstumas de Brás Cubas
        ├── divina.html                # Página individual: A Divina Comédia
        ├── Romeu.html                 # Página individual: Romeu e Julieta
        ├── principe.html              # Página individual: O Pequeno Príncipe
        ├── alice.html                 # Página individual: Alice no País das Maravilhas
    └── html_login_e_cadastro/
        ├── login.html                 # Tela de login
        └── cadastro.html             # Tela de cadastro de novo usuário
```

---

## 🗄️ Banco de Dados

O banco é criado automaticamente pelo `connection.php` na primeira execução. O script `bibliovida.sql` também pode ser usado para criação manual.

```sql
CREATE DATABASE IF NOT EXISTS bibliovida;
USE bibliovida;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario  INT AUTO_INCREMENT PRIMARY KEY,
    email       VARCHAR(150) NOT NULL UNIQUE,
    senha       VARCHAR(255) NOT NULL,          -- armazenada com password_hash()
    data_nasc   DATE         NOT NULL
);
```

---

## 🔌 API Back-end

Todas as requisições passam pelo arquivo `backend/api_simples.php` via parâmetro `?route=`.

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `?route=products` | Retorna o catálogo de livros (mock) |
| `POST` | `?route=register` | Cadastra novo usuário |
| `POST` | `?route=login` | Autentica usuário e retorna token |
| `POST` | `?route=contact` | Recebe mensagem do formulário de contato |

**Exemplo de resposta de login bem-sucedido:**
```json
{
  "success": true,
  "message": "Login bem-sucedido!",
  "token": "token_abc123"
}
```

O token retornado é salvo no `localStorage` do navegador (`userToken`).

---

## ⚙️ Como Executar o Projeto

### Opção 1 — Localmente com XAMPP

**Pré-requisitos:** [XAMPP](https://www.apachefriends.org/) (Apache + PHP + MySQL)

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/prjto_bibliovida.git

# 2. Mova a pasta para o htdocs do XAMPP
# Windows: C:/xampp/htdocs/bibliovida
# Linux:   /opt/lampp/htdocs/bibliovida

# 3. Inicie Apache e MySQL no painel do XAMPP

# 4. Acesse no navegador — o banco é criado automaticamente
http://localhost/bibliovida/index.html
```

> O arquivo `connection.php` já cria o banco `if0_40376576_bibliovida` e a tabela `usuarios` automaticamente na primeira requisição.

Se quiser criar o banco manualmente pelo phpMyAdmin, importe o arquivo:
```
backend/sql/bibliovida.sql
```

### Opção 2 — Hospedagem na InfinityFree

O projeto já está configurado para o host `sql302.infinityfree.com`. Para usar em outro servidor, edite `backend/config/connection.php`:

```php
$host     = "seu_host_mysql";
$username = "seu_usuario";
$password = "sua_senha";
$dbname   = "nome_do_banco";
```

---

## ✨ Funcionalidades

- [x] Página inicial com identidade visual do Bibliovida
- [x] Galeria de livros clássicos com capas e páginas individuais
- [x] Cadastro de usuário (email, senha com hash, data de nascimento)
- [x] Login com verificação de senha (`password_verify`)
- [x] Token de sessão salvo no `localStorage`
- [x] Formulário de contato
- [x] Página "Sobre Nós" com missão, impacto ambiental e inclusão social
- [x] API REST em PHP com headers CORS configurados
- [x] JavaScript modularizado com ES Modules
- [ ] Carregamento dinâmico dos livros via API (preparado, pendente de ativação)
- [ ] Painel do usuário logado
- [ ] Upload de livros pelo próprio usuário

---

## 🌿 Impacto Socioambiental

O Bibliovida não é só uma loja de livros usados. A iniciativa envolve:

- **Restauração ecológica** de exemplares danificados antes da venda
- **Inclusão de trabalhadores em situação de vulnerabilidade** nas etapas de triagem e recuperação dos livros
- **Redução de resíduos** ao evitar que livros deteriorados sejam descartados

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos como parte do **Projeto Integrador** dos cursos de Tecnologia em Ciência da Computação e Análise e Desenvolvimento de Sistemas.

---

> *"Um livro velho não é um livro morto — é um livro esperando um novo começo."*
