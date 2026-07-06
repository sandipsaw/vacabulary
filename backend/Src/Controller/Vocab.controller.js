const vocabModel = require("../Model/VocabModel.js");


const createWord = async (req, res) => {
  try {
    const {
      word,
      pos,
      definition,
      examples,
      synonyms,
      antonyms,
      hint,
      imageUrl,
      exams,
      premium,
      propremium,
    } = req.body;

    const existingWord = await vocabModel.findOne({ word });

    if (existingWord) {
      return res.status(409).json({
        success: false,
        message: "Word already exists",
      });
    }

    const newWord = await vocabModel.create({
      word,
      letter: word.charAt(0).toUpperCase(),
      pos,
      definition,
      examples,
      synonyms,
      antonyms,
      hint,
      imageUrl,
      exams,
      premium,
      propremium,
    });

    return res.status(201).json({
      success: true,
      data: newWord,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateWord = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { word, pos, definition, examples, synonyms,antonyms, hint, imageUrl, exams } =
      req.body;

    const updatedWord = await vocabModel.findByIdAndUpdate(
      id,
      {
        word,
        letter: word ? word.charAt(0).toUpperCase() : undefined,
        pos,
        definition,
        examples,
        synonyms,
        antonyms,
        hint,
        imageUrl,
        exams,
        premium: false,
        propremium: false,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedWord) {
      return res.status(404).json({
        success: false,
        message: "Word not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Word updated successfully",
      data: updatedWord,
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
const deleteWord = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedWord = await vocabModel.findByIdAndDelete(id);

    if (!deletedWord) {
      return res.status(404).json({
        success: false,
        message: "Word not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Word deleted successfully",
      data: deletedWord,
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

const getAllVocab = async(req,res)=>{
  try{
    const vocab = await vocabModel.find()
    return res.status(201).json({
      message:"you all vocabs are available here:",
      vocab
    })
  }catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
const getWordsByLetter = async (req, res) => {
  try {
    const { letter } = req.params;

    const words = await vocabModel.find({
      letter: letter.toUpperCase(),
    });

    return res.status(200).json({
      success: true,
      total: words.length,
      words,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getWordById = async (req, res) => {
  try {
    const { id } = req.params;

    const word = await vocabModel.findById(id)

    return res.status(200).json({
      success: true,
      word
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createWord, updateWord, deleteWord,getWordsByLetter,getWordById ,getAllVocab};
