require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    classroom: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }]
}, {
    timestamps: true
})

teacherSchema.pre('save', async function(next){
    this.isModified('password') ? // If password is changed 
    this.password = await bcrypt.hash(this.password, 8): // Rencrypt password
    null;
    next()
})

teacherSchema.methods.generateAuthToken = async function(){
    console.log(process.env.SECRET)
    const token = jwt.sign({ _id: this._id }, process.env.SECRET)
    return token
}

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher