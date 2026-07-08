const Vocab = require("../Model/VocabModel");

const getWordOfTheDay = async (req, res) => {
    try {

        const totalWords = await Vocab.countDocuments();

        if (!totalWords) {
            return res.status(404).json({
                success: false,
                message: "No vocabulary found",
            });
        }

        const days = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

        const index = days % totalWords;

        const word = await Vocab.findOne()
            .sort({ _id: 1 })
            .skip(index);

        return res.status(200).json({
            success: true,
            word,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = getWordOfTheDay;