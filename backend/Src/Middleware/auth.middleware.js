const jwt = require("jsonwebtoken");

const authMiddlewares = (req, res, next) => {

    let token = req.cookies?.token;

    // If cookie is not present, check Authorization header
    if (!token && req.headers.authorization) {

        const authHeader = req.headers.authorization;

        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        console.log(req.user);
        

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Unauthorized"
        });

    }

};

module.exports = { authMiddlewares };