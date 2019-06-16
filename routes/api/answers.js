const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Answer = require('../../models/Answer');
const validateAnswerInput = require('../../validation/answers');
let ObjectId = require('mongodb').ObjectID;

router.get("/test", (req, res) => res.json({ msg: "This is the answers route" }));

router.get("/", (req, res) => {
    Answer.find()
        .then(answers => 
            {   answerObj = {};
                answers.map(answer => {
                    answerObj[answer.question] = answerObj[answer.question] || [];
                    answerObj[answer.question].push(answer);
            });
            res.json(answerObj);
        })
        .catch(err => res.status(404).json({ noAnswersFound: 'No answers found' }));
});

// aggregate
// group on author id
// create total column, and sum 1 for each author
// create correct column, sum on condition winner equal to true count as 1
// after grouping & creating columns use project to divide the two columns
router.get("/stats", (req, res) => {
    Answer.aggregate([
        { $group: {
            _id: "$author",
            Total: { $sum: 1 },
            Correct: { $sum: { $cond: [{ $eq: ["$winner", true] }, 1, 0 ]}},
        } },
        { $project: {
            Total: 1, Correct: 1, AvgPercent: { $toInt: { $multiply: [ { $divide: ["$Correct", "$Total"] }, 100 ] } } } }
    ])
    .then(answers => res.json(answers))
    .catch(err => res.status(404).json({ noAnswersFound: 'No answers found' }));
});


// When trying to match a _id in aggregation you must first cast it as an objectId
// see: https://stackoverflow.com/questions/36193289/moongoose-aggregate-match-does-not-match-ids/36193485#36193485
router.get("/stats/user/:id", (req, res) => {
    let myId = ObjectId.createFromHexString(req.params.id)
    Answer.aggregate([
        { $match: { author: myId } },
        {
            $group: {
                _id: "$author",
                Total: { $sum: 1 },
                Correct: { $sum: { $cond: [{ $eq: ["$winner", true] }, 1, 0] } },
            }
        },
        {
            $project: {
                Total: 1, Correct: 1, AvgPercent: { $toInt: { $multiply: [{ $divide: ["$Correct", "$Total"] }, 100] } }
            }
        }
    ])
        .then(answers => res.json(answers))
        .catch(err => res.status(404).json({ noAnswersFound: 'No answers found' }));
});

router.get("/stats/daily/user/:id", (req, res) => {
    let myId = ObjectId.createFromHexString(req.params.id)
    Answer.aggregate([
        { $match: { author: myId } },
        { 
            $project: { newdate: { '$dateToString': { format: '%m-%d', date: '$date' } }, winner: 1 }
        },
        {
            $group: {
                _id: "$newdate",
                amt: { $sum: 1 },
                Right: { $sum: { $cond: [{ $eq: ["$winner", true] }, 1, 0] } },
            }
        },
        {
            $project: {
                name: "$_id", amt: 1, Right: 1, Wrong: { $subtract: ["$amt", "$Right"] }, Score: { $toInt: { $multiply: [{ $divide: ["$Right", "$amt"] }, 100] } }
            }
        },
        { $sort: { _id: 1 } }
    ])
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

// total: { $count: "$_id" },
// totalCorrect: { $count: { "$winner": "true" } }

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
    Answer.find({ author: authorId })
        .sort({ date: -1 })
        .then(answers => {
            answer = answers[0];
            answer.winner = true;
            answer.save().then(answer => res.json(answer));
        }, err => { console.log(err) });

});


module.exports = router;
