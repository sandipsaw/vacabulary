const mongoose = require("mongoose");

const learnedWordSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    word: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vocab",
        required: true
    }

}, {
    timestamps: true
});

// Prevent duplicate user-word pairs
learnedWordSchema.index(
    { user: 1, word: 1 },
    { unique: true }
);

module.exports = mongoose.model("learnedWord", learnedWordSchema);