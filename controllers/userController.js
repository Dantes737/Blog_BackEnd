




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