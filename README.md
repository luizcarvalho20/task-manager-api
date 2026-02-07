# Task Manager API

API REST para gerenciamento de tarefas (tasks) com autenticação de usuários, desenvolvida em **Node.js + TypeScript**, utilizando **Express**, **Prisma ORM** e **JWT**.

Este projeto faz parte de um roadmap de estudos focado em **backend e qualidade de software**, evoluindo diariamente com novas funcionalidades, validações, autenticação, testes automatizados e CI.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite (ambiente de desenvolvimento)
- JWT (JSON Web Token)
- Zod (validação de dados)
- Swagger / OpenAPI (documentação)
- Jest + Supertest (testes automatizados)
- Postman + Newman (testes de API)
- GitHub Actions (CI)
- Git & GitHub

---

## 📂 Estrutura do Projeto

```
src/
├─ app.ts              # Configuração do Express
├─ server.ts           # Inicialização do servidor
├─ config/
│  ├─ prisma.ts        # Prisma Client
│  └─ swagger.ts       # Configuração do Swagger
├─ controllers/
│  ├─ task.controller.ts
│  └─ user.controller.ts
├─ routes/
│  ├─ task.routes.ts
│  └─ user.routes.ts
├─ middlewares/
│  └─ auth.middleware.ts
├─ validators/
│  ├─ task.schema.ts
│  └─ user.schema.ts
└─ tests/
   ├─ health.test.ts
   └─ tasks.test.ts

prisma/
└─ schema.prisma
```

---

## ⚙️ Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js (versão 18+ recomendada)
- npm

---

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/luizcarvalho20/task-manager-api.git
cd task-manager-api
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_aqui"
```

### 4️⃣ Rodar as migrações do banco

```bash
npx prisma migrate dev
```

### 5️⃣ Gerar o Prisma Client

```bash
npx prisma generate
```

### 6️⃣ Iniciar o servidor

```bash
npm run dev
```

### 7️⃣ Testar se está rodando

Acesse no navegador:

http://localhost:3000/health

Resposta esperada:

```json
{ "status": "ok" }
```

---

## 📚 Documentação (Swagger)

Após rodar o projeto, acesse:

http://localhost:3000/docs

Você terá acesso à documentação completa da API com:
- Rotas de usuários
- Rotas de tasks
- Autenticação JWT
- Schemas de request/response
- Testes interativos via Swagger UI

---

## 🔐 Autenticação

A API utiliza JWT.

Após fazer login, envie o token no header:

Authorization: Bearer SEU_TOKEN_AQUI

As rotas de **/tasks** são protegidas e exigem token válido.

---

## 📌 Endpoints Principais

### 🔹 Healthcheck
- GET `/health`

---

### 👤 Usuários

#### Registrar usuário
- POST `/users/register`

```json
{
  "name": "Luiz",
  "email": "luiz@email.com",
  "password": "123456"
}
```

#### Login
- POST `/users/login`

```json
{
  "email": "luiz@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "JWT_AQUI"
}
```

---

### ✅ Tasks (rotas protegidas)

> Todas exigem header: `Authorization: Bearer TOKEN`

#### Criar task
- POST `/tasks`

```json
{
  "title": "Minha task",
  "description": "Descrição opcional"
}
```

#### Listar tasks do usuário autenticado
- GET `/tasks`

#### Atualizar task
- PUT `/tasks/:id`

```json
{
  "title": "Novo título",
  "completed": true
}
```

#### Deletar task
- DELETE `/tasks/:id`

---

## 🧪 Testes Automatizados

### ✅ Jest + Supertest (backend)

Rodar os testes:

```bash
npm test
```

Os testes cobrem:
- Healthcheck
- Fluxo de autenticação
- Criação de task autenticada
- Listagem de tasks
- Validação de respostas e status codes

---

### ✅ Postman + Newman (API)

Rodar os testes via CLI:

```bash
npx newman run postman/collections/task-manager-api.postman_collection.json \
  -e postman/environments/local.postman_environment.json
```

Os testes cobrem:
- Registro de usuário
- Login e captura automática do token
- Criação de task autenticada
- Listagem de tasks
- Atualização de task
- Exclusão de task
- Casos de erro e validação

---

## 🤖 CI com GitHub Actions

O projeto possui pipeline de CI que:

- Instala dependências
- Gera Prisma Client
- Executa os testes com Jest
- Falha o build se algum teste quebrar

O workflow roda automaticamente em:
- Push na branch `main`
- Pull Requests para `main`

---

## 🛣️ Roadmap

- CRUD de Tasks ✅  
- Validação de dados com Zod ✅  
- CRUD de Usuários ✅  
- Autenticação com JWT ✅  
- Proteção de rotas ✅  
- Swagger / OpenAPI ✅  
- Testes automatizados com Postman + Newman ✅  
- Testes automatizados com Jest + Supertest ✅  
- CI com GitHub Actions ✅  

---

## 📝 Observações

- O banco SQLite é usado apenas para desenvolvimento.
- O projeto está em evolução contínua.
- Cada etapa do roadmap gera commits incrementais.
- Foco em boas práticas de backend, testes e qualidade de código.

---

## 👨‍💻 Autor

Desenvolvido por **Luiz Felipe Carvalho**  

Projeto de estudo focado em backend, APIs REST e qualidade de software.
