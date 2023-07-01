const express = require('express')
const router = express.Router()
const studentController = require('../controllers/students')
const teacherController = require('../controllers/teachers')
const classroomController = require('../controllers/classrooms')


// Create /classroom
router.post('/', classroomController.createClassroom)
// Show /classroom/:id
router.get('/:id', classroomController.showClassroom)
// Show all /classrooms
router.get('/:id', classroomController.allClassrooms)
// Delete /classroom/:id
router.delete('/:id', classroomController.deleteClassroom)



module.exports = router