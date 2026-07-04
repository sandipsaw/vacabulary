const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
        
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
    confirmPassword:{
        type:String,
        select:false
    },
    role:{
        type:String,
        enum:['student','teacher','admin'],
        default:'student'
    },
    premium:false,
    propremium:false

})
const userModel = mongoose.model('users',userSchema)

module.exports = userModel 