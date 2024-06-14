import { expect } from "chai";
import supertest from "supertest";
import dotenv from "dotenv";
import app from "../src/app.js";

dotenv.config();

const request = supertest(app);

describe("Authentication", () => {
  let token;

  after(() => {
    process.exit(1); // Ensure the server is closed after tests
  });

  it("should register a new user", async () => {
    const res = await request.post("/api/register").send({
      username: "testuser",
      email: "testuser@gmail.com",
      password: "password123",
    });
    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal("User registered successfully");
  });

  it("should login a user and return a jwt", async () => {
    const res = await request.post("/api/login").send({
      username: "testuser",
      password: "password123",
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    token = res.body.token;
  });

  it("should retrieve the logged-in user's profile", async () => {
    const res = await request
      .get("/api/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("username", "testuser");
    expect(res.body).to.have.property("email", "testuser@gmail.com");
  });
});
