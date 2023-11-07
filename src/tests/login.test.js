import { describe, it } from "node:test";
import assert from "node:assert";

const BASE_URL = "http://localhost:3001/login";

describe("Testa rota de login", () => {
  it("Deve retornar \"400 - Dados inválidos\" caso usuário não informe email", async () => {
    const data = {
      "password": "1234"
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    assert.deepEqual(response.status, 400);
    assert.deepStrictEqual(result, { message: "Dados inválidos." });
  });

  it("Deve retornar \"400 - Dados inválidos\" caso usuário não informe senha", async () => {
    const data = {
      "email": "email@email.com"
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    assert.deepEqual(response.status, 400);
    assert.deepStrictEqual(result, { message: "Dados inválidos." });
  });

  it("Deve retornar \"400 - Usuário não encontrado!\" caso usuário não esteja cadastrado", async () => {
    const data = {
      "email": "nao@existe.com",
      "password": "123456"
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    assert.deepEqual(response.status, 400);
    assert.deepStrictEqual(result, { message: "Usuário não encontrado!" });
  });

  it("Deve retornar \"400 - Usuário não encontrado!\" caso usuário insira senha incorreta", async () => {
    const data = {
      "email": "teste@teste.com",
      "password": "1234"
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    assert.deepEqual(response.status, 400);
    assert.deepStrictEqual(result, { message: "Usuário não encontrado!" });
  });

});
