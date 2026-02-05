# Task Manager API

API REST para gerenciamento de tarefas (tasks) com autenticação de usuários, desenvolvida em **Node.js + TypeScript**, utilizando **Express**, **Prisma ORM** e **JWT**.

Este projeto faz parte de um roadmap de estudos focado em **backend e qualidade de software**, evoluindo diariamente com novas funcionalidades, validações, autenticação e testes automatizados.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite (ambiente de desenvolvimento)
- JWT (JSON Web Token)
- Zod (validação de dados)
- Postman (testes de API)
- Newman (execução de testes automatizados via CLI)
- Git & GitHub

---

## 📂 Estrutura do Projeto
```
src/
├─ app.ts # Configuração principal do Express
├─ server.ts # Inicialização do servidor
├─ config/
│ └─ prisma.ts # Instância do Prisma Client
├─ controllers/
│ ├─ task.controller.ts
│ └─ user.controller.ts
├─ routes/
│ ├─ task.routes.ts
│ └─ user.routes.ts
├─ middlewares/
│ └─ auth.middleware.ts # Middleware de autenticação JWT
└─ validators/
├─ task.schema.ts # Validações de Task (Zod)
└─ user.schema.ts # Validações de User (Zod)

prisma/
└─ schema.prisma # Schema do banco de dados
```
---

## ⚙️ Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js (versão 18+ recomendada)
- npm

---

### 1️⃣ Clonar o repositório

```
git clone https://github.com/luizcarvalho20/task-manager-api.git
cd task-manager-api
```
2️⃣ Instalar dependências
```
npm install
```

3️⃣ Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_aqui"
```
4️⃣ Rodar as migrações do banco
```
npx prisma migrate dev
```
5️⃣ Iniciar o servidor
```
npm run dev
```
6️⃣ Verificar se a API está rodando

Acesse no navegador:
```
http://localhost:3000/health
```

Resposta esperada:
```
{ "status": "ok" }
```
## 🔐 Autenticação

A API utiliza JWT para autenticação.

Após fazer login, você deve enviar o token no header:
```
Authorization: Bearer SEU_TOKEN_AQUI

```
As rotas de tasks são protegidas e exigem token válido.

## 📌 Endpoints Disponíveis
🔹 Healthcheck

GET /health

👤 Usuários
Registrar usuário

POST /users/register
```
{
  "name": "Luiz",
  "email": "luiz@email.com",
  "password": "123456"
}
```
Login

POST /users/login
```
{
  "email": "luiz@email.com",
  "password": "123456"
}
```

Resposta:
```
{
  "token": "JWT_AQUI"
}
```
✅ Tasks (rotas protegidas)

Todas exigem header: Authorization: Bearer TOKEN

Criar task

POST /tasks
```
{
  "title": "Minha task",
  "description": "Descrição opcional"
}
```
Listar tasks do usuário autenticado

- GET /tasks

Atualizar task

- PUT /tasks/:id
```
{
  "title": "Novo título",
  "completed": true
}
```
Deletar task

- DELETE /tasks/:id
## 🧪 Testes Automatizados (Postman + Newman)

Este projeto possui collection e environment do Postman versionados para execução de testes automatizados.

▶️ Rodar os testes via terminal:
```
npx newman run postman/collections/task-manager-api.postman_collection.json \
  -e postman/environments/local.postman_environment.json
```
✅ O que os testes cobrem:

Registro de usuário

Login e captura automática do token

Criação de task autenticada

Listagem de tasks do usuário

Atualização de task

Exclusão de task

Validações de status code e formato de resposta

🛣️ Roadmap

- CRUD de Tasks ✅

- Validação de dados com Zod ✅

- CRUD de Usuários ✅

- Autenticação com JWT ✅

- Proteção de rotas ✅

- Testes automatizados com Postman + Newman ✅

- Testes automatizados com Jest + Supertest ⏳

- CI com GitHub Actions ⏳

- Documentação com Swagger/OpenAPI ⏳

📝 Observações

O banco SQLite é utilizado apenas para desenvolvimento.

O projeto está em evolução contínua.

Cada etapa do roadmap gera commits incrementais e documentados.

O foco do projeto é boas práticas de backend, testes e qualidade de código.

👨‍💻 Autor

Desenvolvido por **Luiz Felipe Carvalho**


Projeto de estudo focado em backend, APIs REST e qualidade de software.
