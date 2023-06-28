const express = require('express')
const router = express.Router()
const assignmentController = require('../controllers/assignments')
const teacherController = require('../controllers/teachers')


// Index /assignments
router.get('/', teacherController.auth, assignmentController.indexNotComplete)
// Index /assignments/completed
router.get('/completed', teacherController.auth, assignmentController.indexComplete)
// Create /assignments
router.post('/', teacherController.auth, assignmentController.createAssignment)
// Show /assignments/:id
router.get('/:id', teacherController.auth, assignmentController.showAssignment)
// Show all /assignments
router.get('/:id', teacherController.auth, assignmentController.allAssignments)
// Update /todos/:id
router.put('/:id', teacherController.auth, assignmentController.updateAssignment)
// Delete /assignments/:id
router.delete('/:id', teacherController.auth, assignmentController.deleteAssignment)



module.exports = router