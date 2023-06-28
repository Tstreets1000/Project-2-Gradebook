const express = require('express')
const router = express.Router()
const studentController = require('../controllers/students')
const teacherController = require('../controllers/teachers')


// Create /students
router.post('/', teacherController.auth, studentController.createStudent)
// Show All /students
router.get('/', teacherController.auth, studentController.allStudents)
// Show /students/:id
router.get('/:id', teacherController.auth, studentController.showStudent)
// Update /students/:id
router.put('/:id', teacherController.auth, studentController.updateStudent)
// Delete /students/:id
router.delete('/:id', teacherController.auth, studentController.deleteStudent)



module.exports = router