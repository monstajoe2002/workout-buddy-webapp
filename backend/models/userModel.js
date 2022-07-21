const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
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

userSchema.statics.signup = async function(email, password){
    const emailExists =await this.findOne({email})
    if (emailExists){
        throw Error('Email already in use')
    }
    const salt= await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hashedPassword})
    return user;
}

module.exports = mongoose.model('User', userSchema)