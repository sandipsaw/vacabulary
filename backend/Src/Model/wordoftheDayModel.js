const mongoose =require('mongoose')

const wordOfDaySchema = new mongoose.Schema({
    vocab:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vocab"
    },
    date:{
        type:Date,
        unique:true
    }
});

const wordoftheDayModel = mongoose.model('wordofthefDay',wordOfDaySchema)
module.exports = wordoftheDayModel