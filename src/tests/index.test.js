import { describe, it } from "node:test";
import assert from "node:assert";

describe("Testa rota padrão da aplicação.", () => {
  it("Deve retornar status 404 para rotas inexistentes", async () => {
    const response = await fetch("http://localhost:3001/absent", {
      method: "GET",
    });

    assert.deepEqual(response.status, 404);
  });

  it("Deve retornar \"Essa rota não existe\" caso o usuário digite uma rota incorreta", async () => {
    const response = await fetch("http://localhost:3001/absent", {
      method: "GET",
    });
    const result = await response.json();

    assert.deepStrictEqual(result, { message: "Essa rota não existe" });
  });
});

describe("Testa a rota \"/\"", () => {
  it("Deve retornar status 200 - OK", async () => {
    const response = await fetch("http://localhost:3001/", {
      method: "GET",
    });

    assert.deepEqual(response.status, 200);
  });

  it("Deve retornar uma mensagem de \"OK\"", async () => {
    const response = await fetch("http://localhost:3001/", {
      method: "GET",
    });
    const result = await response.json();

    assert.deepStrictEqual(result, { message: "OK" });
  });
});
