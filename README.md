# Task Manager API

API REST para gerenciamento de tarefas (tasks), desenvolvida em **Node.js com TypeScript**, utilizando **Express** e **Prisma ORM**.

Este projeto faz parte de um roadmap de estudos focado em **backend e qualidade de software**, evoluindo diariamente com novas funcionalidades, validações e boas práticas.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite (ambiente de desenvolvimento)
- Postman (testes manuais da API)
- Git & GitHub

---

## 📂 Estrutura do Projeto

src/
├─ app.ts # Configuração principal do Express
├─ server.ts # Inicialização do servidor
├─ config/
│ └─ prisma.ts # Instância do Prisma Client
├─ controllers/
│ └─ task.controller.ts
├─ routes/
│ └─ task.routes.ts
└─ middlewares/


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
2️⃣ Instalar dependências
```
npm install
```
3️⃣ Configurar variáveis de ambiente
Crie um arquivo .env na raiz do projeto:
```
DATABASE_URL="file:./dev.db"
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
## 📌 Endpoints Disponíveis (atual)
🔹 Healthcheck
GET /health
🔹 Tasks
Criar Task
POST /tasks
Body:
```
{
  "title": "Minha task",
  "description": "Descrição opcional",
  "userId": "ID_DO_USUARIO"
}
Listar Tasks
GET /tasks
Atualizar Task
PUT /tasks/:id
Body:

{
  "title": "Novo título",
  "completed": true
}
Deletar Task
DELETE /tasks/:id
```
🧪 Testes
Os testes manuais da API são realizados utilizando Postman.
A collection do Postman será versionada junto ao projeto para facilitar validações futuras.

🛣️ Roadmap (próximas etapas)

 Validação de dados (Zod)

 Tratamento centralizado de erros

 CRUD de usuários

 Autenticação com JWT

 Testes automatizados (Jest + Supertest)

 CI com GitHub Actions

📝 Observações
O banco SQLite é utilizado apenas para desenvolvimento.

O projeto está em evolução contínua.

Cada etapa do roadmap gera commits incrementais e documentados.

👨‍💻 Autor
Desenvolvido por Luiz Carvalho
Projeto de estudo focado em backend, APIs REST e qualidade de software.
