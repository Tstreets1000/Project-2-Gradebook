const request = require("supertest")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const app = require("../app")
const server = app.listen(8083, () => console.log("We taking over!"))
const Assignment = require("../models/assignment")
const Teacher = require("../models/teacher")
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})
  
afterEach(async () => {
    await Assignment.deleteMany() 
})
  
afterAll(async () => {
    await mongoose.connection.close() // programmatic ctrl+c
    mongoServer.stop() // getting rid of our mongodb instance itself
    server.close()
})

describe("Test the assignment endpoints", () => {

    //=== CREATE ===//
    test("Create a new assignment", async () => {
      const teacher = new Teacher({
        name: "Sho Nuff",
        username: "Nuff Said",
        password: "password123",
      })
      await teacher.save();
      const token = await teacher.generateAuthToken()
      const response = await request(app)
        .post("/assignments")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Learn Kung Fu",
          
        })
      expect(response.statusCode).toBe(200)
      expect(response.body.title).toEqual("Learn Kung Fu")
    })
  
    //=== ALL ASSIGNMENTS ===//
    test("Get all assignments", async () => {
      const teacher = new Teacher({
        name: "Jesus",
        username: "The Christ",
        password: "password123"
      })
      await teacher.save()
      const token = await teacher.generateAuthToken()  
      const response = await request(app)
        .get("/assignments")
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
    })
  
    //=== SINGLE ASSIGNMENT ===//
    test("Get a single assignment", async () => {
      const teacher = new Teacher({
        name: "John the Baptist",
        username: "The Baptizer",
        password: "password123"
      })
      await teacher.save()
      const token = await teacher.generateAuthToken()
      const assignment = new Assignment({
        title: "Find Locust",
        
      })
      await assignment.save()
      const response = await request(app)
        .get(`/assignments/${assignment._id}`)
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
      expect(response.body.title).toEqual("Find Locust")
    })

    //=== COMPLETED ASSIGNMENTS ===//
    test("Get an assignment flagged complete", async () => {
      const teacher = new Teacher({
        name: "Alvin R. Kibbey",
        username: "Breaker",
        password: "password123"
      })
      await teacher.save()
      const token = await teacher.generateAuthToken()
      const assignment = new Assignment({
        title: "Communications Qualification",
        completed: "true"
      })
      await assignment.save()
      const response = await request(app)
        .get(`/assignments/${assignment._id}`)
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
      expect(response.body.title).toEqual("Communications Qualification")
    })
  
    //=== NOT COMPLETED ASSIGNMENTS ===//
    test("Get an assignment flagged not complete", async () => {
      const teacher = new Teacher({
        name: "Lance J. Steinberg",
        username: "Clutch",
        password: "password123"
      })
      await teacher.save()
      const token = await teacher.generateAuthToken()
      const assignment = new Assignment({
        title: "Vehicle Qualification",
        completed: "false"
      })
      await assignment.save()
      const response = await request(app)
        .get(`/assignments/${assignment._id}`)
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
      expect(response.body.title).toEqual("Vehicle Qualification")
    })

    //=== UPDATE ===//
    test("Get a single assignment and update", async () => {
      const teacher = new Teacher({
        name: "King David",
        username: "The Man after GODs own heart",
        password: "password123"
      })
      await teacher.save()
      const token = await teacher.generateAuthToken()
      const assignment = new Assignment({
        title: "Pickup 5 smooth Stones"
      })
      await assignment.save()
      const response = await request(app)
        .put(`/assignments/${assignment._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Only use one smooth Stone"
        })
      expect(response.statusCode).toBe(200)
      expect(response.body.title).toEqual("Only use one smooth Stone")
    })
  
    //=== DELETE ===//
    test("Delete a single assignment", async () => {
      const teacher = new Teacher({
        name: "King Solomon",
        username: "The wisest man on earth",
        password: "password123"
      })
      await teacher.save()
      const token = await teacher.generateAuthToken()
      const assignment = new Assignment({
        title: "Build Temple",
        
      })
      await assignment.save()
      const response = await request(app)
        .delete(`/assignments/${assignment._id}`)
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(204)
    })
  })