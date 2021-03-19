var express = require("express");
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
const postScheme = new Schema({
  pText: String,
  data: String,
  img: String,
  userNick: String,
  category: String,
  coments: Array

});

//4. Створення моделі
const Post = mongoose.model("Post", postScheme);

/* GET posts listing. */
router.get("/", function (req, res, next) {
  //Вибірка усіх документів з бази
  Post.find({}, function (err, docs) {
    // mongoose.disconnect();
    if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });

    res.render("index", {
      title: "Blog posts",
      page: "posts-list",
      posts: docs,
    });

    // res.status(200).json({posts:docs });
  });
});

///for_FRONT-END
router.get("/list", function (req, res, next) {
  //Вибірка усіх документів з бази
  Post.find({}, function (err, docs) {
    // mongoose.disconnect();
    if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });

    res.status(200).json({ success: true, posts: docs });
  });
});

router.get('/add-form', function (req, res, next) {
  res.render('index', { title: 'Add post', page: 'add-form' });
});
router.get('/add-comment', function (req, res, next) {
  res.render('index', { title: 'Add comment', page: 'add-comment' });
});

router.post(
  "/add",
  function (req, res, next) {


    //5. Створення документа
    const post = new Post({
      text: req.body.text,
      data: req.body.data,
      img: req.body.img,
      userNick: req.body.userNick,
      category: req.body.category,
      // coments: null,
    });
    //6. Збереження документа
    post.save(function (err, post) {
      // mongoose.disconnect();  // від’єднання від бази даних
      if (err)
        return res
          .status(500)
          .json({ success: false, err: { msg: "Saving faild!" } });
      else res.status(201).json({ success: true, data: post });
    });
  }
);





router.post("/addCom", function (req, res) {
  // Знаходимо і оновлюємо
  Post.findByIdAndUpdate({_id:'60253a8d79009b5084ee8693'},
    {
      $push: { comments: req.body.comment_text }

    }, function (err, doc) {
      // mongoose.disconnect();

      if (err)
        return res
          .status(500)
          .json({ success: false, err: { msg: "Saving faild!" } });
      res.json({ success: true });
    });
});



// router.post("/edit", function (req, res) {
//     // Знаходимо і оновлюємо
//     Film.findByIdAndUpdate({ _id: req.body.id },
//       {
//         title: req.body.title,
//         category: req.body.category,
//         rating: req.body.rating,
//         year: req.body.year
//       }, function (err, doc) {
//         // mongoose.disconnect();

//         if (err)
//           return res
//             .status(500)
//             .json({ success: false, err: { msg: "Saving faild!" } });
//         res.json({ success: true });
//       });
// });



router.delete("/delete", function (req, res, next) {
  console.log(req.query);
  console.log(req.body);
  //5. Видалення
  //Якщо дані передаємо через axios.delete(apiEndpoints.products.delete,{params:{id}})
  // Product.findOneAndDelete({_id:req.query.id}, function(err, doc){

  //axios.delete(apiEndpoints.products.delete,{data:{id}})
  Post.findOneAndDelete({ _id: req.body.id }, function (err, doc) {
    // mongoose.disconnect();

    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Saving faild!" } });
    res.json({ success: true });
  });
});

module.exports = router;
