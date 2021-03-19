var express = require('express');
var router = express.Router();

//1.Імпортували модуль
const mongoose = require("mongoose");

//2. Встановлюємо з"єднання
const url = process.env.MONGO_URL || "mongodb://localhost:27017/blogDB"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//3. Свторюємо схему
const Schema = mongoose.Schema;
// Створення схеми моделі
const userScheme = new Schema({
  name: String,
  age: String,
  country: String,
  city: String,
  avatar: String,
  nick: String,
  email: String,
  friends: Array,
  posts_id: Array
});

const User = mongoose.model("User", userScheme);

router.get("/", function (req, res, next) {
  //Вибірка усіх документів з бази
  User.find({}, function (err, docs) {
    // mongoose.disconnect();
    if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });

    res.render("index", {
      title: "All users",
      page: "users-list",
      users: docs,
    });

    // res.status(200).json({posts:docs });
  });
});


module.exports = router;