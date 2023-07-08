// Note: You can deal with assignments with an Authenticated Teacher
const Assignment = require('../models/assignment')
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const Subject = require('../models/subject')


exports.createAssignment = async function (req, res){
    try {
        req.body.teacher = req.teacher._id
        const assignment = await Assignment.create(req.body)
        req.teacher.assignment? // If exist....
        req.teacher.assignment.addToSet(assignment._id ): //...Then add assignment ID ....
        req.teacher.assignment = [assignment._id] // ...If it doesn't exist, make a new array
        await req.teacher.save() //...Then save no matter exist or not
        res.json(assignment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.allAssignments = async function (req, res){
    try {
        const assignments = await Assignment.find().populate({
            path: 'teacher',
        })
        res.json(assignments)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showAssignment = async function (req, res){
    try {
        const assignment = await Assignment.findOne({ _id: req.params.id }).populate({
            path: 'teacher',
        })
        res.json(assignment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.indexComplete = async function (req, res){
    try {
        const assignments = await Assignment.find({ completed: true }).populate({
            path: 'teacher',
        })
        res.json(assignments)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.indexNotComplete = async function (req, res){
    try {
        const assignments = await Assignment.find({ completed: false }).populate({
            path: 'teacher',
        })
        res.json(assignments)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateAssignment = async function (req, res){
    try {
        const assignment = await Assignment.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate({
            path: 'teacher',
        })
        res.json(assignment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteAssignment = async function (req, res){
    try {
        const assignment = await Assignment.findOneAndDelete({ _id: req.params.id }).populate({
            path: 'teacher',
        })
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}