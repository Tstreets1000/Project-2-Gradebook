const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(8081, () => console.log("Blessed to test!"));
const Teacher = require("../models/teacher");
const Subject = require("../models/subject");
let mongoServer; // In global Scope for access to all

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Subject.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close(); // programmatic ctrl+c
  mongoServer.stop(); // getting rid of our mongodb instance itself
  server.close();
});

describe("Test the subject endpoints", () => {
  //=== Create ===//
  test("It should create a new subject", async () => {
    const teacher = new Teacher({
      name: "Tiny Lister",
      username: "Deebo",
      password: "password123",
    });
    await teacher.save();
    const token = await teacher.generateAuthToken();
    const response = await request(app)
      .post("/subjects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        subject: "Spanish",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.subject).toEqual("Spanish");
  });

  //=== ALL SUBJECTS ===//
  test("It should get all subjects", async () => {
    const teacher = new Teacher({
      name: "Jesus",
      username: "The Christ",
      password: "password123",
    });
    await teacher.save();
    const token = await teacher.generateAuthToken();

    const response = await request(app)
      .get("/subjects")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  //=== SINGLE SUBJECT ===//
  test("It should get a single subject", async () => {
    const teacher = new Teacher({
      name: "Kobe Bryant",
      username: "Black Mamba",
      password: "password123",
    });
    await teacher.save();
    const token = await teacher.generateAuthToken();

    const response = await request(app)
      .get(`/subjects/${teacher._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  //=== UPDATE ===//
  test("It should update a subject", async () => {
    const teacher = new Teacher({
      name: "King Solomon",
      username: "The wisest man on earth",
      password: "password123",
    });
    await teacher.save();
    const token = await teacher.generateAuthToken();
    const subject = new Subject({
      subject: "Hop Scotch",
    });

    const response = await request(app)
      .put(`/subjects/${teacher._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    // expect(response.body.subject).toEqual("Double Dutch")
  });

  //=== DELETE ===// (Do I Need all of code?)
  test("It should delete a single subject", async () => {
    const teacher = new Teacher({
      name: "Micheal Jordan",
      username: "Air Jordan",
      password: "password123",
    });
    await teacher.save();
    const token = await teacher.generateAuthToken();
    
    const response = await request(app)
      .delete(`/subjects/${teacher._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});
