const { model, Schema } = require('mongoose') // Destructuring Schema

// Every time we create an Student it belongs to Teacher
const studentSchema = new Schema ({
    name: { type: String, required: true },
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment' }, 
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' }  
})

const Student = model('Student', studentSchema)

module.exports = Student
