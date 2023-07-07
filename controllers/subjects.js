// Note: You can deal with assignments with an Authenticated Teacher
const Subject = require('../models/subject')
const Teacher = require('../models/teacher')


// === CREATE A SUBJECT === //
exports.createSubject = async function (req, res){
    try {
        req.body.teacher = req.teacher._id
        const subject = await Subject.create(req.body)
        req.teacher.subjects? // If exist....
        req.teacher.subjects.addToSet(subject._id ): //...Then add subject ID ....
        req.teacher.subjects = [subject._id] // ...If it doesn't exist, make a new array
        await req.teacher.save()
        //...Then save no matter exist or not
        res.json(subject)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// === FIND A SINGLE SUBJECT === //
exports.showSubject = async function (req, res){
    try {
        const subject = await Subject.findOne({ _id: req.params.id })
        res.json(subject)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// === FIND ALL SUBJECTS === //
exports.allSubjects = async function (req, res){
    try {
        const subjects = await Subject.find({ })
        res.json(subjects)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// === UPDATE A SUBJECT === //
exports.updateSubject = async function (req, res){
    try {
        const subject = await Subject.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.json(subject)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// === DELETE A SUBJECT === //
exports.deleteSubject = async function (req, res){
    try {
        const subject = await Subject.findOneAndDelete({ _id: req.params.id })
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}