const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require ('../app')
const server = app.listen(8080, () => console.log('Lets get ready to test'))
const Teacher = require('../models/teacher')
let mongoServer 

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close() // programmatic ctrl+c
    mongoServer.stop() // getting rid of our mongodb instance itself
    server.close()  
})

describe('Test the teacher endpoints', () => {
    test('It should create a new teacher', async () => {
        const response = await request(app)
        .post('/teachers')
        .send({
            name: 'Kimbo Slice',
            username: 'Slice',
            password: 'password123'
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.teacher.name).toEqual('Kimbo Slice')
        expect(response.body.teacher.username).toEqual('Slice')
        expect(response.body).toHaveProperty('token')
    })

    test('It should allow a teacher to login', async () => {
        const teacher = new Teacher({ 
            name: 'Chuck Norris', 
            username: 'Ground Chuck', 
            password: 'password123' })
        await teacher.save()
    
        const response = await request(app)
          .post('/teachers/login')
          .send({ 
            username: 'Ground Chuck', 
            password: 'password123' 
        })
        
        expect(response.statusCode).toBe(200)
        expect(response.body.teacher.name).toEqual('Chuck Norris')
        expect(response.body.teacher.username).toEqual('Ground Chuck')
        expect(response.body).toHaveProperty('token')
    })

    test('It should update a teacher', async () => {
        const teacher = new Teacher({ 
          name: 'Jack', 
          username: 'Be Quick', 
          password: 'password123' 
        })
        await teacher.save()
        const token = await teacher.generateAuthToken()
        
        console.log(teacher)
        const response = await request(app)
          .put(`/teachers/${teacher._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ 
            name: 'Bruce Lee', 
            username: 'Sai Fon',
            password: 'password123' 
        })
        
        console.log(response.body)
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Bruce Lee')
        expect(response.body.username).toEqual('Sai Fon')
       
    })

    test('It should delete a teacher', async () => {
        const teacher = new Teacher({ 
            name: 'Terrance1', 
            username: 'Tstreets1000', 
            password: 'password123' 
        })
        await teacher.save()
        const token = await teacher.generateAuthToken()
    
        const response = await request(app)
          .delete(`/teachers/${teacher._id}`)
          .set('Authorization', `Bearer ${token}`)
        
        expect(response.statusCode).toBe(204)
    })


})

