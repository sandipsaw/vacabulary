const userModel = require('../Model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
    const { fullName, email, mobile, password, confirmPassword, role, premium, propremium } = req.body;
    const isUser = await userModel.findOne({ email })

    if (isUser) {
        return res.status(409).json({ message: "user already exists" })
    }
    if (password !== confirmPassword) {
        return res.status(409).json({ message: "password does not match please fill the password in correct order" })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        fullName,
        email,
        mobile,
        password: hashPassword,
        role,
        premium,
        propremium
    })
    const token = jwt.sign({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
        premium: user.premium,
        propremium: user.propremium,
        createdAt: user.createdAt
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
    })
    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            premium: user.premium,
            propremium: user.propremium
        }
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password')

    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json({ message: 'wrong password' });
    }

    const token = jwt.sign({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        premium: user.premium,
        propremium: user.propremium,
        createdAt: user.createdAt
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
    })

    res.status(201).json({
        message: "user login successfully",
        user
    })
}
const getUser = async(req,res) =>{
    const user = req.user;
    if(!user){
        return res.status(401).json({message:"unauthorized"})
    }
    res.status(201).json({
        message:"user fetch successfully",
        user
    })
}
const logOutUser = async(req,res) =>{
    const token = req.cookies.token
    // if(token){
    //     await redis.set(`blacklist:${token}`,'true','EX',24*60*60*1000)
    // }
    res.clearCookie('token',{
        httpOnly:true,
        secure:true,
    })
    res.status(200).json({message:"user logout succesfully"})
}

module.exports = { registerUser, loginUser ,getUser,logOutUser}