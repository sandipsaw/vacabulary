const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    quiz:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz",
        required:true
    },

    totalQuestions:{
        type:Number,
        required:true
    },

    correctAnswers:{
        type:Number,
        required:true
    },

    wrongAnswers:{
        type:Number,
        required:true
    },

    score:{
        type:Number,
        required:true
    },

    accuracy:{
        type:Number
    },

    timeTaken:Number,

    words:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"vocab"
        }
    ],
    weakword: {
      type: [String],
    },
    saveword: {
      type: [String],
    },

    completedAt:{
        type:Date,
        default:Date.now
    }

},{
    timestamps:true
})

module.exports = mongoose.model("quizAttempt",quizAttemptSchema);