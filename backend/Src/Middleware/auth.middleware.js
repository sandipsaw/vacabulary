const jwt = require('jsonwebtoken');
const userModel = require('../Model/userModel');

const authMiddlewares = async (req,res,next) => {
    const {token}= req.cookies
    
    if (!token) {
        return res.status(401).json({ message: "invalid token" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = decoded
        if (!user) {
            return res.status(401).json({ message: "unauthorized" });
        }
        req.user = user
        next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" });
    }
}

module.exports = {authMiddlewares}