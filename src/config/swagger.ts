import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description:
        "API REST para gerenciamento de tasks com autenticação JWT. Projeto de estudo (Backend + QA).",
    },
    servers: [{ url: "http://localhost:3000" }],

    tags: [
      { name: "Health", description: "Healthcheck" },
      { name: "Users", description: "Cadastro e autenticação" },
      { name: "Tasks", description: "CRUD de tasks (protegido por JWT)" },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Internal server error" },
          },
        },

        ValidationErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Dados inválidos" },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: { type: "array", items: { type: "string" } },
                  message: { type: "string" },
                },
              },
            },
          },
        },

        AuthResponse: {
          type: "object",
          properties: {
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." },
          },
        },

        UserPublic: {
          type: "object",
          properties: {
            id: { type: "string", example: "clm9gpi40000dokw..." },
            name: { type: "string", example: "Usuario A" },
            email: { type: "string", example: "a_teste01@teste.com" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Usuario A" },
            email: { type: "string", example: "a_teste01@teste.com" },
            password: { type: "string", example: "123456" },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "a_teste01@teste.com" },
            password: { type: "string", example: "123456" },
          },
        },

        Task: {
          type: "object",
          properties: {
            id: { type: "string", example: "clm182izr30002dojoe0qw1xej" },
            title: { type: "string", example: "Task autenticada" },
            description: { type: "string", nullable: true, example: "Criada via API" },
            completed: { type: "boolean", example: false },
            userId: { type: "string", example: "clm8251ku0000dojo03w3wayq6" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        CreateTaskRequest: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string", example: "Minha task" },
            description: { type: "string", nullable: true, example: "Descrição opcional" },
          },
        },

        UpdateTaskRequest: {
          type: "object",
          properties: {
            title: { type: "string", example: "Novo título" },
            description: { type: "string", nullable: true, example: "Nova descrição" },
            completed: { type: "boolean", example: true },
          },
        },
      },

      responses: {
        Unauthorized: {
          description: "Não autorizado (token ausente ou inválido)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                invalid: { value: { message: "Token inválido" } },
              },
            },
          },
        },
        Forbidden: {
          description: "Acesso negado (recurso não pertence ao usuário)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                forbidden: { value: { message: "Acesso negado" } },
              },
            },
          },
        },
        NotFound: {
          description: "Recurso não encontrado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                notFound: { value: { message: "Task não encontrada" } },
              },
            },
          },
        },
        BadRequest: {
          description: "Requisição inválida",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                badRequest: { value: { message: "Dados inválidos" } },
              },
            },
          },
        },
        ValidationError: {
          description: "Erro de validação (Zod)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ValidationErrorResponse" },
            },
          },
        },
        InternalServerError: {
          description: "Erro interno do servidor",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              examples: {
                internal: { value: { message: "Internal server error" } },
              },
            },
          },
        },
      },
    },
  },

  // isso só diz onde ele vai procurar as anotações @swagger
  apis: ["src/routes/*.ts", "src/controllers/*.ts"],
});
