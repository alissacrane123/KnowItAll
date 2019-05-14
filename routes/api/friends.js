const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Friend = require('../../models/Friend');

router.get("/test", (req, res) => res.json({ msg: "This is the friends route" }));

router.get("/", (req, res) => {
    Friend.find()
        .sort({ date: -1 })
        .then(Friends => res.json(Friends))
        .catch(err => res.status(404).json({ noFriendsFound: 'No friends found' }));
});

router.post('/',
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findOne({ username: req.body.friendName })
            .then(newFriend => {
                if (!newFriend) {
                    return res.status(404).json('Friend not found')
                }

                const newFriendship = new Friend({
                    user_id: req.body.userId,
                    friend_id: newFriend.id
                }) 

                Friend.findOne({
                    user_id: req.body.userId,
                    friend_id: newFriend.id
                })
                    .then(friend => {
                        if(friend) {
                            return res.status(400).json("Already friends")
                        } else {
                            newFriendship
                                .save()
                                .then(friend => res.json(friend))
                                .catch(err => res.json(err))
                        }
                    })
            })
    }
);

router.get("/user/:id", (req, res) => {
    Friend.find({ user_id: req.params.id })
        .sort({ date: -1 })
        .then(friends => res.json(friends))
        .catch(err =>
            res.status(404).json({ noFriendsFound: 'No friends found for that user' })
        )
})

module.exports = router;