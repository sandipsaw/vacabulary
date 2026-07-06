const mongoose = require("mongoose");

const vocabSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: [true, "Word is required"],
      unique: true,
      trim: true,
    },

    letter: {
      type: String,
      required: true,
      uppercase: true,
    },

    pos: {
      type: String,
      //   required: [true, "Word type is required"], // Noun, Verb, Adjective, etc.
    },

    definition: {
      type: String,
      //   required: [true, "Definition is required"],
      trim: true,
    },

    examples: {
      type: String,
      required: [true, "Example sentence is required"],
      trim: true,
    },

    synonyms: {
      type: [String],
      required: true,
    },
    
    antonyms: {
      type: [String],
      required: true,
    },

    hint: {
      type: String,
      trim: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    exams: {
      type: String,
    },
    exams: {
      type: String,
    },
  }, { timestamps: true })

const vocabModel = mongoose.model('vocab', vocabSchema)
module.exports = vocabModel