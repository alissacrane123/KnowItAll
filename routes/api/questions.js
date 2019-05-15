const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Question = require('../../models/Question');
const validateQuestionInput = require('../../validation/questions');

router.get("/test", (req, res) => res.json({ msg: "This is the tweets route" }));

router.get("/", (req, res) => {
    Question.find()
        .sort({ date: -1 })
        .populate('answers')
        .exec()
        .then(questions => {
            // debugger;
            res.json(questions
            // questions: questions.map(question => {
            //     debugger;
            //     return {
            //         body: question.body,
            //         date: question.date,
            //         answers: question.answer
            //     }
            // })
            )})
        .catch(err => res.status(404).json({ noQuestionsFound: 'No questions found'}));
});

router.post('/',
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateQuestionInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        
        const newQuestion = new Question({
            body: req.body.body,
            author: req.body.authorId
        });
    newQuestion.save().then(question => res.json(question));
    }
);

router.get("/user/:id", (req, res) => {
    Question.find({ author: req.params.id })
        .sort({ date: -1 })
        .then(questions => res.json(questions))
        .catch(err =>
            res.status(404).json({ noQuestionsFound: 'No questions found for that user'})
        )
})

module.exports = router;