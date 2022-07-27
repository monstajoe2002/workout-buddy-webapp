const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})
//static signup method

userSchema.statics.signup = async function (email, password) {
    //validation
    if (!email || !password) {
        throw Error('All fields are required')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password: hashedPassword })
    return user;
}
//static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields are required')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Invalid email')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Invalid password')
    }
    return user;
}


module.exports = mongoose.model('User', userSchema)