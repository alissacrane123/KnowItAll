const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'questions'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Comment = mongoose.model('comments', CommentSchema);

