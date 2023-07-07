const { model, Schema } = require('mongoose') // Destructuring Schema

// Every time we create an Subject it belongs to Teacher
const subjectSchema = new Schema ({
    subject: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' }
})

const Subject = model('Subject', subjectSchema)

module.exports = Subject