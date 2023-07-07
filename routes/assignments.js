const express = require('express')
const router = express.Router()
const assignmentController = require('../controllers/assignments')

// Show All /assignments
router.get('/', assignmentController.allAssignments)
// Index /assignments/completed
router.get('/completed', assignmentController.indexComplete)
// Index /assignments/notCompleted
router.get('/notCompleted', assignmentController.indexNotComplete)
// Create /assignments
router.post('/', assignmentController.createAssignment)
// Show /assignments/:id
router.get('/:id', assignmentController.showAssignment)
// Update /assignments/:id
router.put('/:id', assignmentController.updateAssignment)
// Delete /assignments/:id
router.delete('/:id', assignmentController.deleteAssignment)

module.exports = router