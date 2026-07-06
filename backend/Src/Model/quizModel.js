const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    // Reference to vocab
    vocab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vocab",
      required: true,
    },

    // Question Type
    questionType: {
      type: String,
      enum: [
        "meaning",
        "synonym",
        "antonym",
        "fill_blank",
        "sentence",
        "spelling",
        "context"
      ],
      required: true,
    },

    // Question
    question: {
      type: String,
      required: true,
      trim: true,
    },

    // Options
    options: [
      {
        text: {
          type: String,
          required: true,
        },
      },
    ],

    // Correct option index
    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },

    // Explanation
    explanation: {
      type: String,
      required: true,
    },

    // Difficulty
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    // Marks
    marks: {
      type: Number,
      default: 1,
    },

    // Negative Marks
    negativeMarks: {
      type: Number,
      default: 0,
    },

    // Active
    isActive: {
      type: Boolean,
      default: true,
    },
    word: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    synonyms: {
      type: [String],
      required: true,
    },
    antonyms: {
      type: [String],
      required: true,
    },
    examples: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);