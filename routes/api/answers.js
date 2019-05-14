const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Answer = require('../../models/Answer');
const validateAnswerInput = require('../../validation/answers');

router.get("/test", (req, res) => res.json({ msg: "This is the answers route" }));

router.get("/", (req, res) => {
    Answer.find()
        .sort({ date: -1 })
        .then(answers => res.json(answers))
        .catch(err => res.status(404).json({ noAnswersFound: 'No answers found' }));
});

router.post('/',
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // debugger;
        const { errors, isValid } = validateAnswerInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newAnswer = new Answer({
            body: req.body.body,
            author: req.body.authorId,
            question: req.body.questionId
        });

        newAnswer.save().then(answer => res.json(answer));
    }
);

router.patch("/:id", (req, res) => {
    Answer.find({ id: req.params.id })
    //continue 
})

router.get("/question/:id", (req, res) => {
    Answer.find({ question: req.params.id })
        .sort({ date: -1 })
        .then(answer => res.json(answer))
        .catch(err =>
            res.status(404).json({ noAnswersFound: 'No answers found for that question' })
        )
})

module.exports = router;