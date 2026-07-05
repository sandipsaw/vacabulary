const mongoose =require('mongoose')

const vocabSchema = new mongoose.Schema({
    word:{
        type:String,
        required:true
    },
    synonyms:{
        type:Array,
        required:true
    },
    examples:{
        type:String,
        required:true
    },
    mnemonics:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    exams:{
        type:String,
    },
},{timestamps:true})

const vocabModel = mongoose.model('vocab',vocabSchema)
module.exports = vocabModel