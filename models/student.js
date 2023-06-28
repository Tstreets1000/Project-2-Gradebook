const { model, Schema } = require('mongoose') // Destructuring Schema

const studentSchema = new Schema ({
    name: { type: String, required: true },
    assignment: [{ type: Schema.Types.ObjectId, required: true, ref: "Assignment" }], // Every time we create a student it belongs to teacher
    teacher: [{ type: Schema.Types.ObjectId, required: true, ref: 'Teacher' }] 
}, {
    timestamps: true
})

const Student = model('Student', studentSchema)

module.exports = Student
