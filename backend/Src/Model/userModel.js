const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minlength: [3, "Full name must be at least 3 characters"],
        maxlength: [50, "Full name cannot exceed 50 characters"],
=======
    fullName:{
        type:String,
        require:true,
        
>>>>>>> 464d2c02d676e120f6889d26841645d9c8011349
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
<<<<<<< HEAD
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false,
    },
    
    role: {
        type: String,
        enum: {
            values: ["student", "teacher", "admin"],
            message: "Role must be student, teacher or admin",
        },
        default: 'student'
=======
    confirmPassword:{
        type:String,
        select:false
>>>>>>> 464d2c02d676e120f6889d26841645d9c8011349
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