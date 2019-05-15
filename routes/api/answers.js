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


router.get("/question/:id", (req, res) => {
    Answer.find({ question: req.params.id })
        .sort({ date: -1 })
        .then(answer => res.json(answer))
        .catch(err =>
            res.status(404).json({ noAnswersFound: 'No answers found for that question' })
        )
})

router.get("/user/:id", (req, res) => {
    Answer.find({ author: req.params.id })
        .sort({ date: -1 })
        .then(answers => res.json(answers))
        .catch(err =>
            res.status(404).json({ noAnswersFound: 'No answers found for that user' })
        );
});

router.patch("/", (req, res) => {
    let authorId = req.body.userId;
    console.log(authorId);
    Answer.find({ author: authorId })
        .sort({ date: -1 })
        .then(answers => {
            answer = answers[0];
            answer.winner = true;
            answer.save().then(answer => res.json(answer));
        }, err => { console.log(err) });

});


module.exports = router;
