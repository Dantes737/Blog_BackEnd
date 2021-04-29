const Posts = require('../models/post.js')

class PostController {
    /* GET posts BACK-END. */
    // getPosts(req, res, next) {
    //     //Вибірка усіх документів з бази
    //     Post.find({}, function (err, docs) {
    //         // mongoose.disconnect();
    //         if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });

    //         res.render("index", {
    //             title: "Blog posts",
    //             page: "posts-list",
    //             posts: docs,
    //         });
    //         // res.status(200).json({posts:docs });
    //     });
    // };

    ///for_FRONT-END

    getPosts(req, res, next) {
        Posts.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });
            res.status(200).json({ success: true, posts: docs });
        });
    };

  async  addPost(req, res, next) {
    let currentDate = (new Date()).toLocaleDateString().split("/");

        const post = new Posts({
            text: req.body.text,
            data: currentDate[0],
            img: "https://cdn.pixabay.com/photo/2017/11/28/11/01/road-2983344_960_720.jpg",
            userNick: req.body.nick,
            title: req.body.title,
            coments: [],
        });
        //6. Збереження документа
        await post.save();
       await Posts.find({}, function (err, docs) {
            // mongoose.disconnect();
            if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });
            res.status(200).json({ success: true, posts: docs });
        });

    };

    addCom(req, res) {
        // Знаходимо і оновлюємо
        Posts.findByIdAndUpdate({ _id: '60253a8d79009b5084ee8693' },
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
    };



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

    deletePost(req, res, next) {
        console.log(req.query);
        console.log(req.body);
        //axios.delete(apiEndpoints.products.delete,{data:{id}})
        Posts.findOneAndDelete({ _id: req.body.id }, function (err, doc) {
            if (err)
                return res
                    .status(500)
                    .json({ success: false, err: { msg: "Saving faild!" } });
            res.json({ success: true });
        });
    };

};

module.exports = new PostController();
