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
const comentScheme = new Schema({
  cText: String,
  userNick: String,
  post_id: String
});

const Coment = mongoose.model("Coment", comentScheme);

router.get("/", function (req, res, next) {
  //Вибірка усіх документів з бази
  Coment.find({}, function (err, docs) {
    // mongoose.disconnect();
    if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });

    res.render("index", {
      title: "All users coments",
      page: "coments-list",
      coments: docs,
    });

    // res.status(200).json({posts:docs });
  });
});


module.exports = router;