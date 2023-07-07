const express = require('express')
const morgan = require('morgan')
const teacherRoutes = require('./routes/teachers')
const assignmentRoutes = require('./routes/assignments')
const studentRoutes = require('./routes/students')
const subjectRoutes = require('./routes/subjects')
const teacherController = require('./controllers/teachers')

const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/teachers', teacherRoutes)
app.use('/assignments',teacherController.auth,  assignmentRoutes)
app.use('/students', teacherController.auth, studentRoutes)
app.use('/subjects', teacherController.auth, subjectRoutes)

module.exports = app