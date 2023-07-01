const Classroom = require('../models/classroom')
const Student = require('../models/student')
const Teacher = require('../models/teacher')


// Create a classroom that belongs to a teacher with students
exports.createClassroom = async function (req, res){
    try {
        req.body.teacher = req.teacher._id
        const classroom = await Classroom.create(req.body)
        req.teacher.classroom? // If exist....
        req.teacher.classroom.addToSet(classroom._id ): //...Then add classroom ID ....
        req.teacher.classroom = [classroom._id] // ...If it doesn't exist, make a new array
        await req.teacher.populate.save() //...Then save no matter exist or not
        res.json(classroom)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Show all created classrooms
exports.allClassrooms = async function (req, res){
    try {
        const classroom = await Classroom.find({})
        res.json(classroom)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Show single created classroom
exports.showClassroom = async function (req, res){
    try {
        const classroom = await Classroom.findOne({ _id: req.params.id })
        res.json(classroom)
    } catch (error) {
        res.status(400).json({ message: error.message }) 
    }
}


// Delete a classroom
exports.deleteClassroom = async function (req, res){
    try {
        const classroom = await Classroom.findOneAndDelete({ _id: req.params.id })
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}