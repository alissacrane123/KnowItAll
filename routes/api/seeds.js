const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const Friend = require('../../models/Friend');
const Question = require('../../models/Question');
const Answer = require('../../models/Answer');
const Comment = require('../../models/Comment');
const bcrypt = require('bcryptjs');

module.exports = async function seedEverything(req, res) {
    /* USER SEEDING */
    const users = [
        { username: "Allisa", email: "Allisa@knowitall.com", password: "password" },
        { username: "Aubrie", email: "Aubrie@knowitall.com", password: "password" },
        { username: "Brett", email: "Brett@knowitall.com", password: "password" },
        { username: "Nate", email: "Nate@knowitall.com", password: "password" }
    ];
    let userIds = [];
    User.deleteMany({});
    for (let user of users) {
        let newUser = new User(user);

        let salt = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                resolve(salt)
            });
        })
        let hash = await new Promise((resolve, reject) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                resolve(hash)
            });
        })
        newUser.password = hash;
        user = await newUser.save()
        // debugger;
        userIds.push(newUser.id);
    }

    /* FRIEND SEEDING */
    Friend.deleteMany({});
    const friendships = [
        { user_id: userIds[0], friend_id: userIds[1] },
        { user_id: userIds[0], friend_id: userIds[2] },
        { user_id: userIds[1], friend_id: userIds[0] },
        { user_id: userIds[1], friend_id: userIds[2] },
        { user_id: userIds[2], friend_id: userIds[0] },
        { user_id: userIds[2], friend_id: userIds[1] },
        { user_id: userIds[3], friend_id: userIds[0] },
        { user_id: userIds[3], friend_id: userIds[1] },
    ];
    for (let friendship of friendships) {
        let newFriendship = new Friend(friendship)

        await newFriendship.save();
    }

    /* QUESTION SEEDING */
    const questions = [
        { author: userIds[0], body: "Where does Santa Live?" },
        { author: userIds[1], body: "Which country has the biggest population?" },
        { author: userIds[2], body: "How tall is the Empire State Building?" },
        { author: userIds[3], body: "Which movie star has the most leading roles?" }
    ];
    let questionIds = [];

    Question.deleteMany({});
    for (let question of questions) {
        let newQuestion = new Question(question);

        await newQuestion.save();
        questionIds.push(newQuestion.id);
    }

    /* ANSWER SEEDING */
    Answer.deleteMany({});
    let answerIds = [];
    const answers = [
        { body: 'The North Pole', author: userIds[0], question: questionIds[0], winner: true },
        { body: 'The Fortress of Solitude', author: userIds[1], question: questionIds[0] },
        { body: 'China', author: userIds[1], question: questionIds[1], winner: true },
        { body: 'India', author: userIds[0], question: questionIds[1] },
        { body: '1250 feet', author: userIds[2], question: questionIds[2], winner: true },
        { body: '9001 feet', author: userIds[1], question: questionIds[2] },
        { body: 'Samuel L. Jackson', author: userIds[3], question: questionIds[3], winner: true },
        { body: 'Danny DeVito', author: userIds[1], question: questionIds[3] }
    ];
    for (let answer of answers) {
        let newAnswer = new Answer(answer)

        await newAnswer.save();
        answerIds.push(newAnswer.id);
    }

    /* COMMENT SEEDING */
    Comment.deleteMany({});
    const comments = [
        { body: "Everyone knows Santa isn't real", author: userIds[3], question: questionIds[0] },
    ]
    res.send('Database seeded!');
}