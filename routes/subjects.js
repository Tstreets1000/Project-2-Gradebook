const express = require('express')
const router = express.Router()
const subjectController = require('../controllers/subjects')

// Create /subjects
router.post('/', subjectController.createSubject)
// Show all /subjects
router.get('/', subjectController.allSubjects)
// Show /subjects/:id
router.get('/:id', subjectController.showSubject)
// Update /subjects/:id
router.put('/:id', subjectController.updateSubject)
// Delete /subject/:id
router.delete('/:id', subjectController.deleteSubject)

module.exports = router