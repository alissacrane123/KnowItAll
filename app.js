const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const comments = require("./routes/api/comments");
const answers = require("./routes/api/answers");
const questions = require("./routes/api/questions");
const search = require('./routes/api/search');
const friends = require('./routes/api/friends');
const seedEverything = require('./routes/api/seeds');
const User = require('./models/User');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/questions", questions);
app.use("/api/comments", comments);
app.use("/api/answers", answers);
app.use("/api/search", search);
app.use("/api/friends", friends);
app.use("/api/seeds", seedEverything); //this will wipe the DB and replace it with only seeded data!!


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
