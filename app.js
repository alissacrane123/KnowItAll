const express = require("express");
const app = express();
const mongoose = require("mongoose");
// let cors = require('cors');
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const questions = require("./routes/api/questions");
const search = require('./routes/api/search');
const User = require('./models/User')
const bodyParser = require('body-parser');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

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
app.use("/api/search", search);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
