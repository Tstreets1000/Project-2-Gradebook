const express = require('express')
const morgan = require('morgan')
const teacherRoutes = require('./routes/teachers')
const assignmentRoutes = require('./routes/assignments')
const studentRoutes = require('./routes/students')
const classroomRoutes = require('./routes/classrooms')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/teachers', teacherRoutes)
app.use('/assignments', assignmentRoutes)
app.use('/students', studentRoutes)
app.use('/classrooms', classroomRoutes)

module.exports = app