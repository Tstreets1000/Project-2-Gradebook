const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(8080, () => console.log("Lets get ready to test"));
const Teacher = require("../models/teacher");
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Teacher.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close(); // programmatic ctrl+c
  mongoServer.stop(); // getting rid of our mongodb instance itself
  server.close();
});

describe("Test the teacher endpoints", () => {
  //=== CREATE ===//
  test("It should create a new teacher", async () => {
    const response = await request(app).post("/teachers").send({
      name: "Eminem",
      username: "Slim Shady",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.teacher.name).toEqual("Eminem");
    expect(response.body.teacher.username).toEqual("Slim Shady");
    expect(response.body).toHaveProperty("token");
    const teacher = await Teacher.find();
  });

  //=== SHOW ALL TEACHERS ===//
  test("It should show all created teachers", async () => {
    const teacher = new Teacher({
        name: "Bill Cosby",
        username: "Fat Albert",
        password: "password123"
    })
    await teacher.save()
    const token = await teacher.generateAuthToken()

    const response = await request(app)
    .get("/teachers")
    .set("Authorization", `Bearer ${token}`)
    .send({
        name: "Bill Cosby",
        username: "Fat Albert",
        password: "password123"
    })
    expect(response.statusCode).toBe(200);
    // expect(response.body.teacher.name).toEqual("Bill Cosby");
    // expect(response.body.teacher.username).toEqual("Fat Albert");
    // expect(response.body).toHaveProperty("token");
    // await teacher.delete();
  })

  //=== SHOW SINGLE TEACHER ===//
  test("It should show one created teacher", async () => {
    const teacher = new Teacher({
        name: "Doug E. Fresh",
        username: "Human Beat Box",
        password: "password123"
    })
    await teacher.save()
    const token = await teacher.generateAuthToken()

    const response = await request(app)
    .get(`/teachers/${teacher._id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
        name: "Doug E. Fresh",
        username: "Human Beat Box",
        password: "password123"
    })
    expect(response.statusCode).toBe(200);
    // expect(response.body.teacher.name).toEqual("Doug E. Fresh");
    // expect(response.body.teacher.username).toEqual("Human Beat Box");
    // expect(response.body).toHaveProperty("token");
    // await teacher.deleteOne();
  })

  //=== LOGIN ===//
  test("It should allow a teacher to login", async () => {
    const teacher = new Teacher({
      name: "Ricky Bobby",
      username: "Lightning",
      password: "password123",
    });
    await teacher.save();
    const token = await teacher.generateAuthToken();

    const response = await request(app)
      .post("/teachers/login")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "Lightning",
        password: "password123",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.teacher.name).toEqual("Ricky Bobby");
    expect(response.body.teacher.username).toEqual("Lightning");
    expect(response.body.teacher.loggedIn).toEqual(true);
    expect(response.body).toHaveProperty("token");
    await teacher.deleteOne();
  });

  //=== LOGOUT ===//
  test("It should allow a teacher to logout", async () => {
    const teacher = new Teacher({
      name: "Wyatt Earp",
      username: "Young Gunz",
      password: "password123",
    });
    await teacher.save();
    const token = await teacher.generateAuthToken();

    const response = await request(app)
      .post("/teachers/logout")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Wyatt Earp",
        username: "Young Gunz",
        password: "password123",
      });

    expect(response.statusCode).toBe(200);
  });

  //=== UPDATE ===//
  test("It should update a teacher", async () => {
    const teacher = new Teacher({
      name: "Jackie Chan",
      username: "Drunken Master",
      password: "password123",
    });
    await teacher.save();
    const token = await teacher.generateAuthToken();

    const response = await request(app)
      .put(`/teachers/${teacher._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Bruce Lee",
        username: "Sai Fon",
        password: "password123",
      });

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Bruce Lee");
    expect(response.body.username).toEqual("Sai Fon");
  });

  //=== DELETE ===//
  test("It should delete a teacher", async () => {
    const teacher = new Teacher({
      name: "Professor X",
      username: "The Mind",
      password: "password123",
    });
    await teacher.save();
    const token = await teacher.generateAuthToken();

    const response = await request(app)
      .delete(`/teachers/${teacher._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);    
  });

});
