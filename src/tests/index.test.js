import { describe, it } from "node:test";
import assert from "node:assert";

describe("Test default route", () => {
  it("Should return status 404 - Not found for absent route", async () => {
    const response = await fetch("http://localhost:3001/absent", {
      method: "GET",
    });

    assert.deepEqual(response.status, 404);
  });

  it("Should return \"This route doesn't exists.\" for absent route", async () => {
    const response = await fetch("http://localhost:3001/absent", {
      method: "GET",
    });
    const result = await response.json();

    assert.deepStrictEqual(result, { message: "This route doesn't exists." });
  });
});

describe("Test \"/\" route", () => {
  it("Should return status 200 - OK", async () => {
    const response = await fetch("http://localhost:3001/", {
      method: "GET",
    });

    assert.deepEqual(response.status, 200);
  });

  it("Should return \"OK\" message", async () => {
    const response = await fetch("http://localhost:3001/", {
      method: "GET",
    });
    const result = await response.json();

    assert.deepStrictEqual(result, { message: "OK" });
  });
});
