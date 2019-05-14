const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const Question = require('../../models/Question');
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
    User.deleteMany({}, () => {
    });
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
        // debugger;
    /* COLLECTION SEEDING */
    const questions = [
        { author: userIds[0], body: "Where does Santa Live?" },
        { author: userIds[1], body: "Which country has the biggest population?" }
    ];
    let questionIds = [];
    Question.deleteMany({}, () => {
        for (let question of questions) {
            let newQuestion = new Question(question);

            newQuestion.save().then(question => questionIds.push(question._id));
        }
    });

    res.send('Database seeded!');
}