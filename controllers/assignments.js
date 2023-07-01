// Note: You can deal with assignments with an Authenticated Teacher
const Assignment = require('../models/assignment')
const Teacher = require('../models/teacher')



exports.createAssignment = async function (req, res){
    try {
        req.body.teacher = req.teacher._id
        const assignment = await Assignment.create(req.body)
        req.teacher.assignments? // If exist....
        req.teacher.assignments.addToSet(assignment._id ): //...Then add assignment ID ....
        req.teacher.assignments = [assignment._id] // ...If it doesn't exist, make a new array
        await req.teacher.populate.save() //...Then save no matter exist or not
        res.json(assignment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.allAssignments = async function (req, res){
    try {
        const assignment = await Assignment.find({})
        res.json(assignment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showAssignment = async function (req, res){
    try {
        const assignment = await Assignment.findOne({ _id: req.params.id })
        res.json(assignment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.indexComplete = async function (req, res){
    try {
        const assignments = await Assignment.find({ completed: true, teacher: req.teacher_id })
        res.json(assignments)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.indexNotComplete = async function (req, res){
    try {
        const assignments = await Assignment.find({ completed: false, teacher: req.teacher_id })
        res.json(assignments)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateAssignment = async function (req, res){
    try {
        const assignment = await Assignment.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.json(assignment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteAssignment = async function (req, res){
    try {
        const assignment = await Assignment.findOneAndDelete({ _id: req.params.id })
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}