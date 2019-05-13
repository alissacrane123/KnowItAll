const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCommentInput(data) {
    let errors = {};

    data.body = validText(data.body) ? data.body : '';

    if (Validator.isEmpty(data.body)) {
        errors.body = 'Body field is required';
    }

    if (Validator.isEmpty(data.questionId)) {
        errors.question = 'Question field is required';
    }

    if (Validator.isEmpty(data.authorId)) {
        errors.author = 'Author field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};