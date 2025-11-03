const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const express = require("express");
const authRouter = require("../routes/auth");
const User = require("../models/user");

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });

  app = express();
  app.use(express.json());
  app.use("/api", authRouter);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("Auth Routes", () => {
  test("Signup: should register a new user", async () => {
    const res = await request(app)
      .post("/api/signup")
      .send({ name: "Test User", email: "test@example.com", password: "password123" }); // Add name
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User registered successfully");
    expect(res.body.user.email).toBe("test@example.com");
  });

  test("Signup: should not register with existing email", async () => {
    await request(app)
      .post("/api/signup")
      .send({ name: "Test User", email: "test@example.com", password: "password123" }); // Add name
    const res = await request(app)
      .post("/api/signup")
      .send({ name: "Test User", email: "test@example.com", password: "password123" }); // Add name
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("User already registered.");
  });

  test("Login: should login with correct credentials", async () => {
    await request(app)
      .post("/api/signup")
      .send({ name: "Test User", email: "test@example.com", password: "password123" }); // Add name
    const res = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com", password: "password123" });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });

  test("Login: should not login with wrong password", async () => {
    await request(app)
      .post("/api/signup")
      .send({ email: "test@example.com", password: "password123" });
    const res = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com", password: "wrongpass" });
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Invalid email or password.");
  });

  test("Login: should not login with unregistered email", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "nouser@example.com", password: "password123" });
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("Invalid email or password.");
  });
});