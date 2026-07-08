const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        unique: true
    },

    totalWordsLearned: {
        type: Number,
        default: 0
    },

    totalQuizAttempted: {
        type: Number,
        default: 0
    },

    averageScore: {
        type: Number,
        default: 0
    },

    accuracy: {
        type: Number,
        default: 0
    },

    currentStreak: {
        type: Number,
        default: 0
    },

    longestStreak: {
        type: Number,
        default: 0
    },
    lastQuizDate: {
        type: Date,
        default: null
    },

    weeklyProgress: [
        {
            date: Date,
            quizzes: {
                type: Number,
                default: 0,
            },
            score: {
                type: Number,
                default: 0,
            },
            learnedWords: {
                type: Number,
                default: 0,
            },
        },
    ],
    achievements: {
        type: [String],
        default: []
    },

    recentActivity: [
        {
            activity: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model("userProgress", userProgressSchema);