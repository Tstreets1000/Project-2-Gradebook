require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    loggedIn: { type: Boolean },
    assignment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    subject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
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