import request from "supertest";
import { app } from "../app";


let token = "";
let createdTaskId = "";

describe("Tasks (auth)", () => {
  beforeAll(async () => {
    // 1) registra um usuário (pode falhar se já existir, então usamos email único)
    const email = `test_${Date.now()}@test.com`;
    const password = "123456";

    await request(app)
      .post("/users/register")
      .send({ name: "User Test", email, password });

    // 2) faz login e captura token
    const loginRes = await request(app)
      .post("/users/login")
      .send({ email, password });

    expect(loginRes.status).toBe(200);
    expect(typeof loginRes.body.token).toBe("string");

    token = loginRes.body.token;
  });

  it("deve criar uma task", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Task teste", description: "Criada pelo Jest" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Task teste");
    expect(res.body).toHaveProperty("id");

    createdTaskId = res.body.id;
  });

  it("deve listar tasks e conter a criada", async () => {
    const res = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const ids = res.body.map((t: any) => t.id);
    expect(ids).toContain(createdTaskId);
  });
});
