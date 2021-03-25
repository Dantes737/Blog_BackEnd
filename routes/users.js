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


// router.get("/list", function (req, res, next) {
//   //Вибірка усіх документів з бази
//   User.find({}, function (err, docs) {
//     // mongoose.disconnect();
//     if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });

//     res.status(200).json({ success: true, users: docs });
//   });
// });

router.get("/list", paginatedResults(User), function (req, res) {
  res.json(res.paginatedResults)
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    results.totalCount=await model.countDocuments().exec();
    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}



module.exports = router;