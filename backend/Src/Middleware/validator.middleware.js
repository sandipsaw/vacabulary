const {body, validationResult } = require("express-validator");

const responseWithValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        const formattedErrors = {};

        errors.array().forEach((err) => {
            formattedErrors[err.path] = err.msg;
        });

        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors: formattedErrors,
        });
    }

    next();
};

const registerUserValidation = [
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Full name must be between 3 and 50 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address")
        .normalizeEmail(),

    body("mobile")
        .trim()
        .notEmpty()
        .withMessage("Mobile number is required")
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Invalid mobile number"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),

    body("confirmPassword")
        .notEmpty()
        .withMessage("Confirm password is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),

    body("role")
        .optional()
        .isIn(["student", "teacher"])
        .withMessage("Role must be either student or teacher"),

    responseWithValidationErrors,
];

const loginUserValidation = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),

    responseWithValidationErrors,
];

module.exports = {registerUserValidation,loginUserValidation};