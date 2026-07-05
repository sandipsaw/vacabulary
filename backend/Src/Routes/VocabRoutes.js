const express = require("express");
const {createWord} = require("../Controller/Vocab.controller.js");
const { updateWord } = require("../Controller/Vocab.controller.js");
const { deleteWord } = require("../Controller/Vocab.controller.js");
const {getWordsByLetter} =require("../Controller/Vocab.controller.js")
const {getWordById} =require("../Controller/Vocab.controller.js")

const router = express.Router();

router.post("/create",createWord);
router.patch("/update/:id", updateWord);
router.delete("/delete/:id", deleteWord);
router.get("/getwords/:letter",getWordsByLetter)
router.get("/getSingleWord/:id",getWordById)

module.exports = router;