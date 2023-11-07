import { describe, it } from "node:test";
import assert from "node:assert";

const BASE_URL = "http://localhost:3001/register";

describe("Testa rota de registro", () => {
  it("Deve ser possível cadastrar um novo usuário", async () => {
    const data = {
      "name": "teste2",
      "email": "email@email.com",
      "password": "123456"
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    assert.deepEqual(response.status, 201);
    assert.deepStrictEqual(result, { "message": `Usuário criado! id: 1` });
  });

  it("Não deve ser possível cadastrar um novo usuário caso ele exista", async () => {
    const data = {
      "name": "teste",
      "email": "teste@teste.com",
      "password": "teste123"
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    assert.deepEqual(response.status, 400);
    assert.deepStrictEqual(result, { "message": "Usuário já existe!" });
  });

  it("Não deve ser possível cadastrar um novo usuário caso ele não informe o nome", async () => {
    const data = {
      "email": "random@teste.com",
      "password": "teste123"
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    assert.deepEqual(response.status, 400);
    assert.deepStrictEqual(result, { "message": "Dados inválidos." });
  });

  it("Não deve ser possível cadastrar um novo usuário caso ele não informe o email", async () => {
    const data = {
      "name": "teste2",
      "password": "teste123"
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    assert.deepEqual(response.status, 400);
    assert.deepStrictEqual(result, { "message": "Dados inválidos." });
  });

  it("Não deve ser possível cadastrar um novo usuário caso ele não informe a senha", async () => {
    const data = {
      "name": "teste2",
      "email": "random@teste.com"
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    assert.deepEqual(response.status, 400);
    assert.deepStrictEqual(result, { "message": "Dados inválidos." });
  });
});
