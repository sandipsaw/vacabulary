const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
        unique:true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email",
        ],
    },
    mobile: {
        type: Number,
        required: [true, "Mobile number is required"],
        unique: true,
        match: [/^[6-9]\d{9}$/, "Please enter a valid mobile number"],
    },
    password:{
        type:String,
        select:false
    },
    confirmPassword:{
        type:String,
        select:false
    },
    
    role: {
        type: String,
        enum: {
            values: ["student", "teacher", "admin"],
            message: "Role must be student, teacher or admin",
        },
        default: 'student'
    },
    premium: {
        type: Boolean,
        default: false
    },
    propremium: {
        type: Boolean,
        default: false
    }
}, { timestamp: true })

const userModel = mongoose.model('users', userSchema)

module.exports = userModel 