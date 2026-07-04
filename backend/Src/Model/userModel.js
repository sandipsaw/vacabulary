const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    mobile:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        select:false
    },
    confirmPassword:{
        type:String,
        select:false
    },
    role:{
        type:String,
        enum:['student','teacher','admin'],
        default:'student'
    },
    feature:{
        type:String,
        enum:['basic','medium','premium'],
        default:'basic'
    }

})
const userModel = mongoose.model('users',userSchema)

module.exports = userModel 