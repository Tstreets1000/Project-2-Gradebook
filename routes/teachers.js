const express = require('express')
const router = express.Router()
const teacherController = require('../controllers/teachers')



// Create /teachers
router.post('/', teacherController.createTeacher)
// Show All /teachers
router.get('/', teacherController.allTeachers)
// Show /teacher
router.get('/', teacherController.showTeacher)
// Login /teachers/login
router.post('/login', teacherController.loginTeacher)
// Update /teachers/:id
router.put('/:id', teacherController.auth, teacherController.updateTeacher)
// Delete /teachers/:id
router.delete('/:id', teacherController.auth, teacherController.deleteTeacher)



module.exports = router