const { model, Schema } = require('mongoose') // Destructuring Schema

const classroomSchema = new Schema ({
    roomNumber: { type: Number, required: true },
    students: [{ type: Schema.Types.ObjectId, required: true, ref: 'Student' }],
    teacher: [{ type: Schema.Types.ObjectId, required: true, ref: 'Teacher' }] // Every time we create an Room Number it belongs to Teacher
})

const Classroom = model('Classroom', classroomSchema)

module.exports = Classroom