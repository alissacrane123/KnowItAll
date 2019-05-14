const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    // answers: [{ 
    //     type: Schema.Types.ObjectId,
    //     ref: 'answers' 
    // }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Question = mongoose.model('questions', QuestionSchema);