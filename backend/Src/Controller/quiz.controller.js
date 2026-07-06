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
    console.log(vocabExists)

    if (!vocabExists) {
      return res.status(404).json({
        success: false,
        message: "Vocab not found",
      });
    }

    // Check duplicate question for same vocab
    // const quizExists = await Quiz.findOne({
    //   vocab,
    //   questionType,
    // });

    // if (quizExists) {
    //   console.log(quizExists)
    //   return res.status(409).json({
    //     success: false,
    //     message: "Quiz already exists for this vocab and question type",
    //   });
    // }

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
      word: vocabExists.word,
      definition: vocabExists.definition,
      synonyms: vocabExists.synonyms,
      antonyms: vocabExists.antonyms,
      examples: vocabExists.examples,
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



const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.aggregate([
      {
        $sample: {
          size: 30,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = { createQuiz, getAllQuizzes };