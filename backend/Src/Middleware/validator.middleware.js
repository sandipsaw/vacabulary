const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose')

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

const createQuizValidation = [
    // Vocab ID
    body("vocab")
        .notEmpty()
        .withMessage("Vocab ID is required")
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid Vocab ID");
            }
            return true;
        }),

    // Question Type
    body("questionType")
        .notEmpty()
        .withMessage("Question type is required")
        .isIn([
            "meaning",
            "synonym",
            "antonym",
            "fill_blank",
            "sentence",
            "spelling",
            "context",
        ])
        .withMessage("Invalid question type"),

    // Question
    body("question")
        .trim()
        .notEmpty()
        .withMessage("Question is required")
        .isLength({ min: 5 })
        .withMessage("Question must be at least 5 characters long"),

    // Options
    body("options")
        .isArray({ min: 4, max: 4 })
        .withMessage("Exactly 4 options are required"),

    body("options.*.text")
        .trim()
        .notEmpty()
        .withMessage("Option text cannot be empty"),

    // Correct Answer
    body("correctAnswer")
        .isInt({ min: 0, max: 3 })
        .withMessage("Correct answer must be between 0 and 3"),

    // Explanation
    body("explanation")
        .trim()
        .notEmpty()
        .withMessage("Explanation is required"),

    // Difficulty
    body("difficulty")
        .optional()
        .isIn(["Easy", "Medium", "Hard"])
        .withMessage("Difficulty must be Easy, Medium or Hard"),

    // Marks
    body("marks")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Marks must be at least 1"),

    // Negative Marks
    body("negativeMarks")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Negative marks cannot be negative"),

    // isActive
    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be boolean"),
    responseWithValidationErrors
];

module.exports = { registerUserValidation, loginUserValidation , createQuizValidation};