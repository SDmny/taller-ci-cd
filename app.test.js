const request = require("supertest");
const app = require("./app");

test("GET / devuelve mensaje", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
  expect(res.text).toBe("Hello World!");
});

test("GET /suma devuelve resultado correcto", async () => {
  const res = await request(app).get("/suma").query({ a: 5, b: 3 });
  expect(res.statusCode).toBe(200);
  expect(res.body.resultado).toBe(8);
});
