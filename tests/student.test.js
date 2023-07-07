const request = require("supertest")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const app = require("../app")
const server = app.listen(8082, () => console.log("Ready, Set, Test!"))
const Student = require("../models/student")
const Teacher = require("../models/teacher")
let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
})

afterEach(async () => {
  await Student.deleteMany()
})

afterAll(async () => {
  await mongoose.connection.close() // programmatic ctrl+c
  mongoServer.stop() // getting rid of our mongodb instance itself
  server.close()
})

describe("Test the student endpoints", () => {

  //=== CREATE ===//
  test("It should create a new student", async () => {
    const teacher = new Teacher({
      name: "Tiny Lister",
      username: "Deebo",
      password: "password123",
    });
    await teacher.save();
    const token = await teacher.generateAuthToken();
    const response = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Bumpy Johnson"
      })
     
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual("Bumpy Johnson")
  })

  //=== ALL STUDENTS ===//
  test("It should get all students", async () => {
    const teacher = new Teacher({
      name: "Jesus",
      username: "The Christ",
      password: "password123"
    })
    await teacher.save()
    const token = await teacher.generateAuthToken()

    const response = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
  })

  //=== SINGLE STUDENT ===//
  test("It should get a single student", async () => {
    const teacher = new Teacher({
      name: "John the Baptist",
      username: "The Baptizer",
      password: "password123"
    })
    await teacher.save()
    const token = await teacher.generateAuthToken()
    const student = new Student({
      name: "Lil Scrappy"
    })
    await student.save()
    const response = await request(app)
      .get(`/students/${student._id}`)
      .set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual("Lil Scrappy")
  })

  //=== UPDATE ===//
  test("It should get a single student and update", async () => {
    const teacher = new Teacher({
      name: "King David",
      username: "The Man after GODs own heart",
      password: "password123"
    })
    await teacher.save()
    const token = await teacher.generateAuthToken()
    const student = new Student({
      name: "Lil Scrappy"
    })
    await student.save()
    const response = await request(app)
      .put(`/students/${student._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Lil Bow Wow"
      })
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual("Lil Bow Wow")
  })

  //=== DELETE ===//
  test("It should delete a single student", async () => {
    const teacher = new Teacher({
      name: "King Solomon",
      username: "The wisest man on earth",
      password: "password123"
    })
    await teacher.save()
    const token = await teacher.generateAuthToken()
    const student = new Student({
      name: "Pippy Long Stockings"
    })
    await student.save()
    const response = await request(app)
      .delete(`/students/${student._id}`)
      .set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(204)
  })
})
