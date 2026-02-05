🗂️ Task Manager API

API REST para gerenciamento de tarefas (tasks), desenvolvida em Node.js com TypeScript, utilizando Express e Prisma ORM.

Este projeto faz parte de um roadmap de estudos focado em backend, testes e qualidade de software, evoluindo diariamente com novas funcionalidades, autenticação, validações e testes automatizados.

## 🚀 Tecnologias Utilizadas

Node.js

TypeScript

Express

Prisma ORM

SQLite (ambiente de desenvolvimento)

JWT (Autenticação)

Zod (Validação de dados)

Postman (Testes manuais e automatizados)

Newman (Execução de testes via CLI)

Git & GitHub

## 📂 Estrutura do Projeto
```
src/
├─ app.ts              # Configuração principal do Express
├─ server.ts           # Inicialização do servidor
├─ config/
│  └─ prisma.ts        # Instância do Prisma Client
├─ controllers/
│  ├─ task.controller.ts
│  └─ user.controller.ts
├─ routes/
│  ├─ task.routes.ts
│  └─ user.routes.ts
├─ middlewares/
│  └─ auth.middleware.ts
└─ validators/
   ├─ task.schema.ts
   └─ user.schema.ts

postman/
├─ collections/
│  └─ task-manager-api.postman_collection.json
└─ environments/
   └─ local.postman_environment.json
```
## ⚙️ Como Rodar o Projeto Localmente
Pré-requisitos

Node.js (versão 18+ recomendada)

npm

1️⃣ Clonar o repositório
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
## 📌 Endpoints Disponíveis
🔹 Healthcheck

GET /health

👤 Usuários
Registrar usuário

POST /users/register

Body:
```
{
  "name": "Usuário",
  "email": "email@teste.com",
  "password": "123456"
}
```
Login

POST /users/login

Body:
```
{
  "email": "email@teste.com",
  "password": "123456"
}

```
Resposta:
```
{
  "token": "JWT_TOKEN_AQUI"
}
````
✅ Tasks (Rotas Protegidas com JWT)

Todas as rotas abaixo exigem o header:
```
Authorization: Bearer SEU_TOKEN_AQUI
```
Criar Task

POST /tasks

Body:
```
{
  "title": "Minha task",
  "description": "Descrição opcional"
}
````
Listar Tasks do usuário autenticado

- GET /tasks

Atualizar Task

- PUT /tasks/:id

Body:
```
{
  "title": "Novo título",
  "completed": true
}
```
Deletar Task

- DELETE /tasks/:id
## 🧪 Testes

Os testes da API são feitos com Postman e podem ser executados de duas formas:

✅ 1. Pelo Postman (Interface Gráfica)

Importe a collection:
```
postman/collections/task-manager-api.postman_collection.json
```

Importe o environment:
```
postman/environments/local.postman_environment.json
```

Execute a collection pelo Runner do Postman

Os testes:

- Criam usuários

- Fazem login

- Salvam tokens em variáveis de ambiente

- Criam tasks

- Listam, validam e removem tasks

- Verificam status codes e respostas

✅ 2. Pelo Terminal (Newman)

No terminal, na raiz do projeto:
```
npx newman run postman/collections/task-manager-api.postman_collection.json -e postman/environments/local.postman_environment.json
```

Você deverá ver um resumo com todos os testes passando ✅

## 🛣️ Roadmap (Evolução do Projeto)

✅ CRUD de Tasks

✅ CRUD de Usuários

✅ Validação de dados com Zod

✅ Autenticação com JWT

✅ Proteção de rotas

✅ Testes automatizados com Postman + Newman

⏳ Testes com Jest + Supertest

⏳ CI com GitHub Actions

⏳ Dockerização do projeto

📝 Observações

O banco SQLite é utilizado apenas para desenvolvimento.

O projeto está em evolução contínua.

Cada etapa do roadmap gera commits incrementais e documentados.

Este repositório serve como projeto de estudo e portfólio backend.

👨‍💻 Autor

Desenvolvido por Luiz Carvalho
Projeto de estudo focado em Backend, APIs REST, autenticação, testes e qualidade de software.
