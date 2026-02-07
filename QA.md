# QA - Task Manager API

## 🎯 Objetivo

Este documento descreve a estratégia de qualidade (QA) do projeto Task
Manager API, definindo: - Tipos de testes utilizados - Ferramentas
adotadas - Como executar os testes - Critérios de aceite - Fluxos
cobertos - Limitações atuais - Próximos passos de QA

O objetivo é garantir confiabilidade, segurança e estabilidade da API a
cada mudança no código.

------------------------------------------------------------------------

## 🧪 Tipos de Testes Implementados

### 1) Testes de Integração (Jest + Supertest)

Esses testes validam o comportamento real da API, incluindo: - Subida do
servidor - Rotas HTTP reais - Integração com banco (Prisma + SQLite) -
Autenticação JWT - Fluxo completo de criação e listagem de tasks

Ferramentas: - Jest - Supertest

Local dos testes: src/tests/

Executar localmente: npm test

------------------------------------------------------------------------

### 2) Testes de API / Fluxo (Postman + Newman)

Esses testes validam a API como um cliente externo faria: - Registro de
usuário - Login - Captura automática de token JWT - Criação de task
autenticada - Listagem de tasks - Atualização de task - Exclusão de
task - Validação de erros e acessos não autorizados

Ferramentas: - Postman - Newman

Executar via CLI: npx newman run
postman/collections/task-manager-api.postman_collection.json -e
postman/environments/local.postman_environment.json

Pré-requisitos: - API rodando (npm run dev) - Banco acessível -
Environment do Postman configurado

------------------------------------------------------------------------

## 🤖 Testes no CI (GitHub Actions)

O pipeline executa automaticamente: - Instalação das dependências -
Geração do Prisma Client - Execução das migrations - Execução dos testes
com Jest

Roda em: - Push na branch main - Pull Requests para main

Critério: - Se qualquer teste falhar, o pipeline falha - O código só é
considerado pronto com CI verde

------------------------------------------------------------------------

## ✅ Critérios de Aceite

### Healthcheck

GET /health - Deve retornar 200 com { "status": "ok" }

### Autenticação

POST /users/register - 201 ao criar usuário - 400 se email já existir ou
dados inválidos

POST /users/login - 200 retorna token - 401 credenciais inválidas - 400
payload inválido

### Tasks (JWT)

GET /tasks - 200 lista tasks do usuário - 401 sem token

POST /tasks - 201 cria task - 400 payload inválido - 401 sem token

PUT /tasks/:id - 200 atualiza - 403 se não for dono - 404 se não
existir - 401 sem token

DELETE /tasks/:id - 204 sucesso - 403 se não for dono - 404 se não
existir - 401 sem token

------------------------------------------------------------------------

## ⚠️ Limitações Atuais

-   SQLite apenas para desenvolvimento
-   Testes não isolam banco por suíte
-   Sem mocks externos
-   Sem testes de carga

------------------------------------------------------------------------

## 🛣️ Próximos Passos

-   Banco em memória para testes
-   Isolamento de dados por suíte
-   Aumentar cobertura de erros
-   Testes de performance (k6)
-   Relatório de cobertura no CI

------------------------------------------------------------------------

## 🏁 Definition of Done

-   Código implementado
-   Testes atualizados/criados
-   npm test passando
-   CI verde
-   Documentação atualizada
