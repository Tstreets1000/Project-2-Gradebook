require('dotenv').config()
const Teacher = require('../models/teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Middleware function checking authorization
exports.auth = async function (req, res, next){
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const data = jwt.verify(token, process.env.SECRET)
        console.log(data)
        const teacher = await Teacher.findOne({ _id: data._id })
        console.log(teacher)
        if(!teacher) {
            throw new Error('Bad Credentials')
        }
        req.teacher = teacher
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

// Create a Teacher using Auth token
exports.createTeacher = async function (req, res){
    try {
        const teacher = new Teacher(req.body)
        await teacher.save()
        const token = await teacher.generateAuthToken()
        res.json({ teacher, token })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// Get All created Teachers
exports.allTeachers = async function (req, res){
    try {
        const teachers = await Teacher.find({})
        res.json(teachers)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Find a created Teacher
exports.showTeacher = async function (req, res){
    try {
        const teacher = await Teacher.findOne({ _id: req.params.id })
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Login a Teacher using Auth token
exports.loginTeacher = async function (req, res){
    try {
        const teacher = await Teacher.findOne({ username: req.body.username }) // Look Teacher up in Database
        if(!teacher || !await bcrypt.compare(req.body.password, teacher.password)) { // If both statements check true, move to generate token
            throw new Error('Invalid Login Credentials') // Only if one or both statements check false
        } else {
            const token = await teacher.generateAuthToken()
            res.json({ teacher, token })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update a teacher 
// Already have a found teacher saved in req.teacher from Auth function
exports.updateTeacher = async function (req, res){
    try {
        const updates = Object.keys(req.body) // Makes array of keys for each key update 
        updates.forEach(update => req.teacher[update] = req.body[update]) // Updates req.body with new keys in req.body update
        await req.teacher.save()
        res.json(teacher)
    } catch (error) {
        res.status(400).json({ message: error.message })  
    }
}

// Delete a teacher
// Already have a found teacher saved in req.teacher from Auth function
exports.deleteTeacher = async function (req, res){
    try {
        await req.teacher.deleteOne()
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}