const { model, Schema } = require('mongoose') // Destructuring Schema

// Every time we create an Assignment it belongs to Teacher
const assignmentSchema = new Schema ({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    grade: { type: Number, min: 0, max: 100  },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    student: { type: Schema.Types.ObjectId, ref: 'Student' } 
}, {
    timestamps: true
})

const Assignment = model('Assignment', assignmentSchema)

module.exports = Assignment