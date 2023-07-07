const express = require('express')
const router = express.Router()
const teacherController = require('../controllers/teachers')


// Create /teachers 
router.post('/', teacherController.createTeacher)
// Show All /teachers
router.get('/', teacherController.auth, teacherController.allTeachers)
// Show /teachers/:id
router.get('/:id', teacherController.auth, teacherController.showTeacher)
// Login /teachers/login
router.post('/login', teacherController.auth, teacherController.loginTeacher)
// Logout /teachers/logout
router.post('/logout', teacherController.auth, teacherController.logoutTeacher)
// Update /teachers/:id
router.put('/:id', teacherController.auth, teacherController.updateTeacher)
// Delete /teachers/:id
router.delete('/:id', teacherController.auth, teacherController.deleteTeacher)

module.exports = router