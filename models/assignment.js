const { model, Schema } = require('mongoose') // Destructuring Schema

const assignmentSchema = new Schema ({
    title: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
    teacher: [{ type: Schema.Types.ObjectId, required: true, ref: 'Teacher' }] // Every time we create an assignment it belongs to teacher
}, {
    timestamps: true
})

const Assignment = model('Assignment', assignmentSchema)

module.exports = Assignment