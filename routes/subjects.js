const express = require('express')
const router = express.Router()
const subjectController = require('../controllers/subjects')

// Create /subjects
router.post('/', teacherController.auth, subjectController.createSubject)
// Show all /subjects
router.get('/', teacherController.auth, subjectController.allSubjects)
// Show /subjects/:id
router.get('/:id', teacherController.auth, subjectController.showSubject)
// Update /subjects/:id
router.put('/:id', teacherController.auth, subjectController.updateSubject)
// Delete /subject/:id
router.delete('/:id', teacherController.auth, subjectController.deleteSubject)

module.exports = router