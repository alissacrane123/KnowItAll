const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Comment = require('../../models/Comment');
const validateCommentInput = require('../../validation/comments');

router.get("/test", (req, res) => res.json({ msg: "This is the comments route" }));

router.get("/", (req, res) => {
    Comment.find()
        .sort({ date: -1 })
        .then(comments => res.json(comments))
        .catch(err => res.status(404).json({ noCommentsFound: 'No comments found' }));
});

router.post('/',
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // debugger;
        const { errors, isValid } = validateCommentInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newComment = new Comment({
            body: req.body.body,
            author: req.body.authorId,
            question: req.body.questionId
        });

        newComment.save().then(comment => res.json(comment));
    }
);

router.get("/question/:id", (req, res) => {
    Comment.find({ question: req.params.id })
        .sort({ date: -1 })
        .then(comments => res.json(comments))
        .catch(err =>
            res.status(404).json({ noCommentsFound: 'No comments found for that question' })
        )
})

module.exports = router;