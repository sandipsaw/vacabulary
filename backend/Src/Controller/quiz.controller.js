const Quiz = require("../Model/quizModel");
const Vocab = require("../Model/VocabModel");

const createQuiz = async (req, res) => {
  try {
    const {
      vocab,
      questionType,
      question,
      options,
      correctAnswer,
      explanation,
      difficulty,
      marks,
      negativeMarks,
      isActive,
    } = req.body;

    // Check vocab exists
    const vocabExists = await Vocab.findById(vocab);

    if (!vocabExists) {
      return res.status(404).json({
        success: false,
        message: "Vocab not found",
      });
    }

    // Check duplicate question for same vocab
    const quizExists = await Quiz.findOne({
      vocab,
      questionType,
    });

    if (quizExists) {
      return res.status(409).json({
        success: false,
        message: "Quiz already exists for this vocab and question type",
      });
    }

    const quiz = await Quiz.create({
      vocab,
      questionType,
      question,
      options,
      correctAnswer,
      explanation,
      difficulty,
      marks,
      negativeMarks,
      isActive,
    });

    return res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: quiz,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {  createQuiz};