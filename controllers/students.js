// Note: You can deal with assignments with an Authenticated Teacher
const Assignment = require('../models/assignment')
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const Subject = require('../models/subject')

// Create a student
exports.createStudent = async function (req, res){
    try {
        req.body.teacher = req.teacher._id
        const student = await Student.create(req.body)
        req.teacher.students? // If exist....
        req.teacher.students.addToSet(student._id ): //...Then add student ID ....
        req.teacher.students = [student._id] // ...If it doesn't exist, make a new array
        await req.teacher.save()
        //...Then save no matter exist or not
        res.json(student)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Find all created students 
exports.allStudents = async function (req, res){
    try {
        const students = await Student.find().populate({
            path: 'teacher',
        })
        res.json(students)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Find a single created student
exports.showStudent = async function (req, res){
    try {
        const student = await Student.findOne({ _id: req.params.id }).populate({
            path: 'teacher',
        })
        res.json(student)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Find a single created student and update info
exports.updateStudent = async function (req, res){
    try {
        const student = await Student.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate({
            path: 'teacher',
        })
        res.json(student)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Find a created student and delete
exports.deleteStudent = async function (req, res){
    try {
        const student = await Student.findOneAndDelete({ _id: req.params.id }).populate({
            path: 'teacher',
        })
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}