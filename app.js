const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const questions = require("./routes/api/questions");
const User = require('./models/User')
const bodyParser = require('body-parser');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const user = new User({
    username: 'alissa',
    email: 'alissa@gmail.com',
    password: 'password'
  });
  user.save()
  res.send("Hello World")
});

app.use("/api/users", users);
app.use("/api/questions", questions);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
