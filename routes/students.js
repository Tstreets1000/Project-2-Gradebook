const express = require('express')
const router = express.Router()
const studentController = require('../controllers/students')

// Create /students
router.post('/', studentController.createStudent)
// Show All /students
router.get('/', studentController.allStudents)
// Show /students/:id
router.get('/:id', studentController.showStudent)
// Update /students/:id
router.put('/:id', studentController.updateStudent)
// Delete /students/:id
router.delete('/:id', studentController.deleteStudent)

module.exports = router